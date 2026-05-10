'use client';

import React from 'react';
import { useAtlasStore } from '@/store/useAtlasStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sigma, Lightbulb, Activity, Brain, Layers, 
  Zap, Database, Cpu, Sparkles, History, Box, 
  Minimize2, Power, HelpCircle, ArrowRight, CheckCircle2, XCircle
} from 'lucide-react';

// Simplified schema following user's "RNN Example" request
const MODULE_DATA: Record<string, any> = {
  // --- MODULE 1: FUNDAMENTALS ---
  'biological-neuron': {
    title: 'Biological Neuron',
    definition: 'A specialized cell in the brain that processes and transmits information using electrical pulses.',
    whyNeeded: 'Nature needs a way to process signals from eyes, ears, and touch to make quick decisions.',
    easyExplanation: 'Imagine a group of friends whispering. One friend (the neuron) only yells the message forward if enough friends whisper at once.',
    howItWorks: [
      'Dendrites receive whispers (signals) from neighbors.',
      'Soma adds up the total volume of whispers.',
      'If loud enough, Axon fires a pulse to the next friend.',
      'Synapses act as volume knobs to filter signals.'
    ],
    memoryTrick: '👂 Listen (Dendrites) 🧠 Think (Soma) ⚡ Fire (Axon)',
    realLife: 'Touching a hot stove: neurons fire instantly to pull your hand away.',
    prosCons: {
      pros: ['Ultra-efficient energy use', 'Massive parallel processing', 'Self-healing connections'],
      cons: ['Slow signal speed vs silicon', 'Hard to repair if damaged']
    }
  },
  'mcculloch-pitts': {
    title: 'M-P Neuron',
    definition: 'The simplest math model of a brain cell. It works like a digital switch (On or Off).',
    whyNeeded: 'To prove that math can perform the same logic as a biological brain.',
    easyExplanation: 'A basic voting machine. If the "Yes" votes reach a certain limit, the machine says "Yes."',
    howItWorks: [
      'Takes binary inputs (0 or 1).',
      'Adds them up using a simple rule.',
      'Compares total to a fixed threshold.',
      'Outputs 1 if limit reached, else 0.'
    ],
    memoryTrick: 'M-P = Math + Pulse (Logic Switch)',
    realLife: 'A doorbell: It only rings if the button is pressed hard enough.',
    prosCons: {
      pros: ['Extremely simple math', 'Foundation of digital logic'],
      cons: ['Cannot learn from data', 'Very limited functionality']
    }
  },
  'perceptron': {
    title: 'The Perceptron',
    definition: 'The first AI model that can learn. It draws a straight line to separate two groups of data.',
    whyNeeded: 'Computers need to learn from examples rather than just following fixed rules.',
    easyExplanation: 'Like a teacher drawing a line on a map to separate "Apple trees" from "Orange trees."',
    howItWorks: [
      'Assigns weights (importance) to each input.',
      'Multiplies inputs by weights and adds a bias.',
      'Draws a straight line boundary.',
      'Predicts class A if above line, class B if below.'
    ],
    memoryTrick: 'Perceptron = Perfect-Line-Drawer',
    realLife: 'Email spam filters: Deciding if a message is "Spam" or "Not Spam."',
    prosCons: {
      pros: ['First step toward real learning', 'Simple and fast'],
      cons: ['Only works for straight-line problems', 'Fails at XOR puzzles']
    }
  },
  'perceptron-learning': {
    title: 'Learning Rule',
    definition: 'The math rule used to update the Perceptron’s weights whenever it makes a mistake.',
    whyNeeded: 'Without a rule to fix mistakes, the AI would never get smarter.',
    easyExplanation: 'A game of "Hot or Cold." If the AI is wrong, it moves its line slightly toward the right answer.',
    howItWorks: [
      'Make a prediction on data.',
      'Calculate the error (Goal - Guess).',
      'Nudge the weights based on the error.',
      'Repeat until all answers are correct.'
    ],
    memoryTrick: 'Fix = Error × Input',
    realLife: 'Learning to throw a ball: If you miss left, you aim more to the right next time.',
    prosCons: {
      pros: ['Guaranteed to work if a line exists', 'Very easy to implement'],
      cons: ['Stops working if data is mixed up']
    }
  },
  'mlp': {
    title: 'Multi-Layer AI (MLP)',
    definition: 'A network with multiple layers of neurons. This allows it to learn curved and complex shapes.',
    whyNeeded: 'Real-world data is messy and can rarely be split with a single straight line.',
    easyExplanation: 'A chain of command. The first layer sees dots, the second sees lines, and the third sees faces.',
    howItWorks: [
      'Input layer takes raw data.',
      'Hidden layers extract hidden patterns.',
      'Output layer gives the final decision.',
      'Backpropagation fixes mistakes in all layers.'
    ],
    memoryTrick: 'MLP = Many-Layered-Power',
    realLife: 'Handwriting recognition: Turning messy scribbles into digital text.',
    prosCons: {
      pros: ['Can solve almost any problem', 'Deep hierarchical learning'],
      cons: ['Needs a lot of data to train', 'Can be a "black box"']
    }
  },
  'separability': {
    title: 'Linear Separability',
    concept: 'A single neuron can only draw a straight line. If data is mixed like a checkerboard, it needs more layers to win.',
    definition: 'The ability to split two classes of data using a single straight line.',
    whyNeeded: 'To understand when we need a simple model vs. a deep complex model.',
    easyExplanation: 'Imagine red and blue marbles mixed on a table. If you can use a ruler to split them, they are separable.',
    howItWorks: [
      'Check if a straight boundary works.',
      'If not, warp the space using hidden layers.',
      'Hidden layers "bend" the table to make splitting easy.',
      'The straight line then works in the new space.'
    ],
    memoryTrick: 'No Line? Use More Layers!',
    realLife: 'Sorting fruit: Easy to split by color, harder to split by "taste."',
    prosCons: {
      pros: ['Simple models are faster', 'Easy to visualize'],
      cons: ['Most real problems are not separable']
    }
  },

  // --- MODULE 2: OPTIMIZATION ---
  'activation-functions': {
    title: 'Activation Switch',
    definition: 'A math function that decides if a neuron should "fire" or stay quiet.',
    whyNeeded: 'To add "curves" to the model. Without it, the AI is just a giant linear calculator.',
    easyExplanation: 'A dimmer switch. It doesn’t just turn on/off; it can be partially on or follow a specific curve.',
    howItWorks: [
      'Takes the sum of inputs.',
      'Applies a function (like ReLU or Sigmoid).',
      'Squeezes or clips the value.',
      'Passes the filtered result forward.'
    ],
    memoryTrick: 'Curve = Intelligence',
    realLife: 'Pain threshold: You don’t feel pain until the signal is strong enough.',
    prosCons: {
      pros: ['Enables complex learning', 'Normalizes signal range'],
      cons: ['Can cause "Dead Neurons" (ReLU)']
    }
  },
  'loss-functions': {
    title: 'The Error Score',
    definition: 'A number that tells the AI how wrong it was. A high score means a big mistake.',
    whyNeeded: 'AI needs a "Report Card" to know where it needs to improve.',
    easyExplanation: 'Like an archer measuring how many inches they missed the bullseye by.',
    howItWorks: [
      'Compare AI guess to the real target.',
      'Calculate the difference.',
      'Square it (MSE) or use logs (Cross-Entropy).',
      'The result is the "Penalty" the AI must reduce.'
    ],
    memoryTrick: 'Lower Loss = Better Boss',
    realLife: 'Car navigation: Re-calculating the route when you take a wrong turn.',
    prosCons: {
      pros: ['Clear math goal', 'Differentiable for learning'],
      cons: ['Choosing the wrong loss ruins training']
    }
  },
  'optimizers': {
    title: 'The GPS Guide',
    definition: 'The algorithm that moves the AI toward the lowest error as fast as possible.',
    whyNeeded: 'Finding the best weights in a mountain range of millions of parameters is impossible without a guide.',
    easyExplanation: 'A ball rolling down a mountain. It uses gravity (gradients) to find the valley floor.',
    howItWorks: [
      'Look at the slope of the loss hill.',
      'Take a step in the downhill direction.',
      'Adjust speed (Learning Rate).',
      'Use momentum to roll over small bumps.'
    ],
    memoryTrick: 'Step = Speed × Slope',
    realLife: 'Finding the exit in a dark room by feeling the floor for the downward slope.',
    prosCons: {
      pros: ['Finds solutions automatically', 'Scales to millions of weights'],
      cons: ['Can get stuck in "Fake Valleys" (Local Minima)']
    }
  },
  'regularization': {
    title: 'Anti-Memorization',
    concept: 'Stopping the AI from over-thinking. It forces the model to stay simple and stop memorizing every detail.',
    definition: 'Techniques to prevent the AI from "Cheating" by just memorizing the training data.',
    whyNeeded: 'To ensure the AI works on NEW data, not just the data it saw in class.',
    easyExplanation: 'Like a student who memorizes the textbook but fails the exam because the questions changed slightly.',
    howItWorks: [
      'Add a penalty for large weights.',
      'Randomly turn off neurons (Dropout).',
      'Simplify the internal logic.',
      'Forces the AI to find general patterns.'
    ],
    memoryTrick: 'Stay Simple, Stay Smart',
    realLife: 'Studying concepts instead of memorizing exact test questions.',
    prosCons: {
      pros: ['Prevents Overfitting', 'Better performance on new data'],
      cons: ['May slightly lower training accuracy']
    }
  },
  'batch-norm': {
    title: 'Batch Normalizer',
    definition: 'A tool that levels the playing field for every layer by balancing the data flow.',
    whyNeeded: 'In deep networks, signals can become too loud or too quiet, making training crash.',
    easyExplanation: 'Like a sound engineer making sure all instruments in a band are at the same volume.',
    howItWorks: [
      'Take a batch of data.',
      'Calculate its average and spread.',
      'Shift it to have a zero-center.',
      'Scale it to have a standard spread.'
    ],
    memoryTrick: 'Normalize = Stabilize',
    realLife: 'Autosave in a video game: Keeping progress stable so you don’t lose everything.',
    prosCons: {
      pros: ['Faster training', 'Higher stability', 'Less sensitive to settings'],
      cons: ['Adds slight compute overhead']
    }
  },

  // --- MODULE 3: AUTOENCODERS ---
  'autoencoders-basic': {
    title: 'The Zip File (AE)',
    definition: 'A network that learns to squash data into a tiny summary and then rebuild it.',
    whyNeeded: 'To find the most important parts of data and ignore the rest.',
    easyExplanation: 'Taking a 100-page book and writing a 1-page summary that is so good you can re-write the book from it.',
    howItWorks: [
      'Encoder shrinks the input.',
      'Bottleneck holds the "Essence."',
      'Decoder expands it back to original.',
      'Loss checks how close the rebuild is to the original.'
    ],
    memoryTrick: 'Shrink -> Store -> Grow',
    realLife: 'JPEG compression: Shrinking a photo size while keeping it looking good.',
    prosCons: {
      pros: ['Finds hidden patterns', 'Unsupervised learning'],
      cons: ['Reconstruction is never 100% perfect']
    }
  },
  'denoising-ae': {
    title: 'The AI Cleaner',
    definition: 'An AE that learns to fix blurry or broken data.',
    whyNeeded: 'Real-world data is often noisy, glitchy, or incomplete.',
    easyExplanation: 'Giving an AI a blurry photo and asking it to guess what the clear version looked like.',
    howItWorks: [
      'Add random noise to clean data.',
      'Force the AI to reconstruct the CLEAN version.',
      'The AI learns to "ignore" the noise.',
      'Result: A powerful digital cleaner.'
    ],
    memoryTrick: 'Dirty In -> Clean Out',
    realLife: 'Restoring old, scratched movies or grainy night-time photos.',
    prosCons: {
      pros: ['Very robust features', 'Superior for real-world data'],
      cons: ['Requires clean examples to train']
    }
  },
  'latent-space': {
    title: 'The Secret Map',
    definition: 'The hidden internal world where the AI stores its "knowledge" of data.',
    whyNeeded: 'To see how the AI understands the relationship between different objects.',
    easyExplanation: 'A library where books are sorted by "Vibe" rather than title. All scary books are in one corner.',
    howItWorks: [
      'Compress data into coordinates.',
      'Similar items get close coordinates.',
      'Opposite items get distant coordinates.',
      'Allows for "interpolation" (mixing features).'
    ],
    memoryTrick: 'Close = Similar | Far = Different',
    realLife: 'Recommendation engines: "People who like this book also like this map area."',
    prosCons: {
      pros: ['Great for visualization', 'Enables creativity (interpolation)'],
      cons: ['Hard to interpret high dimensions']
    }
  },

  // --- MODULE 4: CNN ---
  'convolution-op': {
    title: 'The Pattern Scanner',
    definition: 'Using a sliding window to search for specific shapes in an image.',
    whyNeeded: 'Computers see pixels as numbers; they need filters to see "shapes."',
    easyExplanation: 'Like a detective using a magnifying glass to search a room for fingerprints.',
    howItWorks: [
      'Slide a kernel (filter) over the image.',
      'Multiply filter values by pixel values.',
      'Total up the score.',
      'High score = Shape detected!'
    ],
    memoryTrick: 'Scan -> Match -> Detect',
    realLife: 'Face ID: The phone scans for eyes, nose, and mouth patterns.',
    prosCons: {
      pros: ['Finds shapes anywhere in the image', 'Very efficient'],
      cons: ['Requires many filters for complex objects']
    }
  },
  'pooling-op': {
    title: 'The Zoom Out',
    definition: 'Shrinking the feature map to focus only on the most important parts.',
    whyNeeded: 'To make the AI faster and less picky about the exact pixel position of a shape.',
    easyExplanation: 'Squinting your eyes. You lose some detail but the main object stays clear.',
    howItWorks: [
      'Look at a 2x2 grid of detections.',
      'Pick the largest value (Max Pool).',
      'Throw away the other 3.',
      'The result is a smaller, focused map.'
    ],
    memoryTrick: 'Max Pool = Best Signal',
    realLife: 'Thumbnail images: Seeing the whole scene without needing every pixel.',
    prosCons: {
      pros: ['Reduces compute time', 'Gain "Translation Invariance"'],
      cons: ['Loses some fine-grained detail']
    }
  },
  'cnn-architectures': {
    title: 'Vision Pipeline',
    definition: 'The full setup of many scan/zoom layers to build a deep visual brain.',
    whyNeeded: 'A single scan isn’t enough; you need layers to see from "Edge" up to "Human Face."',
    easyExplanation: 'A factory assembly line. One machine sees lines, the next sees eyes, the last sees a face.',
    howItWorks: [
      'Early layers find simple edges.',
      'Middle layers find textures.',
      'Deep layers find complex objects.',
      'Final layer makes the prediction.'
    ],
    memoryTrick: 'Lines -> Shapes -> Objects',
    realLife: 'Self-driving cars detecting pedestrians, signs, and lanes simultaneously.',
    prosCons: {
      pros: ['State of the art for vision', 'Scalable to any complexity'],
      cons: ['Needs massive GPU power to train']
    }
  },

  // --- MODULE 5: RNN ---
  'rnn-sequence': {
    title: 'The Memory Loop',
    definition: 'A network that handles data in order (sequences) by remembering what happened before.',
    whyNeeded: 'In language or music, the order of tokens changes the entire meaning.',
    easyExplanation: 'Like reading a sentence. You remember the first word to understand the last word.',
    howItWorks: [
      'Take current word.',
      'Combine with "Hidden Memory" of past words.',
      'Predict next word.',
      'Update memory for the next step.'
    ],
    memoryTrick: 'RNN = Remember Next using Network',
    realLife: 'Chatbots predicting the next word in your sentence.',
    prosCons: {
      pros: ['Handles variable length data', 'Uses context from the past'],
      cons: ['Forgets long-term info easily (Vanishing Gradient)']
    }
  },
  'lstm-cell': {
    title: 'Long-Term Memory',
    definition: 'An advanced RNN that uses gates to protect and store memories for a long time.',
    whyNeeded: 'Basic RNNs forget the beginning of a long sentence; LSTMs do not.',
    easyExplanation: 'Like a notepad. You can write important things down, erase garbage, and read it later.',
    howItWorks: [
      'Forget Gate deletes useless past info.',
      'Input Gate adds important new info.',
      'Cell State (Conveyor Belt) carries info through time.',
      'Output Gate decides what to say now.'
    ],
    memoryTrick: 'LSTM = Long-Stay-Through-Memory',
    realLife: 'Google Translate: Remembering the subject of a long paragraph to get the grammar right.',
    prosCons: {
      pros: ['Solves the vanishing gradient problem', 'Very powerful memory'],
      cons: ['Complex math', 'Slower to train than basic RNN']
    }
  },
  'gru-cell': {
    title: 'Lite Memory (GRU)',
    definition: 'A faster version of LSTM with fewer gates but similar performance.',
    whyNeeded: 'To get the benefits of long memory without the high compute cost of LSTM.',
    easyExplanation: 'A simplified notepad. It combines "Update" and "Forget" into one quick step.',
    howItWorks: [
      'Update Gate decides how much memory to keep.',
      'Reset Gate decides how much past to ignore.',
      'Merges hidden state and cell state into one.',
      'Calculates the new state quickly.'
    ],
    memoryTrick: 'GRU = Greatly-Reduced-Units',
    realLife: 'Voice assistants (Siri/Alexa) processing your commands in real-time.',
    prosCons: {
      pros: ['Faster than LSTM', 'Less memory usage'],
      cons: ['Slightly less powerful on very complex sequences']
    }
  },
  'bptt-flow': {
    title: 'Time Rewind (BPTT)',
    definition: 'The method used to train RNNs by looking back through the entire chain of events.',
    whyNeeded: 'To fix errors that happened at the very beginning of a sequence.',
    easyExplanation: 'Re-watching a movie to find exactly where the plot started making no sense.',
    howItWorks: [
      'Process the whole sequence forward.',
      'Find the final error.',
      'Walk backward through every time step.',
      'Update weights at every step to fix the whole history.'
    ],
    memoryTrick: 'Train = Backward through Time',
    realLife: 'A coach reviewing game footage to see where the first mistake happened.',
    prosCons: {
      pros: ['Learns temporal relationships'],
      cons: ['Computationally heavy', 'Gradient can vanish during the long walk back']
    }
  },

  // --- MODULE 6: TRENDS ---
  'gan-adversarial': {
    title: 'The AI Battle (GAN)',
    definition: 'Two AIs competing: one makes fakes, the other detects them. Both get better.',
    whyNeeded: 'To create hyper-realistic images and data from scratch.',
    easyExplanation: 'A counterfeiter making fake money and a detective trying to catch him.',
    howItWorks: [
      'Generator (Artist) makes a fake image.',
      'Discriminator (Detective) tries to spot the fake.',
      'Both get feedback on who won.',
      'They both level up until fakes look real.'
    ],
    memoryTrick: 'Artist vs. Detective',
    realLife: 'Creating deepfakes or generating synthetic human faces that don’t exist.',
    prosCons: {
      pros: ['Creates amazing high-def data', 'Unsupervised creativity'],
      cons: ['Hard to stabilize training (Mode Collapse)']
    }
  },
  'generative-ai': {
    title: 'The Sculptor (Diffusion)',
    definition: 'Creating images by starting with random noise and "cleaning" it until it looks real.',
    whyNeeded: 'A more stable and detailed way to generate images compared to GANs.',
    easyExplanation: 'Looking at clouds and slowly carving them into specific shapes.',
    howItWorks: [
      'Start with a screen of static noise.',
      'Use a model to "guess" and remove the noise.',
      'Iterate many times.',
      'Manifest a clear image from nothing.'
    ],
    memoryTrick: 'Noise -> Filter -> Clear',
    realLife: 'DALL-E, Midjourney, and Stable Diffusion.',
    prosCons: {
      pros: ['State of the art quality', 'Very stable training'],
      cons: ['Can be slow to generate (needs many steps)']
    }
  },
  'recent-trends': {
    title: 'The Context King (Attention)',
    definition: 'A model that can look at every part of the data at once to find the most important bits.',
    whyNeeded: 'To process massive amounts of text or data without forgetting anything.',
    easyExplanation: 'Highlighters. The AI highlights the most important words in a sentence to understand it.',
    howItWorks: [
      'Look at all input tokens (words/pixels).',
      'Calculate "Attention Scores" (Weights).',
      'Focus the model’s "Eyes" on high scores.',
      'Get a global understanding instantly.'
    ],
    memoryTrick: 'Attention = Selective Focus',
    realLife: 'ChatGPT (Transformers) answering complex questions by "attending" to your whole prompt.',
    prosCons: {
      pros: ['Massive parallel speed', 'Perfect long-range memory'],
      cons: ['Needs massive memory for long text']
    }
  }
};

