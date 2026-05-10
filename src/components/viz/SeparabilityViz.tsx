'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function SeparabilityViz() {
  const [type, setType] = useState<'linear' | 'nonlinear'>('linear');
  const [isTraining, setIsTraining] = useState(false);
  const [rotation, setRotation] = useState(45);

  const points = useMemo(() => {
    const pts = [];
    if (type === 'linear') {
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * 400 - 200;
        const y = Math.random() * 400 - 200;
        const label = y > x + 20 ? 1 : -1;
        pts.push({ x, y, label });
      }
    } else {
      // XOR pattern
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * 400 - 200;
        const y = Math.random() * 400 - 200;
        const label = (x > 0 && y > 0) || (x < 0 && y < 0) ? 1 : -1;
        pts.push({ x, y, label });
      }
    }
    return pts;
  }, [type]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-amber-400 mb-2">Linear Separability</h3>
        <p className="text-slate-500 text-sm">Visualize the boundary of classification in 2D space.</p>
      </div>

      <div className="flex gap-12 items-center">
        {/* Classification Plane */}
        <div className="relative w-[500px] h-[500px] bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden">
          {/* Grid */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

          {/* Decision Boundary */}
          <motion.div
            animate={{ 
              rotate: type === 'linear' ? rotation : 0,
              opacity: type === 'linear' ? 1 : 0.2
            }}
            className="absolute top-1/2 left-[-100px] w-[700px] h-[200px] bg-amber-400/10 border-t-2 border-amber-400/50 -translate-y-1/2 z-0"
          />

          {/* Nonlinear Boundary (Conceptual) */}
          {type === 'nonlinear' && (
             <svg className="absolute inset-0 w-full h-full z-0 opacity-40">
                <path d="M0,250 Q125,125 250,250 T500,250" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="10 5" />
                <path d="M250,0 Q125,125 250,250 T250,500" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="10 5" />
             </svg>
          )}

          {/* Data Points */}
          <div className="absolute inset-0 flex items-center justify-center">
            {points.map((p, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute w-3 h-3 rounded-full shadow-lg"
                style={{ 
                  left: `${p.x + 250}px`, 
                  top: `${p.y + 250}px`,
                  backgroundColor: p.label === 1 ? '#3b82f6' : '#ef4444',
                  boxShadow: p.label === 1 ? '0 0 10px rgba(59,130,246,0.5)' : '0 0 10px rgba(239,68,68,0.5)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="w-64 space-y-6">
          <div className="glass-panel p-6 space-y-4">
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Dataset Type</span>
             <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setType('linear')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${type === 'linear' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-400'}`}
                >
                  Linear
                </button>
                <button 
                  onClick={() => setType('nonlinear')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${type === 'nonlinear' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-400'}`}
                >
                  XOR (Non-L)
                </button>
             </div>
          </div>

          <div className="glass-panel p-6 space-y-4">
             <div className="flex justify-between items-center">
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Decision Bias</span>
               <span className="text-xs font-mono text-amber-400">{rotation}°</span>
             </div>
             <input 
              type="range" min="0" max="360" 
              value={rotation} 
              onChange={(e) => setRotation(parseInt(e.target.value))}
              disabled={type === 'nonlinear'}
              className="w-full accent-amber-500 opacity-80" 
             />
          </div>

          <button 
            onClick={() => setIsTraining(!isTraining)}
            className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              isTraining ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-600 text-white'
            }`}
          >
            {isTraining ? 'Stop Training' : 'Optimize Weights'}
          </button>

          <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
            <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold mb-2">
              <span>Convergence</span>
              <span className="text-amber-400">89%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
               <motion.div 
                animate={{ width: isTraining ? '89%' : '0%' }}
                className="h-full bg-amber-400" 
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
