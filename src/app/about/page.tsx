'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Target, Zap, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden selection:bg-blue-500/30">
      {/* Decorative Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-32">
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
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={12} />
            Our Mission
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] italic uppercase">
            Redefining <span className="text-blue-500">Neural</span> Education
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium">
            We believe that complex AI concepts shouldn't be trapped behind dense academic jargon. 
            Deep Learning is an interactive atlas designed to make neural networks intuitive through high-fidelity visual storytelling.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 space-y-4 border-white/5 bg-white/[0.02]"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Brain className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Visual First</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every topic is built around a custom visualization engine. We don't just tell you how it works; we show you the gradients flowing and neurons firing.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 space-y-4 border-white/5 bg-white/[0.02]"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/20">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Pedagogical Precision</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our content is structured using the "One-Read" philosophy. We use punchy metaphors and clear mental models to ensure immediate retention.
            </p>
          </motion.div>
        </div>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 space-y-12"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight italic uppercase">The Future of Learning</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed italic">
              "Education is not the learning of facts, but the training of the mind to think." 
              — Albert Einstein
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 opacity-50">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-black text-white">110+</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Topics</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-black text-white">6</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Modules</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-black text-white">∞</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Insights</span>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
