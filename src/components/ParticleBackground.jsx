import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

const COUNT = 4000;
const RADIUS = 1.5;
const MAX_NEIGHBORS = 6; // Slightly higher for better connectivity
const MAX_DEPTH = 3;

// --- Shaders ---
const vertexShader = `
  attribute float alpha;
  varying float vAlpha;
  varying vec3 vColor;
  uniform vec3 uColor;

  void main() {
    vAlpha = alpha;
    vColor = uColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    if (vAlpha < 0.01) discard; // Truly invisible
    gl_FragColor = vec4(vColor, vAlpha);
  }
`;

// --- Shape Generators ---
const generateSphere = (count) => {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = RADIUS * Math.sin(phi) * Math.cos(theta);
        const y = RADIUS * Math.sin(phi) * Math.sin(theta);
        const z = RADIUS * Math.cos(phi);
        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
};

const generateDNA = (count) => {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const t = i * 0.02;
        const strand = i % 2 === 0 ? 1 : -1;
        const x = Math.cos(t) * 0.5 * strand;
        const y = (i * 0.01) - 2;
        const z = Math.sin(t) * 0.5 * strand;
        points[i * 3] = x + (Math.random() - 0.5) * 0.1;
        points[i * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
        points[i * 3 + 2] = z + (Math.random() - 0.5) * 0.1;
    }
    return points;
};

