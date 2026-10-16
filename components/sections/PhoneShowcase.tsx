'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Bell,
  BarChart3,
  Users,
  Zap,
  Heart,
  Scan,
  Bot,
  ShieldCheck,
  Building2,
  CalendarCheck,
  Lock,
  Database,
  Target,
} from 'lucide-react';
import { GithubIcon, FlutterIcon, DartIcon } from '@/components/ui/BrandIcons';
import { EASE } from '@/lib/motion';

// ─── Project Data Interface ──────────────────────────────────────────
interface ShowcaseProject {
  id: string;
  counterNum: string;
  category: string;
  title: string;
  titleLines: {
    line1: string;
    line2: string; // The vibrant cyan-to-orange gradient word
    line3: string;
  };
  description: string;
  caseStudyUrl: string;
  githubUrl: string;
  screens: {
    left: { file: string; label: string };
    center: { file: string; label: string };
    right: { file: string; label: string };
  };
  features: {
    icon: typeof Droplets;
    iconColor: string;
    iconBg: string;
    iconBorder: string;
    iconGlow: string;
    title: string;
    desc: string;
  }[];
  techStack: {
    name: string;
    type: 'flutter' | 'dart' | 'sqlite' | 'target' | 'django' | 'ml';
  }[];
  stats: {
    icon: typeof Users;
    value: string;
    label: string;
  }[];
}

