"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Kept as template strings so no GLSL loader/bundler config is needed.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }
  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.05;
    vec2 p = uv * 3.0;
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    float f = fbm(p + q * 1.6 + (uMouse - 0.5) * 1.4);

    vec3 base = vec3(0.039, 0.039, 0.043);   // #0a0a0b
    vec3 amber = vec3(0.910, 0.631, 0.361);  // #e8a15c

    float glow = smoothstep(0.35, 0.95, f);
    float d = distance(uv, uMouse);
    float spot = smoothstep(0.55, 0.0, d) * 0.5; // cursor light

    vec3 col = mix(base, amber, glow * 0.45 + spot * 0.6);
    col = mix(col, base, 0.15); // keep it premium-dark
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Field() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const eased = useRef({ x: 0.5, y: 0.5 });
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  );

  useFrame((state) => {
    const u = material.current?.uniforms;
    if (!u) return;
    u.uTime.value = state.clock.elapsedTime;
    const tx = (state.pointer.x + 1) / 2;
    const ty = (state.pointer.y + 1) / 2;
    eased.current.x += (tx - eased.current.x) * 0.05;
    eased.current.y += (ty - eased.current.y) * 0.05;
    (u.uMouse.value as THREE.Vector2).set(eased.current.x, eased.current.y);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/** Cursor-reactive flowing amber field. Lazy-loaded; render only when allowed. */
export function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 1], fov: 50 }}
    >
      <Field />
    </Canvas>
  );
}
