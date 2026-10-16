'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from 'motion/react';
import * as THREE from 'three';

// ─── Floating Star / Cyber Particle Cloud ───────────────────────
function FloatingParticles({
  mousePos,
}: {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 180;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#00F0FF'); // Electric Cyan
    const c2 = new THREE.Color('#F97316'); // Sunset Amber
    const c3 = new THREE.Color('#F43F5E'); // Twilight Coral
    const c4 = new THREE.Color('#F8FAFC'); // Crisp White

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1;

      const choice = Math.random();
      const chosenColor = choice < 0.45 ? c1 : choice < 0.75 ? c2 : choice < 0.9 ? c3 : c4;
      col[i * 3 + 0] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02 + mousePos.current.x * 0.05;
    pointsRef.current.rotation.x = Math.sin(t * 0.015) * 0.03 + mousePos.current.y * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Scroll Camera ───────────────────────────────────────────────
function ScrollCamera({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const target = 6 - scrollY.current * 0.002;
    camera.position.z += (Math.max(4.5, target) - camera.position.z) * 0.05;
  });
  return null;
}

// ─── Scene ──────────────────────────────────────────────────────
function Scene({
  mousePos,
  scrollY,
}: {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  scrollY: React.MutableRefObject<number>;
}) {
  return (
    <>
      {/* ── Lighting System tuned to Neon Minimalist palette ── */}
      <ambientLight intensity={0.4} />
      {/* Sunset Amber/Coral on the right */}
      <pointLight position={[5, 3, 2]} color="#F97316" intensity={2.4} />
      {/* Vibrant Electric Cyan on the left */}
      <pointLight position={[-5, 2, 2]} color="#00F0FF" intensity={2.6} />
      {/* Subtle Violet Center Fill */}
      <pointLight position={[0, -2, 1]} color="#818CF8" intensity={1.2} />

      {/* Floating 3D Cyber Particles */}
      <FloatingParticles mousePos={mousePos} />

      <ScrollCamera scrollY={scrollY} />
    </>
  );
}

// ─── Export ──────────────────────────────────────────────────────
export default function HeroScene({
  mousePos,
  scrollY,
}: {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  scrollY: React.MutableRefObject<number>;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene mousePos={mousePos} scrollY={scrollY} />
    </Canvas>
  );
}
