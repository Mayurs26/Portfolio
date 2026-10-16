'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
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
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, FlutterIcon, DartIcon } from '@/components/ui/BrandIcons';
import { EASE } from '@/lib/motion';

// ─── Project Data Interface ──────────────────────────────────────────
interface ShowcaseScreen {
  file: string;
  label: string;
  tag: string;
}

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
  screens: ShowcaseScreen[];
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
    screens: [
      {
        file: '/screenshots/smart-water-reminder/Reminder.jpg',
        label: 'Smart Reminders Screen',
        tag: '01 · REMINDERS',
      },
      {
        file: '/screenshots/smart-water-reminder/Home Dashboard.jpg',
        label: 'Hydration Dashboard Screen',
        tag: '02 · DASHBOARD',
      },
      {
        file: '/screenshots/smart-water-reminder/Analytics.jpg',
        label: 'Visual Analytics Screen',
        tag: '03 · ANALYTICS',
      },
    ],
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
    screens: [
      {
        file: '/screenshots/ai-expense-tracker/AI Assistant (Gemini Chat).jpg',
        label: 'Gemini Copilot Screen',
        tag: '01 · AI COPILOT',
      },
      {
        file: '/screenshots/ai-expense-tracker/Dashboard.jpg',
        label: 'Expense Overview Screen',
        tag: '02 · DASHBOARD',
      },
      {
        file: '/screenshots/ai-expense-tracker/Analytics Dashboard.jpg',
        label: 'Spending Trends Screen',
        tag: '03 · ANALYTICS',
      },
    ],
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
    screens: [
      {
        file: '/screenshots/stayease/Sign In.jpg',
        label: 'JWT Authentication Screen',
        tag: '01 · AUTH',
      },
      {
        file: '/screenshots/stayease/Home screen.jpg',
        label: 'Hotel Discovery Screen',
        tag: '02 · DISCOVERY',
      },
      {
        file: '/screenshots/stayease/Bookings.jpg',
        label: 'My Reservations Screen',
        tag: '03 · BOOKINGS',
      },
    ],
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

// ─── Modern 3D Smartphone Component ──────────────────────────────────
// Preserves exact 9:19.5 smartphone aspect ratio at all viewports.
// Uses shrink-0 to prevent flex compression and proportional scaling without distortion.
interface ModernPhoneProps {
  screen: ShowcaseScreen;
  isCenter?: boolean;
  isFlipped: boolean;
  onFlip: () => void;
  tiltAngle: number;
  prefersReducedMotion: boolean | null;
  mouse: { x: number; y: number };
  phoneIndex: number;
  projectTitle: string;
}

