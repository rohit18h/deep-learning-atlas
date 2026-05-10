'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Clock, ArrowRight, Zap } from 'lucide-react';

export default function RNNSequenceViz() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sequence = ['T', 'E', 'S', 'T'];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-amber-400 mb-2">RNN Sequence Learning</h3>
        <p className="text-slate-500 text-sm max-w-md">Processing data unrolled over time. Observe how the hidden state carries information from past steps to predict the next token.</p>
      </div>

      <div className="flex gap-4 items-center">
        {sequence.map((char, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-6 relative">
               {/* Hidden State Propagation */}
               <div className="absolute top-0 -translate-y-12">
                  <span className="text-[9px] font-mono text-amber-500/50">h_{i}</span>
               </div>
               
               {/* RNN Cell */}
               <motion.div
                 animate={{ 
                   scale: activeIdx === i ? 1.1 : 1,
                   borderColor: activeIdx === i ? '#fbbf24' : 'rgba(255,255,255,0.05)',
                   backgroundColor: activeIdx === i ? 'rgba(251,191,36,0.1)' : 'rgba(15,23,42,0.5)'
                 }}
                 className="w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center relative shadow-xl"
               >
                  <Zap size={20} className={cn("mb-2 transition-colors", activeIdx === i ? "text-amber-400" : "text-slate-700")} />
                  <span className="text-xl font-bold text-white">{char}</span>
                  
                  {/* Internal Recurrent Loop */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute -top-2 -right-2 w-6 h-6 border border-amber-500/20 rounded-full flex items-center justify-center"
                  >
                     <div className="w-1 h-1 bg-amber-500/40 rounded-full" />
                  </motion.div>
               </motion.div>

               {/* Input Label */}
               <div className="flex flex-col items-center gap-2">
                  <div className="w-px h-8 bg-slate-800" />
                  <span className="text-[10px] font-mono text-slate-500">x_{i}</span>
               </div>
            </div>
            {i < sequence.length - 1 && (
              <div className="flex items-center pt-8">
                 <motion.div
                   animate={{ 
                     opacity: activeIdx === i ? [0, 1, 0] : 0.2,
                     x: activeIdx === i ? [0, 10, 0] : 0
                   }}
                   transition={{ repeat: Infinity, duration: 1 }}
                   className="text-amber-400"
                 >
                   <ArrowRight size={20} />
                 </motion.div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-16 w-full max-w-3xl glass-panel p-8 flex justify-between items-center bg-amber-500/5 border-amber-500/10">
         <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">Context Window</span>
            <p className="text-sm text-slate-300">The RNN unrolls for each element in the sequence.</p>
         </div>
         <div className="flex gap-4">
            <div className="px-4 py-2 bg-slate-900 rounded-lg border border-white/5 font-mono text-xs text-amber-200">
               Vanishing Gradient: <span className="text-red-400">Detected</span>
            </div>
         </div>
      </div>
    </div>
  );
}
