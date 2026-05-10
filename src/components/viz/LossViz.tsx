'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const LOSS_FUNCTIONS = {
  mse: {
    name: 'MSE (L2)',
    formula: 'L = \\frac{1}{n} \\sum (y - \\hat{y})^2',
    color: '#3b82f6',
    desc: 'Mean Squared Error. Heavily penalizes large outliers. Common in regression.',
    plot: (x: number) => x * x
  },
  mae: {
    name: 'MAE (L1)',
    formula: 'L = \\frac{1}{n} \\sum |y - \\hat{y}|',
    color: '#a855f7',
    desc: 'Mean Absolute Error. Robust to outliers, constant gradient.',
    plot: (x: number) => Math.abs(x)
  },
  cross_entropy: {
    name: 'Cross-Entropy',
    formula: 'L = -\\sum y \\log(\\hat{y})',
    color: '#10b981',
    desc: 'Measures divergence between probability distributions. Standard for classification.',
    plot: (x: number) => -Math.log(Math.max(0.01, 1 - Math.abs(x)))
  }
};

export default function LossViz() {
  const [activeLoss, setActiveLoss] = useState<keyof typeof LOSS_FUNCTIONS>('mse');
  const [errorVal, setErrorVal] = useState(0);

  const points = useMemo(() => {
    const pts = [];
    for (let x = -2; x <= 2; x += 0.05) {
      pts.push({
        x: x * 80 + 200,
        y: 350 - LOSS_FUNCTIONS[activeLoss].plot(x) * 50
      });
    }
    return pts;
  }, [activeLoss]);

  const current = LOSS_FUNCTIONS[activeLoss];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-sky-400 mb-2">Loss Landscapes</h3>
        <p className="text-slate-500 text-sm max-w-md">The mathematical "north star" guiding optimization. Different loss functions shape how the network perceives error.</p>
      </div>

      <div className="flex gap-16 items-center">
        {/* Graph Area */}
        <div className="relative w-[400px] h-[400px] bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden shadow-inner">
           <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} />
           
           <div className="absolute top-3/4 left-0 w-full h-px bg-white/20" />
           <div className="absolute left-1/2 top-0 w-px h-full bg-white/20" />

           <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
             <motion.path
               key={activeLoss}
               d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}
               fill="none"
               stroke={current.color}
               strokeWidth="3"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 1 }}
             />
             
             {/* Dynamic Indicator */}
             <motion.circle
               cx={errorVal * 80 + 200}
               cy={350 - current.plot(errorVal) * 50}
               r="6"
               fill={current.color}
               filter="drop-shadow(0 0 8px currentColor)"
             />
           </svg>

           <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
             Residual: {errorVal.toFixed(2)} | Penalty: {current.plot(errorVal).toFixed(3)}
           </div>
        </div>

        {/* Controls */}
        <div className="w-80 space-y-6">
           <div className="glass-panel p-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Function Selector</span>
              <div className="grid grid-cols-1 gap-2">
                 {Object.entries(LOSS_FUNCTIONS).map(([key, data]) => (
                   <button
                     key={key}
                     onClick={() => setActiveLoss(key as any)}
                     className={cn(
                       "flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all border",
                       activeLoss === key 
                        ? "bg-white/10 border-white/20 text-white" 
                        : "bg-slate-950/50 border-white/5 text-slate-500 hover:text-slate-300"
                     )}
                   >
                     <span>{data.name}</span>
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
                   </button>
                 ))}
              </div>
           </div>

           <div className="glass-panel p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Error Input</span>
                <span className="text-xs font-mono text-sky-400">{errorVal.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="-1.5" max="1.5" step="0.01"
                value={errorVal}
                onChange={(e) => setErrorVal(parseFloat(e.target.value))}
                className="w-full accent-sky-500"
              />
           </div>

           <div className="p-4 bg-sky-500/5 rounded-xl border border-sky-500/10 italic text-[11px] text-slate-400 leading-relaxed">
             "{current.desc}"
           </div>
        </div>
      </div>
    </div>
  );
}