function ModernPhone({
  screen,
  isCenter = false,
  isFlipped,
  onFlip,
  tiltAngle,
  prefersReducedMotion,
  mouse,
  phoneIndex,
  projectTitle,
}: ModernPhoneProps) {
  // Parallax translation calculations
  const dynamicTiltY = prefersReducedMotion ? 0 : tiltAngle + mouse.x * (isCenter ? 4 : 7);
  const dynamicTiltX = prefersReducedMotion ? 0 : -mouse.y * (isCenter ? 5 : 4);
  const dynamicZ = isCenter ? 26 : (phoneIndex === 0 ? -mouse.x * 12 : mouse.x * 12);

  return (
    <div
      onClick={onFlip}
      className={`relative cursor-pointer transition-transform duration-300 group select-none shrink-0 snap-center ${
        isCenter
          ? 'w-[215px] sm:w-[235px] md:w-[220px] lg:w-[245px] xl:w-[260px] aspect-[9/19.5] z-20'
          : 'w-[195px] sm:w-[215px] md:w-[200px] lg:w-[225px] xl:w-[238px] aspect-[9/19.5] z-10 opacity-90 hover:opacity-100 hover:z-30'
      }`}
      style={{
        perspective: '1400px',
      }}
      title="Click to 3D flip phone"
    >
      {/* ── 3D Card Inner (Handles Flip & Perspective Angle) ── */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped
            ? 'rotateY(180deg)'
            : `rotateY(${dynamicTiltY}deg) rotateX(${dynamicTiltX}deg) translateZ(${dynamicZ}px)`,
        }}
      >
        {/* ══════════════════════════════════════════════════════════════
            FRONT FACE: Sleek Modern Flagship Smartphone Display
           ══════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Outer Titanium Chassis */}
          <div
            className={`relative w-full h-full rounded-[34px] sm:rounded-[42px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2E3C4E] via-[#16212E] to-[#0A1017] border-[2px] sm:border-[2.5px] transition-all duration-300 flex flex-col justify-between ${
              isCenter
                ? 'border-[#00F0FF]/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.98),0_0_40px_rgba(0,240,255,0.22)]'
                : 'border-[#38BDF8]/40 group-hover:border-[#00F0FF]/60 shadow-[0_15px_45px_-15px_rgba(0,0,0,0.95),0_0_25px_rgba(56,189,248,0.12)]'
            }`}
          >
            {/* Subtle Chamfer Rim Light */}
            <div className="absolute inset-0 rounded-[34px] sm:rounded-[42px] ring-1 ring-white/15 pointer-events-none" />

            {/* Hardware Side Buttons */}
            {/* Left: Volume Up / Down */}
            <div className="absolute -left-[3.5px] top-20 w-1 h-6 rounded-l-xs bg-[#475569] border-l border-white/20" />
            <div className="absolute -left-[3.5px] top-28 w-1 h-6 rounded-l-xs bg-[#475569] border-l border-white/20" />
            {/* Right: Power / Action Button */}
            <div className="absolute -right-[3.5px] top-24 w-1 h-10 rounded-r-xs bg-[#475569] border-r border-white/20" />

            {/* Inner Curved OLED Screen Area (Strictly Proportional) */}
            <div className="relative w-full flex-1 rounded-[26px] sm:rounded-[34px] overflow-hidden bg-black flex flex-col justify-between shadow-inner">
              {/* Top Dynamic Island & Status Bar */}
              <div className="relative z-30 px-3.5 pt-2 pb-1 flex items-center justify-between bg-black/75 backdrop-blur-xs select-none">
                {/* Clock */}
                <span className="font-[family-name:var(--font-jetbrains)] text-[8px] sm:text-[9px] text-white/90 font-bold tracking-tight">
                  9:41
                </span>

                {/* Dynamic Island Pill with Camera & Sensor */}
                <div className="w-13 sm:w-15 h-3 sm:h-3.5 rounded-full bg-black/95 border border-white/15 shadow-inner flex items-center justify-between px-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/60 border border-[#00F0FF] shadow-[0_0_5px_#00F0FF]" />
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                </div>

                {/* Status Icons: 5G & Battery */}
                <div className="flex items-center gap-1.5">
                  <span className="font-[family-name:var(--font-jetbrains)] text-[7px] text-white/70 font-semibold">
                    5G
                  </span>
                  <div className="w-3.5 h-1.5 rounded-xs border border-white/70 p-[1px] flex items-center">
                    <div className="w-2 h-full bg-[#00F0FF] rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Screenshot Display with Proportional Fill */}
              <div className="relative flex-1 w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={screen.file}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={screen.file}
                      alt={screen.label}
                      fill
                      priority
                      sizes="(max-width: 640px) 215px, (max-width: 1024px) 240px, 280px"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Specular Diagonal Glass Sheen */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 28%, transparent 55%)',
                  }}
                />
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="relative z-30 pb-2 pt-1 flex justify-center bg-gradient-to-t from-black/80 to-transparent">
                <div className="w-20 sm:w-24 h-1 rounded-full bg-white/40 shadow-xs" />
              </div>
            </div>
          </div>

          {/* Under-Phone Screen Tag Badge */}
          <div className="flex items-center justify-center mt-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-[family-name:var(--font-jetbrains)] font-bold tracking-[0.16em] uppercase backdrop-blur-md transition-all duration-300 ${
                isCenter
                  ? 'bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'bg-[#0D151E]/90 border border-white/10 text-white/60 group-hover:text-white/90'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCenter ? 'bg-[#00F0FF] shadow-[0_0_6px_#00F0FF] animate-pulse' : 'bg-white/40'
                }`}
              />
              <span>{screen.tag}</span>
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            BACK FACE: 3D Titanium Chassis & Architecture Specs
           ══════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="relative w-full h-full rounded-[34px] sm:rounded-[42px] p-4 sm:p-5 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#080D14] border-[2px] sm:border-[2.5px] border-[#38BDF8]/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.98),0_0_35px_rgba(249,115,22,0.18)] flex flex-col justify-between select-none">
            {/* Top Triple Sapphire Camera Bump */}
            <div className="flex items-start justify-between">
              <div className="w-14 sm:w-18 h-14 sm:h-18 rounded-2xl bg-[#16212E]/90 border border-white/20 p-2 shadow-lg grid grid-cols-2 gap-1.5 items-center justify-items-center">
                <div className="w-4.5 sm:w-5.5 h-4.5 sm:h-5.5 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#00F0FF]/40 border border-[#00F0FF]" />
                </div>
                <div className="w-2 h-2 rounded-full bg-[#F59E0B]/80 shadow-[0_0_6px_#F59E0B]" />
                <div className="w-4.5 sm:w-5.5 h-4.5 sm:h-5.5 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#00F0FF]/40 border border-[#00F0FF]" />
                </div>
                <div className="w-3 h-3 rounded-full bg-black/90 border border-white/20" />
              </div>

              {/* Minimalist 3D Chip Badge */}
              <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-[family-name:var(--font-jetbrains)] text-white/70">
                PRO 3D
              </div>
            </div>

            {/* Center Monogram & Specs */}
            <div className="flex flex-col items-center text-center my-auto">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00F0FF]/20 to-[#F97316]/20 border border-white/20 flex items-center justify-center mb-2.5 shadow-md">
                <FlutterIcon size={22} />
              </div>
              <h4 className="font-[family-name:var(--font-syne)] font-bold text-xs sm:text-sm text-white mb-0.5">
                {projectTitle}
              </h4>
              <p className="font-[family-name:var(--font-jetbrains)] text-[9.5px] text-[#00F0FF] uppercase tracking-widest font-semibold mb-2.5">
                FLUTTER · 60 FPS
              </p>

              <div className="space-y-1 text-[9.5px] font-[family-name:var(--font-inter)] text-white/60">
                <p>• Clean Architecture</p>
                <p>• Offline-First SQLite</p>
                <p>• Hardware Accel 3D</p>
              </div>
            </div>

            {/* Bottom Flip Back Button */}
            <div className="flex justify-center pt-2 border-t border-white/10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[9.5px] font-[family-name:var(--font-jetbrains)] text-white/80 transition-colors">
                <RotateCcw size={11} className="text-[#00F0FF]" />
                <span>Click to Flip Back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main PhoneShowcase Section ──────────────────────────────────────
export default function PhoneShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const project = showcaseList[activeProjectIdx];

  // Mouse tilt tracking for dynamic parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  // 3-second auto cycle timer & interactive state
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [screenShift, setScreenShift] = useState(0); // 0, 1, 2
  const [flippedState, setFlippedState] = useState([false, false, false]);

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
    setIsHovered(false);
  }, []);

  const rotateScreens = useCallback(() => {
    setScreenShift((prev) => (prev + 1) % 3);
    setProgress(0);
  }, []);

  const toggleFlipAll = useCallback(() => {
    setFlippedState((prev) => {
      const anyFlipped = prev.some((f) => f);
      return prev.map(() => !anyFlipped);
    });
  }, []);

  const toggleFlipSingle = useCallback((idx: number) => {
    setFlippedState((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  }, []);

  // 3-Second Automatic Screen Change Interval
  useEffect(() => {
    if (prefersReducedMotion || !isAutoPlaying || isHovered) return;

    const intervalDuration = 3000; // 3 seconds
    const tickRate = 50; // update progress every 50ms
    const step = (tickRate / intervalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          setScreenShift((s) => {
            const nextShift = (s + 1) % 3;
            // After 3 screen shifts (9s on current project), optionally advance project
            if (nextShift === 0) {
              setActiveProjectIdx((p) => (p + 1) % showcaseList.length);
            }
            return nextShift;
          });
          return 0;
        }
        return prev + step;
      });
    }, tickRate);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, isAutoPlaying, isHovered]);

  const nextProject = () => {
    setActiveProjectIdx((prev) => (prev + 1) % showcaseList.length);
    setScreenShift(0);
    setProgress(0);
  };

  const prevProject = () => {
    setActiveProjectIdx((prev) => (prev - 1 + showcaseList.length) % showcaseList.length);
    setScreenShift(0);
    setProgress(0);
  };

  // Resolve current screens based on shift offset (Left, Center, Right)
  const leftScreen = project.screens[(screenShift + 0) % 3];
  const centerScreen = project.screens[(screenShift + 1) % 3];
  const rightScreen = project.screens[(screenShift + 2) % 3];

  return (
    <section
      id="featured"
      className="relative w-full bg-[#06080E] text-[#F8FAFC] overflow-hidden select-none py-10 md:py-14 lg:py-16"
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

      {/* ── Ambient Radial Glows ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 12% 78%, rgba(249, 115, 22, 0.10) 0%, transparent 45%), radial-gradient(circle at 56% 45%, rgba(6, 182, 212, 0.11) 0%, rgba(14, 165, 233, 0.04) 32%, transparent 64%), radial-gradient(circle at 86% 50%, rgba(168, 85, 247, 0.07) 0%, transparent 45%)',
        }}
      />

      {/* ── Floating 3D Geometric Accents ── */}
      <div
        className="absolute top-12 left-[18%] pointer-events-none z-0 transition-transform duration-300"
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `translate(${mouse.x * -18}px, ${mouse.y * -14}px)`,
        }}
      >
        <div className="w-28 h-28 rounded-full border border-cyan-500/20 blur-[1px] opacity-40 animate-pulse" />
      </div>

      <div
        className="absolute bottom-16 right-[15%] pointer-events-none z-0 transition-transform duration-300"
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `translate(${mouse.x * 14}px, ${mouse.y * 14}px)`,
        }}
      >
        <div className="w-32 h-32 rounded-full border border-purple-500/20 blur-[1px] opacity-35" />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col justify-between z-10">
        
        {/* ── TOP HEADER BAR: PROJECT CONTROLS & 3S PROGRESS ── */}
        <div className="flex flex-wrap items-center justify-between gap-3.5 shrink-0 pb-4 border-b border-white/5">
          {/* Left: • FEATURED PROJECTS */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-white/90">
              FEATURED PROJECTS
            </span>
          </div>

          {/* Center/Right: 3s Auto-Cycle Tracker + Project Tabs + Navigation Arrows */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            {/* 3-Second Auto-Cycle Controller */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0C121A]/90 border border-white/10 backdrop-blur-md shadow-sm">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-[#00F0FF] hover:text-white transition-colors p-0.5"
                aria-label={isAutoPlaying ? 'Pause 3s auto cycle' : 'Play 3s auto cycle'}
                title={isAutoPlaying ? 'Pause 3s cycle' : 'Play 3s cycle'}
              >
                {isAutoPlaying ? <Pause size={13} /> : <Play size={13} />}
              </button>

              <div className="flex items-center gap-2">
                <div className="w-14 sm:w-20 h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] rounded-full transition-all duration-75 shadow-[0_0_8px_#00F0FF]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/70 font-semibold">
                  3s
                </span>
              </div>

              {/* 3D Round / Rotate Screens Quick Button */}
              <button
                onClick={rotateScreens}
                className="flex items-center gap-1 pl-2 border-l border-white/10 text-white/70 hover:text-[#00F0FF] transition-colors"
                title="Rotate Screens (3D Round)"
              >
                <RefreshCw size={11} className="hover:rotate-180 transition-transform duration-500" />
                <span className="hidden sm:inline font-[family-name:var(--font-jetbrains)] text-[10px] uppercase font-bold tracking-wider">
                  Rotate
                </span>
              </button>

              {/* 3D Flip All Phones Toggle */}
              <button
                onClick={toggleFlipAll}
                className="flex items-center gap-1 pl-2 border-l border-white/10 text-white/70 hover:text-[#F97316] transition-colors"
                title="Flip All Phones in 3D"
              >
                <RotateCcw size={11} />
                <span className="hidden sm:inline font-[family-name:var(--font-jetbrains)] text-[10px] uppercase font-bold tracking-wider">
                  Flip 3D
                </span>
              </button>
            </div>

            {/* Project Selector Tabs */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#0C121A]/90 border border-white/10 backdrop-blur-md">
              {showcaseList.map((item, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveProjectIdx(idx);
                      setScreenShift(0);
                      setProgress(0);
                    }}
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

            {/* Circular Carousel Prev/Next Arrows */}
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
            MAIN SHOWCASE GRID:
            - Column 1 (Left): Project Details, Gradient Title, Description, Buttons
            - Column 2 (Center): 3 BIG, PROPORTIONAL, SEPARATED PHONES (NO STRETCHING)
            - Column 3 (Right): Connected Feature Callouts & 3D Flip Quick Control
           ══════════════════════════════════════════════════════════════ */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center py-6 sm:py-8"
        >
          {/* ────────────────────────────────────────────────────────────
              COLUMN 1 (LEFT): Counter, Badge, Editorial Gradient Title, CTAs
             ──────────────────────────────────────────────────────────── */}
          <div className="order-1 lg:col-span-3 xl:col-span-3 flex flex-col justify-center z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id + '-left'}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col"
              >
                {/* Counter Row: 01 / 03 ──── */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="font-[family-name:var(--font-jetbrains)] text-xs font-bold text-white/90">
                    {project.counterNum}
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains)] text-xs text-white/40">
                    / 03
                  </span>
                  <div className="flex items-center ml-2">
                    <span className="w-14 h-[3px] rounded-full bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                    <span className="w-14 h-[3px] rounded-full bg-white/10" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D151E]/90 border border-white/10 text-[10.5px] font-[family-name:var(--font-jetbrains)] font-bold text-white/90 tracking-[0.16em] uppercase backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                    <span>{project.category}</span>
                  </span>
                </div>

                {/* Editorial Title with Multi-Color Gradient */}
                <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-[clamp(2.3rem,4vw,3.8rem)] leading-[0.96] tracking-tight text-white mb-2">
                  <span>{project.titleLines.line1}</span>
                  <br />
                  <span className="font-black bg-gradient-to-r from-[#00F0FF] via-[#818CF8] to-[#F97316] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(0,240,255,0.3)] inline-block">
                    {project.titleLines.line2}
                  </span>
                  <br />
                  <span>{project.titleLines.line3}</span>
                </h2>

                {/* Signature Scribble / Flourish Underline */}
                <div className="mb-3">
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
                <p className="font-[family-name:var(--font-inter)] text-xs sm:text-[13px] text-white/70 leading-relaxed max-w-sm mb-5">
                  {project.description}
                </p>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Primary: View Live Demo / Case Study */}
                  <a
                    href={project.caseStudyUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#06B6D4] to-[#F43F5E] text-[#060B12] font-[family-name:var(--font-syne)] font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <span>View Live Demo</span>
                    <ArrowRight size={13} />
                  </a>

                  {/* Secondary: View GitHub */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0C121A]/90 border border-white/15 text-white font-[family-name:var(--font-syne)] font-semibold text-xs hover:border-white/30 hover:bg-[#141C26] active:scale-95 transition-all duration-200 backdrop-blur-xs"
                  >
                    <GithubIcon size={14} />
                    <span>View GitHub</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ────────────────────────────────────────────────────────────
              COLUMN 2 (CENTER): 3 PROPORTIONAL SMARTPHONES (STRICT 9:19.5 RATIO)
              - shrink-0 prevents flexbox compression
              - aspect-[9/19.5] preserves exact smartphone proportions
              - smooth horizontal snap swipe on mobile, side-by-side on desktop
              - NO distortion, NO stretching, NO squeezed screenshots!
             ──────────────────────────────────────────────────────────── */}
          <div
            className="order-2 lg:col-span-7 xl:col-span-7 flex flex-col items-center justify-center relative w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* 3D Phones Stage */}
            <div
              className="relative flex items-center gap-4 sm:gap-6 lg:gap-7 w-full overflow-x-auto md:overflow-visible py-4 px-4 sm:px-2 md:px-0 no-scrollbar justify-start md:justify-center snap-x snap-mandatory"
              style={{
                perspective: '1400px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Phone 1: Left Screen (Tilted slightly right, separated) */}
              <ModernPhone
                screen={leftScreen}
                isCenter={false}
                isFlipped={flippedState[0]}
                onFlip={() => toggleFlipSingle(0)}
                tiltAngle={8}
                prefersReducedMotion={prefersReducedMotion}
                mouse={mouse}
                phoneIndex={0}
                projectTitle={project.title}
              />

              {/* Phone 2: Center Screen (Hero Spotlight, Elevated & Dominant) */}
              <ModernPhone
                screen={centerScreen}
                isCenter={true}
                isFlipped={flippedState[1]}
                onFlip={() => toggleFlipSingle(1)}
                tiltAngle={0}
                prefersReducedMotion={prefersReducedMotion}
                mouse={mouse}
                phoneIndex={1}
                projectTitle={project.title}
              />

              {/* Phone 3: Right Screen (Tilted slightly left, separated) */}
              <ModernPhone
                screen={rightScreen}
                isCenter={false}
                isFlipped={flippedState[2]}
                onFlip={() => toggleFlipSingle(2)}
                tiltAngle={-8}
                prefersReducedMotion={prefersReducedMotion}
                mouse={mouse}
                phoneIndex={2}
                projectTitle={project.title}
              />
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────
              COLUMN 3 (RIGHT): CONNECTED FEATURE CALLOUTS & QUICK CONTROLS
             ──────────────────────────────────────────────────────────── */}
          <div className="order-3 lg:col-span-2 xl:col-span-2 flex flex-col justify-center pl-0 lg:pl-2 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id + '-right'}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col"
              >
                {/* 3 Connected Feature Nodes */}
                {project.features.map((item, idx) => {
                  const Icon = item.icon;
                  const isLast = idx === project.features.length - 1;
                  return (
                    <div key={item.title} className="flex flex-col">
                      <div className="flex items-center gap-3 group">
                        {/* Circular Glowing Icon Node */}
                        <div
                          className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full border ${item.iconBorder} ${item.iconBg} ${item.iconGlow} backdrop-blur-md flex items-center justify-center ${item.iconColor} group-hover:scale-105 transition-all duration-300`}
                        >
                          <Icon size={17} />
                        </div>

                        {/* Title & Short Subtitle */}
                        <div className="flex flex-col">
                          <h3 className="font-[family-name:var(--font-syne)] font-bold text-xs sm:text-[12.5px] text-white">
                            {item.title}
                          </h3>
                          <p className="font-[family-name:var(--font-inter)] text-[10.5px] sm:text-[11px] text-white/50 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Connecting Line (between icons) */}
                      {!isLast && (
                        <div className="w-px h-5 sm:h-6 bg-gradient-to-b from-white/20 via-white/10 to-transparent ml-[19px] sm:ml-[21px] my-1" />
                      )}
                    </div>
                  );
                })}

                {/* Quick 3D Interaction Control Pill */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                  <button
                    onClick={rotateScreens}
                    className="inline-flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-white/80 hover:text-white transition-all text-[11px] font-[family-name:var(--font-jetbrains)]"
                  >
                    <span className="flex items-center gap-1.5">
                      <RefreshCw size={12} className="text-[#00F0FF]" />
                      <span>Round Screens</span>
                    </span>
                    <span className="text-[10px] text-white/40">3s</span>
                  </button>

                  <button
                    onClick={toggleFlipAll}
                    className="inline-flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 text-white/80 hover:text-white transition-all text-[11px] font-[family-name:var(--font-jetbrains)]"
                  >
                    <span className="flex items-center gap-1.5">
                      <RotateCcw size={12} className="text-[#F97316]" />
                      <span>Flip 3D Back</span>
                    </span>
                    <Sparkles size={11} className="text-[#F97316]" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM STRIP: TECH STACK BADGES & KEY STATS
           ══════════════════════════════════════════════════════════════ */}
        <div className="shrink-0 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5">
          {/* Left: Technology Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {project.techStack.map((tech) => (
              <div
                key={tech.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D151E]/90 border border-white/10 text-[11.5px] font-[family-name:var(--font-jetbrains)] text-white/90 backdrop-blur-xs shadow-xs"
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

          {/* Right: Key Performance Metrics */}
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            {project.stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <Icon size={15} className="text-[#00F0FF] shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-syne)] font-bold text-xs sm:text-sm text-white leading-none">
                      {stat.value}
                    </span>
                    <span className="font-[family-name:var(--font-inter)] text-[10.5px] text-white/50 leading-tight mt-0.5">
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
