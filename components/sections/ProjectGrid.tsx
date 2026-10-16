'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'motion/react';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { allProjects } from '@/data/projects';
import TiltCard from '@/components/ui/TiltCard';
import { EASE } from '@/lib/motion';
import type { Project } from '@/types';

// Category color mappings from Cyber Sunset palette
const categoryColors: Record<string, { badge: string; text: string }> = {
  AI: {
    badge: 'bg-[#22D3EE]/15 border-[#22D3EE]/40 text-[#22D3EE]',
    text: 'text-[#22D3EE]',
  },
  'Full-Stack': {
    badge: 'bg-[#F59E0B]/15 border-[#F59E0B]/40 text-[#F59E0B]',
    text: 'text-[#F59E0B]',
  },
  Productivity: {
    badge: 'bg-[#F43F5E]/15 border-[#F43F5E]/40 text-[#F43F5E]',
    text: 'text-[#F43F5E]',
  },
  Utility: {
    badge: 'bg-[#8B5CF6]/15 border-[#8B5CF6]/40 text-[#8B5CF6]',
    text: 'text-[#8B5CF6]',
  },
};

// ─── Featured card: large screenshot-dominant card ──────────────
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [shotIndex, setShotIndex] = useState(0);

  const nextShot = useCallback(() => {
    if (project.screenshots.length > 1) {
      setShotIndex((p) => (p + 1) % project.screenshots.length);
    }
  }, [project.screenshots.length]);

  const cat = categoryColors[project.category] ?? {
    badge: 'bg-[#22D3EE]/15 border-[#22D3EE]/30 text-[#22D3EE]',
    text: 'text-[#22D3EE]',
  };

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >
      <TiltCard intensity={6}>
        <article
          className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl hover:border-[#22D3EE]/40 transition-all duration-300 shadow-xl shadow-black/40 cursor-default"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={nextShot}
          aria-label={project.title}
        >
          {/* Screenshot area */}
          <div className="relative overflow-hidden bg-[#07090E]" style={{ aspectRatio: '16/11' }}>
            {project.screenshots[0] ? (
              <>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={shotIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: hovered ? 1.05 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.screenshots[shotIndex] ?? project.screenshots[0]}
                      alt={`${project.title} app screenshot`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Screenshot dots */}
                {project.screenshots.length > 1 && (
                  <div className="absolute bottom-4 right-4 flex gap-1 z-10">
                    {project.screenshots.map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          i === shotIndex ? 'bg-[#22D3EE] w-4' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
                <span className="font-[family-name:var(--font-playfair)] text-white/10 text-8xl select-none" aria-hidden="true">
                  {project.number}
                </span>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className={`font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.15em] uppercase border px-3 py-1.5 rounded-full backdrop-blur-md ${cat.badge}`}>
                {project.category}
              </span>
            </div>

            {/* GitHub quick link on hover */}
            <motion.div
              className="absolute top-4 right-4 z-10"
              initial={{ opacity: 0, y: -8 }}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#07090E]/80 backdrop-blur-md border border-white/20 text-[#F8FAFC] hover:border-[#22D3EE] hover:text-[#22D3EE] transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={15} />
              </a>
            </motion.div>
          </div>

          {/* Card body */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-[#F8FAFC] text-xl group-hover:text-[#22D3EE] transition-colors duration-300">
                {project.title}
              </h3>
              <span className="font-[family-name:var(--font-playfair)] text-white/20 text-2xl leading-none flex-shrink-0 mt-1 select-none" aria-hidden="true">
                {project.number}
              </span>
            </div>

            <p className="font-[family-name:var(--font-syne)] text-sm text-[#F59E0B] font-semibold mb-3">
              {project.tagline}
            </p>

            <p className="font-[family-name:var(--font-inter)] text-sm text-[#94A3B8] leading-relaxed mb-5 line-clamp-2">
              {project.description}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#F8FAFC] border border-white/10 bg-[#131D31]/80 rounded-full px-2.5 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="flex items-center gap-2 font-[family-name:var(--font-syne)] text-xs text-[#94A3B8] hover:text-[#22D3EE] transition-colors duration-200"
              >
                <GithubIcon size={14} />
                GitHub
              </a>
              {project.caseStudy ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 font-[family-name:var(--font-syne)] text-xs font-bold text-[#07090E] bg-gradient-to-r from-[#22D3EE] via-[#F43F5E] to-[#F59E0B] rounded-full px-4 py-1.5 transition-all duration-200 hover:shadow-md hover:shadow-[#22D3EE]/30 group/link"
                >
                  Case Study
                  <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                </Link>
              ) : (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-[family-name:var(--font-syne)] text-xs font-semibold text-[#F8FAFC]/80 hover:text-[#22D3EE] transition-colors duration-200"
                >
                  View Code
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

// ─── Compact card: smaller secondary projects ────────────────────
function CompactCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  const cat = categoryColors[project.category] ?? {
    badge: 'bg-[#22D3EE]/15 border-[#22D3EE]/30 text-[#22D3EE]',
    text: 'text-[#22D3EE]',
  };

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
    >
      <TiltCard className="h-full">
        <article className="group h-full rounded-2xl border border-white/10 bg-[#0F172A]/70 backdrop-blur-md overflow-hidden hover:border-[#22D3EE]/40 hover:shadow-xl hover:shadow-black/50 transition-all duration-300 flex flex-col">
          {/* Screenshot thumbnail */}
          {project.screenshots[0] ? (
            <div className="relative h-36 sm:h-40 overflow-hidden flex-shrink-0 bg-[#07090E]">
              <Image
                src={project.screenshots[0]}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.12em] uppercase border px-2.5 py-1 rounded-full backdrop-blur-md ${cat.badge}`}>
                  {project.category}
                </span>
              </div>
            </div>
          ) : (
            <div className="relative h-36 sm:h-40 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
              <span className="font-[family-name:var(--font-playfair)] text-white/10 text-7xl select-none" aria-hidden="true">
                {project.number}
              </span>
              <div className="absolute top-3 left-3">
                <span className={`font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.12em] uppercase border px-2.5 py-1 rounded-full backdrop-blur-md ${cat.badge}`}>
                  {project.category}
                </span>
              </div>
            </div>
          )}

          {/* Body */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-[family-name:var(--font-syne)] font-bold text-base text-[#F8FAFC] mb-2 group-hover:text-[#22D3EE] transition-colors duration-200">
              {project.title}
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-sm text-[#94A3B8] leading-relaxed mb-4 line-clamp-2 flex-1">
              {project.description}
            </p>

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#F8FAFC]/80 border border-white/10 bg-[#131D31] rounded-full px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="text-[#94A3B8] hover:text-[#22D3EE] transition-colors duration-200 p-1 -m-1"
              >
                <GithubIcon size={15} />
              </a>
              {project.caseStudy ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 font-[family-name:var(--font-syne)] text-xs font-semibold text-[#22D3EE] hover:text-[#F8FAFC] transition-colors duration-200"
                >
                  Details <ArrowRight size={11} aria-hidden="true" />
                </Link>
              ) : (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-[family-name:var(--font-syne)] text-xs font-semibold text-[#94A3B8] hover:text-[#22D3EE] transition-colors duration-200"
                >
                  Code <ExternalLink size={11} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

// ─── Main Grid ───────────────────────────────────────────────────
const FEATURED_IDS = ['ai-expense-scanner', 'smart-water-reminder', 'stayease'];

export default function ProjectGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  const featured = allProjects.filter((p) => FEATURED_IDS.includes(p.id));
  const secondary = allProjects.filter((p) => !FEATURED_IDS.includes(p.id));

  return (
    <section
      id="projects"
      className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-[#06080E]"
      aria-labelledby="projects-heading"
    >
      {/* ── Seamless Ambient Lighting ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 -left-24 w-[550px] h-[550px] rounded-full bg-[#00F0FF]/08 blur-[140px]" />
        <div className="absolute bottom-1/4 -right-24 w-[500px] h-[500px] rounded-full bg-[#F97316]/06 blur-[140px]" />
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
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
              <span className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.25em] uppercase text-[#22D3EE] font-semibold">
                Complete Portfolio
              </span>
            </div>
            <h2
              id="projects-heading"
              className="font-[family-name:var(--font-playfair)] text-[#F8FAFC] leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
            >
              What I&apos;ve Built
            </h2>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[#94A3B8] max-w-sm text-sm sm:text-base leading-relaxed">
            Six Flutter apps — AI financial assistants, habit engines, hotel booking platforms, and offline-first mobile utilities.
          </p>
        </motion.div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
          {featured.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Category Subheading (No horizontal divider lines) */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center my-12"
        >
          <span className="font-[family-name:var(--font-jetbrains)] text-[11px] tracking-[0.25em] uppercase text-[#22D3EE]/80 font-semibold px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            Utility &amp; Experimental Apps
          </span>
        </motion.div>

        {/* Secondary grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondary.map((project, i) => (
            <CompactCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/Mayurs26"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-[family-name:var(--font-syne)] font-bold text-sm text-[#07090E] bg-gradient-to-r from-[#22D3EE] via-[#F43F5E] to-[#F59E0B] rounded-full px-8 py-4 hover:shadow-xl hover:shadow-[#22D3EE]/30 active:scale-[0.97] transition-all duration-300"
          >
            <Sparkles size={16} />
            Explore all repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
