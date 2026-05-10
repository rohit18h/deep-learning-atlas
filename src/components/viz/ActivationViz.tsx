'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const FUNCTIONS = {
  sigmoid: {
    name: 'Sigmoid',
    fn: (x: number) => 1 / (1 + Math.exp(-x)),
    deriv: (x: number) => {
      const s = 1 / (1 + Math.exp(-x));
      return s * (1 - s);
    },
    formula: 'f(x) = \\frac{1}{1 + e^{-x}}',
    color: '#3b82f6',
    desc: 'Compresses input to (0, 1). Great for probabilities, but suffers from vanishing gradients.'
  },
  tanh: {
    name: 'Tanh',
    fn: (x: number) => Math.tanh(x),
    deriv: (x: number) => 1 - Math.pow(Math.tanh(x), 2),
    formula: 'f(x) = \\tanh(x)',
    color: '#a855f7',
    desc: 'Compresses input to (-1, 1). Zero-centered, generally preferred over Sigmoid.'
  },
  relu: {
    name: 'ReLU',
    fn: (x: number) => Math.max(0, x),
    deriv: (x: number) => (x > 0 ? 1 : 0),
    formula: 'f(x) = \\max(0, x)',
    color: '#22d3ee',
    desc: 'Linear for positive values, zero otherwise. Solves vanishing gradient, extremely efficient.'
  },
  leaky_relu: {
    name: 'Leaky ReLU',
    fn: (x: number) => (x > 0 ? x : 0.01 * x),
    deriv: (x: number) => (x > 0 ? 1 : 0.01),
    formula: 'f(x) = \\max(0.01x, x)',
    color: '#10b981',
    desc: 'Small slope for negative values. Prevents "dying ReLU" problem by allowing small gradients.'
  }
};

export default function ActivationViz() {
  const [activeFn, setActiveFn] = useState<keyof typeof FUNCTIONS>('relu');
  const [showDeriv, setShowDeriv] = useState(false);
  const [inputVal, setInputVal] = useState(0);

  const points = useMemo(() => {
    const pts = [];
    for (let x = -5; x <= 5; x += 0.1) {
      pts.push({
        x: x * 40 + 200,
        y: 200 - FUNCTIONS[activeFn].fn(x) * 100,
        dy: 200 - FUNCTIONS[activeFn].deriv(x) * 100
      });
    }
    return pts;
  }, [activeFn]);

  const currentData = FUNCTIONS[activeFn];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-cyan-400 mb-2">Activation Functions</h3>
        <p className="text-slate-500 text-sm max-w-md">The "engine" of non-linearity in neural networks. Choose a function to visualize its transformation and gradient.</p>
      </div>

      <div className="flex gap-12 items-center scale-110">
        {/* Graph Area */}
        <div className="relative w-[400px] h-[400px] bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden shadow-inner">
           {/* Grid */}
           <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} />
           
           {/* Axes */}
           <div className="absolute top-1/2 left-0 w-full h-px bg-white/20" />
           <div className="absolute left-1/2 top-0 w-px h-full bg-white/20" />

           <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
             {/* Function Path */}
             <motion.path
               key={`${activeFn}-path`}
               d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}
               fill="none"
               stroke={currentData.color}
               strokeWidth="3"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 1 }}
             />
             
             {/* Derivative Path */}
             {showDeriv && (
               <motion.path
                 key={`${activeFn}-deriv`}
                 d={`M ${points.map(p => `${p.x},${p.dy}`).join(' L ')}`}
                 fill="none"
                 stroke={currentData.color}
                 strokeWidth="1.5"
                 strokeDasharray="4 4"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.5 }}
               />
             )}

             {/* Dynamic Point */}
             <motion.circle
               cx={inputVal * 40 + 200}
               cy={200 - currentData.fn(inputVal) * 100}
               r="6"
               fill={currentData.color}
               className="shadow-[0_0_10px_rgba(255,255,255,0.5)]"
               filter="drop-shadow(0 0 8px currentColor)"
             />
           </svg>

           <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
             Input: {inputVal.toFixed(2)} | Output: {currentData.fn(inputVal).toFixed(3)}
           </div>
        </div>

        {/* Controls */}
        <div className="w-80 space-y-6">
           <div className="glass-panel p-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Selector</span>
              <div className="grid grid-cols-2 gap-2">
                 {Object.entries(FUNCTIONS).map(([key, data]) => (
                   <button
                     key={key}
                     onClick={() => setActiveFn(key as any)}
                     className={cn(
                       "py-2 rounded-lg text-[10px] font-bold transition-all border",
                       activeFn === key 
                        ? "bg-white/10 border-white/20 text-white shadow-lg" 
                        : "bg-slate-950/50 border-white/5 text-slate-500 hover:text-slate-300"
                     )}
                   >
                     {data.name}
                   </button>
                 ))}
              </div>
           </div>

           <div className="glass-panel p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Input Simulator</span>
                <span className="text-xs font-mono text-cyan-400">{inputVal.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="-5" max="5" step="0.1"
                value={inputVal}
                onChange={(e) => setInputVal(parseFloat(e.target.value))}
                className="w-full accent-cyan-500"
              />
           </div>

           <button
             onClick={() => setShowDeriv(!showDeriv)}
             className={cn(
               "w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all",
               showDeriv ? "bg-white/10 text-white border border-white/20" : "bg-slate-800 text-slate-400"
             )}
           >
             {showDeriv ? "Hide Derivative" : "Show Derivative (Gradient)"}
           </button>

           <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                "{currentData.desc}"
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
