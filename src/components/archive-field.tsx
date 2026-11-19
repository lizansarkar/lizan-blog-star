"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Three = typeof import("three");

const noise = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const auroraVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const auroraFragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uPointer;
varying vec2 vUv;
${noise}
void main() {
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (vUv - 0.5) * aspect;
  float t = uTime * 0.045;
  vec2 q = vec2(snoise(vec3(p * 1.1, t)), snoise(vec3(p * 1.1 + 5.2, t)));
  vec2 r = vec2(snoise(vec3(p * 1.5 + q * 1.3 + vec2(1.7, 9.2), t * 1.4)), snoise(vec3(p * 1.5 + q * 1.3 + vec2(8.3, 2.8), t * 1.4)));
  float n = snoise(vec3(p * 0.9 + r, t)) * 0.5 + 0.5;
  float glow = exp(-length(p - (uPointer - 0.5) * aspect) * 2.6);
  n += glow * 0.16;

  vec3 ink = vec3(0.047, 0.043, 0.047);
  vec3 plum = vec3(0.17, 0.10, 0.16);
  vec3 ember = vec3(0.753, 0.420, 0.239);
  vec3 amber = vec3(0.96, 0.70, 0.45);

  vec3 color = mix(ink, plum, smoothstep(0.18, 0.6, n));
  color = mix(color, ember, smoothstep(0.52, 0.86, n + 0.12 * r.x));
  color = mix(color, amber, smoothstep(0.8, 1.05, n + 0.1 * q.y) * 0.7);
  color *= 1.0 - 0.45 * smoothstep(0.2, 0.95, length(vUv - vec2(0.62, 0.5)));

  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + uTime) * 43758.5453);
  color += (grain - 0.5) * 0.025;
  gl_FragColor = vec4(color, 1.0);
}
`;

const fieldVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
varying float vAlpha;
void main() {
  vec3 p = position;
  float wave = sin(p.x * 0.55 + uTime * 0.5) * 0.32 + sin(p.z * 0.9 + uTime * 0.38) * 0.22 + sin((p.x + p.z) * 0.35 - uTime * 0.27) * 0.3;
  p.y += wave;
  vec4 view = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * view;
  gl_PointSize = uSize * (6.0 / -view.z);
  float depth = smoothstep(15.0, 3.5, -view.z);
  float edge = smoothstep(9.0, 5.0, abs(position.x));
  vAlpha = depth * edge * (0.3 + 0.7 * smoothstep(-0.6, 0.8, wave));
}
`;

const fieldFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(uColor, smoothstep(0.5, 0.0, d) * vAlpha * 0.9);
}
`;

function mount(THREE: Three, node: HTMLElement, onReady: () => void) {
  let renderer: InstanceType<Three["WebGLRenderer"]>;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "low-power" });
  } catch {
    return () => {};
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compact = window.innerWidth < 768;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.25 : 1.5));
  renderer.autoClear = false;
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
  node.appendChild(renderer.domElement);

  const auroraScene = new THREE.Scene();
  const auroraCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const aurora = {
    uTime: { value: 12 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: new THREE.Vector2(0.7, 0.5) },
  };
  const auroraGeometry = new THREE.PlaneGeometry(2, 2);
  const auroraMaterial = new THREE.ShaderMaterial({ uniforms: aurora, vertexShader: auroraVertex, fragmentShader: auroraFragment, depthTest: false, depthWrite: false });
  auroraScene.add(new THREE.Mesh(auroraGeometry, auroraMaterial));

  const fieldScene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  const fieldGeometry = new THREE.PlaneGeometry(18, 9, compact ? 72 : 150, compact ? 36 : 64);
  fieldGeometry.rotateX(-Math.PI / 2);
  const field = {
    uTime: { value: 12 },
    uSize: { value: (compact ? 2.4 : 2.8) * renderer.getPixelRatio() },
    uColor: { value: new THREE.Color("#f6d2b3") },
  };
  const fieldMaterial = new THREE.ShaderMaterial({ uniforms: field, vertexShader: fieldVertex, fragmentShader: fieldFragment, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(fieldGeometry, fieldMaterial);
  points.position.set(1.2, -1.25, -1);
  fieldScene.add(points);

  const resize = () => {
    const box = node.getBoundingClientRect();
    const width = Math.max(1, box.width);
    const height = Math.max(1, box.height);
    renderer.setSize(width, height, false);
    aurora.uRes.value.set(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  const resizer = new ResizeObserver(resize);
  resizer.observe(node);

  const target = new THREE.Vector2(0.7, 0.5);
  const pointer = target.clone();
  const host = node.parentElement ?? node;
  const onPointer = (event: PointerEvent) => {
    const box = node.getBoundingClientRect();
    target.set((event.clientX - box.left) / box.width, 1 - (event.clientY - box.top) / box.height);
  };
  host.addEventListener("pointermove", onPointer);

  let time = 12;
  let last = 0;
  let frame = 0;
  let inView = false;

  const draw = () => {
    pointer.lerp(target, 0.035);
    aurora.uTime.value = time;
    aurora.uPointer.value.copy(pointer);
    field.uTime.value = time;
    camera.position.set((pointer.x - 0.5) * 0.9, 2.3 + (pointer.y - 0.5) * 0.5, 6);
    camera.lookAt(0.4, -0.3, 0);
    renderer.clear();
    renderer.render(auroraScene, auroraCamera);
    renderer.render(fieldScene, camera);
  };
  const tick = (now: number) => {
    time += Math.min(now - last, 50) / 1000;
    last = now;
    draw();
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (frame || reduced || !inView || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  draw();
  onReady();

  const watcher = new IntersectionObserver(([entry]) => {
    inView = Boolean(entry?.isIntersecting);
    if (inView) start();
    else stop();
  });
  watcher.observe(node);
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    stop();
    watcher.disconnect();
    resizer.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    host.removeEventListener("pointermove", onPointer);
    auroraGeometry.dispose();
    auroraMaterial.dispose();
    fieldGeometry.dispose();
    fieldMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}

export function ArchiveField({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let cancelled = false;
    let teardown = () => {};
    import("three")
      .then((THREE) => {
        if (!cancelled) teardown = mount(THREE, node, () => setReady(true));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  return <div ref={host} aria-hidden className={cn("pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-out", ready ? "opacity-100" : "opacity-0", className)} />;
}
