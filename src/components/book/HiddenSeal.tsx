import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A small wax seal in the corner. Nothing points at it.
 * Pressing it breaks the seal and reveals a page meant only for her.
 */
export function HiddenSeal() {
  const [open, setOpen] = useState(false);
  const [found, setFound] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setFound(true);
        }}
        aria-label="Break the wax seal"
        className="no-print absolute left-4 bottom-4 sm:left-6 sm:bottom-6 z-30 focus:outline-none"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: found ? 0.35 : 0.7, scale: 1 }}
          whileHover={{ scale: 1.08, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="block h-9 w-9 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 30%, oklch(0.52 0.16 25), oklch(0.36 0.13 25))",
            boxShadow: "0 6px 12px -6px oklch(0.2 0.05 25 / 0.6)",
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 no-print"
            style={{ background: "oklch(0.2 0.02 60 / 0.55)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, rotate: -1 }}
              animate={{ y: 0, opacity: 1, rotate: -0.5 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="paper-grain-soft max-w-md w-full border border-ink/15 rounded-sm px-6 py-8 sm:px-10 sm:py-12 shadow-md"
            >
              <p className="font-mono-term text-[9px] tracking-[0.35em] uppercase text-ink-soft">
                Unlisted page · found by breaking the seal
              </p>
              <p className="mt-6 font-serif-display italic text-2xl text-ink leading-snug">
                You weren't supposed to find this one.
              </p>
              <div className="mt-5 space-y-4 font-serif-body text-ink/85 leading-relaxed">
                <p>
                  Every book has a page the printer leaves out. This is that
                  page, and it only says one thing:
                </p>
                <p className="font-hand text-2xl text-ink">
                  whatever year you're having, you don't have to have it alone.
                </p>
                <p>
                  That's it. That's the whole hidden chapter. Close it and go
                  back to the story.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="mt-8 font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition"
              >
                Seal it again →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** "Read on her birthday" — a quiet, date-aware line. */
export function BirthdayLine({ month = 5, day = 28 }: { month?: number; day?: number }) {
  const now = new Date();
  const isToday = now.getMonth() === month && now.getDate() === day;
  let next = new Date(now.getFullYear(), month, day);
  if (next < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    next = new Date(now.getFullYear() + 1, month, day);
  }
  const days = Math.round(
    (next.getTime() -
      new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) /
      86400000,
  );

  return (
    <p className="font-serif-display italic text-sm text-ink-soft">
      {isToday
        ? "Opened on the day itself — 28 June. Good. It was written for today."
        : `Read on ${now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} — ${days} day${days === 1 ? "" : "s"} until the next 28th of June.`}
    </p>
  );
}
