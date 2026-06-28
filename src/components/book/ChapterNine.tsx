import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function ChapterNine({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<"intro" | "ask" | "done">("intro");

  const accept = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#C9A24C", "#E8C07A", "#F7F3EC", "#A05A2C"],
      scalar: 0.9,
      ticks: 220,
    });
    setStage("done");
    setTimeout(onDone, 3200);
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-amber font-mono-term px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <p className="opacity-70 text-xs tracking-[0.4em] uppercase">Chapter Nine</p>
              <p>Status: <span className="opacity-80">Unwritten</span></p>
              <p>Looking for: <span className="opacity-80">Co-author</span></p>
              <button
                onClick={() => setStage("ask")}
                className="mt-4 inline-flex border border-terminal-amber/60 px-4 py-1.5 hover:bg-terminal-amber/10 transition"
              >
                [ Continue Writing ]
              </button>
            </motion.div>
          )}

          {stage === "ask" && (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl">
                Would you like to help me write Chapter Nine together?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={accept}
                  className="border border-terminal-amber/60 px-4 py-2 hover:bg-terminal-amber/10 transition"
                >
                  ❤️  Yes
                </button>
                <button
                  onClick={accept}
                  className="border border-terminal-amber/60 px-4 py-2 hover:bg-terminal-amber/10 transition"
                >
                  ❤️  Definitely Yes
                </button>
              </div>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-3"
            >
              <p className="text-xs tracking-[0.4em] uppercase opacity-60">Success</p>
              <p className="text-2xl">Chapter Nine successfully created.</p>
            </motion.div>
          )}
        </AnimatePresence>
        <span className="cursor-blink">_</span>
      </div>
    </div>
  );
}
