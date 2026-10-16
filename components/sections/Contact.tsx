'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Mail, Check, Copy, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { personal } from '@/data/personal';
import { EASE } from '@/lib/motion';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 lg:py-40 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 50% 50%, #0F172A 0%, #0A0E18 65%, #07090E 100%)',
      }}
      aria-labelledby="contact-heading"
    >
      {/* Atmospheric background glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-[550px] h-[550px] glow-cyan opacity-25 blur-3xl -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-0 right-0 w-[450px] h-[450px] glow-amber opacity-20 blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute inset-0 circuit-grid opacity-35" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
            <span className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.25em] uppercase text-[#22D3EE] font-semibold">
              Get In Touch
            </span>
          </div>

          {/* Heading */}
          <h2
            id="contact-heading"
            className="font-[family-name:var(--font-playfair)] text-[#F8FAFC] leading-[1.05] tracking-tight mb-8"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.2rem)' }}
          >
            Have a project in mind?{' '}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#F43F5E] to-[#F59E0B] bg-clip-text text-transparent">
              Let&apos;s talk.
            </span>
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-12 max-w-xl">
            Whether you have a Flutter role, a freelance mobile application, or just want to connect — my inbox is always open.
          </p>

          {/* Email row with copy action */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-3 font-[family-name:var(--font-syne)] font-bold text-sm bg-gradient-to-r from-[#22D3EE] via-[#F43F5E] to-[#F59E0B] text-[#07090E] rounded-full px-8 py-4 hover:shadow-xl hover:shadow-[#22D3EE]/30 active:scale-[0.97] transition-all duration-300"
            >
              <Mail size={16} />
              Send Email
            </a>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-xs text-[#F8FAFC] bg-[#0F172A]/80 border border-white/15 rounded-full px-6 py-4 hover:border-[#22D3EE] hover:text-[#22D3EE] hover:bg-[#22D3EE]/10 active:scale-[0.97] transition-all duration-300 backdrop-blur-md"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-[#22D3EE]" />
                  <span className="text-[#22D3EE] font-semibold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>{personal.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Social Links */}
          <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-white/10">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-[family-name:var(--font-syne)] text-sm font-semibold text-[#94A3B8] hover:text-[#22D3EE] bg-[#0F172A]/60 border border-white/10 rounded-full px-5 py-2.5 hover:border-[#22D3EE]/50 hover:bg-[#22D3EE]/10 transition-all duration-200"
            >
              <GithubIcon size={16} />
              GitHub
              <ArrowUpRight size={13} />
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-[family-name:var(--font-syne)] text-sm font-semibold text-[#94A3B8] hover:text-[#F59E0B] bg-[#0F172A]/60 border border-white/10 rounded-full px-5 py-2.5 hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 transition-all duration-200"
            >
              <LinkedinIcon size={16} />
              LinkedIn
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
