import React from 'react';
import { soundFx } from '../lib/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-black py-16 px-6 md:px-12 border-t border-white/10 font-mono-tech text-xs text-neutral-400 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        {/* Left branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Logical Lords"
                className="w-full h-full object-contain logo-emblem-contour"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-cyber font-bold tracking-wider text-sm">
              LOGICAL LORDS
            </span>
          </div>

          <div className="space-y-1 text-xs text-neutral-500 leading-relaxed">
            <p>© 2026 LOGICAL LORDS</p>
            <p>FOUNDED BY SIX ARCHITECTS.</p>
            <p className="text-neutral-400 font-medium">VARUNRAJ P · VIJAY KUMAR K · SUDHARSAN C · VIGNESH R · VARUNAN K M · TAMIL SELVAN</p>
          </div>
        </div>

        {/* Center: Social links */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 tracking-widest text-xs">
          {['GITHUB', 'LINKEDIN', 'INSTAGRAM', 'EMAIL'].map((link) => (
            <a
              key={link}
              href={link === 'EMAIL' ? 'mailto:contact@logicallords.io' : '#'}
              onClick={() => soundFx.playClick()}
              className="text-neutral-400 hover:text-white transition-colors relative group py-1"
            >
              <span>{link}</span>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-white" />
            </a>
          ))}
        </div>

        {/* Right: Motto & Back to Top */}
        <div className="space-y-3 text-left md:text-right">
          <div className="text-neutral-300 tracking-widest text-xs font-semibold">
            STAY CURIOUS.
            <br />
            KEEP BUILDING.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="text-[10px] text-neutral-500 hover:text-white tracking-widest uppercase transition-colors cursor-pointer block"
          >
            [ BACK TO TOP ↑ ]
          </button>
        </div>
      </div>
    </footer>
  );
};
