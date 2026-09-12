import React, { useState, useEffect } from 'react';
import { soundFx } from '../lib/audio';

export const CinematicBreak: React.FC = () => {
  const [binaryChars, setBinaryChars] = useState<{ id: number; char: string; top: string; left: string; delay: string; opacity: string }[]>([]);

  useEffect(() => {
    // Generate sporadic floating digital bits
    const items = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      char: i % 2 === 0 ? '0' : '1',
      top: `${(i * 17) % 88 + 6}%`,
      left: `${(i * 23) % 90 + 5}%`,
      delay: `${(i * 0.15).toFixed(2)}s`,
      opacity: (0.15 + (i % 5) * 0.15).toFixed(2)
    }));
    setBinaryChars(items);
  }, []);

  return (
    <div className="relative w-full bg-black py-28 sm:py-36 md:py-48 overflow-hidden select-none border-t border-white/10">
      {/* Absolute Black Canvas with Sparse Floating ASCII Binary Digits */}
      <div className="absolute inset-0 pointer-events-none">
        {binaryChars.map((bit) => (
          <span
            key={bit.id}
            className="absolute font-mono-tech text-xs sm:text-sm text-white/40 animate-pulse"
            style={{
              top: bit.top,
              left: bit.left,
              animationDelay: bit.delay,
              opacity: bit.opacity
            }}
          >
            {bit.char}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12">
        {/* The 3 Real Statements */}
        <div className="space-y-3 font-mono-tech text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-neutral-500">
          <p className="hover:text-white transition-colors duration-300">REAL PRODUCTS.</p>
          <p className="hover:text-white transition-colors duration-300">REAL SYSTEMS.</p>
          <p className="text-white font-semibold">REAL PEOPLE.</p>
        </div>

        {/* Binary Matrix Flicker Divider */}
        <div className="flex items-center justify-center gap-2 text-white/20 font-mono-tech text-xs tracking-widest">
          <span>[ 00110001 00110110 ]</span>
        </div>

        {/* The Seismic Shift Reveal */}
        <div className="pt-4 space-y-6">
          <div className="flex justify-center">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
              {/* Organic dual-glow aura conforming behind the crest */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/30 via-transparent to-cyan-500/30 blur-2xl animate-pulse pointer-events-none" />
              <img
                src="/logo.png"
                alt="Logical Lords Insignia"
                className="w-full h-full object-contain logo-emblem-contour transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="inline-block px-3 py-1 bg-white/10 text-white font-mono-tech text-[11px] tracking-[0.3em] uppercase border border-white/20">
            // GUILD MATRIX UNLOCKED
          </div>

          <h2
            id="the-six-massive-heading"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tight text-white font-cyber drop-shadow-[0_0_60px_rgba(255,255,255,0.2)]"
          >
            LOGICAL LORDS
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl font-display-title font-light tracking-wide text-neutral-300 uppercase">
            SIX ARCHITECTS. ONE PROTOCOL.
          </p>

          <p className="max-w-xl mx-auto font-mono-tech text-xs sm:text-sm text-neutral-400 tracking-wider pt-2">
            VarunRaj P · Vijay Kumar K · Sudharsan C · Vignesh R · Varunan K M · Tamil Selvan.
          </p>
        </div>
      </div>
    </div>
  );
};
