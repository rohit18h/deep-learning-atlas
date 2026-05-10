'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shrink, Expand, Database, Zap } from 'lucide-react';

import { useAtlasStore } from '@/store/useAtlasStore';

export default function AutoencoderViz() {
  const { activeModule } = useAtlasStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const mode = activeModule === 'denoising-ae' ? 'denoising' : 'standard';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-amber-400 mb-2">Autoencoder Architecture</h3>
        <p className="text-slate-500 text-sm max-w-md">The hourglass of unsupervised learning. Compressing input into a latent bottleneck to learn efficient data encodings.</p>
      </div>

      <div className="flex gap-12 items-center scale-90">
        {/* Encoder */}
        <div className="flex flex-col items-center gap-6">
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Input Data</span>
           <div className="w-32 h-48 bg-slate-900 rounded-xl border border-white/10 flex flex-col gap-2 p-4 relative overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                   <motion.div 
                    animate={{ width: isProcessing ? '100%' : '30%' }}
                    className={cn("h-full", mode === 'denoising' ? "bg-red-500/50" : "bg-amber-400/50")}
                   />
                </div>
              ))}
              {mode === 'denoising' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />
              )}
           </div>
        </div>

        <motion.div animate={{ x: isProcessing ? [0, 20, 0] : 0 }} className="text-slate-700"><Shrink size={32} /></motion.div>

        {/* Bottleneck / Latent Space */}
        <div className="flex flex-col items-center gap-6">
           <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Latent Space (z)</span>
           <div className="w-16 h-24 bg-amber-500/10 border-2 border-amber-400 rounded-xl flex items-center justify-center relative shadow-[0_0_30px_rgba(251,191,36,0.2)]">
              <motion.div 
                animate={{ scale: isProcessing ? [1, 1.2, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-4 h-4 bg-amber-400 rounded-full blur-[2px]"
              />
           </div>
        </div>

        <motion.div animate={{ x: isProcessing ? [0, 20, 0] : 0 }} className="text-slate-700"><Expand size={32} /></motion.div>

        {/* Decoder */}
        <div className="flex flex-col items-center gap-6">
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Reconstructed</span>
           <div className="w-32 h-48 bg-slate-900 rounded-xl border border-white/10 flex flex-col gap-2 p-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                   <motion.div 
                    animate={{ width: isProcessing ? '100%' : '10%' }}
                    className="h-full bg-emerald-400/50"
                   />
                </div>
              ))}
           </div>
        </div>

        {/* Controls */}
        <div className="w-72 space-y-6 ml-12">
           <div className="glass-panel p-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Process Control</span>
              <button 
                onClick={() => setIsProcessing(!isProcessing)}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold transition-all shadow-xl",
                  isProcessing ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-amber-600 text-white shadow-amber-600/20"
                )}
              >
                {isProcessing ? "Halt Compression" : "Initialize Encoder"}
              </button>
           </div>

           <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Processing Stats</span>
              <div className="flex justify-between text-[10px] font-mono">
                 <span className="text-slate-500">Loss</span>
                 <span className="text-amber-400">{isProcessing ? '0.012' : '--'}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
