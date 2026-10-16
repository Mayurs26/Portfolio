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
      <main id="main-content" className="relative bg-[#06080E] text-[#F8FAFC]">
        {/* Cinematic 3D hero with animated name reveal & 3D character */}
        <Hero />
        
        {/* 3D smartphone showcase — featured Flutter apps */}
        <PhoneShowcase />
        
        {/* All-projects grid with 3D tilt cards */}
        <ProjectGrid />
        
        {/* Technical skills */}
        <Skills />
        
        {/* About section */}
        <About />
        
        {/* Development approach */}
        <Approach />
        
        {/* Opportunities */}
        <Opportunities />
        
        {/* Contact */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