export default function InfoPanel() {
  const { activeModule } = useAtlasStore();
  const data = MODULE_DATA[activeModule] || {
    title: 'Neural Architecture',
    definition: 'Advanced cognitive simulation module.',
    easyExplanation: 'Exploring the depths of neural computation.',
    howItWorks: ['Active neural propagation.', 'Real-time weight optimization.', 'Immersive architectural study.']
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
                <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">{data.title}</h2>
              </div>
              <p className="text-sm text-blue-400/80 font-bold uppercase tracking-widest px-1">Definition & Purpose</p>
            </div>

            {/* Definition Section */}
            <section className="space-y-3">
               <div className="glass-panel p-5 bg-blue-500/5 border-blue-500/10">
                  <p className="text-[15px] text-slate-200 leading-relaxed font-medium">
                    {data.definition}
                  </p>
               </div>
               <div className="px-5 py-3 border-l-2 border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Why it's needed:</span>
                  <p className="text-xs text-slate-400 italic">{data.whyNeeded}</p>
               </div>
            </section>

            {/* Easy Explanation (Analogy) */}
            <section className="space-y-4">
               <div className="flex items-center gap-2 text-amber-400">
                  <Sparkles size={16} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Easy Explanation</span>
               </div>
               <div className="glass-panel p-6 bg-amber-400/5 border-amber-400/10 rounded-2xl relative overflow-hidden group">
                  <HelpCircle className="absolute -bottom-4 -right-4 text-amber-400/10 group-hover:text-amber-400/20 transition-colors" size={100} />
                  <p className="text-sm text-slate-300 leading-relaxed relative z-10 italic">
                    "{data.easyExplanation}"
                  </p>
               </div>
            </section>

            {/* How it Works (Steps) */}
            <section className="space-y-4">
               <div className="flex items-center gap-2 text-blue-400">
                  <Cpu size={16} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">How it Works</span>
               </div>
               <div className="space-y-3">
                  {data.howItWorks?.map((step: string, i: number) => (
                    <div key={i} className="flex gap-4 items-start group">
                       <div className="w-6 h-6 rounded bg-slate-900 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition-colors">
                          <span className="text-[10px] font-bold text-blue-400">{i + 1}</span>
                       </div>
                       <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors py-1">
                          {step}
                       </p>
                    </div>
                  ))}
               </div>
            </section>

            {/* Memory Trick / Formula */}
            <section className="grid grid-cols-2 gap-4">
               <div className="glass-panel p-4 border-indigo-500/20 bg-indigo-500/5">
                  <span className="block text-[9px] font-bold text-indigo-400 uppercase mb-2">Memory Trick</span>
                  <p className="text-[11px] font-mono text-white leading-tight">{data.memoryTrick}</p>
               </div>
               <div className="glass-panel p-4 border-emerald-500/20 bg-emerald-500/5">
                  <span className="block text-[9px] font-bold text-emerald-400 uppercase mb-2">Real-Life Example</span>
                  <p className="text-[11px] text-slate-300 leading-tight italic">{data.realLife}</p>
               </div>
            </section>

            {/* Advantages / Disadvantages */}
            {data.prosCons && (
              <section className="grid grid-cols-2 gap-4 pt-4">
                 <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-500">
                       <CheckCircle2 size={14} />
                       <span className="text-[10px] font-bold uppercase">Advantages</span>
                    </div>
                    <ul className="space-y-1">
                       {data.prosCons.pros.map((p: string, i: number) => (
                         <li key={i} className="text-[10px] text-slate-500 flex gap-2">
                            <span className="text-emerald-500 opacity-50">•</span> {p}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center gap-2 text-rose-500">
                       <XCircle size={14} />
                       <span className="text-[10px] font-bold uppercase">Disadvantages</span>
                    </div>
                    <ul className="space-y-1">
                       {data.prosCons.cons.map((c: string, i: number) => (
                         <li key={i} className="text-[10px] text-slate-500 flex gap-2">
                            <span className="text-rose-500 opacity-50">•</span> {c}
                         </li>
                       ))}
                    </ul>
                 </div>
              </section>
            )}

          </motion.div>
        </AnimatePresence>
      </div>


    </aside>
  );
}
