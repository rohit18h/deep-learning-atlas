'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PARTS = [
  { id: 'dendrites', name: 'Dendrites', description: 'Branch-like structures that receive signals from other neurons.' },
  { id: 'soma', name: 'Soma (Cell Body)', description: 'Processes incoming signals and maintains the cell.' },
  { id: 'nucleus', name: 'Nucleus', description: 'The control center containing genetic material.' },
  { id: 'axon', name: 'Axon', description: 'Transmits the electrical impulse away from the soma.' },
  { id: 'synapse', name: 'Synapse', description: 'The junction where signals are passed to other cells via neurotransmitters.' },
];

export default function BiologicalNeuronViz() {
  const [activePart, setActivePart] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-blue-400 mb-2">Biological Intelligence</h3>
        <p className="text-slate-500 text-sm max-w-md">Explore the anatomical structures of a biological neuron. Hover over parts to reveal their cognitive function.</p>
      </div>

      <div className="relative w-[800px] h-[500px]">
        {/* SVG Neuron Model */}
        <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-2xl">
          <defs>
            <radialGradient id="somaGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.4" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Dendrites */}
          <g className="dendrites cursor-pointer" onMouseEnter={() => setActivePart('dendrites')} onMouseLeave={() => setActivePart(null)}>
            <path d="M150,150 L250,220 M120,250 L250,250 M150,350 L250,280" stroke="#475569" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            <motion.path 
              d="M150,150 C180,140 220,180 250,220" 
              stroke="#3b82f6" strokeWidth="2" fill="none"
              animate={{ opacity: activePart === 'dendrites' ? 1 : 0.4 }}
            />
          </g>

          {/* Axon */}
          <g className="axon cursor-pointer" onMouseEnter={() => setActivePart('axon')} onMouseLeave={() => setActivePart(null)}>
            <rect x="350" y="240" width="300" height="20" rx="10" fill="#1e293b" />
            <motion.rect 
              x="350" y="245" width="300" height="10" rx="5" 
              fill="#3b82f6" 
              animate={{ 
                opacity: [0.2, 0.8, 0.2],
                fill: activePart === 'axon' ? '#60a5fa' : '#3b82f6'
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </g>

          {/* Soma */}
          <g className="soma cursor-pointer" onMouseEnter={() => setActivePart('soma')} onMouseLeave={() => setActivePart(null)}>
            <motion.circle 
              cx="300" cy="250" r="60" 
              fill="url(#somaGradient)" 
              filter="url(#glow)"
              animate={{ 
                scale: activePart === 'soma' ? 1.05 : 1,
                rotate: 360
              }}
              transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" } }}
            />
            {/* Nucleus */}
            <circle cx="300" cy="250" r="15" fill="#1e1b4b" onMouseEnter={() => setActivePart('nucleus')} />
          </g>

          {/* Signal Pulse */}
          <motion.circle
            r="6"
            fill="#60a5fa"
            filter="url(#glow)"
            animate={{
              cx: [250, 300, 650, 700],
              cy: [250, 250, 250, 250],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.5, 1.5, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Labels (Conceptual) */}
          <g className="labels pointer-events-none">
            <text x="200" y="140" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">INPUT SIGNALS</text>
            <text x="680" y="240" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">OUTPUT</text>
          </g>
        </svg>

        {/* Floating Tooltip */}
        <AnimatePresence>
          {activePart && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-32 w-64 glass-panel p-4 z-20 neon-glow-blue pointer-events-none"
            >
              <h4 className="text-blue-400 font-bold mb-1">{PARTS.find(p => p.id === activePart)?.name}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {PARTS.find(p => p.id === activePart)?.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Propagation Diagram */}
      <div className="absolute bottom-12 right-12 flex items-center gap-4 p-4 glass-panel bg-white/5 border-none">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest text-right">Potential</span>
          <div className="flex gap-1 items-end h-8">
            {[20, 35, 25, 40, 80, 20, 15].map((h, i) => (
              <motion.div 
                key={i} 
                className="w-1 bg-blue-500 rounded-full" 
                animate={{ height: [h, h * 0.5, h] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="block text-lg font-mono text-blue-400">-70mV</span>
          <span className="block text-[8px] text-slate-500 uppercase font-bold">Resting State</span>
        </div>
      </div>
    </div>
  );
}
