import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * A small wax seal in the corner. Nothing points at it.
 * Pressing it breaks the seal and reveals a page meant only for her.
 */
export function HiddenSeal() {
  const [open, setOpen] = useState(false);
  const [found, setFound] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      <div className="no-print absolute left-4 bottom-4 sm:left-6 sm:bottom-6 z-30">
        <motion.button
          type="button"
          onClick={() => {
            setOpen(true);
            setFound(true);
          }}
          aria-label="Break the wax seal"
          initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
          animate={{
            opacity: found ? 0.55 : 1,
            scale: 1,
            rotate: -6,
            y: reduce ? 0 : [0, -1.5, 0],
          }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
            rotate: { duration: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.07, rotate: -2 }}
          whileTap={{ scale: 0.94 }}
          className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 rounded-full"
        >
          <WaxSealMark />
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap font-mono-term text-[8px] tracking-[0.3em] uppercase text-ink-soft opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500">
            press
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5 py-8 no-print backdrop-blur-[2px] overflow-y-auto"
            style={{ background: "oklch(0.2 0.02 60 / 0.6)" }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ y: 24, opacity: 0, rotate: -1, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, rotate: -0.5, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="paper-grain-soft relative max-w-md w-full border border-ink/15 rounded-sm px-6 py-9 sm:px-10 sm:py-12 shadow-md"
            >
              {/* broken halves of the seal, pressed into the top edge */}
              <div className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 flex">
                <motion.span
                  initial={{ x: 0, rotate: 0 }}
                  animate={{ x: -9, rotate: -14 }}
                  transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
                  className="block h-10 w-5 overflow-hidden"
                >
                  <span className="block -mr-5">
                    <WaxSealMark size={40} />
                  </span>
                </motion.span>
                <motion.span
                  initial={{ x: 0, rotate: 0 }}
                  animate={{ x: 9, rotate: 12 }}
                  transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
                  className="block h-10 w-5 overflow-hidden"
                >
                  <span className="block -ml-5">
                    <WaxSealMark size={40} />
                  </span>
                </motion.span>
              </div>

              <p className="mt-2 font-mono-term text-[9px] tracking-[0.35em] uppercase text-ink-soft">
                Unlisted page · found by breaking the seal
              </p>
              <p className="mt-6 font-serif-display italic text-2xl sm:text-3xl text-ink leading-snug">
                You weren't supposed to find this one.
              </p>
              <div className="mt-5 space-y-4 font-serif-body text-ink/85 leading-relaxed">
                <p>
                  Every book has a page the printer leaves out. This is that
                  page, and it only says one thing:
                </p>
                <p className="font-hand text-2xl sm:text-3xl text-ink">
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

/** A pressed blob of sealing wax with a monogram stamped into it. */
function WaxSealMark({ size = 46 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 6px 10px oklch(0.2 0.05 25 / 0.45))" }}
    >
      <defs>
        <radialGradient id="waxbody" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="oklch(0.58 0.16 28)" />
          <stop offset="55%" stopColor="oklch(0.45 0.15 26)" />
          <stop offset="100%" stopColor="oklch(0.31 0.11 25)" />
        </radialGradient>
        <radialGradient id="waxsheen" cx="32%" cy="24%" r="40%">
          <stop offset="0%" stopColor="oklch(0.95 0.05 60 / 0.5)" />
          <stop offset="100%" stopColor="oklch(0.95 0.05 60 / 0)" />
        </radialGradient>
      </defs>
      {/* irregular poured blob */}
      <path
        fill="url(#waxbody)"
        d="M50 4c13 0 22 6 30 13s16 15 16 30-6 25-15 33-19 16-31 16-24-7-32-15S3 63 3 48s7-24 15-31S37 4 50 4z"
      />
      {/* stamped inner ring */}
      <circle
        cx="50"
        cy="50"
        r="33"
        fill="none"
        stroke="oklch(0.26 0.09 25 / 0.75)"
        strokeWidth="2.5"
      />
      <circle
        cx="50"
        cy="50"
        r="37"
        fill="none"
        stroke="oklch(0.72 0.1 30 / 0.28)"
        strokeWidth="1"
      />
      {/* monogram */}
      <text
        x="50"
        y="63"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, EB Garamond, Georgia, serif"
        fontSize="40"
        fontStyle="italic"
        fill="oklch(0.28 0.1 25)"
        opacity="0.85"
      >
        D
      </text>
      {/* highlight */}
      <ellipse cx="38" cy="32" rx="26" ry="20" fill="url(#waxsheen)" />
    </svg>
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
