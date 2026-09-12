import React, { useState } from 'react';
import { Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../lib/asciiData';
import { soundFx } from '../lib/audio';

export const About: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section
      id="about"
      className="relative w-full bg-black py-28 md:py-40 text-white border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-[11px] font-mono-tech text-neutral-500 uppercase tracking-widest mb-8">
          <Terminal size={13} className="text-white" />
          <span>// SECTION 05: MANIFESTO & DISCIPLINE</span>
        </div>

        {/* Large Statement */}
        <div className="max-w-4xl space-y-6 mb-20">
          <div className="font-mono-tech text-xs tracking-[0.3em] text-neutral-500 uppercase">
            WHY SIX?
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight font-display-title leading-[1.05]">
            BECAUSE GREAT SOFTWARE
            <br />
            IS RARELY BUILT BY
            <br />
            <span className="text-white underline decoration-white/30 decoration-2 underline-offset-8">
              ONE KIND OF MIND.
            </span>
          </h2>

          <div className="max-w-2xl text-neutral-300 font-light text-base sm:text-lg leading-relaxed pt-4 space-y-4">
            <p>
              We are six founders — VarunRaj P, Vijay Kumar K, Sudharsan C, Vignesh R, Varunan K M, and Tamil Selvan —
              who forged Logical Lords to turn ambitious problem spaces into high-performance software.
            </p>
            <p className="text-neutral-400 text-sm font-mono-tech">
              No bloated enterprise layers. No decoupled agency handoffs.
              Every project is engineered directly by Logical Lords from the first whiteboard diagram
              to millions of daily operations.
            </p>
          </div>
        </div>

        {/* Giant ASCII Composition: IDEA -> IMPACT -> ∞ */}
        <div className="p-6 sm:p-8 bg-neutral-950 border border-white/15 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(0,229,255,0.3),0_0_15px_rgba(255,48,48,0.2)] transition-all duration-300 my-16 overflow-x-auto group rounded-xs cursor-default">
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-neutral-500 mb-4 pb-2 border-b border-white/10">
            <span className="group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.7)] transition-all">// ARCHITECTURAL PIPELINE</span>
            <span className="group-hover:text-red-400 group-hover:drop-shadow-[0_0_8px_rgba(255,48,48,0.7)] transition-all">TOPOLOGICAL FLOW: 6 → ∞</span>
          </div>

          <div className="font-mono-tech text-xs sm:text-sm text-neutral-300 group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.6)] whitespace-pre leading-relaxed select-none transition-all duration-300">
{`    ┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐       ┌─────┐
    │ 01. IDEA │ ───→  │ 02. CODE │ ───→  │03.PRODUCT│ ───→  │04.PEOPLE │ ───→  │05.IMPACT │ ───→  │  ∞  │
    └──────────┘       └──────────┘       └──────────┘       └──────────┘       └──────────┘       └─────┘
         ▲                  │                  ▲                  │                  │            │
         │                  ▼                  │                  ▼                  ▼            ▼
   [FIRST PRINCIPLES]  [RUST / TS]       [DISTRIBUTED]      [HUMAN TOUCH]      [MEASURED VALUE]   [EVOLUTION]`}
          </div>
        </div>

        {/* Engineering Process Timeline: 01 DISCOVER to 06 EVOLVE */}
        <div className="pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/10 mb-10 gap-2">
            <div>
              <span className="font-mono-tech text-xs tracking-widest text-neutral-500 uppercase">
                THE 6-STEP CYCLE
              </span>
              <h3 className="text-2xl sm:text-3xl font-cyber font-bold uppercase text-white mt-1">
                ENGINEERING EXECUTION
              </h3>
            </div>
            <div className="text-[11px] font-mono-tech text-neutral-400">
              CLICK STEPS TO AUDIT METHODOLOGY
            </div>
          </div>

          {/* Steps Horizontal Bar Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {PROCESS_STEPS.map((step, idx) => {
              const isCurrent = activeStepIndex === idx;
              return (
                <button
                  key={step.number}
                  id={`process-tab-${step.number}`}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setActiveStepIndex(idx);
                  }}
                  className={`p-4 text-left border font-mono-tech transition-all cursor-pointer rounded-xs ${
                    isCurrent
                      ? 'bg-cyan-400 text-black border-cyan-400 font-bold shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                      : 'bg-neutral-950 text-neutral-400 border-white/10 hover:border-cyan-400/50 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] opacity-70 mb-1">{step.number} / 06</div>
                  <div className="text-xs sm:text-sm font-cyber uppercase tracking-wider">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive Card */}
          <div className="p-8 sm:p-10 bg-neutral-950 border border-white/20 hover:border-cyan-400/50 spotlight-border relative rounded-xs transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <span className="font-mono-tech text-xs text-neutral-500 tracking-widest">
                  PHASE {activeStep.number} // PROTOCOL
                </span>
                <h4 className="text-3xl sm:text-4xl font-cyber font-bold tracking-wider text-white mt-1">
                  {activeStep.title}
                </h4>
                <p className="font-mono-tech text-xs sm:text-sm text-neutral-400 mt-1 uppercase">
                  {activeStep.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1));
                  }}
                  className="px-4 py-2 border border-white/20 hover:border-white text-xs font-mono-tech transition-colors cursor-pointer"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setActiveStepIndex((prev) => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0));
                  }}
                  className="px-4 py-2 bg-white text-black text-xs font-mono-tech font-semibold hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>NEXT</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-base sm:text-lg text-neutral-300 font-light max-w-3xl leading-relaxed">
                {activeStep.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
