'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Zap, Network } from 'lucide-react';

export default function RecentTrendsViz() {
  const [activeWord, setActiveWord] = useState(0);
  const words = ['Neural', 'Networks', 'Learn', 'Context'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord(prev => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-violet-400 mb-2">Modern Frontiers: Attention</h3>
        <p className="text-slate-500 text-sm max-w-md">The Transformer revolution. Self-attention allows the model to weigh the importance of every part of the input data relative to each other.</p>
      </div>

      <div className="flex flex-col items-center gap-16">
        <div className="flex gap-12">
          {words.map((word, i) => (
            <div key={i} className="flex flex-col items-center gap-12 relative">
               {/* Word Token */}
               <motion.div
                 animate={{ 
                   scale: activeWord === i ? 1.1 : 1,
                   borderColor: activeWord === i ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
                   backgroundColor: activeWord === i ? 'rgba(139,92,246,0.1)' : 'rgba(15,23,42,0.5)'
                 }}
                 className="px-8 py-4 rounded-xl border-2 font-mono font-bold text-white shadow-2xl relative z-10"
               >
                  {word}
                  {activeWord === i && (
                    <motion.div 
                      layoutId="attention-glow"
                      className="absolute -inset-2 bg-violet-500/20 rounded-xl blur-xl"
                    />
                  )}
               </motion.div>

               {/* Attention Lines */}
               {activeWord === i && (
                 <svg className="absolute inset-0 w-[600px] -left-[250px] top-1/2 pointer-events-none z-0 overflow-visible">
                    {words.map((_, targetIdx) => {
                       const offset = (targetIdx - i) * 140;
                       const weight = Math.random() * 5 + 1;
                       return (
                         <motion.path
                           key={targetIdx}
                           d={`M 250,0 Q ${250 + offset/2},100 ${250 + offset},0`}
                           fill="none"
                           stroke="#8b5cf6"
                           strokeWidth={weight}
                           initial={{ pathLength: 0, opacity: 0 }}
                           animate={{ pathLength: 1, opacity: 0.3 }}
                           transition={{ duration: 1 }}
                         />
                       );
                    })}
                 </svg>
               )}
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl grid grid-cols-3 gap-8">
           <div className="glass-panel p-6 space-y-3 bg-violet-500/5 border-violet-500/10">
              <Zap size={20} className="text-violet-400" />
              <span className="block text-[10px] font-bold uppercase tracking-widest text-violet-400">Parallelism</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">Unlike RNNs, Transformers process entire sequences simultaneously, enabling massive scaling on GPUs.</p>
           </div>
           <div className="glass-panel p-6 space-y-3 bg-violet-500/5 border-violet-500/10">
              <Sparkles size={20} className="text-violet-400" />
              <span className="block text-[10px] font-bold uppercase tracking-widest text-violet-400">Global Context</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">Every token "attends" to every other token, capturing long-range dependencies perfectly.</p>
           </div>
           <div className="glass-panel p-6 space-y-3 bg-violet-500/5 border-violet-500/10">
              <Network size={20} className="text-violet-400" />
              <span className="block text-[10px] font-bold uppercase tracking-widest text-violet-400">State of the Art</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">The backbone of GPT-4, Claude, and Gemini. The dominant architecture of the modern era.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
