'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PerceptronViz() {
  const [weights, setWeights] = useState([0.5, -0.2]);
  const [bias, setBias] = useState(0.1);
  const [inputs, setInputs] = useState([1, -1]);
  
  const weightedSum = inputs[0] * weights[0] + inputs[1] * weights[1] + bias;
  const output = weightedSum > 0 ? 1 : -1;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-purple-400 mb-2">The Perceptron</h3>
        <p className="text-slate-500 text-sm">Linear classifier with learnable weights and bias.</p>
      </div>

      <div className="flex items-center gap-24 relative scale-110">
        {/* Input Nodes */}
        <div className="flex flex-col gap-12">
          {inputs.map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  const newInputs = [...inputs];
                  newInputs[i] = newInputs[i] === 1 ? -1 : 1;
                  setInputs(newInputs);
                }}
                className={`w-14 h-14 rounded-full border-2 cursor-pointer flex items-center justify-center font-mono text-sm transition-colors ${
                  val === 1 ? 'border-purple-400 bg-purple-400/10' : 'border-slate-700 bg-slate-900 text-slate-500'
                }`}
              >
                {val}
              </motion.div>
              <span className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest">x{i+1}</span>
            </div>
          ))}
          {/* Bias Input */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border-2 border-slate-700 bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-400">
              +1
            </div>
            <span className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest">Bias</span>
          </div>
        </div>

        {/* Connections Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ left: '60px' }}>
          {/* w1 */}
          <path d="M0,0 L140,75" stroke="#a855f7" strokeWidth={Math.abs(weights[0]) * 10 + 1} opacity={0.3} fill="none" />
          {/* w2 */}
          <path d="M0,100 L140,75" stroke="#a855f7" strokeWidth={Math.abs(weights[1]) * 10 + 1} opacity={0.3} fill="none" />
          {/* bias */}
          <path d="M0,200 L140,75" stroke="#a855f7" strokeWidth={Math.abs(bias) * 10 + 1} opacity={0.3} fill="none" />
        </svg>

        {/* Summation Node */}
        <div className="relative">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-40 h-40 rounded-full bg-slate-900 border-4 border-slate-800 flex flex-col items-center justify-center text-center p-4 relative z-10"
          >
            <span className="text-[10px] text-slate-500 font-bold mb-1">SUMMATION</span>
            <span className="text-xl font-bold text-white font-mono">{weightedSum.toFixed(2)}</span>
            <div className="h-px w-12 bg-slate-800 my-2" />
            <span className="text-[10px] text-slate-500 font-bold mb-1">ACTIVATION</span>
            <span className="text-lg font-bold text-purple-400">Step Function</span>
          </motion.div>
          
          {/* Weighted Multipliers */}
          <div className="absolute -left-12 top-0 space-y-20">
            {weights.map((w, i) => (
              <div key={i} className="bg-slate-950 px-2 py-1 rounded border border-purple-500/20 text-[10px] font-mono text-purple-300">
                w{i+1}: {w.toFixed(1)}
              </div>
            ))}
            <div className="bg-slate-950 px-2 py-1 rounded border border-purple-500/20 text-[10px] font-mono text-purple-300">
               b: {bias.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ 
              backgroundColor: output === 1 ? 'rgba(168, 85, 247, 0.2)' : 'rgba(30, 41, 59, 0.5)',
              borderColor: output === 1 ? '#a855f7' : '#334155'
            }}
            className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold font-mono"
          >
            {output}
          </motion.div>
          <span className="text-[10px] text-slate-500 mt-4 font-bold uppercase tracking-widest">Predicted y</span>
        </div>
      </div>

      {/* Parameter Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-8">
        <div className="glass-panel p-4 w-48 space-y-3">
          <span className="text-[9px] font-bold text-slate-500 uppercase">Weight 1</span>
          <input 
            type="range" min="-1" max="1" step="0.1" 
            value={weights[0]} 
            onChange={(e) => setWeights([parseFloat(e.target.value), weights[1]])}
            className="w-full accent-purple-500" 
          />
        </div>
        <div className="glass-panel p-4 w-48 space-y-3">
          <span className="text-[9px] font-bold text-slate-500 uppercase">Weight 2</span>
          <input 
            type="range" min="-1" max="1" step="0.1" 
            value={weights[1]} 
            onChange={(e) => setWeights([weights[0], parseFloat(e.target.value)])}
            className="w-full accent-purple-500" 
          />
        </div>
        <div className="glass-panel p-4 w-48 space-y-3">
          <span className="text-[9px] font-bold text-slate-500 uppercase">Bias</span>
          <input 
            type="range" min="-1" max="1" step="0.1" 
            value={bias} 
            onChange={(e) => setBias(parseFloat(e.target.value))}
            className="w-full accent-purple-500" 
          />
        </div>
      </div>
    </div>
  );
}
