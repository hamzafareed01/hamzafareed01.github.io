import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreLoaderProps {
  onComplete: () => void;
  reduceMotion: boolean;
}

const terminalLines = [
  "$ Initializing deployment pipeline...",
  "✓ Orchestrating containerized services",
  "✓ Configuring cloud infrastructure",
  "✓ Syncing distributed systems",
  "✓ Optimizing performance metrics",
  "> Deployment successful!",
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
        setTimeout(onComplete, 250);
      }, 800);

      return () => clearTimeout(skipTimer);
    }

    let typingTimer: ReturnType<typeof setTimeout>;

    if (currentLine < terminalLines.length) {
      const fullText = terminalLines[currentLine];
      let charIndex = 0;

      const typeNextChar = () => {
        if (charIndex <= fullText.length) {
          setTypedText(fullText.substring(0, charIndex));
          charIndex++;
          typingTimer = setTimeout(typeNextChar, 16);
        } else {
          typingTimer = setTimeout(() => {
            setCurrentLine((prev: number) => prev + 1);
            setTypedText("");
          }, 180);
        }
      };

      typeNextChar();
    }

    return () => clearTimeout(typingTimer);
  }, [currentLine, reduceMotion, onComplete]);

  useEffect(() => {
    if (reduceMotion) return;

    const progressInterval = setInterval(() => {
      setProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 47);

    return () => clearInterval(progressInterval);
  }, [reduceMotion]);

  useEffect(() => {
    if (progress >= 100) {
      setIsComplete(true);
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 300);

      return () => clearTimeout(completeTimer);
    }
  }, [progress, onComplete]);

  useEffect(() => {
    if (reduceMotion) return;

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 140);
    }, 2200);

    return () => clearInterval(glitchInterval);
  }, [reduceMotion]);

  const renderCompletedLine = (line: string, index: number) => (
    <div
      key={index}
      className="relative font-mono text-sm md:text-base flex items-center gap-2"
    >
      {line.startsWith("$") && (
        <span className="text-[#00bfff] font-bold">{line.charAt(0)}</span>
      )}
      {line.startsWith("✓") && (
        <span className="text-emerald-400">{line.charAt(0)}</span>
      )}
      {line.startsWith(">") && (
        <span className="text-[#00bfff] font-bold">{line.charAt(0)}</span>
      )}

      <span
        className={
          line.startsWith(">")
            ? "text-white font-semibold"
            : "text-white/80"
        }
      >
        {line.substring(2)}
      </span>

      {!reduceMotion && glitchActive && (
        <>
          <span
            className="absolute left-[18px] text-cyan-300/40 pointer-events-none"
            style={{ transform: "translateX(-1px)" }}
          >
            {line.substring(2)}
          </span>
          <span
            className="absolute left-[18px] text-fuchsia-400/35 pointer-events-none"
            style={{ transform: "translateX(1px)" }}
          >
            {line.substring(2)}
          </span>
        </>
      )}
    </div>
  );

  const renderTypingLine = (line: string) => (
    <div className="relative font-mono text-sm md:text-base flex items-center gap-2">
      {line.startsWith("$") && (
        <span className="text-[#00bfff] font-bold">{line.charAt(0)}</span>
      )}
      {line.startsWith("✓") && (
        <span className="text-emerald-400">{line.charAt(0)}</span>
      )}
      {line.startsWith(">") && (
        <span className="text-[#00bfff] font-bold">{line.charAt(0)}</span>
      )}

      <span
        className={
          line.startsWith(">")
            ? "text-white font-semibold"
            : "text-white/80"
        }
      >
        {line.substring(2)}
      </span>

      {!reduceMotion && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-[#00bfff] ml-1"
        />
      )}

      {!reduceMotion && glitchActive && (
        <>
          <span
            className="absolute left-[18px] text-cyan-300/45 pointer-events-none"
            style={{ transform: "translateX(-1px)" }}
          >
            {line.substring(2)}
          </span>
          <span
            className="absolute left-[18px] text-fuchsia-400/35 pointer-events-none"
            style={{ transform: "translateX(1px)" }}
          >
            {line.substring(2)}
          </span>
        </>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={
              !reduceMotion && glitchActive
                ? { scale: [1, 0.998, 1.002, 1], x: [0, -1, 1, 0] }
                : { scale: 1, opacity: 1 }
            }
            exit={{ scale: 1.04, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-2xl mx-4 p-8 md:p-12 rounded-2xl bg-[#05070d]/80 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* outer neon border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 opacity-60 z-0" />

            {/* inner dark panel */}
            <div className="absolute top-[2px] right-[2px] bottom-[2px] left-[2px] rounded-2xl bg-[#070b14]/95 z-[1]" />

            {/* subtle background wash */}
            <div className="absolute inset-[2px] rounded-2xl z-[1] bg-[radial-gradient(circle_at_20%_20%,rgba(0,191,255,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,0,153,0.08),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(119,0,255,0.08),transparent_35%)]" />

            {/* corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 z-[2]">
              <div className="absolute top-4 left-4 w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
              <div className="absolute top-4 left-4 w-[2px] h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 z-[2]">
              <div className="absolute top-4 right-4 w-12 h-[2px] bg-gradient-to-l from-fuchsia-400 to-transparent" />
              <div className="absolute top-4 right-4 w-[2px] h-12 bg-gradient-to-b from-fuchsia-400 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-20 h-20 z-[2]">
              <div className="absolute bottom-4 left-4 w-12 h-[2px] bg-gradient-to-r from-violet-400 to-transparent" />
              <div className="absolute bottom-4 left-4 w-[2px] h-12 bg-gradient-to-t from-violet-400 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 z-[2]">
              <div className="absolute bottom-4 right-4 w-12 h-[2px] bg-gradient-to-l from-cyan-400 to-transparent" />
              <div className="absolute bottom-4 right-4 w-[2px] h-12 bg-gradient-to-t from-cyan-400 to-transparent" />
            </div>

            {/* grid */}
            <div
              className="absolute top-[2px] right-[2px] bottom-[2px] left-[2px] rounded-2xl pointer-events-none z-[2]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.07) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.07) 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
                opacity: 0.22,
              }}
            />

            {/* scanlines */}
            {!reduceMotion && (
              <motion.div
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-[2px] right-[2px] bottom-[2px] left-[2px] rounded-2xl pointer-events-none z-[2]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 255, 255, 0.018) 3px, rgba(0, 255, 255, 0.018) 4px)",
                }}
              />
            )}

            {/* glitch bars */}
            {!reduceMotion && (
              <div className="absolute inset-[2px] rounded-2xl overflow-hidden pointer-events-none z-[3]">
                {[18, 32, 46, 64].map((top, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-0 right-0 h-[10px]"
                    style={{
                      top: `${top}%`,
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.14) 30%, rgba(255,0,153,0.12) 60%, transparent 100%)",
                      mixBlendMode: "screen",
                    }}
                    animate={
                      glitchActive
                        ? {
                            x: [0, i % 2 === 0 ? -16 : 14, 0],
                            opacity: [0, 0.9, 0],
                            skewX: [0, -12, 0],
                          }
                        : { opacity: 0 }
                    }
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  />
                ))}
              </div>
            )}

            {/* particles */}
            {!reduceMotion &&
              [...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full z-[2]"
                  style={{
                    background:
                      i % 3 === 0
                        ? "#00d9ff"
                        : i % 3 === 1
                          ? "#b100ff"
                          : "#ff2da1",
                    left: `${12 + i * 10}%`,
                    top: `${18 + (i % 3) * 18}%`,
                  }}
                  animate={{
                    opacity: [0.15, 0.55, 0.15],
                    scale: [1, 1.4, 1],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2 + i * 0.25,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}

            {/* restrained glow */}
            {!reduceMotion && (
              <motion.div
                animate={{ opacity: [0.22, 0.38, 0.22] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-2xl pointer-events-none z-[1]"
                style={{
                  boxShadow:
                    "0 0 22px rgba(0, 190, 255, 0.22), inset 0 0 18px rgba(118, 0, 255, 0.10)",
                }}
              />
            )}

            {/* content */}
            <div className="relative z-[5]">
              {/* glitch headline */}
              <div className="mb-6 text-center relative">
                <motion.div
                  animate={
                    !reduceMotion && glitchActive
                      ? { x: [0, -2, 2, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.12 }}
                  className="relative inline-block"
                >
                  <span className="relative z-10 text-lg md:text-xl text-white/90 font-light">
                    Turning code into intuitive design
                  </span>

                  {!reduceMotion && (
                    <>
                      <motion.span
                        animate={
                          glitchActive
                            ? { x: [-2, 1, 0], opacity: [0.7, 0.35, 0] }
                            : { opacity: 0 }
                        }
                        transition={{ duration: 0.14 }}
                        className="absolute inset-0 text-cyan-300 font-light pointer-events-none"
                      >
                        Turning code into intuitive design
                      </motion.span>

                      <motion.span
                        animate={
                          glitchActive
                            ? { x: [2, -1, 0], opacity: [0.65, 0.3, 0] }
                            : { opacity: 0 }
                        }
                        transition={{ duration: 0.14 }}
                        className="absolute inset-0 text-fuchsia-400 font-light pointer-events-none"
                      >
                        Turning code into intuitive design
                      </motion.span>
                    </>
                  )}
                </motion.div>
              </div>

              {/* terminal header */}
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

              {/* terminal content */}
              <div className="space-y-3 min-h-[200px] mb-8">
                {terminalLines.map((line, index) => {
                  if (index < currentLine) {
                    return renderCompletedLine(line, index);
                  }

                  if (index === currentLine) {
                    return <div key={index}>{renderTypingLine(typedText)}</div>;
                  }

                  return null;
                })}
              </div>

              {/* progress */}
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
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#0078d4] to-[#00c8ff] rounded-full relative"
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
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute -top-12 -translate-x-1/2"
                    style={{ left: `${progress}%` }}
                  >
                    {!reduceMotion && progress > 2 && progress < 100 && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none">
                        <motion.div
                          animate={{
                            scale: [1, 1.25, 1],
                            opacity: [0.8, 0.45, 0.8],
                          }}
                          transition={{ duration: 0.3, repeat: Infinity }}
                          className="absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-8"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/60 via-yellow-400/50 to-transparent rounded-full blur-md" />
                        </motion.div>

                        <motion.div
                          animate={{
                            scale: [1.15, 1, 1.15],
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
                        !reduceMotion && progress < 100 ? { y: [0, -2, 0] } : {}
                      }
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-10"
                    >
                      <span
                        className="text-4xl block"
                        role="img"
                        aria-label="rocket"
                      >
                        🚀
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* skip */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                whileHover={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
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