'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Cpu, Zap, BrainCircuit, Globe } from 'lucide-react';

const TIMELINE = [
  { 
    year: '1943', 
    title: 'M-P Neuron', 
    description: 'Warren McCulloch and Walter Pitts propose the first mathematical model of a neuron.',
    icon: Cpu,
    color: 'blue'
  },
  { 
    year: '1958', 
    title: 'The Perceptron', 
    description: 'Frank Rosenblatt introduces the first model capable of learning from data.',
    icon: Zap,
    color: 'amber'
  },
  { 
    year: '1969', 
    title: 'AI Winter', 
    description: 'Minsky and Papert prove perceptrons cannot solve XOR, stalling neural research.',
    icon: History,
    color: 'slate'
  },
  { 
    year: '1986', 
    title: 'Backpropagation', 
    description: 'Rumelhart and Hinton popularize backprop, enabling deep multi-layer training.',
    icon: BrainCircuit,
    color: 'indigo'
  },
  { 
    year: '2012', 
    title: 'Deep Learning Era', 
    description: 'AlexNet wins ImageNet, sparking the modern revolution in GPU-accelerated AI.',
    icon: Globe,
    color: 'cyan'
  },
];

export default function HistoryViz() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-slate-200 mb-2">Deep Learning Evolution</h3>
        <p className="text-slate-500 text-sm">Tracing the architectural milestones of machine intelligence.</p>
      </div>

      <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
        {/* Timeline Line */}
        <div className="absolute w-full h-1 bg-slate-800 rounded-full">
           <motion.div 
             className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
             animate={{ width: `${(activeIdx / (TIMELINE.length - 1)) * 100}%` }}
           />
        </div>

        <div className="absolute w-full flex justify-between px-4">
           {TIMELINE.map((item, i) => (
             <div key={i} className="relative flex flex-col items-center">
                <button
                  onClick={() => setActiveIdx(i)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 z-10 border-2 ${
                    activeIdx === i 
                      ? 'bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-125' 
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600'
                  }`}
                >
                  <item.icon size={18} className={activeIdx === i ? 'text-cyan-400' : ''} />
                </button>
                <span className={`absolute -bottom-8 text-[10px] font-bold font-mono transition-colors ${activeIdx === i ? 'text-white' : 'text-slate-600'}`}>
                  {item.year}
                </span>
             </div>
           ))}
        </div>

        {/* Detailed Card */}
        <div className="absolute top-[-150px] w-full flex justify-center">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeIdx}
               initial={{ opacity: 0, y: 20, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: -20, scale: 0.9 }}
               className="glass-panel p-8 w-[450px] text-center border-white/10 neon-glow-blue bg-slate-950/80"
             >
                <h4 className="text-xl font-bold text-cyan-400 mb-2">{TIMELINE[activeIdx].title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {TIMELINE[activeIdx].description}
                </p>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