const showcaseList: ShowcaseProject[] = [
  {
    id: 'smart-water-reminder',
    counterNum: '01',
    category: 'FLUTTER APP',
    title: 'Smart Water Reminder',
    titleLines: {
      line1: 'Smart',
      line2: 'Water',
      line3: 'Reminder',
    },
    description:
      'A Flutter app to track daily hydration, set smart reminders, and build healthier habits with clean analytics and streak tracking.',
    caseStudyUrl: '/projects/smart-water-reminder',
    githubUrl: 'https://github.com/Mayurs26/Smart-Water-Reminder',
    screens: {
      left: {
        file: '/screenshots/smart-water-reminder/Reminder.jpg',
        label: 'Smart Reminders Screen',
      },
      center: {
        file: '/screenshots/smart-water-reminder/Home Dashboard.jpg',
        label: 'Hydration Dashboard Screen',
      },
      right: {
        file: '/screenshots/smart-water-reminder/Analytics.jpg',
        label: 'Visual Analytics Screen',
      },
    },
    features: [
      {
        icon: Droplets,
        iconColor: 'text-[#00F0FF]',
        iconBg: 'bg-[#0B151C]',
        iconBorder: 'border-[#00F0FF]/50',
        iconGlow: 'shadow-[0_0_18px_rgba(0,240,255,0.28)]',
        title: 'Track Daily Intake',
        desc: 'Log water easily with a single tap.',
      },
      {
        icon: Bell,
        iconColor: 'text-[#FB923C]',
        iconBg: 'bg-[#1A120E]',
        iconBorder: 'border-[#F97316]/50',
        iconGlow: 'shadow-[0_0_18px_rgba(249,115,22,0.28)]',
        title: 'Smart Reminders',
        desc: 'Custom intervals and notifications.',
      },
      {
        icon: BarChart3,
        iconColor: 'text-[#22D3EE]',
        iconBg: 'bg-[#0B151C]',
        iconBorder: 'border-[#06B6D4]/50',
        iconGlow: 'shadow-[0_0_18px_rgba(6,182,212,0.28)]',
        title: 'Visual Analytics',
        desc: 'Track progress and build streaks.',
      },
    ],
    techStack: [
      { name: 'Flutter', type: 'flutter' },
      { name: 'Dart', type: 'dart' },
      { name: 'SQLite', type: 'sqlite' },
      { name: 'Local Notifications', type: 'target' },
    ],
    stats: [
      { icon: Users, value: '3K+', label: 'App Users (target)' },
      { icon: Zap, value: '95%', label: 'Reminder Accuracy' },
      { icon: Heart, value: '5★', label: 'User Satisfaction' },
    ],
  },
  {
    id: 'ai-expense-scanner',
    counterNum: '02',
    category: 'AI & OCR MOBILE',
    title: 'AI Expense Scanner',
    titleLines: {
      line1: 'AI',
      line2: 'Expense',
      line3: 'Scanner',
    },
    description:
      'An offline-first Flutter expense tracker with ML Kit receipt OCR, Gemini AI financial assistant, and deep spending analytics powered by Drift SQLite.',
    caseStudyUrl: '/projects/ai-expense-scanner',
    githubUrl: 'https://github.com/Mayurs26/AI_Expense_Scanner',
    screens: {
      left: {
        file: '/screenshots/ai-expense-tracker/AI Assistant (Gemini Chat).jpg',
        label: 'Gemini Copilot Screen',
      },
      center: {
        file: '/screenshots/ai-expense-tracker/Dashboard.jpg',
        label: 'Expense Overview Screen',
      },
      right: {
        file: '/screenshots/ai-expense-tracker/Analytics Dashboard.jpg',
        label: 'Spending Trends Screen',
      },
    },
    features: [
      {
        icon: Scan,
        iconColor: 'text-[#00F0FF]',
        iconBg: 'bg-[#0B151C]',
        iconBorder: 'border-[#00F0FF]/50',
        iconGlow: 'shadow-[0_0_18px_rgba(0,240,255,0.28)]',
        title: 'Receipt OCR Scanner',
        desc: 'Instant ML Kit camera text extraction.',
      },
      {
        icon: Bot,
        iconColor: 'text-[#FB923C]',
        iconBg: 'bg-[#1A120E]',
        iconBorder: 'border-[#F97316]/50',
        iconGlow: 'shadow-[0_0_18px_rgba(249,115,22,0.28)]',
        title: 'Gemini AI Assistant',
        desc: 'Conversational financial budget insights.',
      },
      {
        icon: ShieldCheck,
        iconColor: 'text-[#22D3EE]',
        iconBg: 'bg-[#0B151C]',
        iconBorder: 'border-[#06B6D4]/50',
        iconGlow: 'shadow-[0_0_18px_rgba(6,182,212,0.28)]',
        title: '100% Offline Storage',
        desc: 'Private SQLite database on-device.',
      },
    ],
    techStack: [
      { name: 'Flutter', type: 'flutter' },
      { name: 'Dart', type: 'dart' },
      { name: 'Drift (SQLite)', type: 'sqlite' },
      { name: 'Google ML Kit', type: 'ml' },
    ],
    stats: [
      { icon: Zap, value: '98%', label: 'OCR Accuracy' },
      { icon: Users, value: '100%', label: 'Private & Offline' },
      { icon: Heart, value: '5★', label: 'Gemini Copilot' },
    ],
  },
  {
    id: 'stayease',
    counterNum: '03',
    category: 'FULL-STACK MOBILE',
    title: 'StayEase Hotel Booking',
    titleLines: {
      line1: 'Stay',
      line2: 'Ease',
      line3: 'Booking',
    },
    description:
      'A full-stack hotel booking platform featuring a sleek Flutter mobile frontend and Django REST backend with JWT authentication and live booking workflows.',
    caseStudyUrl: 'https://github.com/Mayurs26/stayease-hotel-booking-app',
    githubUrl: 'https://github.com/Mayurs26/stayease-hotel-booking-app',
    screens: {
      left: {
        file: '/screenshots/stayease/Sign In.jpg',
        label: 'JWT Authentication Screen',
      },
      center: {
        file: '/screenshots/stayease/Home screen.jpg',
        label: 'Hotel Discovery Screen',
      },
      right: {
        file: '/screenshots/stayease/Bookings.jpg',
        label: 'My Reservations Screen',
      },
    },
    features: [
      {
        icon: Building2,
        iconColor: 'text-[#00F0FF]',
        iconBg: 'bg-[#0B151C]',
        iconBorder: 'border-[#00F0FF]/50',
        iconGlow: 'shadow-[0_0_18px_rgba(0,240,255,0.28)]',
        title: 'Curated Hotel Stays',
        desc: 'Search and filter luxury destinations.',
      },
      {
        icon: CalendarCheck,
        iconColor: 'text-[#FB923C]',
        iconBg: 'bg-[#1A120E]',
        iconBorder: 'border-[#F97316]/50',
        iconGlow: 'shadow-[0_0_18px_rgba(249,115,22,0.28)]',
        title: 'Instant Booking Engine',
        desc: 'Real-time room availability & booking.',
      },
      {
        icon: Lock,
        iconColor: 'text-[#22D3EE]',
        iconBg: 'bg-[#0B151C]',
        iconBorder: 'border-[#06B6D4]/50',
        iconGlow: 'shadow-[0_0_18px_rgba(6,182,212,0.28)]',
        title: 'JWT Authentication',
        desc: 'Encrypted token-based user security.',
      },
    ],
    techStack: [
      { name: 'Flutter', type: 'flutter' },
      { name: 'Dart', type: 'dart' },
      { name: 'Django REST', type: 'django' },
      { name: 'SQLite', type: 'sqlite' },
    ],
    stats: [
      { icon: Building2, value: '500+', label: 'Verified Hotels' },
      { icon: Zap, value: '0.2s', label: 'API Response' },
      { icon: Heart, value: '5★', label: 'Booking Success' },
    ],
  },
];

