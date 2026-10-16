'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Layers, Paintbrush, Zap, TestTube2, type LucideIcon } from 'lucide-react';
import { EASE } from '@/lib/motion';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
  accentColor: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: Layers,
    title: 'Architecture First',
    body: 'I design with clean architecture in mind — separating concerns, using established patterns like Riverpod and GoRouter, and writing code that scales without becoming technical debt.',
    accentColor: '#22D3EE',
  },
  {
    number: '02',
    icon: Paintbrush,
    title: 'Design-Driven Development',
    body: 'Engineering and aesthetic polish are inseparable. I pay obsessive attention to spacing, motion, and visual hierarchy so the apps I build feel considered, responsive, and delightful.',
    accentColor: '#F59E0B',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Offline-First Thinking',
    body: "Mobile apps live in the real world where connectivity is inconsistent. I default to offline-first architecture using SQLite (Drift) and local storage, with sync layered seamlessly on top.",
    accentColor: '#F43F5E',
  },
  {
    number: '04',
    icon: TestTube2,
    title: 'Iterate and Improve',
    body: 'I ship working software first, then refine. Every project in this portfolio has gone through multiple rounds of design and code revision — polish comes from ruthless iteration.',
    accentColor: '#8B5CF6',
  },
];

// ---------------------------------------------------------------------------
// StepCard
// ---------------------------------------------------------------------------

interface StepCardProps {
  step: Step;
  index: number;
  isLast: boolean;
}

function StepCard({ step, index, isLast }: StepCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(cardRef, { once: true, margin: '-80px' });
  const Icon = step.icon;

  // GSAP ScrollTrigger for the connector line
  useEffect(() => {
    if (isLast || prefersReducedMotion || !lineRef.current) return;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!lineRef.current) return;

      const tween = gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, [isLast, prefersReducedMotion]);

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 30 }
      }
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.1 }}
      className="flex gap-6 sm:gap-8"
    >
      {/* ------------------------------------------------------------------ */}
      {/* LEFT — numbered circle + connector line                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex w-14 sm:w-16 flex-col items-center">
        {/* Numbered circle */}
        <div className="relative flex items-center justify-center">
          {/* Faint large number watermark */}
          <span
            aria-hidden="true"
            className="absolute font-[family-name:var(--font-playfair)] text-white/5 select-none -z-10 pointer-events-none"
            style={{
              fontSize: '85px',
              top: '-24px',
              left: '-14px',
              lineHeight: 1,
            }}
          >
            {step.number}
          </span>

          {/* Outer circle with neon glowing halo */}
          <div
            className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/20 bg-[#0F172A] shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110"
            style={{
              boxShadow: `0 0 20px ${step.accentColor}33`,
              borderColor: `${step.accentColor}66`,
            }}
            aria-hidden="true"
          >
            <Icon size={22} style={{ color: step.accentColor }} strokeWidth={1.75} />
          </div>
        </div>

        {/* Vertical connector line */}
        {!isLast && (
          <div className="mt-3 flex w-0.5 flex-1 flex-col bg-white/10" style={{ minHeight: '70px' }}>
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-[#22D3EE] via-[#F43F5E] to-[#F59E0B] origin-top"
              style={{ transform: prefersReducedMotion ? 'scaleY(1)' : 'scaleY(0)' }}
            />
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* RIGHT — step card                                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="pb-14 flex-1 min-w-0">
        <div className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0F172A]/75 backdrop-blur-md transition-all duration-300 hover:bg-[#0F172A] hover:border-[#22D3EE]/40 hover:shadow-xl hover:shadow-black/50">
          {/* Step label */}
          <p
            className="mb-2 font-[family-name:var(--font-jetbrains)] uppercase tracking-[0.2em] font-semibold text-xs"
            style={{ color: step.accentColor }}
          >
            Stage {step.number}
          </p>

          {/* Title */}
          <h3 className="mb-3 font-[family-name:var(--font-syne)] text-xl font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
            {step.title}
          </h3>

          {/* Body */}
          <p className="font-[family-name:var(--font-inter)] leading-relaxed text-[#94A3B8] text-sm sm:text-base">
            {step.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Approach Section
// ---------------------------------------------------------------------------

export default function Approach() {
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      aria-labelledby="approach-heading"
      className="relative w-full px-6 py-24 md:px-12 md:py-32 lg:px-24 overflow-hidden bg-[#06080E]"
    >
      {/* ── Seamless Boundary Blends (Top & Bottom) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#06080E] via-[#06080E]/75 to-transparent pointer-events-none z-[5]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#06080E] via-[#06080E]/75 to-transparent pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* Seamless Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-[550px] h-[550px] rounded-full bg-[#00F0FF]/08 blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#A855F7]/06 blur-[140px]" />
        <div
          className="absolute inset-0 circuit-grid opacity-20"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          }}
        />
      </div>

      <div className="relative max-w-screen-xl mx-auto">
        {/* ------------------------------------------------------------------ */}
        {/* Section Header                                                       */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          ref={headerRef}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={
            isHeaderInView
              ? { opacity: 1, y: 0 }
              : prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
            <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.25em] text-[#22D3EE] font-semibold">
              How I Build
            </span>
          </div>
          <h2
            id="approach-heading"
            className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-[#F8FAFC] md:text-5xl lg:text-6xl tracking-tight"
          >
            Engineering
            <br />
            methodology.
          </h2>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* Timeline                                                             */}
        {/* ------------------------------------------------------------------ */}
        <div className="max-w-3xl">
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
