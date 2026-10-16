'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { featuredProjects } from '@/data/projects';
import { EASE } from '@/lib/motion';

function FeaturedCard({
  project,
  index,
}: {
  project: (typeof featuredProjects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      {/* Screenshot composition */}
      <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative py-6 sm:py-8">
          {/* Main screenshot — phone mockup feel */}
          {project.screenshots[0] && (
            <div className="group/img relative rounded-2xl overflow-hidden border border-[#6B796F]/20 shadow-2xl shadow-black/40 aspect-[9/16] max-w-[240px] sm:max-w-[260px] mx-auto">
              <Image
                src={project.screenshots[0]}
                alt={`${project.title} — main screen`}
                fill
                className="object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
                sizes="(max-width: 768px) 240px, 280px"
                priority={index === 0}
              />
            </div>
          )}
          {/* Secondary screenshot — offset right */}
          {project.screenshots[2] && (
            <div className="absolute -bottom-4 -right-2 sm:-right-4 lg:-right-8 rounded-xl overflow-hidden border border-[#6B796F]/20 shadow-xl shadow-black/30 w-[110px] h-[190px] sm:w-[130px] sm:h-[220px] hidden sm:block">
              <Image
                src={project.screenshots[2]}
                alt={`${project.title} — secondary screen`}
                fill
                className="object-cover"
                sizes="140px"
              />
            </div>
          )}
          {/* Tertiary screenshot — offset left */}
          {project.screenshots[5] && (
            <div className="absolute -top-2 -left-2 lg:-left-8 rounded-xl overflow-hidden border border-[#6B796F]/15 shadow-lg shadow-black/20 w-[100px] h-[170px] hidden lg:block">
              <Image
                src={project.screenshots[5]}
                alt={`${project.title} — additional screen`}
                fill
                className="object-cover"
                sizes="110px"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content column */}
      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        {/* Large watermark number */}
        <span className="font-[family-name:var(--font-playfair)] text-[5rem] sm:text-[6rem] leading-none font-bold text-[#F7F7E5]/[0.04] select-none block -mb-5" aria-hidden="true">
          {project.number}
        </span>

        {/* Category */}
        <span className="font-[family-name:var(--font-jetbrains)] text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#79909C] block mb-3 sm:mb-4">
          {project.category}
        </span>

        {/* Title */}
        <h3
          className="font-[family-name:var(--font-playfair)] text-[#F7F7E5] mb-3 leading-tight"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="font-[family-name:var(--font-syne)] text-[#79876E] font-medium mb-4 text-base sm:text-lg">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="font-[family-name:var(--font-inter)] text-sm sm:text-base text-[#F7F7E5]/55 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8">
          {project.tech.slice(0, 6).map((t) => (
            <span
              key={t}
              className="font-[family-name:var(--font-jetbrains)] text-[10px] sm:text-xs text-[#79909C] border border-[#79909C]/25 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-4">
          {project.caseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 font-[family-name:var(--font-syne)] font-semibold text-sm text-[#F7F7E5] border border-[#F7F7E5]/25 rounded-full px-6 py-3 hover:bg-[#F7F7E5] hover:text-[#020404] active:scale-[0.97] transition-all duration-300 group"
            >
              Case Study
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-syne)] text-sm text-[#6B796F] hover:text-[#F7F7E5] active:scale-[0.97] transition-all duration-300"
            aria-label={`View ${project.title} on GitHub`}
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  return (
    <section
      id="featured"
      className="bg-[#020404] py-24 md:py-32 lg:py-40"
      aria-labelledby="featured-label"
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span id="featured-label" className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase text-[#79876E]">
            Featured Work
          </span>
          <span className="h-px flex-1 max-w-[80px] bg-[#79876E]/40" aria-hidden="true" />
        </div>

        <div className="space-y-24 sm:space-y-28 md:space-y-40">
          {featuredProjects.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
