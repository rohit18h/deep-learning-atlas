'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Minimize2 } from 'lucide-react';

export default function PoolingViz() {
  const [activeCell, setActiveCell] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCell(prev => {
        let nextX = prev.x + 2;
        let nextY = prev.y;
        if (nextX >= 6) {
          nextX = 0;
          nextY = (prev.y + 2) % 6;
        }
        return { x: nextX, y: nextY };
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-cyan-400 mb-2">Pooling Operations</h3>
        <p className="text-slate-500 text-sm max-w-md">Downsampling for spatial invariance. Watch how Max Pooling reduces dimensionality while preserving the most prominent features.</p>
      </div>

      <div className="flex gap-16 items-center">
        {/* Input Map */}
        <div className="flex flex-col items-center gap-6">
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">6x6 Feature Map</span>
           <div className="grid grid-cols-6 gap-1 bg-slate-950 p-2 rounded-xl border border-white/5 relative">
              {Array.from({ length: 36 }).map((_, i) => {
                const x = i % 6;
                const y = Math.floor(i / 6);
                const isSelected = x >= activeCell.x && x < activeCell.x + 2 && y >= activeCell.y && y < activeCell.y + 2;
                return (
                  <div key={i} className={cn("w-12 h-12 rounded-sm transition-all duration-500", isSelected ? "bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10 scale-105" : "bg-slate-900")} />
                );
              })}
           </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-slate-700">
           <Minimize2 size={32} />
           <span className="text-[10px] font-mono font-bold">2x2 Stride 2</span>
        </div>

        {/* Output Map */}
        <div className="flex flex-col items-center gap-6">
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">3x3 Downsampled</span>
           <div className="grid grid-cols-3 gap-1 bg-slate-950 p-2 rounded-xl border border-white/5">
              {Array.from({ length: 9 }).map((_, i) => {
                const x = i % 3;
                const y = Math.floor(i / 3);
                const isActive = x === activeCell.x / 2 && y === activeCell.y / 2;
                return (
                  <div key={i} className={cn("w-12 h-12 rounded-sm transition-all duration-700", isActive ? "bg-cyan-400" : "bg-slate-900")} />
                );
              })}
           </div>
        </div>

        <div className="w-64 space-y-6">
           <div className="glass-panel p-6 bg-cyan-500/5 border-cyan-500/10 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Max Pooling</span>
              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                Extracts the maximum value from each window. This provides <strong>translation invariance</strong>—the model recognizes the feature even if its position shifts slightly.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
