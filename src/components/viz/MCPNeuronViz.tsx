'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Binary, ArrowRight } from 'lucide-react';

export default function MCPNeuronViz() {
  const [inputs, setInputs] = useState([0, 0]);
  const [threshold, setThreshold] = useState(2);

  const sum = inputs.reduce((a, b) => a + b, 0);
  const active = sum >= threshold;

  const toggleInput = (idx: number) => {
    const newInputs = [...inputs];
    newInputs[idx] = newInputs[idx] === 0 ? 1 : 0;
    setInputs(newInputs);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-12">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-cyan-400">McCulloch-Pitts Model</h3>
        <p className="text-slate-500 text-sm">The first computational model of a neuron. It acts as a logical threshold gate.</p>
      </div>

      <div className="flex items-center gap-16 relative">
        {/* Inputs */}
        <div className="flex flex-col gap-8">
          {inputs.map((val, i) => (
            <motion.button
              key={i}
              onClick={() => toggleInput(i)}
              className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 border-2 ${
                val === 1 ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'bg-slate-900 border-white/10 text-slate-500'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-tighter mb-1">Input {i+1}</span>
              <span className="text-xl font-mono font-bold">{val}</span>
            </motion.button>
          ))}
        </div>

        {/* Connections */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 flex flex-col gap-[72px] pointer-events-none">
          {inputs.map((val, i) => (
            <div key={i} className="relative">
               <svg width="100" height="2" className="overflow-visible">
                 <line x1="0" y1="1" x2="100" y2="1" stroke={val === 1 ? '#22d3ee' : '#1e293b'} strokeWidth="2" strokeDasharray="4 4" />
                 {val === 1 && (
                   <motion.circle
                     r="3" fill="#22d3ee"
                     animate={{ cx: [0, 100] }}
                     transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                   />
                 )}
               </svg>
            </div>
          ))}
        </div>

        {/* Summation Node */}
        <div className="relative group">
          <motion.div 
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-500 ${
              active ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.2)]' : 'border-slate-800 bg-slate-950'
            }`}
          >
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Sum</span>
            <span className="text-3xl font-bold text-white">{sum}</span>
            <div className="mt-2 text-[9px] font-mono text-cyan-400">Threshold: {threshold}</div>
          </motion.div>

          {/* Activation Overlay */}
          {active && (
            <motion.div 
              layoutId="glow-ring"
              className="absolute -inset-4 border border-cyan-400/30 rounded-full animate-pulse"
            />
          )}
        </div>

        <ArrowRight size={32} className={active ? 'text-cyan-400' : 'text-slate-800'} />

        {/* Output */}
        <motion.div 
          animate={{ scale: active ? 1.1 : 1 }}
          className={`w-24 h-24 rounded-3xl flex flex-col items-center justify-center border-2 transition-all duration-500 ${
            active ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)]' : 'bg-slate-900 border-white/5 text-slate-500'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest mb-1">Output</span>
          <span className={`text-4xl font-mono font-bold ${active ? 'text-cyan-400' : 'text-slate-700'}`}>
            {active ? '1' : '0'}
          </span>
        </motion.div>
      </div>

      {/* Threshold Controller */}
      <div className="glass-panel p-6 w-96 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Activation Threshold</span>
          <span className="text-sm font-mono text-cyan-400">{threshold}</span>
        </div>
        <input 
          type="range" min="0" max="2" step="1" 
          value={threshold} 
          onChange={(e) => setThreshold(parseInt(e.target.value))}
          className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[9px] font-mono text-slate-600">
          <span>OR (1)</span>
          <span>AND (2)</span>
        </div>
      </div>
    </div>
  );
}
