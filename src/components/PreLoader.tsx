import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreLoaderProps {
  onComplete: () => void;
  reduceMotion: boolean;
}

const terminalLines = [
  { text: "$ Initializing deployment pipeline...", delay: 0 },
  { text: "✓ Orchestrating containerized services", delay: 0.8 },
  { text: "✓ Configuring cloud infrastructure", delay: 1.6 },
  { text: "✓ Syncing distributed systems", delay: 2.4 },
  { text: "✓ Optimizing performance metrics", delay: 3.2 },
  { text: "> Deployment successful!", delay: 4.0 },
];

export default function PreLoader({
  onComplete,
  reduceMotion,
}: PreLoaderProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      const skipTimer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 300);
      }, 800);
      return () => clearTimeout(skipTimer);
    }

    let typingTimer: ReturnType<typeof setTimeout>;

    if (currentLine < terminalLines.length) {
      const fullText = terminalLines[currentLine].text;
      let charIndex = 0;

      const typeNextChar = () => {
        if (charIndex <= fullText.length) {
          setTypedText(fullText.substring(0, charIndex));
          charIndex++;
          typingTimer = setTimeout(typeNextChar, 15);
        } else {
          typingTimer = setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
            setTypedText("");
          }, 180);
        }
      };

      typeNextChar();
    }

    return () => clearTimeout(typingTimer);
  }, [currentLine, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 1;
      });
    }, 47);

    return () => clearInterval(progressInterval);
  }, [reduceMotion, onComplete]);

  useEffect(() => {
    if (reduceMotion) return;

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 180);
    }, 1700);

    return () => clearInterval(glitchInterval);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Cyberpunk terminal card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl mx-4 p-8 md:p-12 rounded-2xl bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Neon border effect - KEEP ORIGINAL */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 z-0" />
            <div className="absolute inset-[2px] rounded-2xl bg-black/90 z-[1]" />

            {/* Shell-only glitch overlays */}
            {!reduceMotion && (
              <>
                {/* frame split */}
                <motion.div
                  animate={
                    glitchActive
                      ? { opacity: [0, 0.5, 0], x: [-2, 2, 0] }
                      : { opacity: 0, x: 0 }
                  }
                  transition={{ duration: 0.16 }}
                  className="absolute inset-0 rounded-2xl border border-cyan-300/50 pointer-events-none z-[4]"
                />
                <motion.div
                  animate={
                    glitchActive
                      ? { opacity: [0, 0.35, 0], x: [2, -2, 0] }
                      : { opacity: 0, x: 0 }
                  }
                  transition={{ duration: 0.16 }}
                  className="absolute inset-0 rounded-2xl border border-fuchsia-400/40 pointer-events-none z-[4]"
                />

                {/* frame flash */}
                <motion.div
                  animate={
                    glitchActive
                      ? { opacity: [0, 0.12, 0] }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 0.14 }}
                  className="absolute inset-[2px] rounded-2xl pointer-events-none z-[4]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 48%, transparent 52%)",
                    backgroundSize: "220px 100%",
                  }}
                />

                {/* shell glitch bars */}
                <div className="absolute inset-[2px] rounded-2xl overflow-hidden pointer-events-none z-[4]">
                  {[16, 30, 68, 82].map((top, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-0 right-0"
                      style={{
                        top: `${top}%`,
                        height: i % 2 === 0 ? "10px" : "14px",
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.18) 20%, rgba(255,0,153,0.14) 52%, transparent 100%)",
                        mixBlendMode: "screen",
                      }}
                      animate={
                        glitchActive
                          ? {
                              x: [0, i % 2 === 0 ? -26 : 24, 8, 0],
                              opacity: [0, 1, 0.45, 0],
                              skewX: [0, -10, 4, 0],
                            }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.16, ease: "easeOut" }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Animated corner accents - KEEP ORIGINAL */}
            <div className="absolute top-0 left-0 w-20 h-20 z-[3]">
              <div className="absolute top-4 left-4 w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
              <div className="absolute top-4 left-4 w-[2px] h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 z-[3]">
              <div className="absolute top-4 right-4 w-12 h-[2px] bg-gradient-to-l from-pink-400 to-transparent" />
              <div className="absolute top-4 right-4 w-[2px] h-12 bg-gradient-to-b from-pink-400 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-20 h-20 z-[3]">
              <div className="absolute bottom-4 left-4 w-12 h-[2px] bg-gradient-to-r from-purple-400 to-transparent" />
              <div className="absolute bottom-4 left-4 w-[2px] h-12 bg-gradient-to-t from-purple-400 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 z-[3]">
              <div className="absolute bottom-4 right-4 w-12 h-[2px] bg-gradient-to-l from-cyan-400 to-transparent" />
              <div className="absolute bottom-4 right-4 w-[2px] h-12 bg-gradient-to-t from-cyan-400 to-transparent" />
            </div>

            {/* Scanlines effect - KEEP ORIGINAL */}
            {!reduceMotion && (
              <motion.div
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none z-[2]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)",
                }}
              />
            )}

            {/* Grid pattern overlay - KEEP ORIGINAL */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none z-[2]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Glowing particles - KEEP ORIGINAL */}
            {!reduceMotion &&
              [...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full z-[2]"
                  style={{
                    background:
                      i % 3 === 0
                        ? "#00ffff"
                        : i % 3 === 1
                          ? "#ff00ff"
                          : "#ff0080",
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}

            {/* Pulsing glow on edges - KEEP ORIGINAL */}
            {!reduceMotion && (
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-2xl z-[1]"
                style={{
                  boxShadow:
                    "0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(255, 0, 255, 0.3)",
                }}
              />
            )}

            {/* Content wrapper with z-index */}
            <div className="relative z-10">
              {/* Tagline above terminal */}
              <div className="mb-6 text-center">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {["Turning", "code", "into", "intuitive", "design"].map(
                    (word, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.2,
                          ease: "easeOut",
                        }}
                        className="text-lg md:text-xl text-white/90 font-light"
                      >
                        {word}
                      </motion.span>
                    ),
                  )}
                </div>
              </div>

              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-3 text-sm text-white/50 font-mono">
                  hamza-syed@portfolio
                </span>
              </div>

              {/* Terminal content */}
              <div className="space-y-3 min-h-[200px] mb-8">
                {terminalLines.map((line, index) => {
                  if (index < currentLine) {
                    return (
                      <div
                        key={index}
                        className="font-mono text-sm md:text-base flex items-center gap-2"
                      >
                        {line.text.startsWith("$") && (
                          <span className="text-[#0078d4] font-bold">
                            {line.text.charAt(0)}
                          </span>
                        )}
                        {line.text.startsWith("✓") && (
                          <span className="text-emerald-400">
                            {line.text.charAt(0)}
                          </span>
                        )}
                        {line.text.startsWith(">") && (
                          <span className="text-[#0078d4] font-bold">
                            {line.text.charAt(0)}
                          </span>
                        )}
                        <span
                          className={
                            line.text.startsWith(">")
                              ? "text-white font-semibold"
                              : "text-white/80"
                          }
                        >
                          {line.text.substring(2)}
                        </span>
                      </div>
                    );
                  } else if (index === currentLine) {
                    return (
                      <div
                        key={index}
                        className="font-mono text-sm md:text-base flex items-center gap-2"
                      >
                        {typedText.startsWith("$") && (
                          <span className="text-[#0078d4] font-bold">
                            {typedText.charAt(0)}
                          </span>
                        )}
                        {typedText.startsWith("✓") && (
                          <span className="text-emerald-400">
                            {typedText.charAt(0)}
                          </span>
                        )}
                        {typedText.startsWith(">") && (
                          <span className="text-[#0078d4] font-bold">
                            {typedText.charAt(0)}
                          </span>
                        )}
                        <span
                          className={
                            typedText.startsWith(">")
                              ? "text-white font-semibold"
                              : "text-white/80"
                          }
                        >
                          {typedText.substring(2)}
                        </span>

                        {!reduceMotion && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block w-2 h-4 bg-[#0078d4] ml-1"
                          />
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-white/50">
                  <span>Loading</span>
                  <span>{Math.round(progress)}%</span>
                </div>

                <div className="relative">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#0078d4] to-[#00a8e8] rounded-full relative"
                    >
                      {!reduceMotion && progress < 100 && (
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ left: "0%" }}
                    animate={{ left: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute -top-12 transform -translate-x-1/2"
                    style={{ left: `${progress}%` }}
                  >
                    {!reduceMotion && progress > 2 && progress < 100 && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none">
                        <motion.div
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 0.5, 0.8],
                          }}
                          transition={{ duration: 0.3, repeat: Infinity }}
                          className="absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-8"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/60 via-yellow-400/50 to-transparent rounded-full blur-md" />
                        </motion.div>

                        <motion.div
                          animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.6, 0.8, 0.6],
                          }}
                          transition={{ duration: 0.25, repeat: Infinity }}
                          className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-6"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 via-orange-400/40 to-transparent rounded-full blur-sm" />
                        </motion.div>
                      </div>
                    )}

                    <motion.div
                      animate={
                        !reduceMotion && progress < 100
                          ? { y: [0, -2, 0] }
                          : {}
                      }
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-10"
                    >
                      <span
                        className="text-4xl block transform rotate-0"
                        role="img"
                        aria-label="rocket"
                      >
                        🚀
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Skip button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                whileHover={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setIsComplete(true);
                  onComplete();
                }}
                className="absolute top-4 right-4 text-xs text-white/50 hover:text-white/80 transition-colors font-mono z-20"
              >
                Skip →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}