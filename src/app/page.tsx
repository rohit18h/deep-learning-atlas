'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MainStage from '@/components/layout/MainStage';
import InfoPanel from '@/components/layout/InfoPanel';
import ControlBar from '@/components/layout/ControlBar';
import Link from 'next/link';
import { useAtlasStore } from '@/store/useAtlasStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    infoPanelOpen, 
    setInfoPanelOpen 
  } = useAtlasStore();

  return (
    <main className="h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden flex flex-col neural-canvas selection:bg-blue-500/30">
      {/* Top Header / Status Bar */}
      <div className="h-14 border-b border-white/5 flex items-center px-4 lg:px-6 justify-between bg-slate-950/50 backdrop-blur-xl z-[60]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="hidden xs:flex w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <span className="text-white font-bold">N</span>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-blue-400 truncate">Deep Learning</h1>
            <p className="hidden md:block text-[10px] text-slate-500 uppercase tracking-[0.2em]">Neural Research Laboratory v1.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/about" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors font-bold">About</Link>
          <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors font-bold">Privacy</Link>
          
          <div className="hidden sm:flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-slate-400">System Ready</span>
          </div>

          <button 
            onClick={() => setInfoPanelOpen(!infoPanelOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400"
          >
            {infoPanelOpen ? <X size={20} /> : <Info size={20} />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={cn(
          "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300",
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )} onClick={() => setSidebarOpen(false)} />
        
        <div className={cn(
          "fixed lg:relative z-[56] lg:z-auto h-full transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <Sidebar />
        </div>

        <MainStage />

        <div className={cn(
          "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300",
          infoPanelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )} onClick={() => setInfoPanelOpen(false)} />

        <div className={cn(
          "fixed right-0 lg:relative z-[56] lg:z-auto h-full transition-transform duration-300 lg:translate-x-0",
          infoPanelOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <InfoPanel />
        </div>
      </div>

      <ControlBar />
    </main>
  );
}
