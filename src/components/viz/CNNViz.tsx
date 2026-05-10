'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CNNViz() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(true);

  const GRID_SIZE = 7;
  const KERNEL_SIZE = 3;
  const OUTPUT_SIZE = GRID_SIZE - KERNEL_SIZE + 1;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCursor(prev => {
        let nextX = prev.x + 1;
        let nextY = prev.y;
        if (nextX >= OUTPUT_SIZE) {
          nextX = 0;
          nextY = (prev.y + 1) % OUTPUT_SIZE;
        }
        return { x: nextX, y: nextY };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, OUTPUT_SIZE]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-indigo-400 mb-2">Convolutional Operations</h3>
        <p className="text-slate-500 text-sm max-w-md">The core of computer vision. Watch how a sliding kernel extracts features from raw pixel data into feature maps.</p>
      </div>

      <div className="flex gap-16 items-center">
        {/* Input Grid */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Input Image (7x7)</span>
          <div className="grid grid-cols-7 gap-1 p-2 bg-slate-950 rounded-xl border border-white/5 relative">
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const isInKernel = x >= cursor.x && x < cursor.x + KERNEL_SIZE && y >= cursor.y && y < cursor.y + KERNEL_SIZE;
              
              return (
                <div 
                  key={i} 
                  className={cn(
                    "w-10 h-10 rounded-sm transition-all duration-300",
                    isInKernel ? "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10" : "bg-slate-900"
                  )}
                />
              );
            })}
            
            {/* Sliding Kernel Overlay */}
            <motion.div
              animate={{ 
                left: cursor.x * 44 + 8, 
                top: cursor.y * 44 + 8 
              }}
              className="absolute w-[128px] h-[128px] border-2 border-indigo-400 rounded-md pointer-events-none z-20"
            />
          </div>
        </div>

        {/* Operation Symbols */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-bold text-slate-700">×</div>
          <div className="w-16 h-1 bg-slate-800 rounded-full" />
        </div>

        {/* Feature Map */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Feature Map (5x5)</span>
          <div className="grid grid-cols-5 gap-1 p-2 bg-slate-950 rounded-xl border border-white/5">
            {Array.from({ length: OUTPUT_SIZE * OUTPUT_SIZE }).map((_, i) => {
              const x = i % OUTPUT_SIZE;
              const y = Math.floor(i / OUTPUT_SIZE);
              const isActive = x === cursor.x && y === cursor.y;
              const isHistory = (y < cursor.y) || (y === cursor.y && x <= cursor.x);

              return (
                <div 
                  key={i} 
                  className={cn(
                    "w-10 h-10 rounded-sm transition-all duration-500",
                    isActive ? "bg-indigo-400 scale-110 shadow-[0_0_15px_rgba(129,140,248,0.8)]" : 
                    isHistory ? "bg-indigo-900/40" : "bg-slate-900"
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Mathematical Intuition */}
        <div className="w-72 space-y-4">
           <div className="glass-panel p-6 space-y-4 border-indigo-500/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Kernel Parameters</span>
              <div className="space-y-3">
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Size</span>
                    <span className="text-white font-mono">3x3</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Stride</span>
                    <span className="text-white font-mono">1</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Padding</span>
                    <span className="text-white font-mono">0</span>
                 </div>
              </div>
           </div>

           <button 
             onClick={() => setIsPlaying(!isPlaying)}
             className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
           >
             {isPlaying ? "Pause Operation" : "Resume Operation"}
           </button>
        </div>
      </div>
    </div>
  );
}


