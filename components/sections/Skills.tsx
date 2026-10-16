'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { EASE, DURATION } from '@/lib/motion';
import { skills } from '@/data/skills';
import type { Skill } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'Languages' | 'Frameworks' | 'Tools' | 'Backend' | 'Database' | 'Other';

interface StatItem {
  value: string;
  label: string;
  delay: number;
  colorClass: string;
}

interface CategoryMeta {
  dotColor: string;
  labelColor: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  { value: '6',   label: 'Apps Built',    delay: 0,   colorClass: 'text-[#22D3EE]' },
  { value: '23+', label: 'Technologies',  delay: 0.1, colorClass: 'text-[#F59E0B]' },
  { value: '2',   label: 'Case Studies',  delay: 0.2, colorClass: 'text-[#F43F5E]' },
];

const CATEGORY_ORDER: Category[] = [
  'Languages',
  'Frameworks',
  'Tools',
  'Backend',
  'Database',
  'Other',
];

const CATEGORY_META: Record<Category, CategoryMeta> = {
  Languages:  { dotColor: '#22D3EE', labelColor: 'text-[#22D3EE]' },
  Frameworks: { dotColor: '#F59E0B', labelColor: 'text-[#F59E0B]' },
  Tools:      { dotColor: '#F43F5E', labelColor: 'text-[#F43F5E]' },
  Backend:    { dotColor: '#8B5CF6', labelColor: 'text-[#8B5CF6]' },
  Database:   { dotColor: '#10B981', labelColor: 'text-[#10B981]' },
  Other:      { dotColor: '#38BDF8', labelColor: 'text-[#38BDF8]' },
};

// Group skills by category preserving CATEGORY_ORDER
const GROUPED: Record<Category, Skill[]> = CATEGORY_ORDER.reduce(
  (acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  },
  {} as Record<Category, Skill[]>,
);

// All skill names for the marquee
const ALL_SKILL_NAMES: string[] = skills.map((s) => s.name);
const MARQUEE_TEXT: string = ALL_SKILL_NAMES.join(' · ');

// ─── StatCard ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  stat: StatItem;
  inView: boolean;
  reduced: boolean;
}

function StatCard({ stat, inView, reduced }: StatCardProps) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={
        reduced
          ? { opacity: 1, y: 0 }
          : inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{ duration: DURATION.slow, delay: stat.delay, ease: EASE }}
      className="flex flex-col items-start lg:items-end gap-1"
    >
      <span
        className={`font-[family-name:var(--font-playfair)] text-5xl md:text-6xl leading-none font-bold ${stat.colorClass}`}
        aria-label={`${stat.value} ${stat.label}`}
      >
        {stat.value}
      </span>
      <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[#94A3B8]">
        {stat.label}
      </span>
    </motion.div>
  );
}

// ─── SkillPill ────────────────────────────────────────────────────────────────

interface SkillPillProps {
  name: string;
  index: number;
  inView: boolean;
  reduced: boolean;
}

function SkillPill({ name, index, inView, reduced }: SkillPillProps) {
  return (
    <motion.li
      role="listitem"
      initial={reduced ? false : { opacity: 0, scale: 0.88, x: -8 }}
      animate={
        reduced
          ? { opacity: 1, scale: 1, x: 0 }
          : inView
          ? { opacity: 1, scale: 1, x: 0 }
          : { opacity: 0, scale: 0.88, x: -8 }
      }
      transition={{
        duration: DURATION.normal,
        delay: index * 0.04,
        ease: EASE,
      }}
      className={[
        'inline-flex items-center',
        'border border-white/10 bg-[#0F172A]/80',
        'text-[#F8FAFC] rounded-full px-4 py-1.5',
        'font-[family-name:var(--font-jetbrains)] text-xs',
        'cursor-default select-none',
        'transition-all duration-200',
        'hover:bg-[#22D3EE]/15 hover:border-[#22D3EE]/50 hover:text-[#22D3EE] hover:scale-105 hover:shadow-md hover:shadow-[#22D3EE]/20',
      ].join(' ')}
    >
      {name}
    </motion.li>
  );
}

