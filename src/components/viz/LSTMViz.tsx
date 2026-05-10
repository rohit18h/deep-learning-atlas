'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, ArrowRight, Zap, Database, ArrowUpRight } from 'lucide-react';

export default function LSTMViz() {
  const [activeGate, setActiveGate] = useState<string | null>(null);

  const gates = [
    { id: 'forget', name: 'Forget Gate', color: '#ef4444', desc: 'Decides what information to discard from the cell state.' },
    { id: 'input', name: 'Input Gate', color: '#10b981', desc: 'Decides which new information to store in the cell state.' },
    { id: 'output', name: 'Output Gate', color: '#3b82f6', desc: 'Decides what parts of the cell state to output.' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-blue-400 mb-2">LSTM Memory Cell</h3>
        <p className="text-slate-500 text-sm max-w-md">Long Short-Term Memory. Explore the gated architecture that solves the vanishing gradient problem in sequences.</p>
      </div>

      <div className="relative w-[800px] h-[500px] glass-panel bg-slate-950/50 border-white/5 p-8 flex items-center justify-center">
        {/* Cell State Line (The "Conveyor Belt") */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-slate-800" />
        <motion.div 
          animate={{ x: [0, 800] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute top-[24%] w-4 h-2 bg-blue-400 blur-sm rounded-full"
        />

        {/* Internal Architecture SVG */}
        <svg viewBox="0 0 800 400" className="w-full h-full z-10 pointer-events-none">
          {/* Forget Gate */}
          <rect x="150" y="250" width="80" height="60" rx="10" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2" />
          <text x="190" y="285" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">FORGET</text>
          <path d="M190,250 L190,105" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />

          {/* Input Gate */}
          <rect x="350" y="250" width="80" height="60" rx="10" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />
          <text x="390" y="285" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">INPUT</text>
          <path d="M390,250 L390,105" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />

          {/* Output Gate */}
          <rect x="550" y="250" width="80" height="60" rx="10" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
          <text x="590" y="285" fill="#3b82f6" fontSize="12" textAnchor="middle" fontWeight="bold">OUTPUT</text>
          <path d="M590,250 L590,350" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />

          {/* Labels */}
          <text x="50" y="90" fill="#64748b" fontSize="10" fontWeight="bold">CELL STATE (C_t-1)</text>
          <text x="750" y="90" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="end">CELL STATE (C_t)</text>
        </svg>

        {/* Interactive Gate Buttons */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex gap-32 mt-40">
            {gates.map(gate => (
              <button
                key={gate.id}
                onMouseEnter={() => setActiveGate(gate.id)}
                onMouseLeave={() => setActiveGate(null)}
                className="w-20 h-16 pointer-events-auto cursor-help"
              />
            ))}
          </div>
        </div>

        {/* Tooltip Overlay */}
        <AnimatePresence>
          {activeGate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 glass-panel p-6 w-[400px] text-center border-blue-500/20 bg-slate-900/90 shadow-2xl"
            >
              <h4 className="text-xl font-bold mb-2 uppercase tracking-widest" style={{ color: gates.find(g => g.id === activeGate)?.color }}>
                {gates.find(g => g.id === activeGate)?.name}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {gates.find(g => g.id === activeGate)?.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-5xl mt-8">
         <div className="glass-panel p-4 flex gap-4 items-center bg-blue-500/5">
            <Database className="text-blue-400" size={24} />
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Long-Term Memory</span>
              <span className="text-sm font-mono text-blue-200">Cell State C_t</span>
            </div>
         </div>
         <div className="glass-panel p-4 flex gap-4 items-center bg-emerald-500/5">
            <Zap className="text-emerald-400" size={24} />
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Short-Term Memory</span>
              <span className="text-sm font-mono text-emerald-200">Hidden State h_t</span>
            </div>
         </div>
         <div className="glass-panel p-4 flex gap-4 items-center bg-amber-500/5">
            <Power className="text-amber-400" size={24} />
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Input Sequence</span>
              <span className="text-sm font-mono text-amber-200">Vector x_t</span>
            </div>
         </div>
      </div>
    </div>
  );
}
