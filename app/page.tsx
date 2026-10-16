import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import PhoneShowcase from '@/components/sections/PhoneShowcase';
import ProjectGrid from '@/components/sections/ProjectGrid';
import Skills from '@/components/sections/Skills';
import About from '@/components/sections/About';
import Approach from '@/components/sections/Approach';
import Opportunities from '@/components/sections/Opportunities';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-[#07090E]">
        {/* Cinematic 3D hero with animated name reveal & 3D character */}
        <Hero />
        
        {/* 3D smartphone showcase — featured Flutter apps */}
        <PhoneShowcase />
        
        {/* All-projects grid with 3D tilt cards */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
        <ProjectGrid />
        
        {/* Technical skills */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
        <Skills />
        
        {/* About section */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
        <About />
        
        {/* Development approach */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
        <Approach />
        
        {/* Opportunities */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
        <Opportunities />
        
        {/* Contact */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
