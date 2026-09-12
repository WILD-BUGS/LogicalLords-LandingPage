import React, { useState } from 'react';
import { ArrowUpRight, Code, Database, Sparkles } from 'lucide-react';
import { PROJECTS } from '../lib/asciiData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { soundFx } from '../lib/audio';

export const Work: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleOpenProject = (project: Project) => {
    soundFx.playClick();
    setSelectedProject(project);
  };

  return (
    <section id="work" className="relative w-full bg-black py-24 md:py-36 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 mb-16 gap-4">
          <div>
            <div className="text-[11px] font-mono-tech text-neutral-500 uppercase tracking-widest mb-2">
              // SECTION 03
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display-title">
              SELECTED WORK
            </h2>
          </div>
          <div className="text-right">
            <span className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase">
              REAL PROJECTS. REAL PROGRESS.
            </span>
          </div>
        </div>

        {/* Asymmetric Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {PROJECTS.map((project, idx) => {
            const isHovered = hoveredId === project.id;
            // Asymmetric col span: 01 (col-span-7), 02 (col-span-5), 03 (col-span-5), 04 (col-span-7)
            const colSpan =
              idx === 0
                ? 'md:col-span-7'
                : idx === 1
                ? 'md:col-span-5'
                : idx === 2
                ? 'md:col-span-5'
                : 'md:col-span-7';

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => handleOpenProject(project)}
                onMouseEnter={() => {
                  soundFx.playClick();
                  setHoveredId(project.id);
                }}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative ${colSpan} bg-[#060606] border border-white/15 hover:border-cyan-400/80 hover:shadow-[0_0_40px_rgba(0,229,255,0.25),0_0_20px_rgba(255,48,48,0.2)] spotlight-border transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer p-6 sm:p-8 rounded-xs`}
              >
                {/* Top Number & Tag */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 font-mono-tech text-xs z-10">
                  <span className="text-neutral-500 group-hover:text-cyan-400 transition-colors">
                    /{project.number}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[9px] tracking-widest px-2 py-0.5 bg-neutral-900 border border-white/10 text-neutral-300 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors"
                      >
                        {cat}
                      </span>
                    ))}
                    <span className="text-neutral-500 text-[10px]">{project.year}</span>
                  </div>
                </div>

                {/* Imagery Container with Grayscale-to-Color Reveal & ASCII on Hover */}
                <div className="relative w-full h-64 sm:h-80 my-6 overflow-hidden bg-neutral-950 border border-white/10 group-hover:border-white/30 rounded-xs transition-colors">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:saturate-150 group-hover:contrast-110 group-hover:scale-108 group-hover:brightness-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:opacity-40 transition-opacity" />

                  {/* ASCII Overlay that appears on hover with glowing cyber accents */}
                  <div
                    className={`absolute inset-0 bg-black/65 backdrop-blur-xs p-6 flex flex-col justify-between font-mono-tech text-[10px] text-neutral-300 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="flex justify-between items-center text-white border-b border-white/20 pb-2">
                      <span className="flex items-center gap-1.5">
                        <Code size={12} className="text-cyan-400 animate-pulse" />
                        <span className="text-cyan-300 font-bold">SYS::SPECS</span>
                      </span>
                      <span className="text-neutral-300 text-[9px]">{project.stack.slice(0, 3).join(' // ')}</span>
                    </div>

                    <div className="whitespace-pre text-cyan-200/80 leading-tight select-none overflow-hidden text-[9px] my-auto drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                      {project.asciiArt}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/20 text-neutral-300">
                      <span className="text-neutral-400">METRIC: {project.metrics[0].label}</span>
                      <span className="text-red-400 font-bold text-xs">{project.metrics[0].value}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Title, Tagline and Arrow */}
                <div className="pt-4 border-t border-white/10 flex items-end justify-between gap-4 z-10">
                  <div className="space-y-1">
                    <h3 className="font-cyber text-2xl sm:text-3xl font-bold tracking-wider text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-white group-hover:to-red-400 group-hover:translate-x-1.5 transition-all">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="p-3 border border-white/20 group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(0,229,255,0.7)] text-white transition-all duration-300 shrink-0">
                    <ArrowUpRight
                      size={18}
                      className="group-hover:rotate-45 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
