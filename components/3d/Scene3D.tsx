// components/3d/InteractiveScene.tsx
"use client";

import * as THREE from "three";
import React, { useRef } from "react";
import { Canvas, useFrame, extend, ReactThreeFiber } from "@react-three/fiber";
import { shaderMaterial, Torus } from "@react-three/drei";

// Extend JSX Intrinsics for our shader material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      crystallineMaterial: ReactThreeFiber.Node<
        THREE.ShaderMaterial & {
          u_time: number;
          u_mouse: THREE.Vector2;
          u_colorA: THREE.Color;
          u_colorB: THREE.Color;
        },
        typeof THREE.ShaderMaterial
      >;
    }
  }
}

// Custom shader material
const CrystallineMaterial = shaderMaterial(
  {
    u_time: 0,
    u_mouse: new THREE.Vector2(0, 0),
    u_colorA: new THREE.Color("#5de4d2"),
    u_colorB: new THREE.Color("#00ffff"),
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    varying vec2 vUv;

    float rand(vec2 co){
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      float pattern = sin(vUv.x * 10.0 + u_time) + cos(vUv.y * 10.0 + u_time);
      pattern = smoothstep(0.1, 1.0, pattern);
      vec3 finalColor = mix(u_colorA, u_colorB, pattern);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);
extend({ CrystallineMaterial });

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null!);
  const materialRef = useRef<
    THREE.ShaderMaterial & { u_time: number; u_mouse: THREE.Vector2 }
  >(null!);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetX = state.pointer.y * 0.3;
    const targetY = state.pointer.x * 0.3;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.05);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, 0.05);

    if (materialRef.current) {
      materialRef.current.u_time += delta;
      materialRef.current.u_mouse.lerp(state.pointer, 0.05);
    }
  });

  return (
    <group ref={groupRef} scale={0.75}>
      <mesh>
        <icosahedronGeometry args={[1.5, 5]} />
        <crystallineMaterial ref={materialRef} />
      </mesh>

      {[0, 1].map((i) => (
        <Torus
          key={i}
          args={[2.2, 0.025, 32, 100]}
          rotation={[Math.PI / 2, Math.PI / (2 + i), 0]}
        >
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </Torus>
      ))}
    </group>
  );
}

export const InteractiveScene = () => {
  return (
    <div className="w-full h-[300px] sm:h-[380px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-xl">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 5]} intensity={1} />
        <SceneContent />
      </Canvas>
    </div>
  );
};
