import React, { useState } from 'react';
import { Cpu, Globe, Smartphone, Binary, Layers } from 'lucide-react';
import { CAPABILITIES } from '../lib/asciiData';
import { soundFx } from '../lib/audio';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Globe,
  Smartphone,
  Binary,
  Layers
};

const COLOR_ACCENTS: Record<string, { border: string; glow: string; text: string; bg: string; shadow: string }> = {
  '01': { border: 'border-cyan-400', glow: 'shadow-[0_0_35px_rgba(0,229,255,0.25)]', text: 'text-cyan-400', bg: 'bg-cyan-400', shadow: '#00e5ff' },
  '02': { border: 'border-purple-400', glow: 'shadow-[0_0_35px_rgba(192,132,252,0.25)]', text: 'text-purple-400', bg: 'bg-purple-400', shadow: '#c084fc' },
  '03': { border: 'border-emerald-400', glow: 'shadow-[0_0_35px_rgba(52,211,153,0.25)]', text: 'text-emerald-400', bg: 'bg-emerald-400', shadow: '#34d399' },
  '04': { border: 'border-amber-400', glow: 'shadow-[0_0_35px_rgba(251,191,36,0.25)]', text: 'text-amber-400', bg: 'bg-amber-400', shadow: '#fbbf24' },
  '05': { border: 'border-red-400', glow: 'shadow-[0_0_35px_rgba(248,113,113,0.25)]', text: 'text-red-400', bg: 'bg-red-400', shadow: '#f87171' },
};

const ASCII_SNIPPETS: Record<string, string[]> = {
  '01': [
    '  [ ARCH_MAP ]  ',
    '  0x7F >> CORE  ',
    '  SCALE::READY  ',
    '  STATE_MACH:OK '
  ],
  '02': [
    '  <SHADER_GL>   ',
    '  REQ: 42ms TTFB',
    '  SSR + EDGE_V8 ',
    '  HTTP/3 QUIC   '
  ],
  '03': [
    '  METAL_PIPE:ON ',
    '  120_FPS_CAD   ',
    '  HAPTIC_ACT    ',
    '  OFFLINE_SYNC  '
  ],
  '04': [
    '  VEC_EMBED:1536',
    '  RAG_TOP_K:8   ',
    '  AGENT_GRAPH   ',
    '  PRECISION:0.99'
  ],
  '05': [
    '  K8S_POD:HEALTH',
    '  FAILOVER:120ms',
    '  BGP_ANYCAST   ',
    '  ZERO_TRUST_OK '
  ]
};

export const Capabilities: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="work-capabilities" className="relative w-full bg-black py-24 md:py-32 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 mb-12 gap-4">
          <div>
            <div className="text-[11px] font-mono-tech text-neutral-500 uppercase tracking-widest mb-2">
              // SECTION 02
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display-title">
              OUR CAPABILITIES
            </h2>
          </div>
          <div className="text-right">
            <span className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase">
              IDEAS TO IMPACT, TOGETHER.
            </span>
          </div>
        </div>

        {/* Five Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {CAPABILITIES.map((item) => {
            const IconComponent = iconMap[item.iconName] || Cpu;
            const isHovered = hoveredCard === item.id;
            const asciiLines = ASCII_SNIPPETS[item.number] || [];
            const accent = COLOR_ACCENTS[item.number] || COLOR_ACCENTS['01'];

            return (
              <div
                key={item.id}
                id={`capability-card-${item.number}`}
                onMouseEnter={() => {
                  soundFx.playClick();
                  setHoveredCard(item.id);
                }}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-6 bg-[#050505] border transition-all duration-300 flex flex-col justify-between min-h-[360px] cursor-pointer rounded-xs ${
                  isHovered
                    ? `${accent.border} ${accent.glow} bg-[#080808] -translate-y-2.5`
                    : 'border-white/15 hover:border-white/40'
                }`}
              >
                {/* Top Number and Icon */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className={`font-mono-tech text-xs tracking-widest transition-colors ${
                      isHovered ? accent.text : 'text-neutral-500 group-hover:text-white'
                    }`}>
                      /{item.number}
                    </span>
                    <div
                      className={`p-2.5 rounded-xs transition-all duration-300 ${
                        isHovered ? `${accent.bg} text-black scale-110 shadow-lg` : 'bg-neutral-900 text-white'
                      }`}
                    >
                      <IconComponent size={20} strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Title & Subtext */}
                  <h3 className={`font-cyber font-bold text-lg tracking-wider mb-2 leading-snug transition-colors ${
                    isHovered ? accent.text : 'text-white'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="font-mono-tech text-[10px] tracking-wider text-neutral-400 uppercase mb-4">
                    {item.subtext}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom: Dynamic ASCII snippet on hover or Tags by default */}
                <div className="pt-4 border-t border-white/10 font-mono-tech">
                  {isHovered ? (
                    <div className="space-y-1 text-[10px] text-neutral-300 font-mono-tech animate-in fade-in duration-200">
                      <div className={`text-[9px] tracking-wider flex items-center gap-1.5 ${accent.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${accent.bg} animate-ping`} />
                        <span>LIVE ENGINE STATS:</span>
                      </div>
                      {asciiLines.map((line) => (
                        <div key={line} className={`${accent.text} opacity-90 tracking-wider font-semibold`}>
                          {line}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-1.5 py-0.5 bg-neutral-900 text-neutral-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
