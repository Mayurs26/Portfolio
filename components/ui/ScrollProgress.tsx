'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background:
            'linear-gradient(90deg, #22D3EE 0%, #F43F5E 50%, #F59E0B 100%)',
          boxShadow: '0 0 12px rgba(34, 211, 238, 0.8), 0 0 24px rgba(245, 158, 11, 0.6)',
        }}
      />
    </div>
  );
}
