import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FinalPage({ onReset }: { onReset: () => void }) {
  const [stage, setStage] = useState<"letter" | "closing" | "cover">("letter");

  useEffect(() => {
    if (stage !== "cover") return;
    const id = setTimeout(onReset, 5000);
    return () => clearTimeout(id);
  }, [stage, onReset]);

  return (
    <div className="paper-grain min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl w-full relative"
          >
            <motion.div
              initial={{ y: -40, rotate: -8, opacity: 0 }}
              animate={{ y: 0, rotate: -4, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="absolute -top-6 left-8 w-3 h-24 bg-wax/80 rounded-sm origin-top shadow-md"
              style={{ boxShadow: "0 4px 8px -2px oklch(0.2 0.05 25 / 0.4)" }}
            />

            <div className="paper-grain-soft border border-ink/15 rounded-sm p-10 md:p-14 shadow-md">
              <p className="font-hand text-3xl text-ink leading-relaxed">
                Anam —
              </p>
              <div className="mt-6 font-hand text-2xl text-ink/80 leading-relaxed space-y-4">
                <p>[ The handwritten letter will live here. ]</p>
                <p>[ Drishti will write this one by hand. ]</p>
              </div>
              <p className="mt-10 font-hand text-2xl text-ink text-right">— D.</p>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setStage("closing")}
                className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition"
              >
                Close the book →
              </button>
            </div>
          </motion.div>
        )}

        {stage === "closing" && (
          <motion.div
            key="closing"
            initial={{ scale: 1, opacity: 1, rotateY: 0 }}
            animate={{ scale: 0.85, opacity: 1, rotateY: -90 }}
            transition={{ duration: 1.6, ease: [0.32, 0.72, 0, 1] }}
            onAnimationComplete={() => setStage("cover")}
            className="w-[300px] h-[420px] bg-paper border border-ink/20 rounded-sm origin-left"
            style={{ transformStyle: "preserve-3d" }}
          />
        )}

        {stage === "cover" && (
          <motion.div
            key="cover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center"
          >
            <div
              className="relative w-[300px] h-[420px] md:w-[340px] md:h-[480px] rounded-r-md book-shadow mx-auto"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.32 0.04 60) 0%, oklch(0.22 0.03 60) 60%, oklch(0.18 0.025 60) 100%)",
              }}
            >
              <div className="absolute inset-6 border border-gold/40 rounded-sm" />
              <div className="absolute inset-9 border border-gold/20 rounded-sm" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-10 text-center">
                <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-gold/80">
                  First Edition
                </p>
                <h2 className="font-serif-display text-7xl gold-foil leading-none">YOU</h2>
                <div className="w-16 h-px bg-gold/60" />
                <p className="font-serif-display italic text-gold/90 text-sm">Checked Out</p>
                <p className="absolute bottom-8 font-serif-display italic text-gold/70 text-xs">
                  by Anam
                </p>
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/40 rounded-l-sm" />
            </div>
            <p className="mt-8 font-serif-display italic text-ink-soft text-sm">
              Returning to the shelf…
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
