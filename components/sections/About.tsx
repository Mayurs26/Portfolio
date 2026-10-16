'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  GraduationCap,
  MapPin,
  Code2,
  Briefcase,
  ArrowRight,
  Download,
  Award,
  Layers,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { personal } from '@/data/personal';
import { EASE } from '@/lib/motion';
import TiltCard from '@/components/ui/TiltCard';

// ─── Fact Cards Data (Styled with the Showcase Accent Palette) ──────
const facts = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'Master of Computer Applications (MCA)',
    sub: 'Post-graduate degree in Computer Science',
    iconColor: 'text-[#00F0FF]',
    iconBg: 'bg-[#0B151C]',
    iconBorder: 'border-[#00F0FF]/50',
    iconGlow: 'shadow-[0_0_18px_rgba(0,240,255,0.28)]',
  },
  {
    icon: Briefcase,
    label: 'Experience',
    value: 'Flutter Developer Intern',
    sub: 'Inorbvict Healthcare · Mobile App Engineering',
    iconColor: 'text-[#FB923C]',
    iconBg: 'bg-[#1A120E]',
    iconBorder: 'border-[#F97316]/50',
    iconGlow: 'shadow-[0_0_18px_rgba(249,115,22,0.28)]',
  },
  {
    icon: Code2,
    label: 'Primary Focus',
    value: 'Flutter & Dart Mobile Architecture',
    sub: 'Clean Architecture, Riverpod, Drift SQLite',
    iconColor: 'text-[#22D3EE]',
    iconBg: 'bg-[#0B151C]',
    iconBorder: 'border-[#06B6D4]/50',
    iconGlow: 'shadow-[0_0_18px_rgba(6,182,212,0.28)]',
  },
  {
    icon: MapPin,
    label: 'Location & Availability',
    value: 'Pune, Maharashtra, India',
    sub: 'Open to Full-Time Remote & Relocation',
    iconColor: 'text-[#C084FC]',
    iconBg: 'bg-[#181124]',
    iconBorder: 'border-[#A855F7]/50',
    iconGlow: 'shadow-[0_0_18px_rgba(168,85,247,0.28)]',
  },
];

