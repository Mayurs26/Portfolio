'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, MapPin, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { personal } from '@/data/personal';

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06080E] relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 glow-cyan opacity-10 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* Brand + bio */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-[family-name:var(--font-syne)] font-bold text-sm tracking-[0.14em] uppercase text-[#F8FAFC] hover:text-[#22D3EE] transition-colors duration-300 block mb-3"
            >
              {personal.name}
            </Link>
            <p className="font-[family-name:var(--font-inter)] text-[#94A3B8] text-sm leading-relaxed">
              Flutter Developer based in{' '}
              <span className="inline-flex items-center gap-1 text-[#F8FAFC]">
                <MapPin size={12} className="inline text-[#22D3EE]" aria-hidden="true" />
                {personal.location}
              </span>
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-6">
            <a
              href="/#featured"
              className="font-[family-name:var(--font-syne)] text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors duration-200"
            >
              Projects
            </a>
            <a
              href="/#skills"
              className="font-[family-name:var(--font-syne)] text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors duration-200"
            >
              Skills
            </a>
            <a
              href="/#about"
              className="font-[family-name:var(--font-syne)] text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors duration-200"
            >
              About
            </a>
            <a
              href="/#contact"
              className="font-[family-name:var(--font-syne)] text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* Socials + back to top */}
          <div className="flex items-center gap-4">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2.5 rounded-full bg-[#0F172A] border border-white/10 text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/50 transition-colors duration-200"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2.5 rounded-full bg-[#0F172A] border border-white/10 text-[#94A3B8] hover:text-[#F59E0B] hover:border-[#F59E0B]/50 transition-colors duration-200"
            >
              <LinkedinIcon size={17} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Send email"
              className="p-2.5 rounded-full bg-[#0F172A] border border-white/10 text-[#94A3B8] hover:text-[#F43F5E] hover:border-[#F43F5E]/50 transition-colors duration-200"
            >
              <Mail size={17} />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="ml-2 p-2.5 rounded-full border border-white/15 bg-[#0F172A] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE] transition-all duration-300"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-[family-name:var(--font-jetbrains)] text-[#64748B]">
          <p>© {year} {personal.name}. All rights reserved.</p>
          <p>Designed with Flutter &amp; Next.js architecture.</p>
        </div>
      </div>
    </footer>
  );
}
