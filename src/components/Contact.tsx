import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { soundFx } from '../lib/audio';

export const Contact: React.FC = () => {
  const [projectType, setProjectType] = useState('Product Engineering');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle');
  const [copied, setCopied] = useState(false);
  const portalCanvasRef = useRef<HTMLCanvasElement>(null);

  // Background ASCII Portal animation
  useEffect(() => {
    const canvas = portalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes in concentric orbital rings
    const ringWords = ['IDEAS', 'PEOPLE', 'CODE', 'IMPACT', '∞'];
    const chars = ['0', '1', '8', '3', '7', '4', '9', '2', '5', '+', ':', '/'];
    
    interface PortalParticle {
      radius: number;
      angle: number;
      speed: number;
      char: string;
      isWord?: boolean;
      opacity: number;
    }

    const particles: PortalParticle[] = [];
    const count = 180;

    for (let i = 0; i < count; i++) {
      const radius = 60 + Math.random() * 320;
      particles.push({
        radius,
        angle: Math.random() * Math.PI * 2,
        speed: (0.003 + 0.015 * (1 - radius / 380)) * (Math.random() > 0.5 ? 1 : -1),
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: 0.15 + Math.random() * 0.65
      });
    }

    // Add ring words
    ringWords.forEach((word, idx) => {
      particles.push({
        radius: 120 + idx * 45,
        angle: (idx * Math.PI * 2) / ringWords.length,
        speed: 0.004 * (idx % 2 === 0 ? 1 : -1),
        char: word,
        isWord: true,
        opacity: 0.9
      });
    });

    let time = 0;
    const draw = () => {
      time += 0.02;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw faint concentric rings
      [90, 160, 240, 320].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw particles
      particles.forEach((p) => {
        p.angle += p.speed;
        // Inward breathing pulse
        const dynamicRadius = p.radius + Math.sin(time + p.radius * 0.05) * 8;
        const x = cx + Math.cos(p.angle) * dynamicRadius;
        const y = cy + Math.sin(p.angle) * dynamicRadius;

        if (p.isWord) {
          ctx.font = 'bold 12px "IBM Plex Mono", monospace';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        } else {
          ctx.font = '10px "IBM Plex Mono", monospace';
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.7})`;
        }
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.char, x, y);
      });

      // Central core singularity
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundFx.playWarp();
    setStatus('transmitting');
    setTimeout(() => {
      setStatus('sent');
    }, 1200);
  };

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText('contact@logicallords.io');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black py-28 md:py-40 text-white flex flex-col justify-between overflow-hidden"
    >
      {/* ASCII Portal Visual Bookend in Background */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
        <canvas ref={portalCanvasRef} className="w-full h-full" />
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 z-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Monumental Statement */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <span className="font-mono-tech text-xs tracking-[0.3em] text-neutral-400 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                LET'S CREATE TOGETHER.
              </span>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-cyber leading-[0.95] text-white">
                HAVE A
                <br />
                BOLD IDEA?
                <br />
                <span className="text-white">WE'RE LISTENING.</span>
              </h2>
            </div>

            <p className="font-display-title text-base sm:text-lg text-neutral-300 font-light max-w-md leading-relaxed">
              Whether it's a zero-to-one product, an engineering partnership, or simply a conversation — we'd love to hear from you.
            </p>

            {/* Direct Email Node & Key Info */}
            <div className="pt-4 border-t border-white/10 space-y-3 font-mono-tech text-xs">
              <div className="flex items-center gap-3">
                <span className="text-neutral-500">DIRECT INBOX:</span>
                <span className="text-white font-medium">contact@logicallords.io</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1 border border-white/20 hover:border-white text-neutral-400 hover:text-white transition-colors cursor-pointer text-[10px] flex items-center gap-1"
                >
                  <Copy size={11} />
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              <div className="flex items-center gap-6 text-[11px] text-neutral-500">
                <span>EST RESPONSE: &lt; 12 HOURS</span>
                <span>TIMEZONE: UTC+0 // GLOBAL</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Terminal Transmission Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 md:p-10 bg-neutral-950/90 border border-white/20 hover:border-cyan-400/80 hover:shadow-[0_0_35px_rgba(0,229,255,0.25)] transition-all duration-300 backdrop-blur-md rounded-xs">
              {/* Form Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono-tech text-xs text-neutral-400 mb-6">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-cyan-400 animate-pulse" />
                  <span className="text-white font-semibold">COMM_CHANNEL // DISPATCH</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-neutral-900 border border-white/10 text-cyan-300 font-mono-tech">
                  SECURE E2E
                </span>
              </div>

              {status === 'sent' ? (
                <div className="py-12 text-center space-y-4 font-mono-tech animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full border border-emerald-400/40 bg-emerald-950/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-xl font-cyber font-bold tracking-wider text-white">
                    TRANSMISSION LOGGED.
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Your brief has been routed to all six nodes of the collective.
                    We will review the architectural requirements and reply within 12 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setMessage('');
                    }}
                    className="mt-4 px-4 py-2 border border-cyan-400/60 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] text-xs text-white transition-all cursor-pointer"
                  >
                    [ DISPATCH ANOTHER MESSAGE ]
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-mono-tech text-xs">
                  {/* Category Selector */}
                  <div>
                    <label className="block text-neutral-400 text-[10px] tracking-widest uppercase mb-2">
                      01 // SELECT PROJECT ARCHETYPE
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Product Engineering',
                        'Creative Web / 3D',
                        'AI / Neural Data',
                        'Mobile App',
                        'Cloud Architecture',
                        'Other Inquiry'
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            soundFx.playClick();
                            setProjectType(item);
                          }}
                          className={`p-2 text-left text-[11px] border transition-all truncate cursor-pointer rounded-xs ${
                            projectType === item
                              ? 'bg-cyan-400 text-black border-cyan-400 font-bold shadow-[0_0_15px_rgba(0,229,255,0.5)]'
                              : 'bg-black text-neutral-400 border-white/10 hover:border-cyan-400/60 hover:text-cyan-200'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-neutral-400 text-[10px] tracking-widest uppercase mb-1">
                      02 // YOUR EMAIL / CONTACT NODE
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@company.com"
                      className="w-full bg-black border border-white/20 hover:border-cyan-400/50 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] px-3 py-2.5 text-white placeholder:text-neutral-600 focus:outline-none transition-all font-mono-tech text-xs rounded-xs"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-neutral-400 text-[10px] tracking-widest uppercase mb-1">
                      03 // PROJECT SCOPE / VISION BRIEF
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe what you want to build, target timeline, or initial challenge..."
                      className="w-full bg-black border border-white/20 hover:border-cyan-400/50 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] p-3 text-white placeholder:text-neutral-600 focus:outline-none transition-all font-mono-tech text-xs resize-none rounded-xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'transmitting'}
                    onMouseEnter={() => soundFx.playClick()}
                    className="w-full py-3.5 bg-white text-black font-mono-tech text-xs tracking-widest uppercase font-semibold hover:bg-cyan-400 hover:text-black hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 border border-transparent rounded-xs"
                  >
                    {status === 'transmitting' ? (
                      <span>TRANSMITTING TO SIX NODES...</span>
                    ) : (
                      <>
                        <span>[ GET IN TOUCH</span>
                        <Send size={13} />
                        <span>]</span>
                      </>
                    )}
                  </button>

                  <div className="text-[10px] text-neutral-500 text-center tracking-wider hover:text-neutral-300 transition-colors cursor-default">
                    NO SPAM · DIRECT TO FOUNDERS · CONFIDENTIAL NDA RESPECTED
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
