'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Ghost, UserCheck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GANViz() {
  const [trainingStep, setTrainingStep] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [score, setScore] = useState(0.5);

  useEffect(() => {
    if (!isTraining) return;
    const interval = setInterval(() => {
      setTrainingStep(prev => prev + 1);
      setScore(prev => Math.max(0.1, Math.min(0.9, prev + (Math.random() - 0.5) * 0.1)));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTraining]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-pink-400 mb-2">Adversarial Intelligence (GANs)</h3>
        <p className="text-slate-500 text-sm max-w-md">Generator vs Discriminator. A zero-sum game where one network creates fake data and the other tries to catch it.</p>
      </div>

      <div className="flex items-center gap-12 w-full max-w-6xl">
        {/* Generator */}
        <div className="flex-1 flex flex-col items-center gap-6">
           <div className="w-48 h-48 rounded-3xl bg-pink-500/10 border-2 border-pink-500/30 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent" />
              <Ghost className="text-pink-400 mb-2 group-hover:scale-110 transition-transform" size={48} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400">Generator</span>
              
              {/* Noise Input Particles */}
              {isTraining && Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -100, y: Math.random() * 100 - 50, opacity: 0 }}
                  animate={{ x: 0, opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                  className="absolute w-1 h-1 bg-white rounded-full"
                />
              ))}
           </div>
           <div className="text-center">
             <span className="text-[9px] text-slate-500 font-bold uppercase block mb-1">Creating</span>
             <span className="text-xs font-mono text-pink-300">Fake Sample.jpg</span>
           </div>
        </div>

        {/* The Battleground */}
        <div className="flex flex-col items-center gap-8 relative">
           <Swords className="text-slate-700" size={32} />
           
           {/* Decision Meter */}
           <div className="w-2 h-48 bg-slate-900 rounded-full relative overflow-hidden border border-white/5">
              <motion.div 
                animate={{ height: `${score * 100}%`, backgroundColor: score > 0.5 ? '#10b981' : '#ef4444' }}
                className="absolute bottom-0 w-full"
              />
           </div>
           
           <div className="flex flex-col items-center">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Realism Score</span>
             <span className="text-2xl font-mono text-white">{(score * 100).toFixed(1)}%</span>
           </div>

           {/* Flow Animations */}
           <div className="absolute inset-0 -z-10 w-[400px] -translate-x-1/2 left-1/2 pointer-events-none">
              {isTraining && (
                <>
                  <motion.div 
                    animate={{ x: [200, 0], opacity: [0, 1, 0] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute top-1/4 left-0 w-20 h-px bg-pink-500"
                  />
                  <motion.div 
                    animate={{ x: [-200, 0], opacity: [0, 1, 0] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute top-1/2 right-0 w-20 h-px bg-emerald-500"
                  />
                </>
              )}
           </div>
        </div>

        {/* Discriminator */}
        <div className="flex-1 flex flex-col items-center gap-6">
           <div className="w-48 h-48 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 flex flex-col items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
              <ShieldAlert className="text-emerald-400 mb-2 group-hover:scale-110 transition-transform" size={48} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Discriminator</span>
           </div>
           <div className="text-center">
             <span className="text-[9px] text-slate-500 font-bold uppercase block mb-1">Detecting</span>
             <span className="text-xs font-mono text-emerald-300">Authenticity check...</span>
           </div>
        </div>
      </div>

      <div className="absolute bottom-12 flex gap-6">
         <button 
           onClick={() => setIsTraining(!isTraining)}
           className={cn(
             "px-12 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-2xl",
             isTraining ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-white text-black hover:scale-105"
           )}
         >
           {isTraining ? "Halt Training" : "Initialize Adversarial Loop"}
         </button>
      </div>

      <div className="absolute bottom-12 right-12 glass-panel p-4 flex gap-8 items-center bg-black/40">
         <div className="flex items-center gap-3">
           <Ghost size={16} className="text-pink-500" />
           <div className="flex flex-col">
             <span className="text-[8px] text-slate-500 font-bold uppercase">Gen Loss</span>
             <span className="text-xs font-mono text-pink-400">{(1 - score).toFixed(3)}</span>
           </div>
         </div>
         <div className="flex items-center gap-3">
           <UserCheck size={16} className="text-emerald-500" />
           <div className="flex flex-col">
             <span className="text-[8px] text-slate-500 font-bold uppercase">Disc Loss</span>
             <span className="text-xs font-mono text-emerald-400">{score.toFixed(3)}</span>
           </div>
         </div>
      </div>
    </div>
  );
}


