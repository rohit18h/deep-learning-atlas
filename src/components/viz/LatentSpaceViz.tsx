'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function LatentSpaceViz() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const points = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      color: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#ef4444' : '#10b981'
    }));
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">Latent Space Exploration</h3>
        <p className="text-slate-500 text-sm max-w-md">The learned internal representation of data. Similar inputs are mapped to nearby coordinates in this high-dimensional manifold.</p>
      </div>

      <div className="flex gap-16 items-center">
        {/* Latent Map */}
        <div className="relative w-[500px] h-[500px] bg-slate-950 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center group">
           <div className="absolute inset-0 opacity-5" style={{ 
             backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }} />

           {points.map((p) => (
             <motion.div
               key={p.id}
               className="absolute w-3 h-3 rounded-full cursor-crosshair transition-transform"
               style={{ 
                 left: `${p.x + 250}px`, 
                 top: `${p.y + 250}px`,
                 backgroundColor: p.color,
                 boxShadow: `0 0 10px ${p.color}44`
               }}
               whileHover={{ scale: 2, zIndex: 50 }}
               onMouseEnter={() => setHoveredPoint(p.id)}
               onMouseLeave={() => setHoveredPoint(null)}
             />
           ))}

           {/* Traversal Line */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <motion.path
                d="M 100 100 L 400 400"
                stroke="white" strokeWidth="1" strokeDasharray="5 5"
                animate={{ strokeDashoffset: [0, -10] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
           </svg>
        </div>

        {/* Decoder Preview */}
        <div className="w-80 space-y-8">
           <div className="glass-panel p-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Reconstruction Preview</span>
              <div className="w-full aspect-square bg-slate-900 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden relative">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredPoint || 'none'}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="w-32 h-32 flex flex-col gap-2"
                    >
                       {hoveredPoint !== null ? (
                         Array.from({ length: 6 }).map((_, i) => (
                           <div key={i} className="h-4 w-full bg-emerald-500/20 rounded border border-emerald-500/30" />
                         ))
                       ) : (
                         <div className="flex items-center justify-center h-full text-[10px] text-slate-700 font-bold uppercase tracking-tighter">
                           Select point to decode
                         </div>
                       )}
                    </motion.div>
                 </AnimatePresence>
              </div>
           </div>

           <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                "Latent space interpolation allows us to 'walk' between data points, creating smooth transitions between classes."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
