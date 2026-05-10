'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LAYERS = [
  { id: 'input', nodes: 3, label: 'Input Layer' },
  { id: 'hidden1', nodes: 4, label: 'Hidden Layer 1' },
  { id: 'hidden2', nodes: 4, label: 'Hidden Layer 2' },
  { id: 'output', nodes: 2, label: 'Output Layer' },
];

export default function MLPViz() {
  const [activeSignal, setActiveSignal] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSignal(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-indigo-400 mb-2">Multilayer Perceptron</h3>
        <p className="text-slate-500 text-sm">Deep architectural intelligence through layered feature extraction.</p>
      </div>

      <div className="flex items-center justify-between w-full max-w-5xl px-12 relative">
        {/* Connection Lines (Static Background) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0 opacity-10">
          {LAYERS.map((layer, i) => {
            if (i === LAYERS.length - 1) return null;
            const nextLayer = LAYERS[i+1];
            return layer.nodes > 0 && Array.from({ length: layer.nodes }).map((_, n1) => (
              Array.from({ length: nextLayer.nodes }).map((_, n2) => (
                <line 
                  key={`${i}-${n1}-${n2}`}
                  x1={`${(i / (LAYERS.length - 1)) * 100}%`}
                  y1={`${((n1 + 1) / (layer.nodes + 1)) * 100}%`}
                  x2={`${((i + 1) / (LAYERS.length - 1)) * 100}%`}
                  y2={`${((n2 + 1) / (nextLayer.nodes + 1)) * 100}%`}
                  stroke="white"
                  strokeWidth="1"
                />
              ))
            ));
          })}
        </svg>

        {/* Layer Nodes */}
        {LAYERS.map((layer, i) => (
          <div key={layer.id} className="flex flex-col items-center gap-12 relative z-10">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">{layer.label}</span>
            <div className="flex flex-col gap-6">
              {Array.from({ length: layer.nodes }).map((_, n) => (
                <Node 
                  key={n} 
                  isActive={activeSignal >= i} 
                  isOutput={layer.id === 'output'}
                  delay={i * 0.2 + n * 0.05}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Moving Signal Pulses */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <AnimatePresence>
             {Array.from({ length: 20 }).map((_, k) => (
               <SignalPulse key={k} />
             ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 glass-panel p-4 flex gap-6 items-center">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
          <span className="text-[10px] font-bold text-slate-400">Forward Propagation</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full border border-indigo-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400">Backpropagation</span>
        </div>
      </div>
    </div>
  );
}

function Node({ isActive, isOutput, delay }: { isActive: boolean; isOutput?: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: isActive ? 1.1 : 1,
        opacity: 1,
        boxShadow: isActive ? '0 0 20px rgba(99, 102, 241, 0.4)' : 'none',
        borderColor: isActive ? '#6366f1' : '#334155'
      }}
      transition={{ delay }}
      className={`w-10 h-10 rounded-full border-2 bg-slate-950 flex items-center justify-center relative transition-colors`}
    >
      {isActive && (
        <motion.div 
          className="absolute -inset-2 border border-indigo-500/30 rounded-full"
          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}
    </motion.div>
  );
}

function SignalPulse() {
  const [path, setPath] = useState({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });

  useEffect(() => {
    // Randomly pick two adjacent layers and nodes
    const layerIdx = Math.floor(Math.random() * (LAYERS.length - 1));
    const nextLayerIdx = layerIdx + 1;
    const node1Idx = Math.floor(Math.random() * LAYERS[layerIdx].nodes);
    const node2Idx = Math.floor(Math.random() * LAYERS[nextLayerIdx].nodes);

    const x1 = (layerIdx / (LAYERS.length - 1)) * 100;
    const y1 = ((node1Idx + 1) / (LAYERS[layerIdx].nodes + 1)) * 100; // Corrected logic
    // Actually we'll use approximate positions
    setPath({
      start: { x: x1, y: ((node1Idx + 1) / (LAYERS[layerIdx].nodes + 1)) * 100 },
      end: { x: ((layerIdx + 1) / (LAYERS.length - 1)) * 100, y: ((node2Idx + 1) / (LAYERS[nextLayerIdx].nodes + 1)) * 100 }
    });
  }, []);

  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-500/50"
      initial={{ left: `${path.start.x}%`, top: `${path.start.y}%`, opacity: 0 }}
      animate={{ left: `${path.end.x}%`, top: `${path.end.y}%`, opacity: [0, 1, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay: Math.random() * 5 }}
    />
  );
}
