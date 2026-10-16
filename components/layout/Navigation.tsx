'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { personal } from '@/data/personal';
import { EASE } from '@/lib/motion';

const navLinks = [
  { href: '/#featured', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    },
    [mobileOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !menuRef.current) return;
      const elements = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? {} : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#06080E]/85 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
          <nav
            className="flex items-center justify-between h-16 md:h-[72px]"
            aria-label="Main navigation"
          >
            {/* Logo: Glowing Cyan Dot + MAYUR SONAWANE (Exact Mockup Match) */}
            <Link
              href="/"
              className="flex items-center gap-2.5 font-[family-name:var(--font-jetbrains)] text-xs sm:text-[13px] font-bold tracking-[0.22em] uppercase text-white hover:text-[#00F0FF] transition-colors duration-200"
              aria-label="Mayur Sonawane – home"
            >
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] shrink-0" />
              <span>MAYUR SONAWANE</span>
            </Link>

            {/* Desktop Navigation Links (Centered) */}
            <ul className="hidden md:flex items-center gap-8 lg:gap-10" role="list">
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-syne)] text-sm tracking-wide text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Side: GitHub Icon + Glowing Gradient Border Resume Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-2 rounded-full text-white/80 hover:text-[#00F0FF] hover:bg-white/5 active:scale-95 transition-all duration-200"
              >
                <GithubIcon size={18} />
              </a>

              {/* Glowing Gradient Border Pill */}
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Mayur_Sonawane_Resume.pdf"
                className="group relative inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-[#00F0FF] via-[#818CF8] to-[#F43F5E] shadow-[0_0_15px_rgba(0,240,255,0.22)] hover:shadow-[0_0_22px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span className="px-5 py-1.5 rounded-full bg-[#080B10] text-xs font-semibold font-[family-name:var(--font-syne)] text-white group-hover:bg-[#0E131A] transition-colors">
                  Resume
                </span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              ref={toggleRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden p-2.5 rounded-xl border border-white/10 text-[#F8FAFC] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors duration-200"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#06070B]/95 backdrop-blur-2xl flex flex-col justify-between px-6 pt-28 pb-12 md:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile main navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#F8FAFC] hover:text-[#00F0FF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col gap-4 pt-8 border-t border-white/10">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Mayur_Sonawane_Resume.pdf"
                className="text-center font-[family-name:var(--font-syne)] font-bold text-sm bg-gradient-to-r from-[#00F0FF] via-[#06B6D4] to-[#F43F5E] text-[#060B12] rounded-full py-3.5 shadow-lg shadow-cyan-500/20"
              >
                Download Resume
              </a>
              <div className="flex items-center justify-center gap-6 pt-2">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 text-[#F8FAFC] hover:text-[#00F0FF]"
                >
                  <GithubIcon size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
