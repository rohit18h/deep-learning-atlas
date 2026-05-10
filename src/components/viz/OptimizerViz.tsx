'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OPTIMIZERS = {
  sgd: { name: 'SGD', color: '#ef4444', step: (v: number, g: number, lr: number) => v - lr * g },
  momentum: { 
    name: 'Momentum', color: '#f59e0b', 
    step: (v: number, g: number, lr: number, state: any) => {
      state.m = 0.9 * (state.m || 0) + g;
      return v - lr * state.m;
    }
  },
  adam: { 
    name: 'Adam', color: '#10b981', 
    step: (v: number, g: number, lr: number, state: any) => {
      state.m = 0.9 * (state.m || 0) + (1 - 0.9) * g;
      state.v = 0.999 * (state.v || 0) + (1 - 0.999) * g * g;
      const mHat = state.m / (1 - Math.pow(0.9, state.t || 1));
      const vHat = state.v / (1 - Math.pow(0.999, state.t || 1));
      state.t = (state.t || 1) + 1;
      return v - lr * mHat / (Math.sqrt(vHat) + 1e-8);
    }
  }
};

export default function OptimizerViz() {
  const [activeOptimizers, setActiveOptimizers] = useState(['sgd', 'momentum', 'adam']);
  const [paths, setPaths] = useState<Record<string, { x: number, y: number }[]>>({});
  const [isTraining, setIsTraining] = useState(false);
  const [lr, setLr] = useState(0.05);

  // Beale's function or similar landscape
  const landscape = (x: number, y: number) => {
    return Math.sin(x) * Math.cos(y) + (x*x + y*y) * 0.1;
  };

  const getGradient = (x: number, y: number) => {
    const h = 0.001;
    const dx = (landscape(x + h, y) - landscape(x - h, y)) / (2 * h);
    const dy = (landscape(x, y + h) - landscape(x, y - h)) / (2 * h);
    return { dx, dy };
  };

  const reset = () => {
    const startX = Math.random() * 4 - 2;
    const startY = Math.random() * 4 - 2;
    const initialPaths: any = {};
    activeOptimizers.forEach(opt => {
      initialPaths[opt] = [{ x: startX, y: startY, m: 0, v: 0, t: 1 }];
    });
    setPaths(initialPaths);
    setIsTraining(false);
  };

  useEffect(() => {
    if (!isTraining) return;
    const interval = setInterval(() => {
      setPaths(prev => {
        const newPaths = { ...prev };
        let finished = true;
        activeOptimizers.forEach(opt => {
          const history = newPaths[opt];
          const current = history[history.length - 1];
          if (history.length > 50) return;
          
          finished = false;
          const { dx, dy } = getGradient(current.x, current.y);
          const state = { m: (current as any).m, v: (current as any).v, t: (current as any).t };
          
          const newX = (OPTIMIZERS as any)[opt].step(current.x, dx, lr, state);
          const newY = (OPTIMIZERS as any)[opt].step(current.y, dy, lr, state);
          
          newPaths[opt] = [...history, { x: newX, y: newY, ...state }];
        });
        if (finished) setIsTraining(false);
        return newPaths;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isTraining, lr, activeOptimizers]);

  useEffect(reset, [activeOptimizers]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">Optimizer Race</h3>
        <p className="text-slate-500 text-sm max-w-md">Compare how different optimization algorithms navigate the loss landscape to find the global minimum.</p>
      </div>

      <div className="flex gap-12 items-center">
        {/* Landscape Visualizer */}
        <div className="relative w-[500px] h-[500px] bg-slate-950 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
           <svg className="absolute inset-0 w-full h-full opacity-30">
              {/* Fake contour lines */}
              {Array.from({ length: 10 }).map((_, i) => (
                <circle 
                  key={i} cx="250" cy="250" r={i * 30} 
                  fill="none" stroke="white" strokeWidth="0.5" strokeOpacity={0.1} 
                />
              ))}
           </svg>

           {/* Paths */}
           <svg className="absolute inset-0 w-full h-full">
              {Object.entries(paths).map(([opt, history]) => (
                <g key={opt}>
                   <motion.path
                     d={`M ${history.map(p => `${p.x * 50 + 250},${p.y * 50 + 250}`).join(' L ')}`}
                     fill="none"
                     stroke={(OPTIMIZERS as any)[opt].color}
                     strokeWidth="2"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                   />
                   <circle 
                    cx={history[history.length-1].x * 50 + 250} 
                    cy={history[history.length-1].y * 50 + 250} 
                    r="4" fill={(OPTIMIZERS as any)[opt].color} 
                    className="shadow-lg"
                   />
                </g>
              ))}
           </svg>

           <div className="absolute bottom-6 left-6 flex gap-4">
              {activeOptimizers.map(opt => (
                <div key={opt} className="flex items-center gap-2 px-2 py-1 bg-black/40 rounded border border-white/5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: (OPTIMIZERS as any)[opt].color }} />
                  <span className="text-[10px] font-mono text-slate-300">{(OPTIMIZERS as any)[opt].name}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Controls */}
        <div className="w-80 space-y-6">
           <div className="glass-panel p-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Learning Rate</span>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono text-emerald-400">{lr}</span>
              </div>
              <input 
                type="range" min="0.01" max="0.3" step="0.01"
                value={lr}
                onChange={(e) => setLr(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
           </div>

           <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => setIsTraining(!isTraining)}
                className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg ${
                  isTraining ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-600 text-white shadow-emerald-600/20'
                }`}
              >
                {isTraining ? 'Stop Race' : 'Start Optimizer Race'}
              </button>
              <button 
                onClick={reset}
                className="w-full py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-widest hover:bg-slate-700"
              >
                Reset Start Point
              </button>
           </div>

           <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Convergence Intel</span>
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">SGD Stability</span>
                    <span className="text-red-400">Low</span>
                 </div>
                 <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Adam Speed</span>
                    <span className="text-emerald-400">Very High</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
