'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Layers, Box, Cpu, Target } from 'lucide-react';

export default function CNNArchitectureViz() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { name: 'Input', icon: Box, color: '#94a3b8', desc: 'Raw RGB pixel data.' },
    { name: 'Conv 1', icon: Cpu, color: '#3b82f6', desc: 'Low-level edge detection.' },
    { name: 'Pool 1', icon: Layers, color: '#10b981', desc: 'Spatial downsampling.' },
    { name: 'Conv 2', icon: Cpu, color: '#6366f1', desc: 'Higher-level feature patterns.' },
    { name: 'FC Layer', icon: Target, color: '#f59e0b', desc: 'Classification voting.' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-indigo-400 mb-2">Modern CNN Architectures</h3>
        <p className="text-slate-500 text-sm max-w-md">The deep hierarchical pipeline. From raw pixels to semantic understanding through successive abstraction layers.</p>
      </div>

      <div className="relative flex items-center gap-4 w-full max-w-6xl h-[400px]">
         {steps.map((step, i) => (
           <React.Fragment key={i}>
             <motion.div
               onMouseEnter={() => setActiveStep(i)}
               animate={{ 
                 scale: activeStep === i ? 1.1 : 1,
                 opacity: activeStep === i ? 1 : 0.6
               }}
               className="flex-1 flex flex-col items-center gap-4 group cursor-help"
             >
                <div 
                  className="w-full h-40 rounded-2xl border-2 transition-all flex flex-col items-center justify-center bg-slate-900 shadow-xl"
                  style={{ borderColor: activeStep === i ? step.color : 'rgba(255,255,255,0.05)' }}
                >
                   <step.icon size={32} style={{ color: step.color }} className="mb-2" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{step.name}</span>
                </div>
                <div className="text-center h-12">
                   <p className="text-[10px] text-slate-500 max-w-[120px] transition-opacity group-hover:opacity-100 opacity-0">
                     {step.desc}
                   </p>
                </div>
             </motion.div>
             {i < steps.length - 1 && (
               <div className="w-8 h-px bg-slate-800" />
             )}
           </React.Fragment>
         ))}
      </div>

      <div className="absolute bottom-12 flex gap-8 p-6 glass-panel border-indigo-500/10">
         <div className="flex flex-col gap-1">
            <span className="text-[9px] text-slate-500 font-bold uppercase">Benchmark (ImageNet)</span>
            <div className="flex items-center gap-3">
               <span className="text-2xl font-mono text-white">96.8%</span>
               <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Top-5 Acc</span>
            </div>
         </div>
         <div className="w-px h-10 bg-white/5" />
         <div className="flex flex-col gap-1">
            <span className="text-[9px] text-slate-500 font-bold uppercase">Model Depth</span>
            <span className="text-2xl font-mono text-white">52 Layers</span>
         </div>
      </div>
    </div>
  );
}