export default function PhoneShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const project = showcaseList[activeProjectIdx];

  // Mouse tilt tracking
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 });
  }, []);

  const nextProject = () => {
    setActiveProjectIdx((prev) => (prev + 1) % showcaseList.length);
  };

  const prevProject = () => {
    setActiveProjectIdx((prev) => (prev - 1 + showcaseList.length) % showcaseList.length);
  };

  return (
    <section
      id="featured"
      className="relative w-full bg-[#06080E] text-[#F8FAFC] overflow-hidden select-none"
    >
      {/* ══════════════════════════════════════════════════════════════
          BACKGROUND LIGHTING & FLOATING 3D SHAPES (EXACT FROM MOCKUP)
          - Warm amber glow on bottom-left
          - Cool cyan glow behind center phones
          - Floating Cyan 3D Hexagon on top-left
          - Floating Burgundy Torus / Ring on top-right
          - Floating Purple Prism on lower-right
          - Floating Micro Confetti Cubes (magenta, cyan, amber)
         ══════════════════════════════════════════════════════════════ */}

      {/* ── Ambient Radial Glows ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 12% 78%, rgba(249, 115, 22, 0.14) 0%, transparent 42%), radial-gradient(circle at 56% 45%, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.05) 32%, transparent 64%), radial-gradient(circle at 86% 50%, rgba(168, 85, 247, 0.10) 0%, transparent 40%)',
        }}
      />

      {/* ── 1. Floating Cyan 3D Hexagon (Top-Left behind title) ── */}
      <div
        className="absolute top-12 sm:top-16 left-[22%] sm:left-[26%] pointer-events-none z-0 transition-transform duration-300"
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `translate(${mouse.x * -18}px, ${mouse.y * -14}px)`,
        }}
      >
        <svg
          className="w-24 sm:w-36 lg:w-44 h-24 sm:h-36 lg:h-44 opacity-35 blur-[0.5px]"
          viewBox="0 0 120 120"
          fill="none"
        >
          <defs>
            <linearGradient id="cyanHexTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="cyanHexLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="cyanHexRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <polygon points="60,10 105,35 60,60 15,35" fill="url(#cyanHexTop)" />
          <polygon points="15,35 60,60 60,110 15,85" fill="url(#cyanHexLeft)" />
          <polygon points="105,35 60,60 60,110 105,85" fill="url(#cyanHexRight)" />
        </svg>
      </div>

      {/* ── 2. Floating Burgundy 3D Torus / Ring (Top-Right) ── */}
      <div
        className="absolute top-6 sm:top-8 right-[12%] sm:right-[15%] pointer-events-none z-0 transition-transform duration-300"
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `translate(${mouse.x * 16}px, ${mouse.y * -12}px)`,
        }}
      >
        <div className="w-36 sm:w-48 lg:w-56 h-36 sm:h-48 lg:h-56 rounded-full border-[18px] sm:border-[24px] border-[#6B1728]/35 shadow-[0_0_40px_rgba(107,23,40,0.3)] opacity-40 blur-[0.5px]" />
      </div>

      {/* ── 3. Floating Purple 3D Prism / Diamond (Lower-Right) ── */}
      <div
        className="absolute bottom-16 sm:bottom-20 right-[15%] sm:right-[18%] pointer-events-none z-0 transition-transform duration-300"
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `translate(${mouse.x * 14}px, ${mouse.y * 14}px)`,
        }}
      >
        <svg
          className="w-16 sm:w-24 lg:w-28 h-20 sm:h-28 lg:h-32 opacity-40 blur-[0.5px]"
          viewBox="0 0 80 100"
          fill="none"
        >
          <defs>
            <linearGradient id="purplePrism1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="purplePrism2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#581C87" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <polygon points="40,5 75,50 40,95" fill="url(#purplePrism1)" />
          <polygon points="40,5 5,50 40,95" fill="url(#purplePrism2)" />
        </svg>
      </div>

      {/* ── 4. Floating Micro Confetti Cubes (Magenta, Cyan, Amber) ── */}
      <div
        className="absolute top-14 left-[18%] w-3 h-3 bg-[#EC4899] rotate-12 shadow-[0_0_10px_#EC4899] opacity-75 pointer-events-none z-0"
        style={{
          transform: prefersReducedMotion ? undefined : `translate(${mouse.x * -10}px, ${mouse.y * -8}px)`,
        }}
      />
      <div
        className="absolute top-10 right-[35%] w-2.5 h-2.5 bg-[#F59E0B] rotate-45 shadow-[0_0_8px_#F59E0B] opacity-70 pointer-events-none z-0"
        style={{
          transform: prefersReducedMotion ? undefined : `translate(${mouse.x * 8}px, ${mouse.y * -6}px)`,
        }}
      />
      <div
        className="absolute top-20 right-[22%] w-3 h-3 bg-[#00F0FF] -rotate-6 shadow-[0_0_10px_#00F0FF] opacity-75 pointer-events-none z-0"
        style={{
          transform: prefersReducedMotion ? undefined : `translate(${mouse.x * 12}px, ${mouse.y * 10}px)`,
        }}
      />
      <div
        className="absolute bottom-24 left-[30%] w-2 h-2 bg-[#F59E0B] rotate-12 shadow-[0_0_6px_#F59E0B] opacity-65 pointer-events-none z-0"
      />
      <div
        className="absolute bottom-16 right-[28%] w-2.5 h-2.5 bg-[#EC4899] rotate-45 shadow-[0_0_8px_#EC4899] opacity-70 pointer-events-none z-0"
      />

      {/* ══════════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER (VIEWPORT-FITTED ON DESKTOP)
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 py-5 sm:py-6 lg:py-8 lg:h-[calc(100svh-72px)] min-h-[660px] flex flex-col justify-between z-10">
        
        {/* ── TOP HEADER BAR: PROJECT CONTROLS ── */}
        <div className="flex items-center justify-between gap-4 shrink-0 pb-2 sm:pb-3 border-b border-white/[0.07]">
          {/* Left: • FEATURED PROJECTS */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-white/90">
              FEATURED PROJECTS
            </span>
          </div>

          {/* Right: Project Selector Capsule + Circular Arrows */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-[#0C121A]/90 border border-white/10 backdrop-blur-md">
              {showcaseList.map((item, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-[family-name:var(--font-syne)] transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-[#060B12] font-bold shadow-md shadow-cyan-500/25 scale-[1.02]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            {/* Circular Carousel Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevProject}
                aria-label="Previous project"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0C121A] border border-white/15 text-white/80 hover:text-white hover:border-white/30 active:scale-95 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextProject}
                aria-label="Next project"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-[#060B12] font-bold shadow-md shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MAIN 3-COLUMN SHOWCASE (EXACT MATCH TO REFERENCE IMAGE)
            - Column 1: Counter, Category Badge, Gradient Title, Scribble, Description, Buttons
            - Column 2: 3 Angled 3D Smartphone Mockups (Left, Center Dominant, Right)
            - Column 3: 3 Connected Vertical Feature Callouts
           ══════════════════════════════════════════════════════════════ */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 xl:gap-8 items-center py-2 sm:py-3"
        >
          {/* ────────────────────────────────────────────────────────────
              COLUMN 1 (LEFT): Counter, Badge, Editorial Gradient Title, CTAs
             ──────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id + '-left'}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col"
              >
                {/* Counter & Progress Track Row: 01 / 03 ──── */}
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="font-[family-name:var(--font-jetbrains)] text-xs font-bold text-white/90">
                    {project.counterNum}
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains)] text-xs text-white/40">
                    / 03
                  </span>
                  {/* Cyan progress bar track from mockup */}
                  <div className="flex items-center ml-2">
                    <span className="w-14 h-[3px] rounded-full bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                    <span className="w-16 h-[3px] rounded-full bg-white/10" />
                  </div>
                </div>

                {/* Category Pill Badge: • FLUTTER APP */}
                <div className="mb-3.5">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D151E]/90 border border-white/10 text-[10.5px] font-[family-name:var(--font-jetbrains)] font-bold text-white/90 tracking-[0.16em] uppercase backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                    <span>{project.category}</span>
                  </span>
                </div>

                {/* Editorial Title with Multi-Color Gradient on Line 2 (Exact from Mockup) */}
                <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[0.94] tracking-tight text-white mb-2">
                  <span>{project.titleLines.line1}</span>
                  <br />
                  <span
                    className="font-black bg-gradient-to-r from-[#00F0FF] via-[#818CF8] to-[#F97316] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(0,240,255,0.3)] inline-block"
                  >
                    {project.titleLines.line2}
                  </span>
                  <br />
                  <span>{project.titleLines.line3}</span>
                </h2>

                {/* Signature Scribble / Flourish Underline (Exact from Mockup) */}
                <div className="mb-4">
                  <svg
                    className="w-20 h-4 text-[#00F0FF]/80"
                    viewBox="0 0 80 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 10C15 4 28 14 44 6C56 0 68 12 78 5" />
                  </svg>
                </div>

                {/* Description */}
                <p className="font-[family-name:var(--font-inter)] text-xs sm:text-[13.5px] text-white/70 leading-relaxed max-w-sm mb-6">
                  {project.description}
                </p>

                {/* Action CTA Buttons (Exact Gradient + Ghost from Mockup) */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Primary: View Live Demo (Cyan-to-Rose Gradient) */}
                  <a
                    href={project.caseStudyUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#06B6D4] to-[#F43F5E] text-[#060B12] font-[family-name:var(--font-syne)] font-bold text-xs sm:text-[13px] shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <span>View Live Demo</span>
                    <ArrowRight size={14} />
                  </a>

                  {/* Secondary: View GitHub */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0C121A]/90 border border-white/15 text-white font-[family-name:var(--font-syne)] font-semibold text-xs sm:text-[13px] hover:border-white/30 hover:bg-[#141C26] active:scale-95 transition-all duration-200 backdrop-blur-xs"
                  >
                    <GithubIcon size={15} />
                    <span>View GitHub</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ────────────────────────────────────────────────────────────
              COLUMN 2 (CENTER): 3 OVERLAPPING ANGLED SMARTPHONES
              Matches the exact 3D smartphone composition in the reference image:
              - Left phone tilted left (-8.5deg), positioned higher
              - Center phone dominant in front, standing upright (-0.5deg)
              - Right phone tilted right (+8.5deg), positioned lower
             ──────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative min-h-[390px] sm:min-h-[460px] lg:min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id + '-mockups'}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative flex items-center justify-center w-full"
                style={{
                  transform: prefersReducedMotion
                    ? undefined
                    : `perspective(1200px) rotateY(${mouse.x * 4}deg) rotateX(${-mouse.y * 3}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* ── LEFT PHONE: Reminders Screen (-8.5deg, Positioned Higher) ── */}
                <div
                  className="absolute left-1/2 -translate-x-[78%] -translate-y-4 sm:-translate-y-6 z-10 cursor-pointer transition-transform duration-300 hover:z-30 hover:scale-[1.03]"
                  style={{
                    transform: `rotate(-8.5deg)`,
                  }}
                >
                  <div className="relative rounded-[32px] sm:rounded-[40px] p-1.5 sm:p-2 bg-gradient-to-b from-[#222E3B] via-[#141C26] to-[#0A0F15] border border-[#38BDF8]/40 shadow-2xl shadow-black/95 overflow-hidden">
                    <div className="relative rounded-[26px] sm:rounded-[34px] overflow-hidden bg-black h-[clamp(280px,44vh,440px)] aspect-[9/19.5]">
                      {/* Status Bar */}
                      <div className="relative flex items-center justify-between px-3 pt-2 pb-0.5 z-20 bg-black/75 backdrop-blur-xs">
                        <span className="font-[family-name:var(--font-jetbrains)] text-[7.5px] text-white/80 font-bold">9:41</span>
                        <div className="w-12 h-2.5 rounded-full bg-black/90 shadow-inner" />
                        <div className="w-2.5 h-1 rounded-xs border border-white/60" />
                      </div>

                      {/* Screen Content */}
                      <Image
                        src={project.screens.left.file}
                        alt={project.screens.left.label}
                        fill
                        priority
                        sizes="(max-width: 640px) 170px, 250px"
                        className="object-cover object-top"
                      />

                      {/* Glass Sheen */}
                      <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ── CENTER PHONE: Dominant Home Dashboard (Taller, In Front, -0.5deg) ── */}
                <div
                  className="relative z-20 scale-105 sm:scale-110 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.98),0_0_50px_rgba(0,240,255,0.16)]"
                  style={{
                    transform: `rotate(-0.5deg)`,
                  }}
                >
                  <div className="relative rounded-[36px] sm:rounded-[46px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2A3B4D] via-[#162330] to-[#0B1118] border-[2px] border-[#38BDF8]/60 shadow-2xl overflow-hidden">
                    <div className="relative rounded-[30px] sm:rounded-[40px] overflow-hidden bg-black h-[clamp(330px,52vh,510px)] aspect-[9/19.5]">
                      
                      {/* Dynamic Island Status Bar */}
                      <div className="relative flex items-center justify-between px-4 pt-2.5 pb-0.5 z-20 bg-black/70 backdrop-blur-xs">
                        <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-white/90 font-bold">9:41</span>
                        <div className="w-14 h-3.5 rounded-full bg-black/95 shadow-inner" />
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                          <span className="w-2.5 h-1 rounded-xs border border-white/70" />
                        </div>
                      </div>

                      {/* Screen Content: Home Dashboard */}
                      <Image
                        src={project.screens.center.file}
                        alt={project.screens.center.label}
                        fill
                        priority
                        sizes="(max-width: 640px) 250px, 340px"
                        className="object-cover object-top"
                      />

                      {/* Bottom Home Indicator */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/40 z-20 pointer-events-none" />

                      {/* Specular Glare */}
                      <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 30%, transparent 60%)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ── RIGHT PHONE: Analytics Screen (+8.5deg, Positioned Lower) ── */}
                <div
                  className="absolute left-1/2 translate-x-[18%] translate-y-6 sm:translate-y-8 z-10 cursor-pointer transition-transform duration-300 hover:z-30 hover:scale-[1.03]"
                  style={{
                    transform: `rotate(8.5deg)`,
                  }}
                >
                  <div className="relative rounded-[32px] sm:rounded-[40px] p-1.5 sm:p-2 bg-gradient-to-b from-[#222E3B] via-[#141C26] to-[#0A0F15] border border-[#38BDF8]/40 shadow-2xl shadow-black/95 overflow-hidden">
                    <div className="relative rounded-[26px] sm:rounded-[34px] overflow-hidden bg-black h-[clamp(280px,44vh,440px)] aspect-[9/19.5]">
                      {/* Status Bar */}
                      <div className="relative flex items-center justify-between px-3 pt-2 pb-0.5 z-20 bg-black/75 backdrop-blur-xs">
                        <span className="font-[family-name:var(--font-jetbrains)] text-[7.5px] text-white/80 font-bold">9:41</span>
                        <div className="w-12 h-2.5 rounded-full bg-black/90" />
                        <div className="w-2.5 h-1 rounded-xs border border-white/60" />
                      </div>

                      {/* Screen Content: Analytics */}
                      <Image
                        src={project.screens.right.file}
                        alt={project.screens.right.label}
                        fill
                        priority
                        sizes="(max-width: 640px) 170px, 250px"
                        className="object-cover object-top"
                      />

                      {/* Glass Sheen */}
                      <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%)',
                        }}
                      />
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* ────────────────────────────────────────────────────────────
              COLUMN 3 (RIGHT): 3 CONNECTED VERTICAL FEATURE CALLOUTS
              Matches the exact vertical list with circular icons in reference:
              - Cyan Ring: Track Daily Intake
              - Orange Ring: Smart Reminders
              - Cyan Ring: Visual Analytics
             ──────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-center pl-0 lg:pl-4 xl:pl-6 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id + '-right'}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col"
              >
                {project.features.map((item, idx) => {
                  const Icon = item.icon;
                  const isLast = idx === project.features.length - 1;
                  return (
                    <div key={item.title} className="flex flex-col">
                      <div className="flex items-center gap-3.5 group">
                        {/* Circular Glowing Icon Container */}
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full border ${item.iconBorder} ${item.iconBg} ${item.iconGlow} backdrop-blur-md flex items-center justify-center ${item.iconColor} group-hover:scale-105 transition-all duration-300`}
                        >
                          <Icon size={19} />
                        </div>

                        {/* Title & Short Subtitle */}
                        <div className="flex flex-col">
                          <h3 className="font-[family-name:var(--font-syne)] font-bold text-xs sm:text-[13px] text-white">
                            {item.title}
                          </h3>
                          <p className="font-[family-name:var(--font-inter)] text-[11px] sm:text-xs text-white/50 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Connecting Line (between icons) */}
                      {!isLast && (
                        <div className="w-px h-6 sm:h-7 bg-gradient-to-b from-white/20 via-white/10 to-transparent ml-[21px] sm:ml-[23px] my-1" />
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM STRIP: TECH STACK BADGES (LEFT) & KEY STATS (RIGHT)
           ══════════════════════════════════════════════════════════════ */}
        <div className="shrink-0 pt-3 sm:pt-4 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: 4 Technology Badges (Flutter, Dart, SQLite, Local Notifications) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-2.5">
            {project.techStack.map((tech) => (
              <div
                key={tech.name}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D151E]/90 border border-white/10 text-xs font-[family-name:var(--font-jetbrains)] text-white/90 backdrop-blur-xs shadow-xs"
              >
                {tech.type === 'flutter' && <FlutterIcon size={13} />}
                {tech.type === 'dart' && <DartIcon size={13} />}
                {tech.type === 'sqlite' && <Database size={12} className="text-[#00F0FF]" />}
                {tech.type === 'target' && <Target size={12} className="text-[#00F0FF]" />}
                {tech.type === 'django' && <Database size={12} className="text-[#00F0FF]" />}
                {tech.type === 'ml' && <Scan size={12} className="text-[#00F0FF]" />}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Right: 3 Key Metrics (3K+ Users, 95% Accuracy, 5★ Satisfaction) */}
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            {project.stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <Icon size={16} className="text-[#00F0FF] shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-syne)] font-bold text-sm text-white leading-none">
                      {stat.value}
                    </span>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/50 leading-tight mt-0.5">
                      {stat.label}
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
