import React, { useState } from 'react';
import { Sparkles, Zap, ChevronRight, BookOpen, Star } from 'lucide-react';
import { FOUNDERS } from '../lib/asciiData';
import { Founder } from '../types';
import { FounderModal } from './FounderModal';
import { soundFx } from '../lib/audio';

export const Founders: React.FC = () => {
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);
  const [hoveredFounderId, setHoveredFounderId] = useState<string | null>(null);

  const handleFounderClick = (f: Founder) => {
    soundFx.playComicZap();
    setSelectedFounder(f);
  };

  return (
    <section
      id="founders"
      className="relative w-full bg-[#070709] py-28 md:py-40 overflow-hidden border-b-4 border-black"
    >
      {/* Comic Halftone Texture and Dramatic Lighting Background */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* Comic Ink Border Accents */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-blue-500" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Founders Comic Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <div className="flex justify-center mb-2">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-red-600/25 rounded-full blur-xl pointer-events-none" />
              <img
                src="/logo.png"
                alt="Logical Lords Official Emblem"
                className="w-full h-full object-contain logo-emblem-contour"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border-2 border-white/30 text-white font-comic text-xs uppercase tracking-widest comic-border">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span>LOGICAL LORDS ORIGIN DOSSIERS // ISSUE #01</span>
            <Star size={12} className="text-amber-400 fill-amber-400" />
          </div>

          <h2
            id="founders-section-title"
            className="text-5xl sm:text-7xl md:text-8xl font-comic font-black tracking-wide uppercase text-white drop-shadow-[4px_4px_0px_#000]"
          >
            THE FOUNDERS
          </h2>

          <p className="font-cyber text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-neutral-200">
            SIX MINDS. ONE GUILD. INFINITE BUILDS.
          </p>

          <p className="text-neutral-400 font-mono-tech text-xs sm:text-sm max-w-xl mx-auto">
            VarunRaj P · Vijay Kumar K · Sudharsan C · Vignesh R · Varunan K M · Tamil Selvan.
            United under the banner of Logical Lords.
          </p>
        </div>

        {/* Comic Panels Poster Grid (Angled Comic Panels) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 items-stretch">
          {FOUNDERS.map((founder, index) => {
            const isHovered = hoveredFounderId === founder.id;
            // Alternating perspective tilt for comic poster feel: -1deg, +1.5deg, -1.5deg, +1deg, etc.
            const baseRotations = [
              '-rotate-1 hover:rotate-0',
              'rotate-1.5 hover:rotate-0',
              '-rotate-1.5 hover:rotate-0',
              'rotate-1 hover:rotate-0',
              '-rotate-1 hover:rotate-0',
              'rotate-1.5 hover:rotate-0'
            ];
            const rotClass = baseRotations[index % baseRotations.length];

            return (
              <div
                key={founder.id}
                id={`founder-panel-${founder.id}`}
                onClick={() => handleFounderClick(founder)}
                onMouseEnter={() => {
                  soundFx.playClick();
                  setHoveredFounderId(founder.id);
                }}
                onMouseLeave={() => setHoveredFounderId(null)}
                className={`relative group bg-[#0e0e12] border-3 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden transform rounded-xs ${rotClass} ${
                  isHovered
                    ? 'scale-104 z-20'
                    : 'hover:scale-102'
                }`}
                style={{
                  borderColor: isHovered ? founder.accentColor : '#1f1f23',
                  boxShadow: isHovered
                    ? `0 0 40px ${founder.accentColor}66, 0 0 15px ${founder.accentColor}33, 8px 8px 0px #000`
                    : '6px 6px 0px 0px #000'
                }}
              >
                {/* Comic Card Halftone Pattern */}
                <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none" />

                {/* Accent Color Glow on Hover */}
                <div
                  className={`absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl transition-opacity duration-300 pointer-events-none ${
                    isHovered ? 'opacity-55' : 'opacity-0'
                  }`}
                  style={{ backgroundColor: founder.accentColor }}
                />

                {/* Top Comic Bar (Number & Role Tag) */}
                <div className="relative z-10 flex items-center justify-between pb-4 border-b-2 border-black/80 font-mono-tech mb-6">
                  <span className="font-comic text-2xl font-black text-white/40 group-hover:text-white transition-colors">
                    {founder.number}
                  </span>
                  <span
                    className="font-comic text-xs uppercase px-2.5 py-0.5 text-black font-bold tracking-wider"
                    style={{ backgroundColor: founder.accentColor }}
                  >
                    {founder.role}
                  </span>
                </div>

                {/* Character Silhouette / Portrait Panel */}
                <div className="relative z-10 my-4 py-8 bg-black/60 border-2 border-black flex flex-col items-center justify-center overflow-hidden">
                  {/* Subtle comic burst radial */}
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, ${founder.accentColor} 0%, transparent 70%)`
                    }}
                  />

                  <div className="relative z-10 text-center">
                    <span
                      className="font-comic text-5xl sm:text-6xl font-black uppercase tracking-wider block transition-transform duration-300 group-hover:scale-110 drop-shadow-[3px_3px_0px_#000]"
                      style={{ color: isHovered ? founder.accentColor : '#ffffff' }}
                    >
                      {founder.codename}
                    </span>
                    <span className="font-mono-tech text-[11px] text-neutral-400 tracking-widest uppercase block mt-1">
                      {founder.realName}
                    </span>
                  </div>

                  {/* Comic particles indicator on hover */}
                  {isHovered && (
                    <div className="absolute top-2 right-2 text-xs animate-bounce" style={{ color: founder.accentColor }}>
                      ★
                    </div>
                  )}
                </div>

                {/* Quote Bubble */}
                <div className="relative z-10 my-3 p-3 bg-black border-2 border-white/10 group-hover:border-white/30 transition-colors">
                  <p className="font-display-title text-sm sm:text-base italic text-white font-medium text-center">
                    "{founder.quote}"
                  </p>
                </div>

                {/* Power & Dossier Footer */}
                <div className="relative z-10 pt-4 border-t-2 border-black/80 flex items-center justify-between font-mono-tech text-xs">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[10px]">
                    <Zap size={12} style={{ color: founder.accentColor }} />
                    <span className="truncate max-w-[170px]">{founder.superpower.split(':')[0]}</span>
                  </div>

                  <div
                    className="flex items-center gap-1 text-[11px] font-comic tracking-wider uppercase font-bold text-white group-hover:translate-x-1 transition-transform"
                    style={{ color: isHovered ? founder.accentColor : '#fff' }}
                  >
                    <span>DOSSIER</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Prompt below grid */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black border border-white/20 text-neutral-300 font-mono-tech text-xs tracking-wider">
            <BookOpen size={14} className="text-amber-400" />
            <span>CLICK ANY FOUNDER FOR HIGH-RES DOSSIER, STATS & ORIGIN CODE</span>
          </div>
        </div>
      </div>

      {/* Founder Dossier Modal */}
      <FounderModal
        founder={selectedFounder}
        onClose={() => setSelectedFounder(null)}
      />
    </section>
  );
};
