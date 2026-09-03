import { useState } from "react";
import { motion } from "framer-motion";

/**
 * An "artifacts" page: things that fell out of the book.
 * Pure texture — a pressed flower, a tea ring, a bhutta receipt,
 * a 2019 date stamp, a ticket stub. No prose. The eye rests here.
 */
export function ArtifactPage() {
  return (
    <div className="relative h-full w-full overflow-y-auto px-6 py-8 sm:px-8 sm:py-10 md:px-12">
      <p className="font-mono-term text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-ink-soft">
        Loose items found between the pages
      </p>

      {/* Tea ring — decorative, safe at every width */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.1 }}
        className="pointer-events-none absolute right-4 top-14 h-28 w-28 rounded-full sm:h-40 sm:w-40 sm:right-6 sm:top-16 md:right-12"
        style={{
          border: "6px solid oklch(0.62 0.06 65 / 0.28)",
          boxShadow:
            "inset 0 0 18px oklch(0.62 0.06 65 / 0.16), 0 0 22px oklch(0.62 0.06 65 / 0.10)",
          filter: "blur(0.3px)",
        }}
      />

      {/* Small screens: the same loose items, stacked so nothing collides */}
      <div className="mt-10 flex flex-col items-center gap-8 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 14, rotate: -14 }}
          animate={{ opacity: 1, y: 0, rotate: -6 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="self-start"
        >
          <PressedFlower />
          <p className="mt-2 font-hand text-lg text-ink-soft">
            kept, without meaning to
          </p>
        </motion.div>
        <TicketStub delay={0.35} />
        <Receipt delay={0.5} className="w-full max-w-[220px] self-end" />
        <DateStamp delay={0.65} className="self-start" />
      </div>

      {/* Medium and up: scattered across the page, as they fell */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 14, rotate: -14 }}
          animate={{ opacity: 1, y: 0, rotate: -9 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="absolute left-14 top-24"
        >
          <PressedFlower />
          <p className="mt-2 font-hand text-lg text-ink-soft">
            kept, without meaning to
          </p>
        </motion.div>

        <Receipt delay={0.4} className="absolute right-16 bottom-28 w-[190px]" />
        <DateStamp delay={0.6} className="absolute left-20 bottom-24" />

        <div className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2">
          <TicketStub delay={0.75} />
        </div>

        {/* Ink thumbprint smudge */}
        <div
          className="pointer-events-none absolute bottom-10 right-1/3 h-10 w-8 rounded-[45%] opacity-25"
          style={{ background: "oklch(0.22 0.01 60)", filter: "blur(2.5px)" }}
        />
      </div>
    </div>
  );
}

function Receipt({ delay, className }: { delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 5 }}
      animate={{ opacity: 1, y: 0, rotate: 3 }}
      transition={{ duration: 0.9, delay }}
      className={`paper-grain-soft border border-ink/12 px-4 py-4 shadow-md ${className ?? ""}`}
      style={{ boxShadow: "0 12px 22px -14px oklch(0.2 0.02 60 / 0.5)" }}
    >
      <p className="font-mono-term text-[9px] tracking-[0.3em] uppercase text-ink-soft text-center">
        Roadside · Monsoon
      </p>
      <div className="my-2 border-t border-dashed border-ink/25" />
      <div className="space-y-1 font-mono-term text-[11px] text-ink">
        <Row label="BHUTTA ×2" value="40" />
        <Row label="NIMBU" value="00" />
        <Row label="CHAI ×2" value="30" />
      </div>
      <div className="my-2 border-t border-dashed border-ink/25" />
      <Row label="TOTAL" value="70" />
      <p className="mt-3 text-center font-mono-term text-[9px] tracking-[0.25em] uppercase text-wax">
        Unpaid · Pending
      </p>
    </motion.div>
  );
}

function DateStamp({ delay, className }: { delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.15, rotate: -12 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      <div className="rounded-sm border-2 border-wax/55 px-4 py-2 text-center">
        <p className="font-mono-term text-[9px] tracking-[0.35em] uppercase text-wax/80">
          First Filed
        </p>
        <p className="font-mono-term text-xl tracking-[0.2em] text-wax/85">2019</p>
        <p className="font-mono-term text-[9px] tracking-[0.25em] uppercase text-wax/70">
          Class IX
        </p>
      </div>
    </motion.div>
  );
}

