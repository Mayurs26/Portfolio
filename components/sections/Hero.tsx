'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';
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
        className="font-[family-name:var(--font-playfair)] font-medium text-[clamp(2.8rem,6.5vw,7.2rem)] leading-[0.92] tracking-[-0.025em]"
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
      className="font-[family-name:var(--font-playfair)] font-medium text-[clamp(2.8rem,6.5vw,7.2rem)] leading-[0.92] tracking-[-0.025em]"
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

// ─── Single Responsive 3D Character Unit ─────────────────────────────
// Contains:
// 1. Base Robot Character (Stationary Head, Torso, Laptop, Ring)
// 2. Real-time Mouse/Touch Tracking Eyes (scaled proportionally in %)
// 3. Laptop Logo Glow Overlay (scaled proportionally in %)
// All elements share the exact same aspect-ratio box and NEVER detach.
function CharacterUnit({
  eyeOffset,
  prefersReducedMotion,
}: {
  eyeOffset: { x: number; y: number };
  prefersReducedMotion: boolean | null;
}) {
  return (
    <div className="relative w-full h-full aspect-[655/848] select-none pointer-events-none">
      {/* Base Robot Character Body & Head */}
      <Image
        src="/images/robot_character_unit.png"
        alt="3D Developer Robot Character"
        fill
        priority
        quality={100}
        sizes="(max-width: 640px) 180px, (max-width: 1024px) 380px, 560px"
        className="object-contain pointer-events-none select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
      />

      {/* ── LEFT EYE SOCKET & DYNAMIC REAL-TIME PUPIL ── */}
      {/* Center is at 41.83% X, 45.75% Y */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{ left: '41.83%', top: '45.75%', width: '7.8%', height: '7.8%' }}
      >
        {/* Outer Glow Halo */}
        <div className="absolute -inset-2 rounded-full bg-[#00F0FF]/25 blur-[6px] pointer-events-none" />

        {/* Dynamic Eye Ring */}
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
          className="relative w-full h-full rounded-full border-[2.5px] sm:border-[3.5px] lg:border-[4.5px] border-white bg-[#080B0F] shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_20px_rgba(0,240,255,0.7),inset_0_0_5px_rgba(0,240,255,0.35)] flex items-center justify-center"
        >
          {/* Subtle Inner Pupil Sheen */}
          <div className="w-[30%] h-[30%] rounded-full bg-white/40 blur-[0.5px]" />
        </motion.div>
      </div>

      {/* ── RIGHT EYE SOCKET & DYNAMIC REAL-TIME PUPIL ── */}
      {/* Center is at 61.83% X, 44.34% Y */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{ left: '61.83%', top: '44.34%', width: '7.8%', height: '7.8%' }}
      >
        {/* Outer Glow Halo */}
        <div className="absolute -inset-2 rounded-full bg-[#00F0FF]/25 blur-[6px] pointer-events-none" />

        {/* Dynamic Eye Ring */}
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
          className="relative w-full h-full rounded-full border-[2.5px] sm:border-[3.5px] lg:border-[4.5px] border-white bg-[#080B0F] shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_20px_rgba(0,240,255,0.7),inset_0_0_5px_rgba(0,240,255,0.35)] flex items-center justify-center"
        >
          {/* Subtle Inner Pupil Sheen */}
          <div className="w-[30%] h-[30%] rounded-full bg-white/40 blur-[0.5px]" />
        </motion.div>
      </div>

      {/* ── Laptop Logo Ambient Glow Overlay ── */}
      {/* Center is at 45.34% X, 75.94% Y */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[7%] h-[7%] rounded-full bg-[#F97316]/50 blur-md animate-pulse pointer-events-none"
        style={{ left: '45.34%', top: '75.94%', animationDuration: '2.5s' }}
      />
    </div>
  );
}

// ─── Hero Main Section Component ─────────────────────────────────────
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  // Real-time eye tracking state
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Dynamically calculate eye deflection relative to character face center
  const updateEyePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (prefersReducedMotion || !characterRef.current) return;
      const charRect = characterRef.current.getBoundingClientRect();

      // Robot face center in viewport coordinates (52% X, 45% Y of character box)
      const faceCenterX = charRect.left + charRect.width * 0.52;
      const faceCenterY = charRect.top + charRect.height * 0.45;

      const deltaX = clientX - faceCenterX;
      const deltaY = clientY - faceCenterY;
      const distance = Math.hypot(deltaX, deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      // Max eye deflection scales strictly with character container size (~2.4% of width)
      const maxRadius = Math.max(charRect.width * 0.024, 3.5);
      const reach = charRect.width > 300 ? 450 : 250;
      const intensity = Math.min(distance / reach, 1);
      const offset = intensity * maxRadius;

      setEyeOffset({
        x: Math.cos(angle) * offset,
        y: Math.sin(angle) * offset * 0.85,
      });
    },
    [prefersReducedMotion]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Normalized coordinates from -1 to 1 for Three.js cyber particles
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mousePos.current = { x: normX, y: -normY };

      updateEyePosition(e.clientX, e.clientY);
    },
    [updateEyePosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0) {
        updateEyePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [updateEyePosition]
  );

  const handleLeave = useCallback(() => {
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
      onMouseLeave={handleLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[860px] flex flex-col justify-center items-center overflow-hidden bg-[#06080E] text-[#F8FAFC] select-none"
      aria-labelledby="hero-name"
    >
      {/* ── 1. Ambient Background Radial Glows ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 10% 50%, rgba(0, 240, 255, 0.08) 0%, transparent 45%), radial-gradient(circle at 90% 50%, rgba(249, 115, 22, 0.09) 0%, transparent 45%)',
        }}
      />

      {/* ── 2. Subtle 3D WebGL Floating Cyber Particles ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <HeroScene mousePos={mousePos} scrollY={scrollY} />
      </div>

      {/* ── 3. Seamless Bottom Fade into Featured Projects ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#06080E]/80 to-[#06080E] pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════════════
          4. MAIN RESPONSIVE HERO CONTENT & 3D CHARACTER UNIT
          - Left Prism: Anchored on the left on desktop (hidden on mobile)
          - Center: Crisp editorial typography & action buttons
          - Character Unit: A single responsive unit that sits between eyebrow
            and name on mobile/tablet, and floats to the right side on desktop!
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center my-auto pt-16 sm:pt-20 lg:pt-0">
        
        {/* ── 4a. Left 3D Prism (Desktop Widescreen Only) ── */}
        <div className="hidden lg:block absolute left-[-2%] xl:left-[1%] 2xl:left-[4%] top-1/2 -translate-y-1/2 w-[280px] xl:w-[340px] 2xl:w-[400px] aspect-[480/848] pointer-events-none z-0 select-none opacity-85">
          <Image
            src="/images/hero_prism_unit.png"
            alt=""
            fill
            priority
            sizes="400px"
            className="object-contain object-left pointer-events-none select-none"
          />
        </div>

        {/* ── 4b. Main Centered Editorial Typography ── */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative z-10 w-full max-w-2xl lg:max-w-3xl flex flex-col items-center text-center py-4"
        >
          {/* Eyebrow Capsule */}
          <div className="mb-2 sm:mb-3">
            <div className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-[#0D131C]/90 border border-white/10 backdrop-blur-md shadow-lg shadow-black/50">
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-white/20 shrink-0">
                <Image
                  src="/images/profile-portrait.png"
                  alt="Mayur Sonawane"
                  fill
                  className="object-cover"
                  sizes="20px"
                />
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/90 font-semibold">
                FLUTTER DEVELOPER · PUNE, INDIA
              </span>
            </div>
          </div>

          {/* ── 4c. Single Responsive 3D Character Unit ──
              - Mobile (< lg): centered cleanly in hero flow between eyebrow and name
              - Desktop (lg+): positioned on the right side as in original design
              - Eyes and elements are 100% relative children: NEVER detach! */}
          <div
            ref={characterRef}
            className="relative z-10 aspect-[655/848] select-none pointer-events-none transition-all duration-300
              w-[145px] sm:w-[175px] md:w-[205px] my-2 sm:my-3
              lg:my-0 lg:absolute lg:right-[-4%] xl:right-[0%] 2xl:right-[5%] lg:top-1/2 lg:-translate-y-1/2 lg:w-[450px] xl:w-[500px] 2xl:w-[560px]"
          >
            <CharacterUnit
              eyeOffset={eyeOffset}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>

          {/* Display Name: Mayur Sonawane. */}
          <div className="mb-2 sm:mb-3">
            <AnimatedName />
          </div>

          {/* Center Accent Rule with Glowing Cyan Dot */}
          <div className="flex items-center justify-center gap-3 my-2.5 sm:my-3" aria-hidden="true">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-white/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-white/10 via-white/20 to-transparent" />
          </div>

          {/* Tagline */}
          <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm lg:text-[1.12rem] text-white/80 leading-relaxed max-w-xl mb-5 sm:mb-7 px-2">
            Building mobile experiences that feel{' '}
            <span className="text-[#00F0FF] font-semibold drop-shadow-[0_0_12px_rgba(0,240,255,0.45)]">
              native
            </span>{' '}
            and{' '}
            <span className="text-[#F43F5E] font-semibold drop-shadow-[0_0_12px_rgba(244,63,94,0.45)]">
              intuitive.
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Primary: View Projects */}
            <a
              href="#featured"
              className="group relative inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-[#00F0FF] via-[#06B6D4] to-[#F97316] shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#080B10] flex items-center gap-2.5 text-white font-[family-name:var(--font-syne)] font-bold text-xs sm:text-[13px] group-hover:bg-[#0D1219] transition-colors">
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                <span>View Projects</span>
              </span>
            </a>

            {/* Secondary: Get in Touch */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#0D131C]/80 border border-white/15 text-white/90 hover:text-white hover:border-white/30 hover:bg-[#141C26] active:scale-95 transition-all duration-300 font-[family-name:var(--font-syne)] font-semibold text-xs sm:text-[13px] backdrop-blur-md"
            >
              <Mail size={14} aria-hidden="true" />
              <span>Get in Touch</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
