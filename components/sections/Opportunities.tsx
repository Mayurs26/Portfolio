'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Briefcase, GraduationCap, Users, Download, ArrowUpRight, Sparkles } from 'lucide-react';
import { personal } from '@/data/personal';
import { EASE } from '@/lib/motion';

const opportunities = [
  {
    icon: GraduationCap,
    title: 'Internships',
    body: 'Open to Flutter internship roles where I can contribute to production mobile features, learn from senior engineers, and ship real value.',
    accent: 'text-[#22D3EE]',
    bg: 'bg-[#22D3EE]/15 border-[#22D3EE]/30',
    tag: 'Available Now',
    tagClass: 'text-[#22D3EE] bg-[#22D3EE]/10 border-[#22D3EE]/30',
  },
  {
    icon: Briefcase,
    title: 'Full-Time Positions',
    body: 'Actively seeking junior Flutter / Mobile Developer roles at agile product teams building high-impact cross-platform apps.',
    accent: 'text-[#F59E0B]',
    bg: 'bg-[#F59E0B]/15 border-[#F59E0B]/30',
    tag: 'Immediate Joiner',
    tagClass: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30',
  },
  {
    icon: Users,
    title: 'Freelance & MVPs',
    body: 'Available for end-to-end Flutter client projects — from rapid architectural prototyping and UI implementation to production deployment.',
    accent: 'text-[#F43F5E]',
    bg: 'bg-[#F43F5E]/15 border-[#F43F5E]/30',
    tag: 'Contract / Project',
    tagClass: 'text-[#F43F5E] bg-[#F43F5E]/10 border-[#F43F5E]/30',
  },
];

export default function Opportunities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="opportunities"
      className="py-10 md:py-14 lg:py-16 relative overflow-hidden bg-[#06080E]"
      aria-labelledby="opportunities-heading"
    >
      {/* ── Seamless Boundary Blends (Top & Bottom) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#06080E] via-[#06080E]/75 to-transparent pointer-events-none z-[5]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#06080E] via-[#06080E]/75 to-transparent pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* Seamless Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full bg-[#22D3EE]/08 blur-[140px]" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] rounded-full bg-[#F59E0B]/06 blur-[140px]" />
        <div
          className="absolute inset-0 circuit-grid opacity-20"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          }}
        />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
              <span className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.25em] uppercase text-[#22D3EE] font-semibold">
                Open To Collaboration
              </span>
            </div>
            <h2
              id="opportunities-heading"
              className="font-[family-name:var(--font-playfair)] text-[#F8FAFC] leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
            >
              Let&apos;s build together.
            </h2>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[#94A3B8] max-w-sm text-sm sm:text-base leading-relaxed">
            Ready to bring clean mobile architecture and responsive Flutter experiences to your next challenge.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 mb-14">
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              className="group relative p-7 rounded-2xl border border-white/10 bg-[#0F172A]/75 backdrop-blur-md hover:border-[#22D3EE]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl border ${opp.bg} ${opp.accent} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                    <opp.icon size={22} aria-hidden="true" />
                  </div>
                  <span className={`font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border font-semibold ${opp.tagClass}`}>
                    {opp.tag}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-[#F8FAFC] text-lg mb-3 group-hover:text-[#22D3EE] transition-colors">
                  {opp.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[#94A3B8] text-sm leading-relaxed mb-6">
                  {opp.body}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-[family-name:var(--font-syne)] text-[#94A3B8] group-hover:text-[#22D3EE] transition-colors">
                <span className="font-semibold">Inquire details</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2.5 font-[family-name:var(--font-syne)] font-bold text-sm bg-gradient-to-r from-[#22D3EE] via-[#F43F5E] to-[#F59E0B] text-[#07090E] rounded-full px-8 py-4 hover:shadow-xl hover:shadow-[#22D3EE]/30 active:scale-[0.97] transition-all duration-300"
          >
            <Sparkles size={16} />
            Say Hello
          </a>
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-2 font-[family-name:var(--font-syne)] font-semibold text-sm border border-white/20 text-[#F8FAFC] bg-[#0F172A]/60 rounded-full px-7 py-4 hover:border-[#22D3EE] hover:bg-[#22D3EE]/10 active:scale-[0.97] transition-all duration-300 backdrop-blur-md"
          >
            <Download size={15} aria-hidden="true" />
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
