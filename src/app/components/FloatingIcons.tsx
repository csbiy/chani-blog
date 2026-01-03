"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// 터미널 아이콘
function Terminal({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + 1) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={meshRef} position={position}>
        <RoundedBox args={[1.4, 1, 0.12]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.3} emissive="#334155" emissiveIntensity={0.15} />
        </RoundedBox>
        {/* 타이틀 바 */}
        <mesh position={[0, 0.38, 0.07]}>
          <boxGeometry args={[1.3, 0.15, 0.02]} />
          <meshStandardMaterial color="#64748b" emissive="#475569" emissiveIntensity={0.1} />
        </mesh>
        {/* 창 버튼들 */}
        {[-0.5, -0.38, -0.26].map((x, i) => (
          <mesh key={i} position={[x, 0.38, 0.08]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial
              color={["#ef4444", "#fbbf24", "#22c55e"][i]}
              emissive={["#ef4444", "#fbbf24", "#22c55e"][i]}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
        {/* 커서 */}
        <mesh position={[-0.45, 0.1, 0.07]}>
          <boxGeometry args={[0.08, 0.15, 0.02]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
        </mesh>
        {/* 명령어 텍스트 */}
        <mesh position={[-0.1, 0.1, 0.07]}>
          <boxGeometry args={[0.5, 0.06, 0.02]} />
          <meshStandardMaterial color="#cbd5e1" emissive="#94a3b8" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[-0.2, -0.1, 0.07]}>
          <boxGeometry args={[0.7, 0.06, 0.02]} />
          <meshStandardMaterial color="#94a3b8" emissive="#64748b" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// 기어 아이콘
function Gear({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  const gearShape = useMemo(() => {
    const shape = new THREE.Shape();
    const teeth = 8;
    const outerRadius = 0.5;
    const innerRadius = 0.35;

    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.3) / teeth) * Math.PI * 2;
      const angle3 = ((i + 0.5) / teeth) * Math.PI * 2;
      const angle4 = ((i + 0.8) / teeth) * Math.PI * 2;

      if (i === 0) {
        shape.moveTo(Math.cos(angle1) * innerRadius, Math.sin(angle1) * innerRadius);
      }
      shape.lineTo(Math.cos(angle1) * innerRadius, Math.sin(angle1) * innerRadius);
      shape.lineTo(Math.cos(angle2) * outerRadius, Math.sin(angle2) * outerRadius);
      shape.lineTo(Math.cos(angle3) * outerRadius, Math.sin(angle3) * outerRadius);
      shape.lineTo(Math.cos(angle4) * innerRadius, Math.sin(angle4) * innerRadius);
    }
    shape.closePath();

    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.15, 0, Math.PI * 2, false);
    shape.holes.push(hole);

    return shape;
  }, []);

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <extrudeGeometry args={[gearShape, { depth: 0.1, bevelEnabled: false }]} />
        <meshStandardMaterial color="#a78bfa" metalness={0.6} roughness={0.2} emissive="#8b5cf6" emissiveIntensity={0.4} />
      </mesh>
    </Float>
  );
}
export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 3, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[5, 5, 3]} intensity={0.4} color="#22d3ee" />

        {/* 왼쪽 영역 */}
        <Gear position={[-4.2, -1, 0]} />

        {/* 오른쪽 영역 */}
        <Terminal position={[4, 2, 0]} />
      </Canvas>
    </div>
  );
}
