'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function RegularizationViz() {
  const [method, setMethod] = useState<'l1' | 'l2'>('l2');
  const [strength, setStrength] = useState(0.5);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-orange-400 mb-2">Regularization Labs</h3>
        <p className="text-slate-500 text-sm max-w-md">Preventing overfitting by penalizing large weights. Observe how L1 and L2 shape the "weight budget".</p>
      </div>

      <div className="flex gap-16 items-center">
        {/* Visualization Canvas */}
        <div className="relative w-[450px] h-[450px] bg-slate-950 rounded-full border border-white/5 flex items-center justify-center overflow-hidden shadow-2xl">
           {/* Axes */}
           <div className="absolute w-full h-px bg-white/10" />
           <div className="absolute h-full w-px bg-white/10" />

           {/* Norm Shape */}
           <motion.div
             animate={{ 
               width: (1 - strength) * 400,
               height: (1 - strength) * 400,
               borderRadius: method === 'l2' ? '50%' : '0%',
               rotate: method === 'l1' ? 45 : 0
             }}
             className={cn(
               "border-2 transition-all duration-700",
               method === 'l1' ? "border-orange-500 bg-orange-500/10" : "border-sky-500 bg-sky-500/10"
             )}
           />

           {/* Weight Particles */}
           {Array.from({ length: 8 }).map((_, i) => (
             <motion.div
               key={i}
               initial={{ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 }}
               animate={{ 
                 x: Math.random() * (1 - strength) * 150 - (1 - strength) * 75,
                 y: Math.random() * (1 - strength) * 150 - (1 - strength) * 75
               }}
               transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
               className="absolute w-2 h-2 rounded-full bg-white opacity-40 blur-[1px]"
             />
           ))}

           <div className="absolute bottom-10 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">
             Constraint Space (λ = {strength.toFixed(2)})
           </div>
        </div>

        {/* Controls */}
        <div className="w-80 space-y-6">
           <div className="glass-panel p-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Methodology</span>
              <div className="grid grid-cols-2 gap-3">
                 <button 
                  onClick={() => setMethod('l1')}
                  className={cn(
                    "py-3 rounded-xl text-xs font-bold transition-all",
                    method === 'l1' ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-slate-800 text-slate-400"
                  )}
                 >
                   L1 (Lasso)
                 </button>
                 <button 
                  onClick={() => setMethod('l2')}
                  className={cn(
                    "py-3 rounded-xl text-xs font-bold transition-all",
                    method === 'l2' ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" : "bg-slate-800 text-slate-400"
                  )}
                 >
                   L2 (Ridge)
                 </button>
              </div>
           </div>

           <div className="glass-panel p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Penalty Strength (λ)</span>
                <span className={cn("text-xs font-mono", method === 'l1' ? "text-orange-400" : "text-sky-400")}>{strength.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0" max="0.9" step="0.01"
                value={strength}
                onChange={(e) => setStrength(parseFloat(e.target.value))}
                className={cn("w-full appearance-none h-1.5 rounded-lg", method === 'l1' ? "accent-orange-500" : "accent-sky-500")}
              />
           </div>

           <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Architectural Impact</span>
              <div className="text-[11px] text-slate-400 leading-relaxed">
                {method === 'l1' 
                  ? "Encourages sparsity. Leads to zero-value weights, effectively performing feature selection."
                  : "Encourages small weights. Prevents any single feature from dominating the model prediction."
                }
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
