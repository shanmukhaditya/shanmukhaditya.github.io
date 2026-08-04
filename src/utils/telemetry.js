/**
 * Cookie-Free High-Resolution Telemetry Engine for Portfolio
 * 
 * 1. Initial Context & Hardware Profiling (WebGL GPU, CPU, RAM, display, battery)
 * 2. High-Resolution Mouse & Vector Tracking (dx/dt, velocity, acceleration, hover dwell, click offset)
 * 3. Attention & Page Lifecycle Observer (active focus vs idle, tab visibility changes, freeze/resume)
 * 4. Performance & Core Web Vitals Observer (TTFB, LCP, CLS)
 * 5. Batched Payload Transmitter (navigator.sendBeacon)
 */

const TELEMETRY_ENDPOINT = import.meta.env.VITE_TELEMETRY_ENDPOINT || "http://localhost:8000/api/v1/telemetry";

class TelemetryEngine {
    constructor() {
        this.initialized = false;
        this.startTime = Date.now();
        
        // Data buckets
        this.hardware = {};
        this.navigation = {};
        this.userPreferences = {};
        this.network = {};
        this.performanceMetrics = {};
        
        // Interaction buckets
        this.mouseTelemetry = {
            movement_sample_vectors: [],
            hover_dwell_events: [],
            click_offsets: [],
            text_selections: []
        };
        
        this.behavior = {
            max_scroll_depth_percent: 0,
            scroll_reversals: 0,
            active_dwell_time_seconds: 0,
            outbound_clicks: [],
            copied_text_snippets: [],
            section_dwell_times: {}
        };
        
        this.attention = {
            active_focus_seconds: 0,
            idle_seconds: 0,
            tab_switches: 0,
            lifecycle_events: []
        };
        
        // Internal tracking state
        this.lastMousePos = null;
        this.lastMouseTime = null;
        this.lastScrollY = window.scrollY;
        this.scrollDirection = null;
        this.activeFocusStart = Date.now();
        this.lastActivityTime = Date.now();
        this.isTabActive = !document.hidden;
        this.hoverStartTimeMap = new WeakMap();
    }

