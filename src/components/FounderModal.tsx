import React from 'react';
import { X, Zap, Shield, Target, Award, Terminal } from 'lucide-react';
import { Founder } from '../types';
import { soundFx } from '../lib/audio';

interface FounderModalProps {
  founder: Founder | null;
  onClose: () => void;
}

export const FounderModal: React.FC<FounderModalProps> = ({ founder, onClose }) => {
  if (!founder) return null;

  return (
    <div
      id="founder-comic-modal"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in zoom-in-95 duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0d0d0f] border-4 border-black p-6 sm:p-10 shadow-[12px_12px_0px_0px_#000] my-8 overflow-hidden"
        style={{ borderColor: founder.accentColor }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Halftone Comic Background */}
        <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none" />

        {/* Top Comic Bar */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b-2 border-dashed border-white/20 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pr-3 border-r border-white/20">
              <img
                src="/logo.png"
                alt="Logical Lords Logo"
                className="w-5 h-5 object-contain logo-emblem-contour"
                referrerPolicy="no-referrer"
              />
              <span className="font-cyber font-bold text-[11px] tracking-wider text-white hidden sm:inline">
                LOGICAL LORDS
              </span>
            </div>
            <span
              className="font-comic text-sm tracking-wider px-3 py-1 text-black font-bold uppercase"
              style={{ backgroundColor: founder.accentColor }}
            >
              {founder.comicIssue}
            </span>
            <span className="font-mono-tech text-xs tracking-widest text-neutral-400">
              ORIGIN DOSSIER // {founder.number}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 bg-black border-2 border-white/20 hover:border-white text-white transition-colors cursor-pointer"
            aria-label="Close dossier"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Character Header */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-8">
          {/* Avatar Comic Silhouette / Card */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div
              className="relative w-44 h-48 sm:w-52 sm:h-56 bg-black border-3 border-black comic-border flex items-center justify-center overflow-hidden group"
              style={{ boxShadow: `6px 6px 0px 0px ${founder.accentColor}` }}
            >
              {/* Graphic Comic Burst */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(circle at center, ${founder.accentColor} 0%, transparent 70%)`
                }}
              />
              
              {/* Monogram/Avatar Art */}
              <div className="relative z-10 text-center">
                <span className="text-6xl sm:text-7xl font-comic font-black text-white drop-shadow-[3px_3px_0px_#000]">
                  {founder.codename}
                </span>
                <span className="block font-mono-tech text-[10px] tracking-widest text-neutral-400 mt-1">
                  NODE #{founder.number}
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="font-mono-tech text-xs text-neutral-400">ALIAS:</span>{' '}
              <span className="font-bold text-white text-sm">{founder.realName}</span>
            </div>
          </div>

          {/* Details and Superpower */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <span
                className="font-comic text-4xl sm:text-5xl font-black uppercase tracking-wide text-white drop-shadow-[2px_2px_0px_#000]"
                style={{ color: founder.accentColor }}
              >
                {founder.codename}
              </span>
              <p className="font-cyber text-sm tracking-widest text-white uppercase mt-1">
                {founder.role}
              </p>
            </div>

            {/* Comic Dialogue Bubble */}
            <div className="relative p-4 bg-black border-2 border-white/30 comic-border">
              <span className="absolute -top-3 left-4 px-2 bg-neutral-900 font-comic text-[11px] text-white uppercase tracking-wider">
                SIGNATURE CREED
              </span>
              <p className="font-display-title text-base sm:text-lg italic text-white font-medium">
                "{founder.quote}"
              </p>
            </div>

            {/* Superpower Callout */}
            <div className="p-3 bg-neutral-900/80 border-l-4" style={{ borderColor: founder.accentColor }}>
              <div className="flex items-center gap-1.5 font-comic text-xs uppercase tracking-wider mb-1" style={{ color: founder.accentColor }}>
                <Zap size={14} />
                <span>SIGNATURE SUPERPOWER</span>
              </div>
              <p className="text-xs text-neutral-200 font-mono-tech leading-relaxed">
                {founder.superpower}
              </p>
            </div>
          </div>
        </div>

        {/* Bio & Specialties */}
        <div className="relative z-10 space-y-6 pt-4 border-t-2 border-white/10">
          <div>
            <h4 className="font-comic text-lg uppercase text-white tracking-wider mb-2 flex items-center gap-2">
              <Shield size={16} style={{ color: founder.accentColor }} />
              <span>COLLECTIVE ORIGIN & CAPABILITIES</span>
            </h4>
            <p className="text-neutral-300 font-light text-xs sm:text-sm leading-relaxed">
              {founder.bio}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black p-4 border border-white/15">
            {Object.entries(founder.stats).map(([statName, val]) => (
              <div key={statName} className="font-mono-tech text-[10px]">
                <div className="flex justify-between text-neutral-400 uppercase mb-1">
                  <span>{statName}</span>
                  <span className="font-bold text-white">{val}</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800">
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${val}%`,
                      backgroundColor: founder.accentColor
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Hero Gear & Specialties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-neutral-950 border border-white/10 font-mono-tech text-xs">
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">HERO EQUIPMENT / TECH:</span>
              <span className="text-neutral-200 font-medium">{founder.heroGear}</span>
            </div>
            <div className="p-3 bg-neutral-950 border border-white/10 font-mono-tech text-xs">
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">CORE DOMAINS:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {founder.specialties.map((s) => (
                  <span key={s} className="text-[9px] px-1.5 py-0.5 bg-neutral-800 text-neutral-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Close Action */}
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-black font-comic text-sm tracking-wider uppercase border-2 border-white hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              DISMISS DOSSIER ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
