import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  Scan,
  Bot,
  Database,
  BarChart3,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { projects } from '@/data/projects';
import { siteConfig } from '@/config/site';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CaseStudy3DScene from '@/components/three/CaseStudy3DScene';

export const metadata: Metadata = {
  title: 'AI Expense Scanner — Flutter App Case Study',
  description:
    'AI-powered Flutter expense tracker — OCR receipt scanning, Gemini AI financial assistant, Drift SQLite offline storage, and analytics. Case study by Mayur Sonawane.',
  alternates: {
    canonical: `${siteConfig.url}/projects/ai-expense-scanner`,
  },
  openGraph: {
    title: 'AI Expense Scanner — Flutter App Case Study',
    description:
      'AI-powered Flutter expense tracker — OCR receipt scanning, Gemini AI financial assistant, and analytics.',
    url: `${siteConfig.url}/projects/ai-expense-scanner`,
  },
};

const project = projects.find((p) => p.id === 'ai-expense-scanner')!;
const nextProject = projects.find((p) => p.id === 'smart-water-reminder')!;

const screenDetails: { file: string; label: string; desc: string }[] = [
  {
    file: 'Dashboard.jpg',
    label: 'Main Dashboard',
    desc: 'Real-time balance, recent transactions & quick scan access',
  },
  {
    file: 'AI Assistant (Gemini Chat).jpg',
    label: 'Gemini AI Assistant',
    desc: 'Natural language queries for spending habits and insights',
  },
  {
    file: 'Analytics Dashboard.jpg',
    label: 'Spending Analytics',
    desc: 'Visual category breakdown, monthly trends & chart stats',
  },
  {
    file: 'Add Expense Screen.jpg',
    label: 'Smart Receipt Scanner',
    desc: 'ML Kit OCR extracts amount, date, and merchant automatically',
  },
  {
    file: 'Expense Details.jpg',
    label: 'Expense Details',
    desc: 'Categorization, receipt attachments & duplicate detection',
  },
  {
    file: 'Google Sign-In.jpg',
    label: 'Authentication',
    desc: 'Secure Google Sign-In and Firebase Phone OTP login',
  },
  {
    file: 'Settings.jpg',
    label: 'Preferences',
    desc: 'Currency, backup, dark/light themes & data management',
  },
  {
    file: 'Splash Screen.jpg',
    label: 'Brand Identity',
    desc: 'Clean minimal launch experience with smooth animation',
  },
];

