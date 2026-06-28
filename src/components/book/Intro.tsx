import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Every year,",
  "millions of birthday wishes are written.",
  "Most are copied.",
  "Most are forgotten.",
  "This one couldn't be.",
  "Because there has only ever been one Anam.",
  "So instead of writing another birthday message...",
  "I wrote you a book.",
];

export function Intro({ onOpen }: { onOpen: () => void }) {
  const [line, setLine] = useState(0);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (line >= LINES.length) {
      setDone(true);
      return;
    }
    const target = LINES[line];
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setTimeout(() => {
          setLine((l) => l + 1);
          setText("");
        }, target.length > 30 ? 900 : 600);
      }
    }, 45);
    return () => clearInterval(id);
  }, [line]);

  return (
    <div className="paper-grain min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <DustField />
      <div className="max-w-2xl w-full text-center">
        <div className="space-y-6">
          {LINES.slice(0, line).map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.55, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif-display text-xl md:text-2xl italic text-ink-soft"
            >
              {l}
            </motion.p>
          ))}
          {!done && (
            <p className="font-serif-display text-2xl md:text-3xl ink-text min-h-[2.5rem]">
              {text}
              <span className="cursor-blink ml-0.5">▍</span>
            </p>
          )}
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="mt-16 flex justify-center"
            >
              <WaxSeal onClick={onOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function WaxSeal({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center gap-4 focus:outline-none"
    >
      <div className="relative w-32 h-32 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, oklch(0.55 0.16 25), oklch(0.32 0.12 25) 70%, oklch(0.22 0.08 25))",
            boxShadow:
              "0 8px 18px -6px oklch(0.2 0.1 25 / 0.5), inset 0 -6px 12px oklch(0.18 0.08 25 / 0.6), inset 0 4px 8px oklch(0.7 0.18 25 / 0.4)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif-display italic text-paper text-2xl tracking-widest">D</span>
        </div>
      </div>
      <span className="font-serif-display tracking-[0.3em] text-sm uppercase text-ink-soft group-hover:text-ink transition">
        Open First Edition
      </span>
    </button>
  );
}

export function DustField() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <span
          key={i}
          className="dust-particle"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${100 + (i * 17) % 30}%`,
            animationDuration: `${18 + (i % 6) * 4}s`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}