const NetworkParticles = ({ theme, shape }) => {
    const pointsRef = useRef();
    const linesRef = useRef();
    const { raycaster, camera, pointer } = useThree();

    // Increase threshold for easier clicking
    raycaster.params.Points.threshold = 0.2;

    // 1. Generate Positions
    const [positions] = useMemo(() => {
        const randomPos = random.inSphere(new Float32Array(COUNT * 3), { radius: RADIUS });
        const spherePos = generateSphere(COUNT);
        const dnaPos = generateDNA(COUNT);

        [randomPos, spherePos, dnaPos].forEach(arr => {
            for (let i = 0; i < arr.length; i++) if (isNaN(arr[i])) arr[i] = 0;
        });

        return [{ random: randomPos, sphere: spherePos, dna: dnaPos }];
    }, []);

    // 2. Build Graph
    const { connections, neighbors } = useMemo(() => {
        const neighbors = new Array(COUNT).fill(0).map(() => []);
        const connections = [];

        for (let i = 0; i < COUNT; i++) {
            // Connect to next few indices
            for (let j = 1; j <= MAX_NEIGHBORS / 2; j++) {
                const target = (i + j) % COUNT;
                neighbors[i].push(target);
                neighbors[target].push(i);
                connections.push([i, target]);
            }
            // Random long-range connection
            if (Math.random() > 0.9) {
                const target = Math.floor(Math.random() * COUNT);
                if (target !== i) {
                    neighbors[i].push(target);
                    neighbors[target].push(i);
                    connections.push([i, target]);
                }
            }
        }
        return { connections, neighbors };
    }, []);

    // 3. Geometry & Attributes
    const currentPos = useRef(positions.random.slice());

    const [lineGeo, lineMaterial] = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(connections.length * 6);
        const alphas = new Float32Array(connections.length * 2); // 2 vertices per line

        alphas.fill(0); // Start invisible

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(theme === 'dark' ? '#00f0ff' : '#1d4ed8') }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        return [geo, mat];
    }, [connections, theme]);

    // Update uniform color when theme changes
    useEffect(() => {
        lineMaterial.uniforms.uColor.value.set(theme === 'dark' ? '#00f0ff' : '#1d4ed8');
    }, [theme, lineMaterial]);


    // 4. Pulse Logic
    const activePulse = useRef({
        active: false,
        origin: -1,
        startTime: 0,
        nodeDepths: new Map() // Map<NodeIndex, Depth>
    });

    const handlePointerDown = (e) => {
        // Only trigger if on home section (simple check: scrollY < window height)
        if (window.scrollY > window.innerHeight * 0.5) return;

        // Raycast to find closest point
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(pointsRef.current);

        if (intersects.length > 0) {
            // Find the closest point index
            // intersects[0].index is the index of the vertex
            const index = intersects[0].index;
            triggerPulse(index);
        }
    };

    const triggerPulse = (startNode) => {
        // BFS to calculate depths
        const depths = new Map();
        const queue = [[startNode, 0]];
        depths.set(startNode, 0);

        while (queue.length > 0) {
            const [node, depth] = queue.shift();
            if (depth >= MAX_DEPTH) continue;

            const myNeighbors = neighbors[node];
            for (let neighbor of myNeighbors) {
                if (!depths.has(neighbor)) {
                    depths.set(neighbor, depth + 1);
                    queue.push([neighbor, depth + 1]);
                }
            }
        }

        activePulse.current = {
            active: true,
            origin: startNode,
            startTime: performance.now(),
            nodeDepths: depths
        };
    };

    useFrame((state, delta) => {
        if (!pointsRef.current || !linesRef.current) return;

        // Skip animation if scrolled away
        if (window.scrollY > window.innerHeight) return;

        // 1. Rotation & Morphing
        pointsRef.current.rotation.x -= delta / 15;
        pointsRef.current.rotation.y -= delta / 20;
        linesRef.current.rotation.copy(pointsRef.current.rotation);

        const target = positions[shape] || positions.random;
        const array = pointsRef.current.geometry.attributes.position.array;
        const lerpFactor = 0.05;

        for (let i = 0; i < COUNT * 3; i++) {
            array[i] += (target[i] - array[i]) * lerpFactor;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // 2. Update Line Positions
        const linePos = linesRef.current.geometry.attributes.position.array;
        for (let i = 0; i < connections.length; i++) {
            const [idx1, idx2] = connections[i];

            linePos[i * 6 + 0] = array[idx1 * 3 + 0];
            linePos[i * 6 + 1] = array[idx1 * 3 + 1];
            linePos[i * 6 + 2] = array[idx1 * 3 + 2];

            linePos[i * 6 + 3] = array[idx2 * 3 + 0];
            linePos[i * 6 + 4] = array[idx2 * 3 + 1];
            linePos[i * 6 + 5] = array[idx2 * 3 + 2];
        }
        linesRef.current.geometry.attributes.position.needsUpdate = true;

        // 3. Pulse Animation
        const alphas = linesRef.current.geometry.attributes.alpha.array;

        // Decay all alphas
        for (let i = 0; i < alphas.length; i++) {
            alphas[i] *= 0.95; // Fade out
            if (alphas[i] < 0.001) alphas[i] = 0;
        }

        if (activePulse.current.active) {
            const elapsed = (performance.now() - activePulse.current.startTime) / 1000;
            const speed = 10; // Propagation speed
            const currentDist = elapsed * speed;

            // If pulse is done (passed max depth), we can stop checking, but we let it fade out
            if (currentDist > MAX_DEPTH + 2) {
                activePulse.current.active = false;
            } else {
                // Activate lines based on depth
                for (let i = 0; i < connections.length; i++) {
                    const [u, v] = connections[i];
                    const depthU = activePulse.current.nodeDepths.get(u);
                    const depthV = activePulse.current.nodeDepths.get(v);

                    // If both nodes are part of the BFS tree
                    if (depthU !== undefined && depthV !== undefined) {
                        const maxDepth = Math.max(depthU, depthV);

                        // Check if wave has reached this depth
                        if (Math.abs(maxDepth - currentDist) < 1.5) {
                            // Calculate target opacity based on depth (1 at 0, 0 at 5)
                            const depthOpacity = Math.max(0, 1 - (maxDepth / MAX_DEPTH));

                            // Set alpha
                            alphas[i * 2] = Math.max(alphas[i * 2], depthOpacity);
                            alphas[i * 2 + 1] = Math.max(alphas[i * 2 + 1], depthOpacity);
                        }
                    }
                }
            }
        }

        linesRef.current.geometry.attributes.alpha.needsUpdate = true;
    });

    const pointColor = theme === 'dark' ? '#00f0ff' : '#1d4ed8';

    return (
        <group rotation={[0, 0, Math.PI / 4]} onClick={handlePointerDown}>
            <Points ref={pointsRef} positions={currentPos.current} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={pointColor}
                    size={theme === 'dark' ? 0.0033 : 0.0073}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={theme === 'dark' ? 0.8 : 0.6}
                />
            </Points>

            <lineSegments ref={linesRef} geometry={lineGeo} material={lineMaterial} />
        </group>
    );
};

const ParticleBackground = ({ theme, shape = 'random' }) => {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Canvas camera={{ position: [0, 0, 2.5] }} gl={{ alpha: true, antialias: true }}>
                <NetworkParticles theme={theme} shape={shape} />
            </Canvas>
        </div>
    );
};

export default ParticleBackground;
