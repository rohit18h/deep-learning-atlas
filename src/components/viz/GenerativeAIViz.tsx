'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Wand2, Box } from 'lucide-react';

export default function GenerativeAIViz() {
  const [noiseLevel, setNoiseLevel] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setNoiseLevel(prev => {
        if (prev <= 0) {
          setIsGenerating(false);
          return 0;
        }
        return prev - 0.05;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const startGeneration = () => {
    setNoiseLevel(1);
    setIsGenerating(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-pink-400 mb-2">Generative Intelligence</h3>
        <p className="text-slate-500 text-sm max-w-md">The art of creation. Observe the diffusion process as random noise is iteratively refined into coherent structural features.</p>
      </div>

      <div className="flex gap-16 items-center">
        {/* Generation Canvas */}
        <div className="relative w-[450px] h-[450px] bg-slate-950 rounded-3xl border-2 border-white/5 overflow-hidden shadow-2xl flex items-center justify-center">
           {/* The Image (Revealed as noise level decreases) */}
           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40 p-12">
              <div className="w-full h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative">
                 <AnimatePresence>
                   {noiseLevel < 0.2 && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="flex flex-col items-center gap-4"
                     >
                        <Sparkles size={100} className="text-pink-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-pink-400">Creation Manifested</span>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>
           </div>

           {/* Noise Overlay */}
           <div 
             className="absolute inset-0 pointer-events-none"
             style={{ 
               opacity: noiseLevel,
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               backgroundSize: '100% 100%'
             }}
           />

           {/* Scanning Lines during generation */}
           {isGenerating && (
             <motion.div 
               animate={{ top: ['0%', '100%'] }}
               transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
               className="absolute left-0 w-full h-1 bg-pink-500/50 blur-[2px] z-20 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
             />
           )}
        </div>

        {/* Controls */}
        <div className="w-80 space-y-6">
           <div className="glass-panel p-8 space-y-6">
              <div className="flex flex-col gap-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Diffusion State</span>
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-pink-400">{((1 - noiseLevel) * 100).toFixed(0)}% Refined</span>
                    <Wand2 size={16} className="text-pink-400 animate-pulse" />
                 </div>
              </div>

              <button 
                onClick={startGeneration}
                disabled={isGenerating}
                className={cn(
                  "w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl",
                  isGenerating ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-pink-600 text-white shadow-pink-600/20 hover:scale-[1.02]"
                )}
              >
                {isGenerating ? "Refining Manifold..." : "Sample from Latent"}
              </button>
           </div>

           <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Diffusion Theory</span>
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                "Reverse diffusion learns to predict the noise added to an image, effectively 'cleaning' it until the target distribution is reached."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
