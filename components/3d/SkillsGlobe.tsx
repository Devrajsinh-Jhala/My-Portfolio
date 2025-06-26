"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Plane, useTexture } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { techIcons } from "@/lib/techIcons";
import { useTheme } from "next-themes";
import * as THREE from "three";

const SPHERE_RADIUS = 5.2;

function Icon({
  position,
  texture,
}: {
  position: [number, number, number];
  texture: THREE.Texture;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const [hovered, setHovered] = React.useState(false);
  const { scale } = useSpring({
    scale: hovered ? 1.5 : 1,
    config: { tension: 300, friction: 20 },
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  return (
    <a.mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Plane args={[1.5, 1.5]}>
        <meshBasicMaterial map={texture} transparent />
      </Plane>
    </a.mesh>
  );
}

function GlobeContent() {
  const groupRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  const iconColor = theme === "dark" ? "white" : "black";
  const iconUrls = useMemo(
    () =>
      techIcons.map(
        (t) => `https://cdn.simpleicons.org/${t.slug}/${iconColor}`
      ),
    [theme]
  );

  const textures = useTexture(iconUrls);

  const iconPositions = useMemo(() => {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const count = techIcons.length;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      points.push([x * SPHERE_RADIUS, y * SPHERE_RADIUS, z * SPHERE_RADIUS]);
    }
    return points;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Icons */}
      {techIcons.map((_, i) => (
        <Icon key={i} position={iconPositions[i]} texture={textures[i]} />
      ))}

      {/* Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS, 64, 64]} />
        <meshBasicMaterial
          wireframe
          color={theme === "dark" ? "#444" : "#bbb"}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

export const SkillsGlobe = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      style={{ width: "100%", height: "100%", maxHeight: "500px" }}
    >
      <ambientLight intensity={1.5} />
      <React.Suspense fallback={null}>
        <GlobeContent />
      </React.Suspense>
    </Canvas>
  );
};
