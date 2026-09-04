import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "A Very Very Very Happy Birthday, Anam 🥳❤️🫂🧿",
  "I kept wondering what to give you for your birthday.",
  "Buying something felt too easy.",
  "Writing a message felt too small.",
  "So I did what felt most like me.",
  "I built something.",
  "And I wrote something.",
  "So I made you this.",
];

export function Intro({
  onOpen,
  onResume,
}: {
  onOpen: () => void;
  onResume?: (page: number) => void;
}) {
  const [resumeAt, setResumeAt] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("you-first-edition:page"));
      if (Number.isFinite(saved) && saved > 0) setResumeAt(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  return (
    <div className="paper-grain min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      <DustField />

      {/* Wax bookmark — she stopped somewhere; offer the way back */}
      <AnimatePresence>
        {resumeAt !== null && onResume && (
          <motion.div
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -70, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="absolute right-3 sm:right-6 top-0 z-30 w-[170px] sm:w-[210px] no-print"
          >
            <div
              className="px-4 pt-4 pb-7 text-paper shadow-md"
              style={{
                background: "var(--wax)",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%)",
              }}
            >
              <p className="font-mono-term text-[9px] tracking-[0.3em] uppercase opacity-80">
                Bookmark
              </p>
              <p className="mt-1 font-serif-display italic text-sm leading-tight opacity-90">
                You stopped at page {resumeAt + 1}.
              </p>
              <button
                onClick={() => onResume(resumeAt)}
                className="mt-2 block text-left font-serif-display italic text-lg leading-tight hover:opacity-80 transition"
              >
                Return →
              </button>
              <button
                onClick={() => setResumeAt(null)}
                className="mt-1 font-mono-term text-[9px] tracking-[0.25em] uppercase opacity-70 hover:opacity-100 transition"
              >
                Start again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-2xl w-full text-center relative">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft mb-10"
        >
          A note before the book
        </motion.p>

        <h1 className="font-serif-display text-3xl md:text-4xl ink-text leading-snug mb-10">
          {LINES[0]}
        </h1>

        <div className="space-y-4">
          {LINES.slice(1).map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 + i * 0.5 }}
              className="font-serif-display italic text-lg md:text-xl text-ink/85"
            >
              {l}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.8 + LINES.length * 0.5 }}
          className="mt-12 font-hand text-2xl md:text-3xl text-ink"
        >
          ...Anam-ish enough for you? ♡
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 + LINES.length * 0.5 }}
          className="mt-14 flex justify-center"
        >
          <button
            onClick={onOpen}
            aria-label="Open the first edition book and start reading"
            className="group inline-flex flex-col items-center gap-3 focus:outline-none"
          >
            <span className="font-mono-term font-bold tracking-[0.35em] text-sm md:text-base uppercase ink-text border border-ink/60 px-6 py-3 rounded-sm group-hover:bg-ink group-hover:text-paper transition">
              OPEN YOUR FIRST EDITION
            </span>
            <span className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft group-hover:text-ink transition">
              ⸻ DRISHTI ⸻
            </span>
          </button>
        </motion.div>
      </div>
    </div>
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
