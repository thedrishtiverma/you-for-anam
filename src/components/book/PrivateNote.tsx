import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   EDIT YOUR PERSONAL NOTE HERE.
   Each string below is one paragraph, in your handwriting font.
   Add, remove or rewrite freely.
   ──────────────────────────────────────────────────────────────── */
const NOTE_TITLE = "A page only you will open";

const NOTE_PARAGRAPHS = [
  "Anam,",
  "There's a page in every book the author writes for one person only. This is that page, and you're holding it.",
  "Seven years, and somehow you've never once been hard to love as a friend. You made the ordinary days count without ever trying to. That's rarer than you think.",
  "Whatever this year asks of you — I hope it's gentle, and I hope you already know that someone kept a whole book of you.",
];

const NOTE_SIGNATURE = "— Drishti";

/**
 * A sealed, private page: closed until she chooses to open it.
 * Content lives in the constants above so it can be edited by hand.
 */
export function PrivateNote() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-full w-full px-2 sm:px-6 py-6 flex flex-col items-center justify-center">
      <p className="font-mono-term text-[9px] tracking-[0.35em] uppercase text-ink-soft mb-6 text-center">
        Private page · not for the record
      </p>

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="sealed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            onClick={() => setOpen(true)}
            className="group relative w-full max-w-sm border border-ink/15 rounded-sm bg-paper/60 px-8 py-12 text-center shadow-[0_18px_40px_-28px_oklch(0.2_0.02_60/0.9)]"
          >
            <span className="mx-auto block h-12 w-12 rounded-full bg-wax/85 shadow-md" />
            <p className="mt-6 font-serif-display italic text-ink text-lg">
              Sealed
            </p>
            <p className="mt-1 font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft group-hover:text-ink transition">
              break the seal to read
            </p>
          </motion.button>
        ) : (
          <motion.div
            key="note"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="w-full max-w-xl"
          >
            <h2 className="font-serif-display italic text-ink-soft text-sm text-center">
              {NOTE_TITLE}
            </h2>
            <div className="mt-6 font-hand text-[1.55rem] sm:text-[1.7rem] text-ink/90 leading-[1.55] space-y-4">
              {NOTE_PARAGRAPHS.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-8 font-hand text-2xl text-ink text-right">
              {NOTE_SIGNATURE}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
