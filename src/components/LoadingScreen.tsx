import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { soundFx } from '../lib/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(12);
  const [statusText, setStatusText] = useState('INITIALIZING DIGITAL ENVIRONMENT...');
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(48);
      setStatusText('MOUNTING 3D NUMERIC VORTEX KERNEL...');
    }, 250);

    const timer2 = setTimeout(() => {
      setProgress(86);
      setStatusText('SYNCHRONIZING SIX COLLECTIVE NODES...');
    }, 550);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('SYSTEM READY.');
      soundFx.playBeep(880, 0.06, 'sine', 0.05);
    }, 850);

    const timer4 = setTimeout(() => {
      setFading(true);
    }, 1050);

    const timer5 = setTimeout(() => {
      onComplete();
    }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center p-6 select-none transition-opacity duration-500 font-mono-tech ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={() => {
        setFading(true);
        setTimeout(onComplete, 300);
      }}
    >
      <div className="max-w-md w-full space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <img
              src="/logo.png"
              alt="Logical Lords"
              className="w-full h-full object-contain logo-emblem-contour"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center gap-2 text-xs tracking-widest text-neutral-400">
            <Terminal size={14} className="text-white" />
            <span className="font-cyber font-bold text-white text-sm">/ LOGICAL LORDS</span>
          </div>
        </div>

        {/* Binary stream */}
        <div className="text-[11px] text-neutral-500 tracking-[0.25em] font-mono-tech">
          01 01 00 10 11 01 00 10 01 11
        </div>

        {/* Status text */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs tracking-wider">
            <span className="text-neutral-300">{statusText}</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>

          {/* ASCII-styled progress bar */}
          <div className="w-full h-3 bg-neutral-900 border border-white/20 p-0.5 flex">
            <div
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-[10px] text-neutral-600 flex justify-between tracking-wider pt-2">
          <span>GL_VORTEX // ACTIVE</span>
          <span className="hover:text-white cursor-pointer">[ CLICK TO SKIP ]</span>
        </div>
      </div>
    </div>
  );
};