    init() {
        if (this.initialized) return;
        this.initialized = true;

        const runInit = () => {
            this.profileHardware();
            this.profileNavigation();
            this.profileUserPreferences();
            this.profileNetwork();
            this.setupMouseTracking();
            this.setupAttentionObserver();
            this.setupPerformanceObserver();
            this.setupBehaviorObservers();
            this.setupPayloadTransmitter();
        };

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(runInit);
        } else {
            setTimeout(runInit, 200);
        }
    }

    // 1. Hardware & GPU Profiling
    profileHardware() {
        let gpuVendor = "unknown";
        let gpuRenderer = "unknown";

        try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            if (gl) {
                const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
                if (debugInfo) {
                    gpuVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "unknown";
                    gpuRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "unknown";
                }
            }
        } catch (e) {}

        const hdrSupport = window.matchMedia && window.matchMedia("(color-gamut: p3)").matches;

        this.hardware = {
            gpu_vendor: gpuVendor,
            gpu_renderer: gpuRenderer,
            cpu_cores: navigator.hardwareConcurrency || null,
            memory_gb: navigator.deviceMemory || null,
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight,
            pixel_ratio: window.devicePixelRatio || 1.0,
            color_depth: window.screen.colorDepth || 24,
            hdr_p3_support: Boolean(hdrSupport),
            touch_points: navigator.maxTouchPoints || 0,
            battery: null
        };

        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                this.hardware.battery = {
                    level: Math.round(battery.level * 100),
                    charging: battery.charging
                };
            }).catch(() => {});
        }
    }

    profileNavigation() {
        const urlObj = new URL(window.location.href);
        const queryParams = {};
        urlObj.searchParams.forEach((val, key) => {
            queryParams[key] = val;
        });

        this.navigation = {
            url: window.location.href,
            path: window.location.pathname,
            hash: window.location.hash,
            query_params: queryParams,
            referrer: document.referrer || "direct",
            title: document.title
        };
    }

    profileUserPreferences() {
        this.userPreferences = {
            language: navigator.language || "en-US",
            dark_mode: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches,
            reduced_motion: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
        };
    }

    profileNetwork() {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn) {
            this.network = {
                effective_type: conn.effectiveType || "unknown",
                rtt_ms: conn.rtt || null,
                downlink_mbps: conn.downlink || null,
                save_data: Boolean(conn.saveData)
            };
        } else {
            this.network = { effective_type: "unknown" };
        }
    }

    // 2. High-Resolution Mouse & Vector Tracking
    setupMouseTracking() {
        let lastSampleTime = 0;

        window.addEventListener("mousemove", (e) => {
            const now = Date.now();
            this.lastActivityTime = now;

            if (now - lastSampleTime > 150 && this.mouseTelemetry.movement_sample_vectors.length < 30) {
                if (this.lastMousePos && this.lastMouseTime) {
                    const dt = now - this.lastMouseTime;
                    const dx = e.clientX - this.lastMousePos.x;
                    const dy = e.clientY - this.lastMousePos.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const velocity = dt > 0 ? dist / dt : 0;
                    const accel = dt > 0 ? velocity / dt : 0;

                    this.mouseTelemetry.movement_sample_vectors.push({
                        x: e.clientX,
                        y: e.clientY,
                        dx: Math.round(dx),
                        dy: Math.round(dy),
                        dt_ms: dt,
                        velocity_px_ms: parseFloat(velocity.toFixed(3)),
                        acceleration: parseFloat(accel.toFixed(5))
                    });
                }
                this.lastMousePos = { x: e.clientX, y: e.clientY };
                this.lastMouseTime = now;
                lastSampleTime = now;
            }
        }, { passive: true });

        // Hover dwell & Click offset listeners
        document.addEventListener("mouseover", (e) => {
            const target = e.target.closest("button, a, input, [id], .project-card, .hover-target");
            if (target) {
                this.hoverStartTimeMap.set(target, Date.now());
            }
        }, { passive: true });

        document.addEventListener("mouseout", (e) => {
            const target = e.target.closest("button, a, input, [id], .project-card, .hover-target");
            if (target && this.hoverStartTimeMap.has(target)) {
                const dwellMs = Date.now() - this.hoverStartTimeMap.get(target);
                this.hoverStartTimeMap.delete(target);
                if (dwellMs > 200 && this.mouseTelemetry.hover_dwell_events.length < 20) {
                    this.mouseTelemetry.hover_dwell_events.push({
                        target_id: target.id || "none",
                        target_tag: target.tagName,
                        dwell_ms: dwellMs
                    });
                }
            }
        }, { passive: true });

        document.addEventListener("click", (e) => {
            const target = e.target.closest("button, a, [id]");
            if (target && this.mouseTelemetry.click_offsets.length < 20) {
                const rect = target.getBoundingClientRect();
                this.mouseTelemetry.click_offsets.push({
                    target_id: target.id || "none",
                    offset_x: Math.round(e.clientX - rect.left),
                    offset_y: Math.round(e.clientY - rect.top),
                    element_width: Math.round(rect.width),
                    element_height: Math.round(rect.height)
                });
            }
        }, { passive: true });

        // Text Selection Observer
        document.addEventListener("selectionchange", () => {
            const selection = window.getSelection();
            if (selection) {
                const text = selection.toString().trim();
                if (text.length > 3 && text.length < 150) {
                    const exists = this.mouseTelemetry.text_selections.some(s => s.text === text);
                    if (!exists && this.mouseTelemetry.text_selections.length < 10) {
                        this.mouseTelemetry.text_selections.push({
                            text: text,
                            selection_length: text.length,
                            timestamp: new Date().toISOString()
                        });
                    }
                }
            }
        });
    }

    // 3. Attention & Page Lifecycle Observer
    setupAttentionObserver() {
        const recordLifecycle = (evtName) => {
            if (this.attention.lifecycle_events.length < 25) {
                this.attention.lifecycle_events.push({
                    event: evtName,
                    timestamp: new Date().toISOString()
                });
            }
        };

        window.addEventListener("focus", () => {
            this.isTabActive = true;
            this.activeFocusStart = Date.now();
            recordLifecycle("focus");
        });

        window.addEventListener("blur", () => {
            this.isTabActive = false;
            if (this.activeFocusStart) {
                this.attention.active_focus_seconds += (Date.now() - this.activeFocusStart) / 1000;
            }
            recordLifecycle("blur");
        });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.attention.tab_switches += 1;
                recordLifecycle("visibility_hidden");
                this.sendPayload("leave");
            } else {
                recordLifecycle("visibility_visible");
            }
        });

        // Periodic ticker for active vs idle seconds
        setInterval(() => {
            const now = Date.now();
            if (this.isTabActive) {
                if (now - this.lastActivityTime < 10000) {
                    this.attention.active_focus_seconds += 1;
                    this.behavior.active_dwell_time_seconds += 1;
                } else {
                    this.attention.idle_seconds += 1;
                }
            }
        }, 1000);
    }

    // 4. Performance & Core Web Vitals Observer
    setupPerformanceObserver() {
        if ('performance' in window && performance.timing) {
            const t = performance.timing;
            const ttfb = t.responseStart - t.requestStart;
            const domInt = t.domInteractive - t.navigationStart;
            const loadTime = t.loadEventEnd - t.navigationStart;

            this.performanceMetrics = {
                ttfb_ms: ttfb > 0 ? parseFloat(ttfb.toFixed(1)) : null,
                dom_interactive_ms: domInt > 0 ? parseFloat(domInt.toFixed(1)) : null,
                load_time_ms: loadTime > 0 ? parseFloat(loadTime.toFixed(1)) : null,
                lcp_ms: null,
                cls: 0
            };
        }

        if ('PerformanceObserver' in window) {
            try {
                // LCP Observer
                const lcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    if (lastEntry) {
                        this.performanceMetrics.lcp_ms = parseFloat(lastEntry.startTime.toFixed(1));
                    }
                });
                lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

                // CLS Observer
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            this.performanceMetrics.cls = parseFloat(clsValue.toFixed(4));
                        }
                    }
                });
                clsObserver.observe({ type: 'layout-shift', buffered: true });
            } catch (e) {}
        }
    }

    // 5. Scroll & Copy Behavior Observers
    setupBehaviorObservers() {
        window.addEventListener("scroll", () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const percent = Math.min(100, Math.round((window.scrollY / totalHeight) * 100));
                if (percent > this.behavior.max_scroll_depth_percent) {
                    this.behavior.max_scroll_depth_percent = percent;
                }
            }

            const currentY = window.scrollY;
            const dir = currentY > this.lastScrollY ? "down" : "up";
            if (this.scrollDirection && this.scrollDirection !== dir) {
                this.behavior.scroll_reversals += 1;
            }
            this.scrollDirection = dir;
            this.lastScrollY = currentY;
        }, { passive: true });

        document.addEventListener("copy", () => {
            const selection = window.getSelection().toString().trim();
            if (selection && this.behavior.copied_text_snippets.length < 10) {
                this.behavior.copied_text_snippets.push(selection.substring(0, 100));
            }
        });

        document.addEventListener("click", (e) => {
            const anchor = e.target.closest("a");
            if (anchor && anchor.href && anchor.hostname !== window.location.hostname) {
                if (this.behavior.outbound_clicks.length < 15) {
                    this.behavior.outbound_clicks.push({
                        target: anchor.innerText.trim().substring(0, 50) || "link",
                        url: anchor.href,
                        timestamp: new Date().toISOString()
                    });
                }
            }
        });
    }

    // 6. Batched Payload Transmitter (sendBeacon)
    sendPayload(eventType = "pageview") {
        this.profileNavigation();

        const payload = {
            event_type: eventType,
            navigation: this.navigation,
            hardware: this.hardware,
            user_preferences: this.userPreferences,
            network: this.network,
            performance: this.performanceMetrics,
            behavior: {
                ...this.behavior,
                active_dwell_time_seconds: parseFloat(this.behavior.active_dwell_time_seconds.toFixed(1))
            },
            mouse_telemetry: this.mouseTelemetry,
            attention: {
                ...this.attention,
                active_focus_seconds: parseFloat(this.attention.active_focus_seconds.toFixed(1)),
                idle_seconds: parseFloat(this.attention.idle_seconds.toFixed(1))
            }
        };

        const jsonBlob = new Blob([JSON.stringify(payload)], { type: "application/json" });

        if (navigator.sendBeacon) {
            navigator.sendBeacon(TELEMETRY_ENDPOINT, jsonBlob);
        } else {
            fetch(TELEMETRY_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                keepalive: true
            }).catch(() => {});
        }
    }

    setupPayloadTransmitter() {
        // Send initial pageview telemetry after load
        setTimeout(() => {
            this.sendPayload("pageview");
        }, 1500);

        // Send telemetry on leave or tab unload
        window.addEventListener("pagehide", () => this.sendPayload("leave"));
        window.addEventListener("beforeunload", () => this.sendPayload("leave"));
    }
}

export const telemetry = new TelemetryEngine();
