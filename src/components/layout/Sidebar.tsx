'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAtlasStore, ModuleId } from '@/store/useAtlasStore';
import { 
  Brain, 
  Activity, 
  Binary, 
  Target, 
  Layers, 
  LineChart, 
  History, 
  Terminal,
  ChevronRight,
  BookOpen,
  Zap,
  Maximize2,
  Cpu,
  RefreshCcw,
  Box,
  Share2,
  Clock,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CURRICULUM = [
  {
    title: '1. Fundamentals',
    topics: [
      { id: 'biological-neuron', label: 'Biological Neuron', icon: Brain },
      { id: 'mcculloch-pitts', label: 'M-P Neuron', icon: Binary },
      { id: 'perceptron', label: 'Perceptron', icon: Activity },
      { id: 'perceptron-learning', label: 'Learning Algorithm', icon: Target },
      { id: 'mlp', label: 'Multilayer Perceptron', icon: Layers },
      { id: 'separability', label: 'Separability Playground', icon: Binary },
    ]
  },
  {
    title: '2. Optimization',
    topics: [
      { id: 'activation-functions', label: 'Activations', icon: Zap },
      { id: 'loss-functions', label: 'Loss Landscapes', icon: LineChart },
      { id: 'optimizers', label: 'Optimizer Labs', icon: RefreshCcw },
      { id: 'regularization', label: 'Regularization', icon: Target },
      { id: 'batch-norm', label: 'Batch Normalization', icon: Maximize2 },
    ]
  },
  {
    title: '3. Autoencoders',
    topics: [
      { id: 'autoencoders-basic', label: 'Linear & Sparse', icon: Box },
      { id: 'denoising-ae', label: 'Denoising', icon: RefreshCcw },
      { id: 'latent-space', label: 'Latent Space', icon: Share2 },
    ]
  },
  {
    title: '4. CNN',
    topics: [
      { id: 'convolution-op', label: 'Convolution Ops', icon: Cpu },
      { id: 'pooling-op', label: 'Pooling & Stride', icon: Maximize2 },
      { id: 'cnn-architectures', label: 'Architectures', icon: Layers },
    ]
  },
  {
    title: '5. RNN & Sequence',
    topics: [
      { id: 'rnn-sequence', label: 'Sequence Learning', icon: Clock },
      { id: 'lstm-cell', label: 'LSTM Memory', icon: Cpu },
      { id: 'gru-cell', label: 'GRU Gates', icon: Binary },
      { id: 'bptt-flow', label: 'BPTT Timeline', icon: History },
    ]
  },
  {
    title: '6. Recent Trends',
    topics: [
      { id: 'gan-adversarial', label: 'GAN Adversarial', icon: Sparkles },
      { id: 'generative-ai', label: 'Generative AI', icon: Zap },
      { id: 'recent-trends', label: 'Modern Frontiers', icon: Terminal },
    ]
  }
];

export default function Sidebar() {
  const { activeModule, setActiveModule } = useAtlasStore();
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true });

  const toggleModule = (idx: number) => {
    setExpandedModules(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <aside className="w-[85vw] sm:w-80 h-full border-r border-white/5 bg-slate-950/95 lg:bg-slate-950/60 backdrop-blur-2xl flex flex-col z-40 shadow-2xl lg:shadow-none">
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-4 custom-scrollbar">
        {CURRICULUM.map((module, mIdx) => (
          <div key={mIdx} className="space-y-1">
            <button 
              onClick={() => toggleModule(mIdx)}
              className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-300 transition-colors"
            >
              <span>{module.title}</span>
              <ChevronDown size={12} className={cn("transition-transform duration-300", expandedModules[mIdx] ? "" : "-rotate-90")} />
            </button>
            
            <AnimatePresence initial={false}>
              {expandedModules[mIdx] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-1"
                >
                  {module.topics.map((topic) => (
                    <ModuleItem 
                      key={topic.id} 
                      {...topic} 
                      active={activeModule === topic.id} 
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>


    </aside>
  );
}

function ModuleItem({ id, label, icon: Icon, active }: { 
  id: string;
  label: string; 
  icon: any; 
  active?: boolean;
}) {
  return (
    <Link 
      href={`/${id}`}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
        active 
          ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)]" 
          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
      )}
    >
      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        />
      )}
      <Icon size={18} className={cn("transition-colors duration-300", active ? "text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" : "text-slate-500 group-hover:text-slate-300")} />
      <span className="text-sm font-medium flex-1 text-left tracking-tight">{label}</span>
      {active && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-1.5 h-1.5 rounded-full bg-blue-400"
        />
      )}
    </Link>
  );
}
