"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2 } from "lucide-react";

// Shortened code: ↑↑↓↓ (just 4 keys instead of 10)
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
];

interface KonamiCodeProps {
  children?: React.ReactNode;
}

export function KonamiCode({ children }: KonamiCodeProps) {
  const [isActivated, setIsActivated] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const resetSequence = useCallback(() => {
    setInputSequence([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code;
      const newSequence = [...inputSequence, key].slice(-KONAMI_CODE.length);
      setInputSequence(newSequence);

      // Check if the sequence matches
      if (newSequence.length === KONAMI_CODE.length) {
        const isMatch = newSequence.every((k, i) => k === KONAMI_CODE[i]);
        if (isMatch) {
          setIsActivated(true);
          resetSequence();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputSequence, resetSequence]);

  // Show hint after 30 seconds on the page
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isActivated) {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 5000);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isActivated]);

  return (
    <>
      {children}

      {/* Hint Toast */}
      <AnimatePresence>
        {showHint && !isActivated && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50 bg-black/90 border border-[#ff00ff]/50 p-4 font-mono text-xs max-w-xs"
          >
            <div className="flex items-center gap-2 text-[#ff00ff] mb-2">
              <Gamepad2 className="h-4 w-4" />
              <span>SECRET_DETECTED</span>
            </div>
            <p className="text-zinc-400">
              Try pressing ↑↑↓↓ on your keyboard...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activated Modal */}
      <AnimatePresence>
        {isActivated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setIsActivated(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotateX: 90 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative bg-black border-2 border-[#39ff14] p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsActivated(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-[#39ff14] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  animate={{
                    textShadow: [
                      "0 0 10px #39ff14",
                      "0 0 20px #39ff14",
                      "0 0 30px #39ff14",
                      "0 0 20px #39ff14",
                      "0 0 10px #39ff14",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🎮
                </motion.div>

                <h2 className="text-2xl font-mono font-bold text-[#39ff14] mb-4">
                  CHEAT_MODE_ACTIVATED
                </h2>

                <div className="border border-[#39ff14]/30 bg-[#39ff14]/5 p-4 mb-6">
                  <pre className="text-[10px] sm:text-xs font-mono text-[#39ff14] leading-relaxed">
{`
╔════════════════════════════════════════╗
║                                        ║
║            ↑ ↑ ↓ ↓                     ║
║                                        ║
║   SECRET CODE ACCEPTED!                ║
║                                        ║
║   +30 LIVES                            ║
║   GOD MODE: ENABLED                    ║
║   INFINITE AMMO: YES                   ║
║                                        ║
║   Just kidding... but you found        ║
║   the secret! You're clearly a         ║
║   curious one. 🎮                      ║
║                                        ║
╚════════════════════════════════════════╝
`}
                  </pre>
                </div>

                <div className="space-y-2 text-sm font-mono">
                  <p className="text-[#00ffff]">
                    &gt; Achievement Unlocked: RETRO_GAMER
                  </p>
                  <p className="text-[#ff00ff]">
                    &gt; +500 XP bonus applied
                  </p>
                  <p className="text-zinc-500">
                    &gt; (Not really, but thanks for playing!)
                  </p>
                </div>

                <motion.div
                  className="mt-6 text-xs text-zinc-600"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click anywhere to close
                </motion.div>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#39ff14]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#39ff14]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#39ff14]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#39ff14]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
