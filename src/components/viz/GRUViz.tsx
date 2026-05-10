'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Power, GitCompare, Zap } from 'lucide-react';

export default function GRUViz() {
  const [activeGate, setActiveGate] = useState<string | null>(null);

  const gates = [
    { id: 'update', name: 'Update Gate (z)', color: '#10b981', desc: 'Determines how much of the past memory to keep vs how much new info to add.' },
    { id: 'reset', name: 'Reset Gate (r)', color: '#ef4444', desc: 'Determines how much of the past memory to forget before calculating new info.' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">GRU Architecture</h3>
        <p className="text-slate-500 text-sm max-w-md">Gated Recurrent Unit. A more efficient alternative to LSTM that uses only two gates to control information flow.</p>
      </div>

      <div className="relative w-[700px] h-[500px] glass-panel bg-slate-950/50 border-white/5 p-8 flex items-center justify-center">
        {/* Main flow line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800" />

        <svg viewBox="0 0 700 400" className="w-full h-full z-10 pointer-events-none">
          {/* Update Gate */}
          <rect x="200" y="250" width="100" height="70" rx="15" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />
          <text x="250" y="290" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">UPDATE</text>
          
          {/* Reset Gate */}
          <rect x="400" y="250" width="100" height="70" rx="15" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2" />
          <text x="450" y="290" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">RESET</text>

          {/* Connection wires */}
          <path d="M250,250 L250,200" stroke="#10b981" strokeWidth="2" strokeDasharray="5 5" />
          <path d="M450,250 L450,200" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5" />
        </svg>

        {/* Interactive Zones */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="flex gap-40 mt-32">
              {gates.map(gate => (
                <button
                  key={gate.id}
                  onMouseEnter={() => setActiveGate(gate.id)}
                  onMouseLeave={() => setActiveGate(null)}
                  className="w-24 h-20 pointer-events-auto cursor-help"
                />
              ))}
           </div>
        </div>

        {/* Active Tooltip */}
        <AnimatePresence>
          {activeGate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-12 left-1/2 -translate-x-1/2 glass-panel p-6 w-[400px] border-emerald-500/20 bg-slate-900/90"
            >
              <h4 className="text-xl font-bold mb-2 uppercase tracking-widest text-center" style={{ color: gates.find(g => g.id === activeGate)?.color }}>
                {gates.find(g => g.id === activeGate)?.name}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed text-center">
                {gates.find(g => g.id === activeGate)?.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8 w-full max-w-4xl">
         <div className="p-4 glass-panel flex gap-4 items-center bg-white/5 border-none">
            <GitCompare className="text-emerald-400" />
            <div>
               <span className="block text-[10px] font-bold text-slate-500 uppercase">Simplified Logic</span>
               <span className="text-xs text-slate-300">Merges Cell State & Hidden State</span>
            </div>
         </div>
         <div className="p-4 glass-panel flex gap-4 items-center bg-white/5 border-none">
            <Power className="text-emerald-400" />
            <div>
               <span className="block text-[10px] font-bold text-slate-500 uppercase">Speed Performance</span>
               <span className="text-xs text-slate-300">Faster computation than LSTM</span>
            </div>
         </div>
      </div>
    </div>
  );
}
