import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollTransition } from './components/ScrollTransition';
import { Capabilities } from './components/Capabilities';
import { Work } from './components/Work';
import { CinematicBreak } from './components/CinematicBreak';
import { Founders } from './components/Founders';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { MouseGlowSpotlight, GlowPreset } from './components/MouseGlowSpotlight';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [glowPreset, setGlowPreset] = useState<GlowPreset>('lords');

  // Monitor scroll progress for dynamic vortex compression and active section updates
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1.5);
      setScrollProgress(progress);

      // Determine active section for navbar
      const sections = ['home', 'work', 'founders', 'about', 'contact'];
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-display-title">
      {/* Diminished Atmospheric Ambient Background Glow: Subtle Red on Left, Subtle Blue on Right */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
        {/* Left Side: Diminished Red Glow */}
        <div
          className="absolute -left-[18vw] top-[15%] w-[48vw] max-w-[750px] h-[65vh] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.16) 0%, rgba(185, 28, 28, 0.07) 48%, transparent 75%)',
          }}
        />
        <div
          className="absolute -left-[12vw] bottom-[12%] w-[40vw] max-w-[600px] h-[55vh] rounded-full blur-[130px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.12) 0%, rgba(153, 27, 27, 0.05) 50%, transparent 75%)',
          }}
        />

        {/* Right Side: Diminished Blue Glow */}
        <div
          className="absolute -right-[18vw] top-[20%] w-[48vw] max-w-[750px] h-[65vh] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.16) 0%, rgba(30, 64, 175, 0.07) 48%, transparent 75%)',
          }}
        />
        <div
          className="absolute -right-[12vw] bottom-[16%] w-[40vw] max-w-[600px] h-[55vh] rounded-full blur-[130px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.12) 0%, rgba(3, 105, 161, 0.05) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* Interactive Mouse Hover Chromatic Glow & Torch */}
      <MouseGlowSpotlight
        currentPreset={glowPreset}
        onPresetChange={setGlowPreset}
      />

      {/* Fast Initializer Boot Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Global Fixed Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        {/* 01. Hero with Real-Time 3D ASCII/Numeric Vortex & Video Integration */}
        <Hero
          scrollProgress={scrollProgress}
          onExploreClick={() => scrollToSection('work')}
          onBuildClick={() => scrollToSection('contact')}
        />

        {/* 02. Sequential Scroll Transition: IDEAS → CODE → PRODUCT → IMPACT */}
        <ScrollTransition progress={scrollProgress} />

        {/* 03. Engineering Capabilities */}
        <Capabilities />

        {/* 04. Selected Work with Asymmetric Cards */}
        <Work />

        {/* 05. The Cinematic Blackout Transition to THE SIX */}
        <CinematicBreak />

        {/* 06. The Founders: Deliberate Superhero / Comic Universe Mode */}
        <Founders />

        {/* 07. About Collective: Why Six?, Pipeline Flow & 6-Step Process */}
        <About />

        {/* 08. Contact & ASCII Portal */}
        <Contact />
      </main>

      {/* 09. Minimal Cybernetic Footer */}
      <Footer />
    </div>
  );
}
