import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

const COUNT = 4000;
const RADIUS = 1.5;
const MAX_NEIGHBORS = 6; // Slightly higher for better connectivity
const MAX_DEPTH = 3;
const ignoreLineRaycast = () => {};

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
        const progress = i / (count - 1);
        const t = progress * Math.PI * 10;
        const strand = i % 2 === 0 ? 1 : -1;
        const x = Math.cos(t) * 0.5 * strand;
        const y = (progress - 0.5) * 3;
        const z = Math.sin(t) * 0.5 * strand;
        points[i * 3] = x + (Math.random() - 0.5) * 0.1;
        points[i * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
        points[i * 3 + 2] = z + (Math.random() - 0.5) * 0.1;
    }
    return points;
};

const NetworkParticles = ({ theme, shape, viewpoint, reduceMotion }) => {
    const groupRef = useRef();
    const pointsRef = useRef();
    const linesRef = useRef();
    const { raycaster, camera, invalidate } = useThree();

    useEffect(() => {
        raycaster.params.Points.threshold = 0.2;
    }, [raycaster]);

    useEffect(() => invalidate(), [invalidate, reduceMotion, shape]);

    // 1. Generate Positions
    const positions = useMemo(() => {
        const randomPos = random.inSphere(new Float32Array(COUNT * 3), { radius: RADIUS });
        const spherePos = generateSphere(COUNT);
        const dnaPos = generateDNA(COUNT);

        [randomPos, spherePos, dnaPos].forEach(arr => {
            for (let i = 0; i < arr.length; i++) if (isNaN(arr[i])) arr[i] = 0;
        });

        return { random: randomPos, sphere: spherePos, dna: dnaPos };
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
    const currentPos = useMemo(() => positions.random.slice(), [positions]);

    const [lineGeo, lineMaterial] = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(connections.length * 6);
        const alphas = new Float32Array(connections.length * 2); // 2 vertices per line

        alphas.fill(0); // Start invisible

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color('#00f0ff') }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        return [geo, mat];
    }, [connections]);

    // Update uniform color when theme changes
    useEffect(() => {
        lineMaterial.uniforms.uColor.value.set(theme === 'dark' ? '#00f0ff' : '#1d4ed8');
    }, [theme, lineMaterial]);


    // 4. Pulse Logic
    const activePulse = useRef(null);

    const handlePointerDown = (event) => {
        if (reduceMotion) return;

        raycaster.setFromCamera(event.pointer, camera);
        const [point] = raycaster.intersectObject(pointsRef.current);
        if (point) {
            event.stopPropagation();
            triggerPulse(point.index);
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

        activePulse.current = { startTime: performance.now(), depths };
    };

    useFrame((_, frameDelta) => {
        const delta = Math.min(frameDelta, 0.05);
        const group = groupRef.current;
        const points = pointsRef.current;
        const lines = linesRef.current;
        if (!group || !points || !lines) return;

        const target = positions[shape] || positions.random;
        const pointPositions = points.geometry.attributes.position;
        const coordinates = pointPositions.array;
        const { position: linePositions, alpha } = lines.geometry.attributes;

        if (reduceMotion) {
            group.rotation.x = 0;
            group.rotation.y = 0;
            points.rotation.set(0, 0, 0);
            coordinates.set(target);
            pointPositions.needsUpdate = true;
            points.geometry.boundingSphere = null;
            lines.visible = false;
            if (activePulse.current) {
                alpha.array.fill(0);
                alpha.needsUpdate = true;
                activePulse.current = null;
            }
            return;
        }

        group.rotation.x = THREE.MathUtils.damp(group.rotation.x, viewpoint.current.y * 0.28, 5, delta);
        group.rotation.y = THREE.MathUtils.damp(group.rotation.y, viewpoint.current.x * 0.36, 5, delta);
        points.rotation.x -= delta / 15;
        points.rotation.y -= delta / 20;

        const blend = 1 - Math.exp(-delta * 3.1);
        let changed = false;
        for (let i = 0; i < coordinates.length; i++) {
            const remaining = target[i] - coordinates[i];
            if (Math.abs(remaining) > 0.0001) {
                coordinates[i] += remaining * blend;
                changed = true;
            }
        }
        if (changed) {
            pointPositions.needsUpdate = true;
            points.geometry.boundingSphere = null;
        }

        const pulse = activePulse.current;
        if (!pulse) return;
        const elapsed = (performance.now() - pulse.startTime) / 1000;
        if (elapsed > 1.5) {
            lines.visible = false;
            alpha.array.fill(0);
            alpha.needsUpdate = true;
            activePulse.current = null;
            return;
        }

        lines.visible = true;
        lines.rotation.copy(points.rotation);
        const decay = Math.pow(0.95, delta * 60);
        const wave = elapsed * 10;
        for (let i = 0; i < connections.length; i++) {
            const [from, to] = connections[i];
            const fromDepth = pulse.depths.get(from);
            const toDepth = pulse.depths.get(to);
            const depth = Math.max(fromDepth, toDepth);
            const vertex = i * 2;
            const waveOpacity = Number.isFinite(depth) && Math.abs(depth - wave) < 1.5
                ? 1 - depth / (MAX_DEPTH + 1)
                : 0;
            const opacity = Math.max(alpha.array[vertex] * decay, waveOpacity);
            alpha.setX(vertex, opacity);
            alpha.setX(vertex + 1, opacity);
            if (opacity < 0.01) continue;

            linePositions.setXYZ(vertex, coordinates[from * 3], coordinates[from * 3 + 1], coordinates[from * 3 + 2]);
            linePositions.setXYZ(vertex + 1, coordinates[to * 3], coordinates[to * 3 + 1], coordinates[to * 3 + 2]);
        }
        alpha.needsUpdate = true;
        linePositions.needsUpdate = true;
    });

    const pointColor = theme === 'dark' ? '#00f0ff' : '#1d4ed8';

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI / 4]} onClick={reduceMotion ? undefined : handlePointerDown}>
            <Points ref={pointsRef} positions={currentPos} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={pointColor}
                    size={theme === 'dark' ? 0.0033 : 0.0073}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={theme === 'dark' ? 0.8 : 0.6}
                />
            </Points>

            <lineSegments ref={linesRef} geometry={lineGeo} material={lineMaterial} frustumCulled={false} visible={false} raycast={ignoreLineRaycast} />
        </group>
    );
};

class SpaceSceneBoundary extends React.Component {
    state = { unavailable: false };

    static getDerivedStateFromError() {
        return { unavailable: true };
    }

    render() {
        return this.state.unavailable ? null : this.props.children;
    }
}

const ParticleBackground = ({ theme, shape = 'random', viewpoint, reduceMotion }) => {
    const host = useRef(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        observer.observe(host.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={host} className="space-scene" aria-hidden="true">
            <SpaceSceneBoundary>
                <Canvas
                    camera={{ position: [0, 0, 2.5] }}
                    dpr={[1, 1.5]}
                    frameloop={visible && !reduceMotion ? 'always' : 'demand'}
                    gl={{ alpha: true, antialias: true }}
                >
                    <NetworkParticles theme={theme} shape={shape} viewpoint={viewpoint} reduceMotion={reduceMotion} />
                </Canvas>
            </SpaceSceneBoundary>
        </div>
    );
};

export default ParticleBackground;
