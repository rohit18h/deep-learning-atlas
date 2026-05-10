'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function BatchNormViz() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-violet-400 mb-2">Batch Normalization</h3>
        <p className="text-slate-500 text-sm max-w-md">Stabilizing the learning process by normalizing layer inputs to zero mean and unit variance.</p>
      </div>

      <div className="flex gap-16 items-center">
        {/* Distribution Graphs */}
        <div className="flex gap-8">
           {[1, 2, 3].map((layer) => (
             <div key={layer} className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Layer {layer}</span>
                <div className="relative w-32 h-64 bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
                   {/* Normalization Indicator */}
                   <AnimatePresence>
                     {enabled && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute w-24 h-40 border border-violet-500/30 bg-violet-500/5 rounded-xl z-0"
                        />
                     )}
                   </AnimatePresence>

                   {/* Data Particles (Representing Batch) */}
                   {Array.from({ length: 15 }).map((_, i) => (
                     <motion.div
                       key={i}
                       animate={{ 
                         y: enabled 
                          ? (Math.random() * 40 - 20) 
                          : (Math.random() * 180 - 90 + (layer * 20)),
                         x: (Math.random() * 40 - 20),
                         opacity: [0.3, 0.7, 0.3]
                       }}
                       transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                       className="absolute w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                     />
                   ))}

                   <div className="absolute bottom-4 text-[8px] font-mono text-slate-600">
                     {enabled ? "μ=0, σ=1" : "Shifted Dist"}
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Info & Controls */}
        <div className="w-80 space-y-6">
           <div className="glass-panel p-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Normalizer Engine</span>
              <button 
                onClick={() => setEnabled(!enabled)}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold transition-all shadow-xl",
                  enabled ? "bg-violet-600 text-white shadow-violet-600/20" : "bg-slate-800 text-slate-400"
                )}
              >
                {enabled ? "Batch Norm Active" : "Initialize Normalizer"}
              </button>
           </div>

           <div className="p-5 bg-violet-500/5 border border-violet-500/10 rounded-2xl space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">Why normalize?</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Prevents <strong>Internal Covariate Shift</strong>. By ensuring inputs have zero mean and unit variance, we can use higher learning rates and reduce sensitivity to initialization.
              </p>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
                 <span className="block text-[8px] text-slate-500 uppercase font-bold mb-1">Mean (μ)</span>
                 <span className="text-xs font-mono text-violet-300">{enabled ? '0.00' : '2.41'}</span>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
                 <span className="block text-[8px] text-slate-500 uppercase font-bold mb-1">Variance (σ²)</span>
                 <span className="text-xs font-mono text-violet-300">{enabled ? '1.00' : '4.82'}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
