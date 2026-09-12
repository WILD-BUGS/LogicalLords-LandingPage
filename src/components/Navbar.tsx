import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal } from 'lucide-react';
import { soundFx } from '../lib/audio';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const enabled = soundFx.toggle();
    setSoundEnabled(enabled);
  };

  const handleNavClick = (id: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { id: 'home', num: '01', label: 'HOME' },
    { id: 'work', num: '02', label: 'WORK' },
    { id: 'founders', num: '03', label: 'FOUNDERS' },
    { id: 'about', num: '04', label: 'ABOUT' },
    { id: 'contact', num: '05', label: 'CONTACT' }
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3.5'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 group text-left cursor-pointer"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Logical Lords Logo"
                className="w-full h-full object-contain logo-emblem-contour"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-cyber font-black text-sm sm:text-base tracking-wider uppercase text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-cyan-400 transition-all">
                  LOGICAL LORDS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-red-500 transition-colors animate-pulse" />
              </div>
              <span className="text-[9px] font-mono-tech tracking-[0.2em] text-neutral-500 uppercase -mt-0.5">
                ENGINEERING COLLECTIVE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-mono-tech text-xs tracking-widest">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => soundFx.playClick()}
                  className={`group relative py-1 transition-all cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 font-semibold drop-shadow-[0_0_10px_rgba(0,229,255,0.7)]'
                      : 'text-neutral-400 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]'
                  }`}
                >
                  <span className="text-neutral-500 mr-1.5 font-normal group-hover:text-red-400 transition-colors">[{item.num}]</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.9)] animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side Manifesto & Audio Controls */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-[10px] font-mono-tech leading-none text-right text-neutral-500 tracking-wider">
              <span className="block hover:text-cyan-300 transition-colors cursor-default">BUILD</span>
              <span className="block hover:text-cyan-300 transition-colors cursor-default">EXPLORE</span>
              <span className="block hover:text-cyan-300 transition-colors cursor-default">COLLABORATE</span>
              <span className="block text-white/80 font-semibold hover:text-red-400 transition-colors cursor-default">REPEAT.</span>
            </div>

            <button
              id="nav-audio-toggle"
              type="button"
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Cyber Audio FX' : 'Enable Cyber Audio FX'}
              className="p-2 border border-white/10 hover:border-cyan-400/80 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] text-neutral-400 hover:text-white transition-all rounded-xs cursor-pointer flex items-center gap-1.5 text-[10px] font-mono-tech"
            >
              {soundEnabled ? <Volume2 size={13} className="text-emerald-400" /> : <VolumeX size={13} />}
              <span className="hidden xl:inline">{soundEnabled ? 'SFX: ON' : 'SFX: OFF'}</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 text-neutral-400 hover:text-white"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 size={14} className="text-emerald-400" /> : <VolumeX size={14} />}
            </button>

            <button
              id="mobile-menu-button"
              type="button"
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 border border-white/20 text-white font-mono-tech text-xs tracking-widest flex items-center gap-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <>
                  <X size={14} />
                  <span>CLOSE</span>
                </>
              ) : (
                <>
                  <span className="font-bold">[ + ]</span>
                  <span>MENU</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-in fade-in duration-200"
        >
          <div className="space-y-6">
            <div className="text-[11px] font-mono-tech text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <Terminal size={12} />
              <span>NAVIGATION MATRIX // SYSTEM_READY</span>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full py-4 text-left font-mono-tech flex items-baseline justify-between group cursor-pointer"
                >
                  <span className="text-xl font-cyber tracking-wider text-white group-hover:translate-x-2 transition-transform">
                    {item.label}
                  </span>
                  <span className="text-xs text-neutral-500 group-hover:text-white transition-colors">
                    {item.num} /
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-3 font-mono-tech text-xs text-neutral-500">
            <p className="tracking-widest text-neutral-400">LOGICAL LORDS — ENGINEERING COLLECTIVE</p>
            <p className="text-[10px]">SIX FOUNDERS. INFINITE BUILDS.</p>
          </div>
        </div>
      )}
    </>
  );
};
