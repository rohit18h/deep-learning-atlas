'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PerceptronLearningViz() {
  const [weights, setWeights] = useState([Math.random() * 2 - 1, Math.random() * 2 - 1]);
  const [bias, setBias] = useState(Math.random() * 2 - 1);
  const [learningRate, setLearningRate] = useState(0.1);
  const [epoch, setEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  const dataset = useMemo(() => [
    { x: [0.2, 0.8], y: 1 },
    { x: [0.1, 0.5], y: 1 },
    { x: [0.9, 0.1], y: -1 },
    { x: [0.7, 0.2], y: -1 },
    { x: [0.3, 0.1], y: 1 },
    { x: [0.8, 0.9], y: -1 },
  ], []);

  useEffect(() => {
    if (!isTraining) return;
    const interval = setInterval(() => {
      // One step of training
      const idx = Math.floor(Math.random() * dataset.length);
      const { x, y } = dataset[idx];
      const sum = x[0] * weights[0] + x[1] * weights[1] + bias;
      const pred = sum > 0 ? 1 : -1;
      const error = y - pred;

      if (error !== 0) {
        setWeights([
          weights[0] + learningRate * error * x[0],
          weights[1] + learningRate * error * x[1]
        ]);
        setBias(bias + learningRate * error);
      }
      setEpoch(prev => prev + 1);
    }, 200);

    return () => clearInterval(interval);
  }, [isTraining, weights, bias, learningRate, dataset]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">Learning Algorithm</h3>
        <p className="text-slate-500 text-sm">Real-time weight adjustment based on classification error.</p>
      </div>

      <div className="flex gap-16 items-center">
        {/* Classification Visualizer */}
        <div className="relative w-[400px] h-[400px] bg-slate-900 rounded-2xl border border-white/5 overflow-hidden shadow-inner">
           {/* Decision Boundary Line */}
           {/* Line equation: w0*x + w1*y + b = 0  => y = (-w0*x - b) / w1 */}
           <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              {Math.abs(weights[1]) > 0.01 && (
                <motion.line
                  x1="0"
                  y1={(-weights[0] * -1 - bias) / weights[1] * 200 + 200}
                  x2="400"
                  y2={(-weights[0] * 1 - bias) / weights[1] * 200 + 200}
                  stroke="#10b981"
                  strokeWidth="2"
                  className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                />
              )}
           </svg>

           {/* Data Points */}
           {dataset.map((p, i) => {
             const pred = p.x[0] * weights[0] + p.x[1] * weights[1] + bias > 0 ? 1 : -1;
             const isCorrect = pred === p.y;
             return (
               <motion.div
                 key={i}
                 className={`absolute w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                   p.y === 1 ? 'bg-blue-500 shadow-blue-500/50' : 'bg-red-500 shadow-red-500/50'
                 } ${!isCorrect ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}
                 style={{ 
                   left: `${p.x[0] * 300 + 50}px`, 
                   top: `${p.x[1] * 300 + 50}px` 
                 }}
               >
                 {p.y === 1 ? '+' : '-'}
               </motion.div>
             );
           })}
        </div>

        {/* Training Panel */}
        <div className="w-80 space-y-6">
           <div className="glass-panel p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Epoch</span>
                <span className="text-sm font-mono text-emerald-400">{epoch}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Weights</span>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-mono text-slate-300">w1: {weights[0].toFixed(3)}</span>
                  <span className="text-[10px] font-mono text-slate-300">w2: {weights[1].toFixed(3)}</span>
                </div>
              </div>
           </div>

           <div className="glass-panel p-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Learning Rate</span>
              <input 
                type="range" min="0.01" max="0.5" step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
           </div>

           <button 
             onClick={() => setIsTraining(!isTraining)}
             className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg ${
               isTraining ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-600 text-white shadow-emerald-600/20'
             }`}
           >
             {isTraining ? 'Pause Training' : 'Start Epoch Training'}
           </button>
           
           <button 
             onClick={() => { setWeights([Math.random() * 2 - 1, Math.random() * 2 - 1]); setBias(Math.random() * 2 - 1); setEpoch(0); }}
             className="w-full py-2 text-[10px] uppercase font-bold text-slate-500 hover:text-slate-300 transition-colors"
           >
             Reset Weights
           </button>
        </div>
      </div>
    </div>
  );
}
