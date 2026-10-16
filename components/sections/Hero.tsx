'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';
import { personal } from '@/data/personal';
import { EASE } from '@/lib/motion';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
});

// ─── Per-letter animated span ───────────────────────────────────
function AnimatedLetter({
  char,
  delay,
  className = '',
}: {
  char: string;
  delay: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (char === ' ') return <span className="inline-block" style={{ width: '0.28em' }} />;
  return (
    <span className={`letter-clip ${className}`}>
      <motion.span
        initial={prefersReducedMotion ? {} : { y: '110%', opacity: 0, rotateX: -30 }}
        animate={{ y: '0%', opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.7, delay, ease: EASE }}
        style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
      >
        {char}
      </motion.span>
    </span>
  );
}

function AnimatedName() {
  const prefersReducedMotion = useReducedMotion();
  const firstName = 'Mayur'.split('');
  const lastName = 'Sonawane.'.split('');

  if (prefersReducedMotion) {
    return (
      <h1
        id="hero-name"
        className="font-[family-name:var(--font-playfair)] font-medium text-[clamp(3.4rem,7.2vw,7.2rem)] leading-[0.92] tracking-[-0.025em]"
      >
        <span className="block text-white">Mayur</span>
        <span className="block bg-gradient-to-r from-[#00F0FF] via-[#818CF8] via-[#EC4899] to-[#F97316] bg-clip-text text-transparent drop-shadow-[0_4px_35px_rgba(0,240,255,0.28)]">
          Sonawane.
        </span>
      </h1>
    );
  }

  return (
    <h1
      id="hero-name"
      className="font-[family-name:var(--font-playfair)] font-medium text-[clamp(3.4rem,7.2vw,7.2rem)] leading-[0.92] tracking-[-0.025em]"
      style={{ perspective: '800px' }}
    >
      {/* First Name: Mayur (Crisp luminous white) */}
      <span className="block text-white" aria-label="Mayur">
        {firstName.map((ch, i) => (
          <AnimatedLetter key={`fn-${i}`} char={ch} delay={0.15 + i * 0.055} />
        ))}
      </span>

      {/* Last Name: Sonawane. (Cyan -> Indigo -> Magenta -> Coral Gradient) */}
      <span
        className="block bg-gradient-to-r from-[#00F0FF] via-[#818CF8] via-[#EC4899] to-[#F97316] bg-clip-text text-transparent drop-shadow-[0_4px_35px_rgba(0,240,255,0.28)]"
        aria-label="Sonawane."
      >
        {lastName.map((ch, i) => (
          <AnimatedLetter key={`ln-${i}`} char={ch} delay={0.45 + i * 0.045} />
        ))}
      </span>
    </h1>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Real-time eye tracking state with realistic boundary clamping
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Normalized coordinates from -1 to 1 for Three.js particles
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mousePos.current = { x: normX, y: -normY };

      // ── Real-Time Character Eye Tracking ──
      // Calculate cursor position in container pixel space
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      // Approximate center of the robot face in screen pixel space (around 83% width, 45% height)
      const robotFaceCenterX = rect.width * 0.83;
      const robotFaceCenterY = rect.height * 0.45;

      const deltaX = cursorX - robotFaceCenterX;
      const deltaY = cursorY - robotFaceCenterY;

      const distance = Math.hypot(deltaX, deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      // Realistic eye boundary in pixels (up to 10px deflection on desktop, 7px on mobile)
      const maxRadius = rect.width > 768 ? 10 : 7;
      // Proportional deflection that smoothly saturates at realistic eye limits
      const intensity = Math.min(distance / 450, 1);
      const offset = intensity * maxRadius;

      const targetX = Math.cos(angle) * offset;
      const targetY = Math.sin(angle) * offset * 0.85;

      setEyeOffset({ x: targetX, y: targetY });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    // Gentle return to center resting position
    setEyeOffset({ x: 0, y: 0 });
    mousePos.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[960px] flex flex-col justify-center items-center overflow-hidden bg-[#06070B] text-[#F8FAFC] select-none"
      aria-labelledby="hero-name"
    >
      {/* ══════════════════════════════════════════════════════════════
          1. STATIONARY CLEAN 3D HERO BACKGROUND SCENE
          - Character's head and body remain completely stationary
          - Left: 3D faceted prism with cyan backlight & grid lines
          - Right: 3D robot developer character with laptop & orbital ring
          - Center: Silky-smooth spotless dark gradient
         ══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div
          className="relative w-full h-full min-w-full min-h-full"
          style={{ aspectRatio: '1855 / 848' }}
        >
          {/* Base Image with Stationary Character Body & Head */}
          <Image
            src="/images/hero_bg_robot_base.png"
            alt="Neon Minimalist Developer Portfolio Scene"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />

          {/* ══════════════════════════════════════════════════════════════
              2. REAL-TIME MOUSE-TRACKING EYE PUPILS (STATIONARY HEAD/BODY)
              - Realistic eye socket boundaries
              - Smooth spring easing & gentle return to center
              - Left Eye: 79.46% X, 45.75% Y
              - Right Eye: 86.52% X, 44.34% Y
             ══════════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 pointer-events-none z-[5]" aria-hidden="true">
            {/* ── LEFT EYE SOCKET & DYNAMIC RING ── */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
              style={{ left: '79.46%', top: '45.75%' }}
            >
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 rounded-full bg-[#00F0FF]/25 blur-[10px] pointer-events-none" />

              {/* Dynamic Eye Ring with Real-Time Pupil Movement */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        x: eyeOffset.x,
                        y: eyeOffset.y,
                      }
                }
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 22,
                  mass: 0.6,
                }}
                className="relative w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[50px] lg:h-[50px] rounded-full border-[6.5px] sm:border-[7.5px] lg:border-[8px] border-white bg-[#080B0F] shadow-[0_0_12px_rgba(255,255,255,0.95),0_0_24px_rgba(0,240,255,0.7),inset_0_0_6px_rgba(0,240,255,0.35)] flex items-center justify-center"
              >
                {/* Subtle Inner Pupil Sheen */}
                <div className="w-2 h-2 rounded-full bg-white/30 blur-[1px]" />
              </motion.div>
            </div>

            {/* ── RIGHT EYE SOCKET & DYNAMIC RING ── */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
              style={{ left: '86.52%', top: '44.34%' }}
            >
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 rounded-full bg-[#00F0FF]/25 blur-[10px] pointer-events-none" />

              {/* Dynamic Eye Ring with Real-Time Pupil Movement */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        x: eyeOffset.x,
                        y: eyeOffset.y,
                      }
                }
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 22,
                  mass: 0.6,
                }}
                className="relative w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[50px] lg:h-[50px] rounded-full border-[6.5px] sm:border-[7.5px] lg:border-[8px] border-white bg-[#080B0F] shadow-[0_0_12px_rgba(255,255,255,0.95),0_0_24px_rgba(0,240,255,0.7),inset_0_0_6px_rgba(0,240,255,0.35)] flex items-center justify-center"
              >
                {/* Subtle Inner Pupil Sheen */}
                <div className="w-2 h-2 rounded-full bg-white/30 blur-[1px]" />
              </motion.div>
            </div>

            {/* Laptop Logo Ambient Glow Overlay */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F97316]/45 blur-lg animate-pulse pointer-events-none"
              style={{ left: '80.7%', top: '75.9%', animationDuration: '2.5s' }}
            />
          </div>
        </div>
      </div>

      {/* ── 3. Subtle 3D WebGL Floating Cyber Particles ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <HeroScene mousePos={mousePos} scrollY={scrollY} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          4. EXACT CENTERED EDITORIAL TYPOGRAPHY & INTERACTIVE CONTROLS
          Matches the exact layout, position, font sizes, colors, and
          buttons from "Neon Minimalist Developer Portfolio.png":
          - Pill: Avatar + Dot + FLUTTER DEVELOPER · PUNE, INDIA
          - Display Name: Mayur (White) Sonawane. (Cyan -> Coral Gradient)
          - Accent: Centered horizontal rule with glowing cyan dot
          - Tagline: Building mobile experiences that feel native and intuitive.
          - Buttons: [→ View Projects]  [✉ Get in Touch]
         ══════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-20 sm:pt-24 lg:pt-16 pb-12 sm:pb-16 lg:pb-8 my-auto"
      >
        {/* 4a. Eyebrow Capsule */}
        <div className="mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-[#0D131C]/90 border border-white/10 backdrop-blur-md shadow-lg shadow-black/50">
            {/* Small circular avatar thumbnail */}
            <div className="relative w-5 h-5 rounded-full overflow-hidden border border-white/20 shrink-0">
              <Image
                src="/images/profile-portrait.png"
                alt="Mayur Sonawane"
                fill
                className="object-cover"
                sizes="20px"
              />
            </div>
            {/* Glowing cyan dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[10.5px] sm:text-[11px] tracking-[0.22em] uppercase text-white/90 font-semibold">
              FLUTTER DEVELOPER · PUNE, INDIA
            </span>
          </div>
        </div>

        {/* 4b. Display Name: Mayur Sonawane. */}
        <div className="mb-2 sm:mb-3">
          <AnimatedName />
        </div>

        {/* 4c. Center Accent: Horizontal Rule with Centered Glowing Cyan Dot */}
        <div className="flex items-center justify-center gap-3 my-2.5 sm:my-3" aria-hidden="true">
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-white/10" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-white/10 via-white/20 to-transparent" />
        </div>

        {/* 4d. Tagline: Building mobile experiences that feel native and intuitive. */}
        <p className="font-[family-name:var(--font-inter)] text-sm sm:text-base lg:text-[1.12rem] text-white/80 leading-relaxed max-w-xl mb-6 sm:mb-7">
          Building mobile experiences that feel{' '}
          <span className="text-[#00F0FF] font-semibold drop-shadow-[0_0_12px_rgba(0,240,255,0.45)]">
            native
          </span>{' '}
          and{' '}
          <span className="text-[#F43F5E] font-semibold drop-shadow-[0_0_12px_rgba(244,63,94,0.45)]">
            intuitive.
          </span>
        </p>

        {/* 4e. Action Buttons (Exact Mockup Match) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          {/* Primary: → View Projects (Cyan-to-Orange Gradient Border) */}
          <a
            href="#featured"
            className="group relative inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-[#00F0FF] via-[#06B6D4] to-[#F97316] shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#080B10] flex items-center gap-2.5 text-white font-[family-name:var(--font-syne)] font-bold text-xs sm:text-[13px] group-hover:bg-[#0D1219] transition-colors">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              <span>View Projects</span>
            </span>
          </a>

          {/* Secondary: ✉ Get in Touch (Frosted Dark Pill) */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#0D131C]/80 border border-white/15 text-white/90 hover:text-white hover:border-white/30 hover:bg-[#141C26] active:scale-95 transition-all duration-300 font-[family-name:var(--font-syne)] font-semibold text-xs sm:text-[13px] backdrop-blur-md"
          >
            <Mail size={14} aria-hidden="true" />
            <span>Get in Touch</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
