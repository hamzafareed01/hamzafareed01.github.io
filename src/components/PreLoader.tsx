import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreLoaderProps {
  onComplete: () => void;
  reduceMotion: boolean;
}

const terminalLines = [
  { text: '$ Initializing deployment pipeline...', delay: 0 },
  { text: '✓ Orchestrating containerized services', delay: 0.8 },
  { text: '✓ Configuring cloud infrastructure', delay: 1.6 },
  { text: '✓ Syncing distributed systems', delay: 2.4 },
  { text: '✓ Optimizing performance metrics', delay: 3.2 },
  { text: '> Deployment successful!', delay: 4.0 },
];

export default function PreLoader({ onComplete, reduceMotion }: PreLoaderProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      const quickCompleteTimer = setTimeout(() => {
        setIsComplete(true);
      }, 800);

      const finishTimer = setTimeout(onComplete, 1100);

      return () => {
        clearTimeout(quickCompleteTimer);
        clearTimeout(finishTimer);
      };
    }

    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < terminalLines.length - 1) {
          return prev + 1;
        }
        clearInterval(lineInterval);
        return prev;
      });
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 55);

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 600);
    }, 6000);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete, reduceMotion]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-full max-w-2xl mx-4 p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-3 text-sm text-white/50 font-mono">hamza-syed@portfolio</span>
            </div>

            <div className="space-y-3 min-h-[200px] mb-8">
              {terminalLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    currentLine >= index
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: reduceMotion ? 0.1 : 0.3, ease: 'easeOut' }}
                  className="font-mono text-sm md:text-base flex items-center gap-2"
                >
                  {line.text.startsWith('$') && (
                    <span className="text-[#0078d4] font-bold">{line.text.charAt(0)}</span>
                  )}
                  {line.text.startsWith('✓') && (
                    <span className="text-emerald-400">{line.text.charAt(0)}</span>
                  )}
                  {line.text.startsWith('>') && (
                    <span className="text-[#0078d4] font-bold">{line.text.charAt(0)}</span>
                  )}
                  <span className={line.text.startsWith('>') ? 'text-white font-semibold' : 'text-white/80'}>
                    {line.text.substring(2)}
                  </span>

                  {currentLine === index && currentLine < terminalLines.length - 1 && !reduceMotion && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-[#0078d4] ml-1"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-white/50">
                <span>Loading</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="relative">
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#0078d4] to-[#00a8e8] rounded-full relative"
                  >
                    {!reduceMotion && progress < 100 && (
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    )}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ left: '0%' }}
                  animate={{ left: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute -top-6 transform -translate-x-1/2"
                  style={{ left: `${progress}%` }}
                >
                  <motion.div
                    animate={
                      !reduceMotion && progress < 100
                        ? { y: [0, -3, 0], rotate: [0, 2, 0, -2, 0] }
                        : {}
                    }
                    transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="text-2xl" role="img" aria-label="rocket">
                      🚀
                    </span>
                  </motion.div>

                  {!reduceMotion && progress > 5 && progress < 100 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.6, 0.3, 0.6] }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 via-yellow-500/30 to-transparent rounded-full blur-sm transform -translate-x-6" />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                setIsComplete(true);
                onComplete();
              }}
              className="absolute top-4 right-4 text-xs text-white/50 hover:text-white/80 transition-colors font-mono"
            >
              Skip →
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