export default function AIExpenseScannerPage() {
  return (
    <>
      <Navigation />
      <main
        id="main-content"
        className="relative min-h-screen text-[#F8FAFC] pt-24 pb-20 overflow-hidden bg-[#06080E]"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 0%, #0F172A 0%, #0B1120 45%, #06080E 85%)',
        }}
      >
        {/* ── Background Atmospheric Effects ── */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* Ambient Lighting Orbs */}
          <div
            className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-1/4 left-10 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(circle, #F43F5E 0%, transparent 70%)',
            }}
          />

          {/* Circuit Grid Texture */}
          <div className="absolute inset-0 circuit-grid opacity-[0.035]" />

          {/* Giant Typographic Watermark */}
          <span
            className="absolute top-28 right-8 font-[family-name:var(--font-playfair)] text-[#22D3EE]/[0.03] select-none text-[15rem] leading-none pointer-events-none"
            aria-hidden="true"
          >
            01
          </span>
        </div>

        <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
          {/* ── Breadcrumb & Navigation ── */}
          <div className="flex items-center justify-between gap-4 mb-10 pt-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-xs tracking-wider uppercase text-[#F8FAFC]/80 hover:text-[#22D3EE] bg-[#0F172A]/80 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md hover:border-[#22D3EE]/50 hover:bg-[#0F172A] transition-all duration-300"
            >
              <ArrowLeft size={14} />
              Back to Projects
            </Link>

            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.2em] uppercase text-[#22D3EE] bg-[#22D3EE]/10 border border-[#22D3EE]/30 rounded-full px-3 py-1">
                {project.category}
              </span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.2em] uppercase text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-full px-3 py-1 font-semibold">
                Featured Case Study
              </span>
            </div>
          </div>

          {/* ── Hero Showcase Section ── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
            {/* Left Column: Editorial Information */}
            <div className="lg:col-span-7">
              <h1
                className="font-[family-name:var(--font-playfair)] text-[#F8FAFC] leading-[1.05] tracking-tight mb-5"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)' }}
              >
                {project.title}
              </h1>

              <p className="font-[family-name:var(--font-syne)] text-gradient-sunset text-lg sm:text-xl font-semibold mb-6">
                {project.tagline}
              </p>

              <p className="font-[family-name:var(--font-inter)] text-[#94A3B8] text-base sm:text-lg leading-relaxed mb-8">
                {project.longDescription}
              </p>

              {/* Quick Specs / Architecture Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-[#0F172A]/70 border border-white/10 backdrop-blur-md mb-8">
                <div>
                  <span className="block font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider text-[#94A3B8] mb-1">
                    Platform
                  </span>
                  <span className="font-[family-name:var(--font-syne)] text-xs sm:text-sm font-semibold text-[#F8FAFC]">
                    Flutter &amp; Dart
                  </span>
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider text-[#94A3B8] mb-1">
                    State &amp; Router
                  </span>
                  <span className="font-[family-name:var(--font-syne)] text-xs sm:text-sm font-semibold text-[#F8FAFC]">
                    Riverpod · GoRouter
                  </span>
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider text-[#94A3B8] mb-1">
                    Storage
                  </span>
                  <span className="font-[family-name:var(--font-syne)] text-xs sm:text-sm font-semibold text-[#F8FAFC]">
                    Drift (SQLite)
                  </span>
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider text-[#94A3B8] mb-1">
                    AI Engines
                  </span>
                  <span className="font-[family-name:var(--font-syne)] text-xs sm:text-sm font-semibold text-[#F8FAFC]">
                    ML Kit &amp; Gemini
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-[family-name:var(--font-syne)] font-bold text-sm bg-gradient-to-r from-[#22D3EE] via-[#06B6D4] to-[#F59E0B] text-[#07090E] rounded-full px-8 py-3.5 hover:shadow-lg hover:shadow-[#22D3EE]/30 active:scale-[0.97] transition-all duration-300"
                >
                  <GithubIcon size={16} />
                  View Source Code
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-syne)] font-medium text-sm border border-white/20 text-[#F8FAFC] rounded-full px-7 py-3.5 hover:border-[#22D3EE] hover:bg-[#22D3EE]/10 hover:text-[#22D3EE] active:scale-[0.97] transition-all duration-300"
                >
                  Explore Screens
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Right Column: Hero Smartphone Mockup with 3D Holographic Scene */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Interactive 3D Holographic Scene Layer */}
              <div
                className="absolute -inset-16 z-0 pointer-events-none opacity-85"
                aria-hidden="true"
              >
                <CaseStudy3DScene type="scanner" />
              </div>

              <div className="relative z-10 w-[280px] sm:w-[310px]">
                {/* Glow ring */}
                <div
                  className="absolute -inset-4 rounded-[50px] blur-2xl opacity-30"
                  style={{
                    background:
                      'radial-gradient(circle, #22D3EE 0%, #F59E0B 60%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Hardware Bezel */}
                <div
                  className="relative rounded-[44px] p-2.5 shadow-2xl overflow-hidden border border-white/10"
                  style={{
                    background:
                      'linear-gradient(145deg, #1E293B 0%, #0F172A 50%, #07090E 100%)',
                    boxShadow:
                      '0 40px 70px -15px rgba(0,0,0,0.9), inset 0 1px 1px rgba(34,211,238,0.3)',
                  }}
                >
                  {/* Screen Frame */}
                  <div
                    className="relative rounded-[36px] overflow-hidden bg-[#07090E]"
                    style={{ aspectRatio: '9/19.5' }}
                  >
                    {/* Status Bar */}
                    <div className="relative flex items-center justify-between px-5 pt-3 pb-1 z-20 bg-[#07090E]/60 backdrop-blur-sm">
                      <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#F8FAFC]/80">
                        9:41
                      </span>
                      <div className="w-20 h-4 rounded-full bg-black/80" />
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                        <span className="w-3 h-1.5 rounded-sm border border-white/60" />
                      </div>
                    </div>

                    {/* App Image */}
                    <Image
                      src="/screenshots/ai-expense-tracker/Dashboard.jpg"
                      alt="AI Expense Scanner Dashboard"
                      fill
                      className="object-cover object-top"
                      sizes="320px"
                      priority
                    />

                    {/* Glass Sheen */}
                    <div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, transparent 40%)',
                      }}
                    />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <span className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-widest uppercase text-[#94A3B8]">
                    Interactive Dashboard Screen
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Architecture Pillars (3 Cards) ── */}
          <section className="mb-24">
            <div className="mb-10">
              <span className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase text-[#22D3EE] block mb-2 font-semibold">
                Architecture &amp; Intelligence
              </span>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#F8FAFC] text-3xl sm:text-4xl"
              >
                Engineered for speed, privacy, and insight.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-7 rounded-2xl bg-[#0F172A]/70 border border-white/10 backdrop-blur-md hover:border-[#22D3EE]/40 hover:shadow-xl hover:shadow-[#22D3EE]/10 transition-all duration-300">
                <div className="p-3 w-fit rounded-xl bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30 mb-5">
                  <Scan size={24} />
                </div>
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg text-[#F8FAFC] mb-3">
                  On-Device ML Kit OCR
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-sm text-[#94A3B8] leading-relaxed">
                  Extracts totals, merchant names, and purchase dates locally from physical receipts without cloud latency or third-party image uploads.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#0F172A]/70 border border-white/10 backdrop-blur-md hover:border-[#F59E0B]/40 hover:shadow-xl hover:shadow-[#F59E0B]/10 transition-all duration-300">
                <div className="p-3 w-fit rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 mb-5">
                  <Bot size={24} />
                </div>
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg text-[#F8FAFC] mb-3">
                  Gemini AI Copilot
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-sm text-[#94A3B8] leading-relaxed">
                  Conversational financial assistant answers queries about monthly spending spikes, evaluates budgets, and identifies cost-saving trends.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#0F172A]/70 border border-white/10 backdrop-blur-md hover:border-[#F43F5E]/40 hover:shadow-xl hover:shadow-[#F43F5E]/10 transition-all duration-300">
                <div className="p-3 w-fit rounded-xl bg-[#F43F5E]/15 text-[#F43F5E] border border-[#F43F5E]/30 mb-5">
                  <Database size={24} />
                </div>
                <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg text-[#F8FAFC] mb-3">
                  100% Offline SQLite (Drift)
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-sm text-[#94A3B8] leading-relaxed">
                  Type-safe reactive database queries using Drift. Keeps financial transactions private, instantly available without Wi-Fi, and synchronized.
                </p>
              </div>
            </div>
          </section>

          {/* ── App Screenshots Gallery (Device Frames) ── */}
          <section id="gallery" className="mb-24 scroll-mt-28">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase text-[#22D3EE] block mb-2 font-semibold">
                  Visual Tour
                </span>
                <h2
                  className="font-[family-name:var(--font-playfair)] text-[#F8FAFC] text-3xl sm:text-4xl"
                >
                  Complete Screen Gallery
                </h2>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[#94A3B8] max-w-xs">
                All 8 genuine production Flutter screens rendered on Android &amp; iOS Material 3.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
              {screenDetails.map((item, idx) => (
                <div
                  key={item.file}
                  className="group relative flex flex-col rounded-3xl p-3 bg-[#0F172A]/70 border border-white/10 backdrop-blur-md hover:bg-[#0F172A] hover:border-[#22D3EE]/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/40"
                >
                  {/* Smartphone Frame Container */}
                  <div
                    className="relative rounded-[22px] overflow-hidden bg-[#07090E] border border-white/10 mb-3"
                    style={{ aspectRatio: '9/19' }}
                  >
                    <Image
                      src={`/screenshots/ai-expense-tracker/${item.file}`}
                      alt={`AI Expense Scanner — ${item.label}`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="px-1 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-[family-name:var(--font-syne)] font-bold text-xs sm:text-sm text-[#F8FAFC]">
                          {item.label}
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#22D3EE]">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="font-[family-name:var(--font-inter)] text-[11px] text-[#94A3B8] leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Key Features Checklist ── */}
          <section className="mb-24 p-8 sm:p-12 rounded-3xl bg-[#0F172A]/70 border border-white/10 backdrop-blur-md">
            <div className="max-w-2xl mb-10">
              <span className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase text-[#22D3EE] block mb-2 font-semibold">
                Feature Breakdown
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-[#F8FAFC] text-3xl sm:text-4xl">
                What makes this app work.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {project.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#22D3EE]/30 transition-colors"
                >
                  <CheckCircle2
                    size={18}
                    className="text-[#22D3EE] shrink-0 mt-0.5"
                  />
                  <span className="font-[family-name:var(--font-inter)] text-sm sm:text-base text-[#F8FAFC]/90 leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Full Tech Stack ── */}
          <section className="mb-24">
            <span className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase text-[#22D3EE] block mb-4 font-semibold">
              Technologies &amp; Libraries
            </span>
            <div className="flex flex-wrap gap-2.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-[family-name:var(--font-jetbrains)] text-xs text-[#F8FAFC] bg-[#0F172A]/80 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm hover:border-[#22D3EE]/40 hover:text-[#22D3EE] transition-all"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* ── Next Case Study Banner & Bottom CTA ── */}
          <section className="rounded-3xl p-8 sm:p-12 border border-[#22D3EE]/30 bg-gradient-to-r from-[#0F172A] via-[#1E1B4B]/70 to-[#07090E] backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl shadow-[#22D3EE]/10">
            <div>
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.2em] uppercase text-[#22D3EE] block mb-2 font-semibold">
                Next Case Study
              </span>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#F8FAFC] mb-2">
                {nextProject.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-sm text-[#94A3B8] max-w-md">
                {nextProject.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/projects/${nextProject.slug}`}
                className="inline-flex items-center gap-2 font-[family-name:var(--font-syne)] font-bold text-sm bg-gradient-to-r from-[#22D3EE] to-[#F59E0B] text-[#07090E] rounded-full px-7 py-3.5 hover:shadow-lg hover:shadow-[#22D3EE]/30 active:scale-[0.97] transition-all duration-300"
              >
                Read Case Study
                <ArrowRight size={15} />
              </Link>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-[family-name:var(--font-syne)] font-medium text-sm border border-white/20 text-[#F8FAFC] rounded-full px-6 py-3.5 hover:border-[#22D3EE] hover:bg-[#22D3EE]/10 hover:text-[#22D3EE] active:scale-[0.97] transition-all duration-300"
              >
                <GithubIcon size={16} />
                GitHub Repo
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
