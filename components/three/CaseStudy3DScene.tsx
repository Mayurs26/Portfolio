'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'motion/react';
import * as THREE from 'three';

// ─── Swirling Particles ──────────────────────────────────────────
function CaseParticles({ color1, color2 }: { color1: string; color2: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 90;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const chosen = Math.random() > 0.4 ? c1 : c2;
      col[i * 3 + 0] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, [count, color1, color2]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ─── AI Expense Scanner 3D Model ─────────────────────────────────
function Scanner3D({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const cardRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;
    groupRef.current.rotation.y = t * 0.15 + mouse.x * 0.35;
    groupRef.current.rotation.x = mouse.y * 0.2;

    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.015;
    }
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.02;
    }
    if (cardRef.current) {
      cardRef.current.rotation.z = Math.sin(t * 0.6) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* ── Holographic Floating Card ── */}
      <mesh ref={cardRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 1.1, 0.06]} />
        <meshStandardMaterial
          color="#0F172A"
          roughness={0.2}
          metalness={0.85}
          emissive="#22D3EE"
          emissiveIntensity={0.4}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Card Chip Accent */}
      <mesh position={[-0.45, 0.15, 0.04]}>
        <boxGeometry args={[0.3, 0.22, 0.02]} />
        <meshStandardMaterial
          color="#F59E0B"
          metalness={0.95}
          roughness={0.1}
          emissive="#F59E0B"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Floating Optical Scanner Prism (Center) */}
      <mesh ref={crystalRef} position={[0, 0, 0.4]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#F8FAFC"
          roughness={0.1}
          metalness={0.9}
          emissive="#22D3EE"
          emissiveIntensity={1.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Laser / Scanner Ring */}
      <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.4, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#F43F5E"
          emissive="#F43F5E"
          emissiveIntensity={1.5}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

// ─── Smart Water Reminder 3D Model ───────────────────────────────
function WaterDrop3D({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const dropRef = useRef<THREE.Mesh>(null);
  const ripple1 = useRef<THREE.Mesh>(null);
  const ripple2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.14;
    groupRef.current.rotation.y = t * 0.12 + mouse.x * 0.4;
    groupRef.current.rotation.x = mouse.y * 0.25;

    if (dropRef.current) {
      dropRef.current.rotation.y += 0.012;
      dropRef.current.rotation.z = Math.sin(t * 0.7) * 0.08;
    }

    if (ripple1.current) {
      ripple1.current.rotation.z += 0.008;
      const s1 = 1 + Math.sin(t * 1.4) * 0.15;
      ripple1.current.scale.set(s1, s1, 1);
    }
    if (ripple2.current) {
      ripple2.current.rotation.z -= 0.01;
      const s2 = 1 + Math.cos(t * 1.4) * 0.15;
      ripple2.current.scale.set(s2, s2, 1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* ── Crystalline Faceted Water Drop ── */}
      <mesh ref={dropRef} position={[0, 0.1, 0]}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color="#22D3EE"
          roughness={0.15}
          metalness={0.75}
          emissive="#06B6D4"
          emissiveIntensity={0.65}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Internal Luminous Core */}
      <mesh position={[0, 0.1, 0]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#F8FAFC"
          emissive="#F59E0B"
          emissiveIntensity={1.6}
        />
      </mesh>

      {/* Ripple Ring 1 (Electric Cyan) */}
      <mesh ref={ripple1} position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.02, 12, 64]} />
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#22D3EE"
          emissiveIntensity={1.2}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Ripple Ring 2 (Sunset Amber) */}
      <mesh ref={ripple2} position={[0, -0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.65, 0.015, 12, 64]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.9}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// ─── Main Scene Component ────────────────────────────────────────
export default function CaseStudy3DScene({
  type,
}: {
  type: 'scanner' | 'water';
}) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !mounted) return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, mounted, prefersReducedMotion]);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <div className="w-full h-full min-h-[340px] relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[3, 3, 3]} color="#22D3EE" intensity={2.2} />
        <pointLight position={[-3, -2, 2]} color="#F59E0B" intensity={2.0} />
        <pointLight position={[0, 3, -1]} color="#F43F5E" intensity={1.5} />

        <CaseParticles
          color1="#22D3EE"
          color2={type === 'scanner' ? '#F59E0B' : '#38BDF8'}
        />

        {type === 'scanner' ? (
          <Scanner3D mouse={mouse} />
        ) : (
          <WaterDrop3D mouse={mouse} />
        )}
      </Canvas>
    </div>
  );
}
