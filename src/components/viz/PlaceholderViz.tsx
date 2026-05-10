'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PlaceholderViz({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12">
      <div className="absolute top-0 left-0 p-8">
        <h3 className="text-2xl font-bold text-slate-200 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">Visualization module initializing...</p>
      </div>
      
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="w-64 h-64 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center"
        >
          <div className="w-48 h-48 rounded-full border-2 border-blue-500/10 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-blue-500/5 animate-pulse" />
          </div>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Loading Module</span>
        </div>
      </div>
    </div>
  );
}
