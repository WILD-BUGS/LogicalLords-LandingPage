import React from 'react';

interface ScrollTransitionProps {
  progress?: number;
}

export const ScrollTransition: React.FC<ScrollTransitionProps> = () => {
  const steps = [
    { word: 'IDEAS', code: '0x01_CONCEPT', desc: 'Raw problem formulation' },
    { word: 'CODE', code: '0x02_SYNTAX', desc: 'Deterministic engineering' },
    { word: 'PRODUCT', code: '0x03_SYSTEM', desc: 'Hardened architecture' },
    { word: 'IMPACT', code: '0x04_OUTCOME', desc: 'Real human utility' }
  ];

  return (
    <div className="relative w-full bg-black py-16 md:py-24 border-y border-white/10 overflow-hidden select-none">
      {/* Background ASCII strip */}
      <div className="absolute inset-0 flex items-center justify-between opacity-5 font-mono-tech text-[10px] pointer-events-none overflow-hidden whitespace-nowrap">
        <span>01010101001010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010</span>
        <span>::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between text-[10px] font-mono-tech text-neutral-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-3">
          <span>// PIPELINE TRANSITION</span>
          <span>DISCIPLINED VELOCITY · ZERO WASTE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={step.word}
              className="group relative p-6 bg-neutral-950/60 border border-white/10 hover:border-white/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-500 mb-4">
                <span>{step.code}</span>
                <span className="text-white/30 group-hover:text-white transition-colors">
                  0{idx + 1}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl md:text-4xl font-cyber font-bold tracking-wider text-white group-hover:translate-x-1 transition-transform">
                  {step.word}
                </h3>
                {idx < steps.length - 1 && (
                  <span className="hidden lg:inline text-xl text-neutral-600 font-mono-tech ml-auto group-hover:text-white transition-colors">
                    →
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs font-mono-tech text-neutral-400">
                {step.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1 font-mono-tech text-[9px] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>VERIFIED STAGE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
