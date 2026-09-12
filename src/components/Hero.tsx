import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Video, Eye, EyeOff, Sparkles } from 'lucide-react';
import { AsciiVortexCanvas } from './AsciiVortexCanvas';
import { soundFx } from '../lib/audio';

interface HeroProps {
  scrollProgress: number;
  onExploreClick: () => void;
  onBuildClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollProgress, onExploreClick, onBuildClick }) => {
  const [videoActive, setVideoActive] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string>(
    'https://assets.mixkit.co/videos/preview/mixkit-futuristic-tunnel-with-neon-lines-31711-large.mp4'
  );
  const [showVideoConfig, setShowVideoConfig] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full min-h-[100vh] lg:min-h-[105vh] bg-black text-white flex flex-col justify-between overflow-hidden pt-24 pb-12"
    >
      {/* Optional Desaturated Video Layer Behind or Blended With ASCII */}
      {videoActive && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-35 mix-blend-screen filter grayscale contrast-125">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={videoUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        </div>
      )}

      {/* Real-time 3D Three.js ASCII / Numeric Vortex Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <AsciiVortexCanvas scrollProgress={scrollProgress} videoOverlay={videoActive} />
      </div>

      {/* CRT Scanline and vignette overlay */}
      <div className="absolute inset-0 z-15 pointer-events-none scanline-overlay opacity-30" />
      <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)]" />

      {/* Top Meta Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 pt-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3 text-[11px] font-mono-tech tracking-widest text-neutral-400 uppercase">
          <span className="inline-block w-2 h-2 bg-white rounded-full animate-ping" />
          <span>SYS.NODE: ONLINE</span>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline text-neutral-500">ENGINEERING COLLECTIVE · 6 NODES</span>
        </div>

        {/* Video Mode Controls */}
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setVideoActive(!videoActive);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono-tech border tracking-wider transition-all cursor-pointer ${
              videoActive
                ? 'border-white/40 bg-white/10 text-white'
                : 'border-white/10 text-neutral-500 hover:text-white'
            }`}
            title="Toggle desaturated cinematic background video overlay"
          >
            <Video size={11} />
            <span>{videoActive ? 'VIDEO LAYER: ACTIVE' : 'VIDEO LAYER: OFF'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setShowVideoConfig(!showVideoConfig);
            }}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
            title="Configure Video Stream URL"
          >
            {showVideoConfig ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>

          {/* Quick Popover for Custom Video URL */}
          {showVideoConfig && (
            <div className="absolute top-8 right-0 w-72 bg-neutral-950 border border-white/20 p-3 shadow-2xl z-30 font-mono-tech text-xs animate-in fade-in duration-150">
              <label className="block text-[10px] text-neutral-400 mb-1 tracking-wider uppercase">
                Custom Video Source URL
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://...mp4"
                className="w-full bg-black border border-white/20 px-2 py-1 text-white text-[11px] focus:outline-none focus:border-white mb-2"
              />
              <div className="flex justify-between items-center text-[9px] text-neutral-500">
                <span>Supports MP4 / WebM video streams</span>
                <button
                  type="button"
                  onClick={() => setShowVideoConfig(false)}
                  className="text-white hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 flex-1 flex flex-col justify-center my-auto py-12 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            {/* Eyebrow / Collective definition */}
            <div className="space-y-2 pointer-events-auto">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-black/85 border border-white/25 backdrop-blur-md rounded-full shadow-[0_0_25px_rgba(255,48,48,0.25)] hover:border-cyan-400/60 transition-all">
                <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                  <img
                    src="/logo.png"
                    alt="Logical Lords Emblem"
                    className="w-full h-full object-contain logo-emblem-contour"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-cyber font-bold text-xs tracking-widest text-white uppercase group-hover:text-cyan-300 transition-colors">
                  LOGICAL LORDS
                </span>
                <span className="text-white/30 text-[10px]">·</span>
                <span className="font-mono-tech text-[10px] tracking-wider text-cyan-400 uppercase hidden sm:inline group-hover:text-cyan-200">
                  DUAL-ENGINE CORE // 6 FOUNDERS
                </span>
              </div>

              <p className="font-mono-tech text-xs md:text-sm tracking-[0.22em] text-neutral-400 uppercase hover:text-cyan-300 hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.6)] transition-all cursor-default">
                A SOFTWARE DEVELOPMENT & INTELLIGENCE COLLECTIVE
              </p>
              <div className="font-mono-tech text-[10px] sm:text-xs tracking-[0.16em] text-neutral-500 uppercase flex flex-wrap gap-x-2 gap-y-1">
                {['VARUNRAJ P', 'VIJAY KUMAR K', 'SUDHARSAN C', 'VIGNESH R', 'VARUNAN K M', 'TAMIL SELVAN'].map((name, i) => (
                  <span
                    key={name}
                    className="hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] transition-all cursor-default"
                  >
                    {name}{i < 5 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Massive architectural statement */}
            <div className="relative group/title cursor-default">
              <h1
                id="hero-massive-title"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight uppercase leading-[0.88] select-none text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-300 group-hover/title:text-transparent group-hover/title:bg-clip-text group-hover/title:bg-gradient-to-r group-hover/title:from-cyan-300 group-hover/title:via-white group-hover/title:to-red-400 group-hover/title:drop-shadow-[0_0_40px_rgba(0,229,255,0.6)]"
              >
                WE BUILD
                <br />
                <span className="text-white group-hover/title:text-cyan-100 transition-colors">WHAT SHOULD</span>
                <br />
                <span className="text-white relative inline-block group-hover/title:text-red-200 transition-colors">
                  EXIST.
                  <span className="absolute -bottom-2 left-0 w-24 sm:w-32 h-[3px] bg-white group-hover/title:bg-cyan-400 group-hover/title:shadow-[0_0_15px_rgba(0,229,255,0.9)] transition-all" />
                </span>
              </h1>
            </div>

            {/* Supporting Manifesto Copy */}
            <div className="pt-2 max-w-xl space-y-3">
              <p className="font-display-title text-base sm:text-lg text-neutral-300 font-light leading-relaxed hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all cursor-default">
                Engineering digital products with clarity, precision and raw creative velocity.
              </p>
              <p className="font-mono-tech text-xs sm:text-sm text-neutral-400 tracking-wide hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] transition-all cursor-default">
                From first principles to planet-scale execution — we design, build and ship what matters.
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 pointer-events-auto">
              <button
                id="hero-cta-build"
                type="button"
                onClick={() => {
                  soundFx.playWarp();
                  onBuildClick();
                }}
                onMouseEnter={() => soundFx.playClick()}
                className="group relative px-6 sm:px-8 py-3.5 bg-white text-black font-mono-tech text-xs sm:text-sm tracking-widest uppercase font-semibold transition-all hover:bg-neutral-100 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,229,255,0.6),0_0_10px_rgba(255,42,42,0.4)] active:scale-95 cursor-pointer flex items-center gap-3 border border-transparent"
              >
                <span>[ LET'S BUILD</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1.5 transition-transform"
                />
                <span>]</span>
              </button>

              <button
                id="hero-cta-explore"
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onExploreClick();
                }}
                className="px-5 py-3.5 border border-white/20 hover:border-cyan-400/80 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] text-neutral-300 hover:text-cyan-200 font-mono-tech text-xs sm:text-sm tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles size={13} className="text-white/60 group-hover:text-cyan-300" />
                <span>THE PORTFOLIO</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Floating Logo Emblem - Adapted to Organic Crest Shape */}
          <div className="hidden lg:flex lg:col-span-4 flex-col items-center justify-center pointer-events-auto">
            <div className="relative group flex flex-col items-center justify-center">
              {/* Dual Red & Cyan ambient flares tuned to left/right halves */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-48 bg-red-600/25 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/40 transition-colors duration-500" />
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/40 transition-colors duration-500" />

              {/* Concentric subtle radar / orbit rings conforming to crest geometry */}
              <div className="absolute w-72 h-72 rounded-full border border-white/5 group-hover:border-white/15 transition-colors duration-700 pointer-events-none" />
              <div className="absolute w-60 h-60 rounded-full border border-dashed border-white/10 group-hover:border-cyan-400/30 animate-[spin_60s_linear_infinite] pointer-events-none" />

              {/* Central Floating Logo Display - Completely transparent, no square or box */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Logical Lords Insignia Crest"
                  className="w-full h-full object-contain logo-emblem-contour transform group-hover:scale-110 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Dynamic Caption Under Emblem */}
              <div className="mt-4 text-center space-y-1 pointer-events-none">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-red-500" />
                  <span className="font-cyber font-bold text-xs tracking-widest text-white uppercase group-hover:text-cyan-300 transition-colors">
                    LOGICAL LORDS
                  </span>
                  <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-cyan-400" />
                </div>
                <p className="font-mono-tech text-[10px] text-neutral-400 tracking-widest uppercase">
                  GUILD CREST // DUAL-ENGINE CORE
                </p>
                <p className="font-mono-tech text-[9px] text-neutral-500">
                  RED PLASMA (L) × BLUE LIGHTNING (R)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Status Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto">
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            onExploreClick();
          }}
          className="group flex items-center gap-3 font-mono-tech text-xs tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="p-1 border border-white/20 group-hover:border-white transition-colors">
            <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </span>
          <span>SCROLL TO EXPLORE ↓</span>
        </button>

        <div className="flex items-center gap-6 text-[10px] font-mono-tech text-neutral-500 tracking-widest">
          <div>
            <span className="text-neutral-400">FPS:</span> 60.0
          </div>
          <div>
            <span className="text-neutral-400">LATENCY:</span> 12ms
          </div>
          <div className="hidden md:block">
            <span className="text-neutral-400">LOCATION:</span> GLOBAL EDGE MESH
          </div>
        </div>
      </div>
    </section>
  );
};
