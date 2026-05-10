'use client';

import React from 'react';
import { useAtlasStore } from '@/store/useAtlasStore';
import { AnimatePresence, motion } from 'framer-motion';

import dynamic from 'next/dynamic';

// Visualization Components (Lazy Loaded)
const BiologicalNeuronViz = dynamic(() => import('@/components/viz/BiologicalNeuronViz'));
const MCPNeuronViz = dynamic(() => import('@/components/viz/MCPNeuronViz'));
const PerceptronViz = dynamic(() => import('@/components/viz/PerceptronViz'));
const PerceptronLearningViz = dynamic(() => import('@/components/viz/PerceptronLearningViz'));
const MLPViz = dynamic(() => import('@/components/viz/MLPViz'));
const SeparabilityViz = dynamic(() => import('@/components/viz/SeparabilityViz'));
const ActivationViz = dynamic(() => import('@/components/viz/ActivationViz'));
const OptimizerViz = dynamic(() => import('@/components/viz/OptimizerViz'));
const CNNViz = dynamic(() => import('@/components/viz/CNNViz'));
const LSTMViz = dynamic(() => import('@/components/viz/LSTMViz'));
const GANViz = dynamic(() => import('@/components/viz/GANViz'));
const LossViz = dynamic(() => import('@/components/viz/LossViz'));
const RegularizationViz = dynamic(() => import('@/components/viz/RegularizationViz'));
const BatchNormViz = dynamic(() => import('@/components/viz/BatchNormViz'));
const AutoencoderViz = dynamic(() => import('@/components/viz/AutoencoderViz'));
const LatentSpaceViz = dynamic(() => import('@/components/viz/LatentSpaceViz'));
const PoolingViz = dynamic(() => import('@/components/viz/PoolingViz'));
const CNNArchitectureViz = dynamic(() => import('@/components/viz/CNNArchitectureViz'));
const RNNSequenceViz = dynamic(() => import('@/components/viz/RNNSequenceViz'));
const GRUViz = dynamic(() => import('@/components/viz/GRUViz'));
const BPTTViz = dynamic(() => import('@/components/viz/BPTTViz'));
const GenerativeAIViz = dynamic(() => import('@/components/viz/GenerativeAIViz'));
const RecentTrendsViz = dynamic(() => import('@/components/viz/RecentTrendsViz'));
const PlaceholderViz = dynamic(() => import('@/components/viz/PlaceholderViz'));

const VIZ_COMPONENTS: Record<string, React.ElementType> = {
  // Module 1
  'biological-neuron': BiologicalNeuronViz,
  'mcculloch-pitts': MCPNeuronViz,
  'perceptron': PerceptronViz,
  'perceptron-learning': PerceptronLearningViz,
  'mlp': MLPViz,
  'separability': SeparabilityViz,
  
  // Module 2
  'activation-functions': ActivationViz,
  'loss-functions': LossViz,
  'optimizers': OptimizerViz,
  'regularization': RegularizationViz,
  'batch-norm': BatchNormViz,

  // Module 3
  'autoencoders-basic': AutoencoderViz,
  'denoising-ae': AutoencoderViz, // Reusing but with internal state
  'latent-space': LatentSpaceViz,

  // Module 4
  'convolution-op': CNNViz,
  'pooling-op': PoolingViz,
  'cnn-architectures': CNNArchitectureViz,

  // Module 5
  'rnn-sequence': RNNSequenceViz,
  'lstm-cell': LSTMViz,
  'gru-cell': GRUViz,
  'bptt-flow': BPTTViz,

  // Module 6
  'gan-adversarial': GANViz,
  'generative-ai': GenerativeAIViz,
  'recent-trends': RecentTrendsViz,
};

export default function MainStage() {
  const { activeModule } = useAtlasStore();
  const VizComponent = VIZ_COMPONENTS[activeModule] || (() => <PlaceholderViz title={activeModule} />);

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col neural-canvas">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)]" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full relative z-10 flex items-center justify-center p-8"
        >
          <VizComponent />
        </motion.div>
      </AnimatePresence>


    </div>
  );
}
