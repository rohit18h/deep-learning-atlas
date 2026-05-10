'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { History, ArrowLeft, RefreshCw } from 'lucide-react';

export default function BPTTViz() {
  const [step, setStep] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev <= 0 ? 3 : prev - 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-rose-400 mb-2">Backpropagation Through Time</h3>
        <p className="text-slate-500 text-sm max-w-md">The training engine of RNNs. Watch how the gradient flows backwards from the final output through each temporal step to update weights.</p>
      </div>

      <div className="flex gap-8 items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-4 relative">
               <div className={cn(
                 "w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-500",
                 step === i ? "border-rose-500 bg-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.3)]" : "border-slate-800 bg-slate-900/50"
               )}>
                  <RefreshCw size={24} className={cn("transition-colors", step === i ? "text-rose-400" : "text-slate-700")} />
               </div>
               
               {/* Gradient Flow Arrow */}
               {i < 3 && (
                  <div className="absolute top-1/2 -left-8 -translate-y-1/2">
                     <motion.div
                       animate={{ 
                         opacity: step === i ? [0, 1, 0] : 0.1,
                         x: step === i ? [0, -10, 0] : 0
                       }}
                       transition={{ duration: 1, repeat: Infinity }}
                       className="text-rose-400 rotate-180"
                     >
                        <ArrowLeft size={20} />
                     </motion.div>
                  </div>
               )}

               <span className="text-[10px] font-mono text-slate-500">t={i}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-16 w-full max-w-4xl p-8 glass-panel bg-rose-500/5 border-rose-500/10 flex items-center gap-12">
         <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
            <History className="text-rose-400" size={32} />
         </div>
         <div className="flex-1 space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-rose-400">The Gradient Flow</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              BPTT calculates the gradient at each time step. However, as the sequence grows, gradients can either <strong>explode</strong> or <strong>vanish</strong>, making long-term learning difficult.
            </p>
         </div>
         <div className="px-6 py-4 bg-slate-900/80 rounded-2xl border border-white/5">
            <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">Gradient Magnitude</div>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
               <motion.div 
                 animate={{ width: step === 0 ? '10%' : '80%' }}
                 className="h-full bg-rose-500"
               />
            </div>
         </div>
      </div>
    </div>
  );
}