// ─── Highlights Row (Matching PhoneShowcase Bottom Metrics) ────────
const highlights = [
  { icon: Smartphone, value: '6+', label: 'Mobile Apps Built' },
  { icon: Layers, value: 'Clean Arch', label: 'Modular Architecture' },
  { icon: Award, value: 'MCA', label: 'Post-Grad Degree' },
  { icon: Sparkles, value: '100%', label: 'Offline-First Focus' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();

  // Mouse tilt tracking for background shapes & lighting
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 });
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#06080E] text-[#F8FAFC] overflow-hidden select-none"
      aria-labelledby="about-heading"
    >
      {/* ══════════════════════════════════════════════════════════════
          ATMOSPHERIC LIGHTING & FLOATING 3D SHAPES (EXACT SHOWCASE THEME)
         ══════════════════════════════════════════════════════════════ */}

      {/* ── Seamless Boundary Blends (Top & Bottom) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#06080E] via-[#06080E]/75 to-transparent pointer-events-none z-[5]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#06080E] via-[#06080E]/75 to-transparent pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* ── Ambient Radial Glows ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 18% 30%, rgba(0, 240, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 82% 70%, rgba(249, 115, 22, 0.07) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* ── Floating 3D Geometric Accents ── */}
      {/* 1. Floating Cyan 3D Hexagon on Top-Right */}
      <div
        className="absolute top-8 right-[8%] sm:right-[12%] pointer-events-none z-0 transition-transform duration-300"
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `translate(${mouse.x * 16}px, ${mouse.y * -14}px)`,
        }}
        aria-hidden="true"
      >
        <svg
          className="w-20 sm:w-28 lg:w-36 h-20 sm:h-28 lg:h-36 opacity-30 blur-[0.5px]"
          viewBox="0 0 120 120"
          fill="none"
        >
          <defs>
            <linearGradient id="aboutHexTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="aboutHexLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="aboutHexRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <polygon points="60,10 105,35 60,60 15,35" fill="url(#aboutHexTop)" />
          <polygon points="15,35 60,60 60,110 15,85" fill="url(#aboutHexLeft)" />
          <polygon points="105,35 60,60 60,110 105,85" fill="url(#aboutHexRight)" />
        </svg>
      </div>

      {/* 2. Floating Burgundy 3D Torus Ring in Bottom-Left */}
      <div
        className="absolute bottom-10 left-[4%] sm:left-[6%] pointer-events-none z-0 transition-transform duration-300"
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `translate(${mouse.x * -14}px, ${mouse.y * 12}px)`,
        }}
        aria-hidden="true"
      >
        <div className="w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 rounded-full border-[14px] sm:border-[18px] border-[#6B1728]/30 shadow-[0_0_35px_rgba(107,23,40,0.25)] opacity-35 blur-[0.5px]" />
      </div>

      {/* 3. Floating Micro Confetti Cubes (Magenta, Amber, Cyan) */}
      <div
        className="absolute top-16 left-[10%] w-2.5 h-2.5 bg-[#EC4899] rotate-12 shadow-[0_0_10px_#EC4899] opacity-70 pointer-events-none z-0"
        style={{
          transform: prefersReducedMotion ? undefined : `translate(${mouse.x * -10}px, ${mouse.y * -8}px)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-[6%] w-2 h-2 bg-[#F59E0B] rotate-45 shadow-[0_0_8px_#F59E0B] opacity-75 pointer-events-none z-0"
        style={{
          transform: prefersReducedMotion ? undefined : `translate(${mouse.x * 12}px, ${mouse.y * -10}px)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-[20%] w-2.5 h-2.5 bg-[#00F0FF] -rotate-12 shadow-[0_0_10px_#00F0FF] opacity-75 pointer-events-none z-0"
        style={{
          transform: prefersReducedMotion ? undefined : `translate(${mouse.x * -8}px, ${mouse.y * 8}px)`,
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER (RESPONSIVE VIEWPORT-FIT ON DESKTOP)
          - Desktop (lg+): Exactly fits within viewport (calc(100svh - 72px))
            with no clipping and flex-col justify-between.
          - Mobile (<lg): Natural fluid vertical scrolling.
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-4 xl:py-6 lg:h-[calc(100svh-72px)] lg:min-h-[600px] lg:max-h-[960px] flex flex-col justify-between z-10">
        
        {/* ── TOP SECTION HEADER / PILL BADGE ── */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[10.5px] sm:text-xs font-bold tracking-[0.22em] uppercase text-white/90">
              ABOUT THE DEVELOPER
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D151E]/90 border border-white/10 text-[10px] sm:text-[10.5px] font-[family-name:var(--font-jetbrains)] text-white/80 tracking-wider backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <span>AVAILABLE FOR FULL-TIME ROLES</span>
          </div>
        </div>

        {/* ── 2-COLUMN MAIN CONTENT (PORTRAIT + EDITORIAL NARRATIVE) ── */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center py-3 sm:py-4 lg:py-2">
          
          {/* ────────────────────────────────────────────────────────────
              LEFT COLUMN: CINEMATIC 3D PORTRAIT SHOWCASE
              - Responsively sized to prevent vertical viewport clipping
              - Beveled glass frame matching PhoneShowcase mockups
             ──────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95, y: 16 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE }}
              className="relative w-full max-w-[270px] sm:max-w-[300px] lg:max-w-[290px] xl:max-w-[340px] 2xl:max-w-[370px]"
            >
              {/* Outer Cyan Halo Glow */}
              <div
                className="absolute -inset-3 rounded-[38px] blur-xl opacity-25 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(0,240,255,0.3) 0%, rgba(249,115,22,0.15) 50%, transparent 75%)',
                }}
                aria-hidden="true"
              />

              {/* 3D Perspective Tilt Card */}
              <TiltCard intensity={5} className="h-full">
                <div className="group relative rounded-[28px] sm:rounded-[34px] p-2 sm:p-2.5 bg-gradient-to-b from-[#222E3B] via-[#141C26] to-[#0A0F15] border-[2px] border-[#38BDF8]/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.15)] transition-all duration-500 hover:border-[#00F0FF]/60 overflow-hidden">
                  
                  {/* Subtle Glass Sheen Diagonal Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none z-30"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 25%, transparent 60%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Corner Accent Ticks */}
                  <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00F0FF]/50 rounded-tl pointer-events-none z-20" />
                  <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00F0FF]/50 rounded-tr pointer-events-none z-20" />
                  <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00F0FF]/50 rounded-bl pointer-events-none z-20" />
                  <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00F0FF]/50 rounded-br pointer-events-none z-20" />

                  {/* Portrait Media Container: 1:1 Aspect Ratio */}
                  <div className="relative aspect-square w-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#07090E]">
                    <Image
                      src="/images/profile-portrait.png"
                      alt="Mayur Sonawane — Flutter Developer"
                      fill
                      priority
                      sizes="(max-width: 640px) 270px, (max-width: 1024px) 300px, 340px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Cinematic Vignette */}
                    <div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(6,8,14,0.85) 0%, rgba(6,8,14,0.15) 35%, transparent 65%)',
                      }}
                    />

                    {/* Top-Right Location Tag */}
                    <div className="absolute top-2.5 right-2.5 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0C121A]/85 border border-white/15 backdrop-blur-md shadow-lg shadow-black/60">
                      <MapPin size={11} className="text-[#00F0FF]" />
                      <span className="font-[family-name:var(--font-jetbrains)] text-[9.5px] tracking-wider uppercase text-white/90 font-semibold">
                        Pune, IN
                      </span>
                    </div>

                    {/* Bottom Floating Identity Card (Glass Card) */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-2.5 sm:left-2.5 sm:right-2.5 z-20 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#0C121A]/90 border border-white/15 backdrop-blur-md shadow-2xl">
                      <div className="flex items-center justify-between gap-1.5 mb-0.5">
                        <span className="font-[family-name:var(--font-syne)] font-bold text-xs sm:text-sm text-white">
                          Mayur Sonawane
                        </span>
                        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
                          <span className="font-[family-name:var(--font-jetbrains)] text-[8.5px] uppercase tracking-wider text-[#00F0FF] font-bold">
                            Available
                          </span>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font-jetbrains)] text-[9.5px] sm:text-[10px] text-white/70 tracking-wide">
                        Flutter Developer · Mobile Engineer
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* ────────────────────────────────────────────────────────────
              RIGHT COLUMN: EDITORIAL NARRATIVE, INFO CARDS & CTAS
              - Spacing tightened to guarantee full desktop visibility
              - Scaled typography for balanced viewport proportion
             ──────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Category Pill: • FLUTTER SPECIALIST */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: EASE }}
              className="mb-1.5 sm:mb-2"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0D151E]/90 border border-white/10 text-[10px] font-[family-name:var(--font-jetbrains)] font-bold text-white/90 tracking-[0.16em] uppercase backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                <span>FLUTTER SPECIALIST</span>
              </span>
            </motion.div>

            {/* Editorial Heading with Multi-Color Gradient */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              className="relative inline-block mb-1 sm:mb-1.5"
            >
              <h2
                id="about-heading"
                className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.98] tracking-tight text-white"
              >
                <span>The developer</span>
                <br />
                <span className="font-black bg-gradient-to-r from-[#00F0FF] via-[#818CF8] to-[#F97316] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(0,240,255,0.3)] inline-block">
                  behind the code.
                </span>
              </h2>

              {/* Signature Scribble / Flourish Underline */}
              <div className="mt-1 sm:mt-1.5 mb-2 sm:mb-2.5">
                <svg
                  className="w-16 sm:w-18 h-3 text-[#00F0FF]/80"
                  viewBox="0 0 80 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 10C15 4 28 14 44 6C56 0 68 12 78 5" />
                </svg>
              </div>
            </motion.div>

            {/* Narrative Bio */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              className="space-y-1.5 font-[family-name:var(--font-inter)] text-white/70 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed max-w-xl mb-3 sm:mb-3.5"
            >
              <p>
                I&apos;m a Flutter Developer with a Master&apos;s in Computer Applications (MCA),
                focused on building{' '}
                <span className="text-white font-medium border-b border-[#00F0FF]/50 pb-0.5">
                  native mobile experiences
                </span>{' '}
                that feel fluid, intuitive, and architecturally resilient.
              </p>
              <p>
                My work spans on-device AI receipt scanners, gamified hydration trackers, and hotel booking
                platforms — engineered with{' '}
                <span className="text-white font-medium border-b border-[#F97316]/50 pb-0.5">
                  Clean Architecture
                </span>
                , Drift SQLite, Riverpod, and polished Material 3 interactions.
              </p>
            </motion.div>

            {/* 2x2 Fact Cards Grid (Compact & Fully Visible) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-3 sm:mb-4">
              {facts.map((fact, i) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={fact.label}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.05, ease: EASE }}
                    className="group flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#0D151E]/90 border border-white/10 backdrop-blur-md hover:border-white/25 hover:bg-[#141C26] transition-all duration-300 shadow-md shadow-black/50"
                  >
                    {/* Glowing Circular Icon Container */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full border ${fact.iconBorder} ${fact.iconBg} ${fact.iconGlow} backdrop-blur-md flex items-center justify-center ${fact.iconColor} group-hover:scale-105 transition-all duration-300 mt-0.5`}
                    >
                      <Icon size={15} aria-hidden="true" />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <dt className="font-[family-name:var(--font-syne)] font-bold text-white text-[11px] sm:text-xs mb-0.5 tracking-wide group-hover:text-[#00F0FF] transition-colors truncate">
                        {fact.label}
                      </dt>
                      <dd className="font-[family-name:var(--font-inter)] text-white/90 text-[11.5px] sm:text-xs font-medium leading-snug line-clamp-1">
                        {fact.value}
                      </dd>
                      <span className="font-[family-name:var(--font-inter)] text-[10px] sm:text-[10.5px] text-white/50 leading-tight mt-0.5 line-clamp-1">
                        {fact.sub}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Action CTA Buttons */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {/* Primary: Download Resume */}
              <a
                href={personal.resumeUrl}
                download="Mayur_Sonawane_Flutter_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#06B6D4] to-[#F43F5E] text-[#060B12] font-[family-name:var(--font-syne)] font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Download size={13} />
                <span>Download Resume</span>
              </a>

              {/* Secondary: Get In Touch */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-[#0C121A]/90 border border-white/15 text-white font-[family-name:var(--font-syne)] font-semibold text-xs hover:border-white/30 hover:bg-[#141C26] active:scale-95 transition-all duration-200 backdrop-blur-xs"
              >
                <span>Get In Touch</span>
                <ArrowRight size={13} />
              </a>
            </motion.div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM STRIP: KEY HIGHLIGHTS & STATS (MATCHING SHOWCASE)
           ══════════════════════════════════════════════════════════════ */}
        <div className="shrink-0 pt-2.5 sm:pt-3 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: Summary text */}
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-jetbrains)] text-[10.5px] sm:text-xs text-white/50 tracking-wider uppercase">
              CORE PHILOSOPHY:
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[11px] sm:text-xs text-white/80 font-medium">
              Offline-First · Modular State · Clean Architecture
            </span>
          </div>

          {/* Right: 4 Metrics */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <Icon size={14} className="text-[#00F0FF] shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-syne)] font-bold text-xs sm:text-sm text-white leading-none">
                      {item.value}
                    </span>
                    <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/50 leading-tight mt-0.5">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