function TicketStub({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, rotate: 10 }}
      animate={{ opacity: 1, x: 0, rotate: 7 }}
      transition={{ duration: 0.9, delay }}
    >
      <div className="flex items-stretch border border-ink/20 bg-paper-deep/40 shadow-sm">
        <div className="px-4 py-3">
          <p className="font-mono-term text-[9px] tracking-[0.3em] uppercase text-ink-soft">
            Admit One
          </p>
          <p className="font-serif-display italic text-lg text-ink leading-tight">
            Seven Years
          </p>
          <p className="font-mono-term text-[9px] tracking-[0.25em] uppercase text-ink-soft">
            No expiry
          </p>
        </div>
        <div className="border-l border-dashed border-ink/30 px-3 py-3 flex items-center">
          <p className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-wax rotate-180 [writing-mode:vertical-rl]">
            001
          </p>
        </div>
      </div>
    </motion.div>
  );
}


function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between font-mono-term text-[11px] text-ink">
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function PressedFlower() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
      <g opacity="0.75">
        <path
          d="M60 96 C58 74 56 62 44 44"
          stroke="oklch(0.45 0.06 130)"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M58 74 C48 70 42 64 38 54 C50 54 56 62 58 74Z"
          fill="oklch(0.52 0.07 135 / 0.6)"
        />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="60"
            cy="30"
            rx="9"
            ry="17"
            transform={`rotate(${a} 60 44)`}
            fill="oklch(0.66 0.09 30 / 0.42)"
            stroke="oklch(0.5 0.1 28 / 0.4)"
            strokeWidth="0.6"
          />
        ))}
        <circle cx="60" cy="44" r="6" fill="oklch(0.72 0.12 80 / 0.7)" />
      </g>
    </svg>
  );
}

/**
 * A second artifacts page: a library due-date card stamped every year
 * since 2019, and a folded chit that unfolds on click.
 */
export function LibraryCardPage() {
  return (
    <div className="relative h-full w-full overflow-y-auto px-8 py-10 md:px-12">
      <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
        Filed at the back of the book
      </p>

      <div className="mt-8 flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.9 }}
          className="w-[260px] paper-grain-soft border border-ink/20 px-5 py-5 shadow-md"
          style={{ boxShadow: "0 14px 26px -16px oklch(0.2 0.02 60 / 0.5)" }}
        >
          <p className="font-mono-term text-[9px] tracking-[0.3em] uppercase text-ink-soft text-center">
            Date Due
          </p>
          <div className="my-3 border-t border-ink/20" />
          <div className="space-y-2">
            {[2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map((y, i) => (
              <div
                key={y}
                className="flex items-center justify-between border-b border-dashed border-ink/15 pb-1"
              >
                <span className="font-mono-term text-[11px] text-ink tabular-nums">
                  28 JUN {y}
                </span>
                <span
                  className="font-mono-term text-[9px] tracking-[0.2em] uppercase text-wax/80"
                  style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
                >
                  Renewed
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-mono-term text-[9px] tracking-[0.25em] uppercase text-ink-soft">
            Never returned
          </p>
        </motion.div>

        <FoldedChit />
      </div>
    </div>
  );
}

function FoldedChit() {
  const [open, setOpen] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => setOpen((o) => !o)}
      initial={{ opacity: 0, y: 18, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: 2 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      aria-expanded={open}
      aria-label={open ? "Fold the note back up" : "Unfold the folded note"}
      className="w-[250px] text-left paper-grain-soft border border-ink/20 px-5 py-4 shadow-md"
      style={{ boxShadow: "0 12px 22px -14px oklch(0.2 0.02 60 / 0.45)" }}
    >
      <p className="font-mono-term text-[9px] tracking-[0.3em] uppercase text-ink-soft">
        Folded note — {open ? "tap to fold" : "tap to unfold"}
      </p>
      <motion.div
        animate={{ height: open ? "auto" : 26, opacity: open ? 1 : 0.55 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="overflow-hidden"
      >
        <p className="mt-2 font-hand text-2xl leading-snug text-ink">
          passed under the desk, Class IX:
        </p>
        <p className="mt-2 font-hand text-2xl leading-snug text-ink/90">
          “vaibhavi se abhi bhi vahi wali dosti h?”
        </p>
        <p className="mt-3 font-hand text-xl text-ink-soft">
          still unanswered, seven years on.
        </p>
      </motion.div>
      {!open && (
        <div className="mt-2 h-px w-full bg-ink/15" aria-hidden="true" />
      )}
    </motion.button>
  );
}
