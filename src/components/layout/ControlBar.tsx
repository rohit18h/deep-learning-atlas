'use client';

import React from 'react';
import { Gauge } from 'lucide-react';
import { useAtlasStore } from '@/store/useAtlasStore';
import { motion } from 'framer-motion';

export default function ControlBar() {
  const { isTraining, setIsTraining, playbackSpeed, setPlaybackSpeed } = useAtlasStore();

  return (
    <div className="h-16 lg:h-20 border-t border-white/5 bg-slate-950/90 backdrop-blur-3xl z-50 flex items-center px-4 lg:px-10 justify-between">
      <div className="flex items-center gap-10">





      </div>

      <div className="flex items-center gap-12">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-1">Sim Speed</span>
            <div className="flex items-center gap-3 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
              <Gauge size={14} className="text-blue-500" />
              <select 
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="bg-transparent text-xs font-mono text-blue-200 outline-none cursor-pointer"
              >
                <option value="0.5">0.5x</option>
                <option value="1.0">1.0x</option>
                <option value="2.0">2.0x</option>
                <option value="5.0">5.0x</option>
              </select>
            </div>
          </div>


        </div>


      </div>
    </div>
  );
}
