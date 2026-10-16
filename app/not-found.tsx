import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main
        id="main-content"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-28 pb-20 overflow-hidden bg-[#07090E]"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 30%, #0F172A 0%, #0B1120 50%, #07090E 85%)',
        }}
      >
        {/* ── Background Atmospheric Effects ── */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)',
            }}
          />
          {/* Circuit Grid */}
          <div className="absolute inset-0 circuit-grid opacity-[0.035]" />
          {/* Giant 404 watermark */}
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-playfair)] text-[#22D3EE]/[0.03] select-none text-[22rem] leading-none pointer-events-none"
            aria-hidden="true"
          >
            404
          </span>
        </div>

        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 p-3.5 rounded-2xl bg-[#0F172A]/80 border border-[#22D3EE]/30 text-[#22D3EE] mb-6 backdrop-blur-md shadow-lg shadow-[#22D3EE]/20">
            <Compass size={26} className="text-[#22D3EE]" />
          </div>

          <span className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.25em] uppercase text-[#22D3EE] mb-3 font-semibold">
            404 — Page Not Found
          </span>

          <h1
            className="font-[family-name:var(--font-playfair)] text-[#F8FAFC] mb-5 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)' }}
          >
            Off the Radar
          </h1>

          <p className="font-[family-name:var(--font-inter)] text-[#94A3B8] text-base sm:text-lg mb-10 leading-relaxed">
            The page or project route you are looking for has been moved or does not exist. Explore the portfolio below.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-[family-name:var(--font-syne)] font-bold text-sm bg-gradient-to-r from-[#22D3EE] via-[#06B6D4] to-[#F59E0B] text-[#07090E] rounded-full px-8 py-4 hover:shadow-lg hover:shadow-[#22D3EE]/30 active:scale-[0.97] transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Return to Portfolio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
