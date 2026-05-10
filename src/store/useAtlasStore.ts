import { create } from 'zustand';

export type ModuleId = 
  | 'biological-neuron' | 'mcculloch-pitts' | 'perceptron' | 'perceptron-learning' | 'delta-learning' | 'mlp' | 'separability'
  | 'activation-functions' | 'loss-functions' | 'optimizers' | 'regularization' | 'batch-norm'
  | 'autoencoders-basic' | 'denoising-ae' | 'latent-space'
  | 'convolution-op' | 'pooling-op' | 'cnn-architectures'
  | 'rnn-sequence' | 'lstm-cell' | 'gru-cell' | 'bptt-flow'
  | 'gan-adversarial' | 'generative-ai' | 'recent-trends';

export interface Topic {
  id: ModuleId;
  label: string;
  module: number;
}

interface AtlasState {
  activeModule: ModuleId;
  setActiveModule: (id: ModuleId) => void;
  progress: Record<ModuleId, boolean>;
  completeModule: (id: ModuleId) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  isTraining: boolean;
  setIsTraining: (val: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  infoPanelOpen: boolean;
  setInfoPanelOpen: (val: boolean) => void;
}

export const useAtlasStore = create<AtlasState>((set) => ({
  activeModule: 'biological-neuron',
  setActiveModule: (id) => set({ activeModule: id, sidebarOpen: false }), // Close sidebar on selection (mobile)
  progress: {} as Record<ModuleId, boolean>,
  completeModule: (id) => set((state) => ({ 
    progress: { ...state.progress, [id]: true } 
  })),
  playbackSpeed: 1,
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  isTraining: false,
  setIsTraining: (val) => set({ isTraining: val }),
  sidebarOpen: false,
  setSidebarOpen: (val) => set({ sidebarOpen: val }),
  infoPanelOpen: false,
  setInfoPanelOpen: (val) => set({ infoPanelOpen: val }),
}));
