'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, Scale, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 lg:py-32">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Atlas
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
            <Shield size={12} />
            Data Protection
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight uppercase italic">
            Privacy <span className="text-emerald-500">Protocol</span>
          </h1>
          <p className="text-slate-400 font-medium">
            Effective Date: May 11, 2026
          </p>
        </motion.div>

        <div className="mt-20 space-y-16">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <EyeOff size={20} className="text-emerald-500" />
              <h2 className="text-xl font-bold uppercase italic tracking-wider">Zero Tracking Policy</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Deep Learning is built as a pure educational utility. We do not use third-party tracking cookies, analytics pixels, or data collection frameworks. Your progress is stored locally in your browser and never sent to our servers.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <Lock size={20} className="text-emerald-500" />
              <h2 className="text-xl font-bold uppercase italic tracking-wider">Local Storage</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              We use browser localStorage to remember your active module and progress. This data remains on your device and can be cleared at any time by clearing your browser cache.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <Scale size={20} className="text-emerald-500" />
              <h2 className="text-xl font-bold uppercase italic tracking-wider">Compliance</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Although we do not collect personal data, we adhere to the principles of GDPR and CCPA by ensuring user autonomy and data minimization in every line of code.
            </p>
          </section>
        </div>

        <div className="mt-32 p-8 glass-panel border-white/5 bg-white/[0.02] rounded-3xl text-center">
          <p className="text-xs text-slate-500 italic">
            Questions regarding our privacy protocol can be directed to the open-source repository maintainers.
          </p>
        </div>
      </div>
    </main>
  );
}
