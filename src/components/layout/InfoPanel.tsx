'use client';

import React from 'react';
import { useAtlasStore } from '@/store/useAtlasStore';
import AdsenseAd from '@/components/AdsenseAd';

import { motion, AnimatePresence } from 'framer-motion';

import {
  Sparkles,
  Cpu,
  HelpCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

/* YOUR MODULE_DATA STAYS SAME */

export default function InfoPanel() {
  const { activeModule } = useAtlasStore();

  const data = MODULE_DATA[activeModule] || {
    title: 'Neural Architecture',
    definition: 'Advanced cognitive simulation module.',
    easyExplanation: 'Exploring the depths of neural computation.',
    howItWorks: [
      'Active neural propagation.',
      'Real-time weight optimization.',
      'Immersive architectural study.'
    ]
  };

  return (
    <aside className="w-[90vw] sm:w-[450px] h-full border-l border-white/5 bg-slate-950/95 lg:bg-slate-950/60 backdrop-blur-2xl flex flex-col z-40 overflow-hidden shadow-2xl lg:shadow-none">

      <div className="flex-1 p-8 space-y-10 overflow-y-auto custom-scrollbar scroll-smooth">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 pb-12"
          >

            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

                <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">
                  {data.title}
                </h2>
              </div>

              <p className="text-sm text-blue-400/80 font-bold uppercase tracking-widest px-1">
                Definition & Purpose
              </p>
            </div>

            {/* Definition */}
            <section className="space-y-3">
              <div className="glass-panel p-5 bg-blue-500/5 border-blue-500/10">
                <p className="text-[15px] text-slate-200 leading-relaxed font-medium">
                  {data.definition}
                </p>
              </div>

              <div className="px-5 py-3 border-l-2 border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Why it's needed:
                </span>

                <p className="text-xs text-slate-400 italic">
                  {data.whyNeeded}
                </p>
              </div>
            </section>

            {/* Easy Explanation */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles size={16} />

                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                  Easy Explanation
                </span>
              </div>

              <div className="glass-panel p-6 bg-amber-400/5 border-amber-400/10 rounded-2xl relative overflow-hidden group">

                <HelpCircle
                  className="absolute -bottom-4 -right-4 text-amber-400/10 group-hover:text-amber-400/20 transition-colors"
                  size={100}
                />

                <p className="text-sm text-slate-300 leading-relaxed relative z-10 italic">
                  "{data.easyExplanation}"
                </p>
              </div>
            </section>

            {/* How it Works */}
            <section className="space-y-4">

              <div className="flex items-center gap-2 text-blue-400">
                <Cpu size={16} />

                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                  How it Works
                </span>
              </div>

              <div className="space-y-3">

                {data.howItWorks?.map((step: string, i: number) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start group"
                  >

                    <div className="w-6 h-6 rounded bg-slate-900 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition-colors">

                      <span className="text-[10px] font-bold text-blue-400">
                        {i + 1}
                      </span>

                    </div>

                    <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors py-1">
                      {step}
                    </p>

                  </div>
                ))}

              </div>
            </section>

            {/* Pros Cons */}
            {data.prosCons && (
              <section className="grid grid-cols-2 gap-4 pt-4">

                <div className="space-y-3">

                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 size={14} />

                    <span className="text-[10px] font-bold uppercase">
                      Advantages
                    </span>
                  </div>

                  <ul className="space-y-1">
                    {data.prosCons.pros.map((p: string, i: number) => (
                      <li
                        key={i}
                        className="text-[10px] text-slate-500 flex gap-2"
                      >
                        <span className="text-emerald-500 opacity-50">
                          •
                        </span>

                        {p}
                      </li>
                    ))}
                  </ul>

                </div>

                <div className="space-y-3">

                  <div className="flex items-center gap-2 text-rose-500">
                    <XCircle size={14} />

                    <span className="text-[10px] font-bold uppercase">
                      Disadvantages
                    </span>
                  </div>

                  <ul className="space-y-1">
                    {data.prosCons.cons.map((c: string, i: number) => (
                      <li
                        key={i}
                        className="text-[10px] text-slate-500 flex gap-2"
                      >
                        <span className="text-rose-500 opacity-50">
                          •
                        </span>

                        {c}
                      </li>
                    ))}
                  </ul>

                </div>

              </section>
            )}

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Adsense Ad */}
      <div className="p-4 border-t border-white/5 bg-slate-950/80">
        <AdsenseAd />
      </div>

    </aside>
  );
}
