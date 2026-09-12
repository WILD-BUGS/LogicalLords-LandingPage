import React from 'react';
import { X, ExternalLink, Terminal, Layers, Activity } from 'lucide-react';
import { Project } from '../types';
import { soundFx } from '../lib/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-950 border border-white/20 p-6 sm:p-8 md:p-10 shadow-[0_0_80px_rgba(255,255,255,0.08)] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs tracking-widest text-neutral-500">
              PROJECT ARCHIVE
            </span>
            <span className="text-neutral-700">/</span>
            <span className="font-mono-tech text-xs tracking-widest text-white">
              BUILD #{project.number}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 text-neutral-400 hover:text-white border border-white/10 hover:border-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Hero Visual Banner & ASCII Art */}
        <div className="relative w-full h-56 sm:h-72 overflow-hidden border border-white/10 mb-8 group">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* ASCII Banner overlay at top-right */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
            <div>
              <div className="flex gap-2 mb-1">
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-[9px] font-mono-tech tracking-widest px-2 py-0.5 bg-black/80 border border-white/20 text-white"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl sm:text-4xl font-cyber font-bold tracking-wider text-white">
                {project.name}
              </h2>
            </div>
            <div className="hidden md:block font-mono-tech text-[9px] text-neutral-400 whitespace-pre bg-black/80 p-2 border border-white/10">
              {project.asciiArt}
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="space-y-6">
          <div>
            <h4 className="font-display-title text-xl text-white font-medium mb-2">
              {project.tagline}
            </h4>
            <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Performance Telemetry & Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-3 bg-neutral-900/60 border border-white/10 font-mono-tech"
              >
                <div className="text-[10px] text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                  <Activity size={10} className="text-emerald-400" />
                  <span>{m.label}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Technology Architecture Stack */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400 mb-3 uppercase tracking-widest">
              <Layers size={13} />
              <span>CORE ARCHITECTURE STACK</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 font-mono-tech text-xs bg-black border border-white/20 text-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-xs">
            <div className="text-neutral-500 text-[11px] flex items-center gap-2">
              <Terminal size={12} />
              <span>DETERMINISTIC PRODUCTION BUILD // DEPLOYED</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-white/20 hover:border-white text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                [ CLOSE INSPECTION ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