// ─── CategoryRow ──────────────────────────────────────────────────────────────

interface CategoryRowProps {
  category: Category;
  skillList: Skill[];
  isLast: boolean;
  reduced: boolean;
}

function CategoryRow({ category, skillList, isLast, reduced }: CategoryRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: '-60px 0px' });
  const meta = CATEGORY_META[category];

  return (
    <motion.div
      ref={rowRef}
      initial={reduced ? false : { opacity: 0, x: -20 }}
      animate={
        reduced
          ? { opacity: 1, x: 0 }
          : inView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: -20 }
      }
      transition={{ duration: DURATION.slow, ease: EASE }}
      className={[
        'flex flex-col sm:flex-row items-start gap-4 sm:gap-6 py-6',
        isLast ? '' : 'border-b border-white/10',
      ].join(' ')}
    >
      {/* Left: glowing dot + label */}
      <div className="w-32 shrink-0 flex items-center gap-2.5 pt-1">
        <span
          aria-hidden="true"
          className="inline-block w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
          style={{
            backgroundColor: meta.dotColor,
            boxShadow: `0 0 10px ${meta.dotColor}`,
          }}
        />
        <span className={`font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-wider font-semibold ${meta.labelColor}`}>
          {category}
        </span>
      </div>

      {/* Right: skill pills */}
      <ul
        role="list"
        className="flex flex-wrap gap-2.5"
        aria-label={`${category} skills`}
      >
        {skillList.map((skill, i) => (
          <SkillPill
            key={skill.name}
            name={skill.name}
            index={i}
            inView={inView}
            reduced={reduced}
          />
        ))}
      </ul>
    </motion.div>
  );
}

// ─── MarqueeStrip ─────────────────────────────────────────────────────────────

function MarqueeStrip() {
  return (
    <div
      className="overflow-hidden mt-16 motion-reduce:hidden"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-8">
        <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[#22D3EE] opacity-35 whitespace-nowrap">
          {MARQUEE_TEXT}
        </span>
        <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[#F59E0B] opacity-35 whitespace-nowrap">
          {MARQUEE_TEXT}
        </span>
      </div>
    </div>
  );
}

// ─── Skills (default export) ──────────────────────────────────────────────────

export default function Skills() {
  const reduced = useReducedMotion() ?? false;

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px 0px' });

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 md:py-32 relative overflow-hidden bg-[#06080E]"
    >
      {/* Seamless Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#00F0FF]/08 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-[#F59E0B]/06 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 circuit-grid opacity-20"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        {/* ── Header row + Stats ──────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">

          {/* Left: eyebrow label + heading */}
          <div className="flex flex-col gap-3">
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal, ease: EASE }}
              className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.25em] text-[#22D3EE] font-semibold"
            >
              Technical Arsenal
            </motion.span>
            <motion.h2
              id="skills-heading"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, delay: 0.05, ease: EASE }}
              className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#F8FAFC] leading-tight tracking-tight"
            >
              Skills &amp; Technologies
            </motion.h2>
          </div>

          {/* Right: stat numbers with neon glow */}
          <div
            ref={statsRef}
            className="flex flex-row gap-10 lg:gap-14 items-end"
          >
            {STATS.map((stat) => (
              <StatCard
                key={stat.label}
                stat={stat}
                inView={statsInView}
                reduced={reduced}
              />
            ))}
          </div>
        </div>

        {/* ── Category rows ────────────────────────────────────────────────── */}
        <div className="flex flex-col" role="region" aria-label="Skill categories">
          {CATEGORY_ORDER.map((cat, idx) => (
            <CategoryRow
              key={cat}
              category={cat}
              skillList={GROUPED[cat]}
              isLast={idx === CATEGORY_ORDER.length - 1}
              reduced={reduced}
            />
          ))}
        </div>

        {/* ── Marquee strip ─────────────────────────────────────────────────── */}
        <MarqueeStrip />
      </div>
    </section>
  );
}
