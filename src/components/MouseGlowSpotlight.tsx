import React, { useEffect, useState, useCallback } from 'react';
import { Palette, Zap, Sparkles } from 'lucide-react';
import { soundFx } from '../lib/audio';

export type GlowPreset = 'lords' | 'prism' | 'cyberpunk' | 'matrix';

interface MouseGlowSpotlightProps {
  currentPreset?: GlowPreset;
  onPresetChange?: (preset: GlowPreset) => void;
}

export const MouseGlowSpotlight: React.FC<MouseGlowSpotlightProps> = ({
  currentPreset: externalPreset,
  onPresetChange
}) => {
  const [internalPreset, setInternalPreset] = useState<GlowPreset>('lords');
  const preset = externalPreset || internalPreset;

  const [intensity, setIntensity] = useState<'subtle' | 'vivid' | 'supernova'>('vivid');
  const [showControls, setShowControls] = useState(false);

  const setPreset = useCallback(
    (newPreset: GlowPreset) => {
      soundFx.playClick();
      setInternalPreset(newPreset);
      if (onPresetChange) {
        onPresetChange(newPreset);
      }
    },
    [onPresetChange]
  );

  // Palette color definitions
  const presetColors = {
    lords: {
      name: 'LOGICAL LORDS',
      label: 'Red Plasma × Cyan Bolt',
      primary: '#00e5ff',
      secondary: '#ff2a2a',
      tertiary: '#7c3aed',
      stops: [
        'rgba(0, 229, 255, 0.45)',
        'rgba(255, 42, 42, 0.40)',
        'rgba(147, 51, 234, 0.25)',
        'rgba(0, 180, 216, 0.15)'
      ]
    },
    prism: {
      name: 'SPECTRUM PRISM',
      label: 'RGB Chromatic Rainbow',
      primary: '#00ffcc',
      secondary: '#ff0055',
      tertiary: '#ffcc00',
      stops: [
        'rgba(0, 255, 204, 0.45)',
        'rgba(255, 0, 85, 0.38)',
        'rgba(255, 204, 0, 0.35)',
        'rgba(0, 153, 255, 0.25)'
      ]
    },
    cyberpunk: {
      name: 'NEON TOKYO',
      label: 'Hot Pink & Acid Lime',
      primary: '#ff007f',
      secondary: '#39ff14',
      tertiary: '#00f0ff',
      stops: [
        'rgba(255, 0, 127, 0.48)',
        'rgba(57, 255, 20, 0.35)',
        'rgba(0, 240, 255, 0.30)',
        'rgba(176, 38, 255, 0.20)'
      ]
    },
    matrix: {
      name: 'QUANTUM FLUX',
      label: 'Emerald Code × Deep Blue',
      primary: '#10b981',
      secondary: '#3b82f6',
      tertiary: '#06b6d4',
      stops: [
        'rgba(16, 185, 129, 0.45)',
        'rgba(59, 130, 246, 0.38)',
        'rgba(6, 182, 212, 0.30)',
        'rgba(99, 102, 241, 0.18)'
      ]
    }
  };

  const activeTheme = presetColors[preset];

  // Dynamically configure CSS variables for texts and elements to glow on hover
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--glow-primary', activeTheme.primary);
    root.style.setProperty('--glow-secondary', activeTheme.secondary);
    root.style.setProperty('--glow-tertiary', activeTheme.tertiary);

    let blurMult = 1;
    if (intensity === 'subtle') blurMult = 0.65;
    if (intensity === 'supernova') blurMult = 1.45;

    root.style.setProperty(
      '--glow-text',
      `0 0 ${14 * blurMult}px ${activeTheme.primary}, 0 0 ${28 * blurMult}px ${activeTheme.secondary}`
    );
    root.style.setProperty(
      '--glow-text-heavy',
      `0 0 ${18 * blurMult}px ${activeTheme.primary}, 0 0 ${38 * blurMult}px ${activeTheme.secondary}, 0 0 ${60 * blurMult}px ${activeTheme.tertiary}`
    );
    root.style.setProperty(
      '--glow-box',
      `0 0 ${26 * blurMult}px ${activeTheme.primary}70, 0 0 ${12 * blurMult}px ${activeTheme.secondary}45`
    );
    root.style.setProperty('--glow-border', activeTheme.primary);
  }, [activeTheme, intensity]);

  return (
    <>
      {/* Floating Interactive Glow Controller Badge */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-mono-tech select-none">
        {showControls && (
          <div className="p-4 bg-black/95 border border-white/20 backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.9),0_0_20px_rgba(0,229,255,0.2)] rounded-lg text-xs space-y-3.5 w-72 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
              <span className="flex items-center gap-1.5 text-white font-bold uppercase tracking-wider text-[11px]">
                <Zap size={13} className="text-cyan-400" />
                <span>TEXT & ELEMENT GLOW</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 rounded font-mono-tech">
                HOVER ON
              </span>
            </div>

            {/* Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-neutral-400 tracking-wider">GLOW PALETTE:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {(['lords', 'prism', 'cyberpunk', 'matrix'] as GlowPreset[]).map((pKey) => {
                  const p = presetColors[pKey];
                  const isSelected = preset === pKey;
                  return (
                    <button
                      key={pKey}
                      type="button"
                      onClick={() => setPreset(pKey)}
                      className={`p-2 text-left border rounded text-[10px] flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-400/15 text-white font-semibold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                          : 'border-white/10 hover:border-white/40 text-neutral-400 bg-neutral-950'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`
                        }}
                      />
                      <span className="truncate">{p.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Intensity Level */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>INTENSITY:</span>
                <span className="text-cyan-300 uppercase font-bold">{intensity}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {(['subtle', 'vivid', 'supernova'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setIntensity(lvl);
                    }}
                    className={`py-1 text-[9px] tracking-wider uppercase border text-center transition-all cursor-pointer ${
                      intensity === lvl
                        ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300 font-bold shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                        : 'border-white/10 hover:border-white/30 text-neutral-400'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[9px] text-neutral-400 pt-1 leading-normal border-t border-white/10">
              Hover over any text, heading, button, code block, card, or element to ignite its vibrant chromatic aura.
            </p>
          </div>
        )}

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            setShowControls(!showControls);
          }}
          className="group px-3 py-2 bg-black/90 hover:bg-neutral-900 border border-white/20 hover:border-cyan-400/80 text-white rounded-full backdrop-blur-md flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all cursor-pointer text-xs"
          title="Customize Element Glow"
        >
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125"
            style={{
              background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.secondary})`,
              boxShadow: `0 0 10px ${activeTheme.primary}`
            }}
          />
          <span className="font-mono-tech text-[10px] tracking-wider text-neutral-300 group-hover:text-white uppercase hidden sm:inline">
            GLOW: {activeTheme.name.split(' ')[0]}
          </span>
          <Palette size={13} className="text-neutral-400 group-hover:text-cyan-400 transition-colors" />
        </button>
      </div>
    </>
  );
};

