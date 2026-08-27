import { motion } from "framer-motion";

// A physical artifact page: things kept, not things said.
// Pure texture — no prose. The eye rests here.

function TeaRing() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative w-28 h-28 md:w-32 md:h-32 rotate-[-6deg]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "6px solid oklch(0.58 0.07 60 / 0.35)",
          filter: "blur(1.2px)",
        }}
      />
      <div
        className="absolute inset-[7px] rounded-full"
        style={{ background: "oklch(0.7 0.05 65 / 0.12)" }}
      />
      <div
        className="absolute -inset-1 rounded-full"
        style={{ border: "2px solid oklch(0.6 0.06 60 / 0.16)", filter: "blur(2px)" }}
      />
    </motion.div>
  );
}

function PressedFlower() {
  return (
    <motion.svg
      initial={{ opacity: 0, rotate: -14 }}
      animate={{ opacity: 1, rotate: -8 }}
      transition={{ duration: 0.9, delay: 0.25 }}
      viewBox="0 0 120 140"
      className="w-24 md:w-28 h-auto"
      aria-hidden="true"
    >
      <path
        d="M60 138 C58 100 56 80 52 58"
        stroke="oklch(0.45 0.05 130)"
        strokeWidth="1.6"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M54 92 C36 86 28 76 26 64 C40 66 52 76 54 92 Z"
        fill="oklch(0.55 0.07 135 / 0.45)"
      />
      <path
        d="M56 106 C74 102 84 92 86 80 C72 82 58 90 56 106 Z"
        fill="oklch(0.5 0.06 135 / 0.4)"
      />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx="52"
          cy="34"
          rx="10"
          ry="20"
          transform={`rotate(${a} 52 50)`}
          fill="oklch(0.62 0.09 25 / 0.35)"
          stroke="oklch(0.45 0.1 25 / 0.35)"
          strokeWidth="0.6"
        />
      ))}
      <circle cx="52" cy="50" r="6" fill="oklch(0.72 0.11 75 / 0.6)" />
    </motion.svg>
  );
}

function BhuttaReceipt() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotate: 5 }}
      animate={{ opacity: 1, y: 0, rotate: 3 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="paper-grain-soft border border-ink/15 shadow-md px-5 py-4 w-[190px] font-mono-term text-[10px] text-ink-soft leading-[1.9]"
      aria-hidden="true"
    >
      <p className="tracking-[0.25em] uppercase text-ink text-center">Bhutta Stall</p>
      <p className="text-center">— no name, near the gate —</p>
      <div className="my-2 border-t border-dashed border-ink/25" />
      <div className="flex justify-between"><span>Bhutta x2</span><span>40</span></div>
      <div className="flex justify-between"><span>Chai x2</span><span>30</span></div>
      <div className="flex justify-between"><span>Rain</span><span>free</span></div>
      <div className="my-2 border-t border-dashed border-ink/25" />
      <div className="flex justify-between text-ink"><span>TOTAL</span><span>70</span></div>
      <p className="mt-2 text-center tracking-[0.2em]">PAID · JUNE</p>
    </motion.div>
  );
}

function DateStamp() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1, rotate: -14 }}
      animate={{ opacity: 1, scale: 1, rotate: -10 }}
      transition={{ duration: 0.7, delay: 0.55 }}
      className="rounded-sm px-5 py-3 text-center"
      style={{
        border: "2px solid oklch(0.42 0.13 25 / 0.55)",
        color: "oklch(0.42 0.13 25 / 0.75)",
      }}
      aria-hidden="true"
    >
      <p className="font-mono-term text-[9px] tracking-[0.4em] uppercase">Class IX</p>
      <p className="font-mono-term text-xl tracking-[0.25em]">2019</p>
      <p className="font-mono-term text-[9px] tracking-[0.3em] uppercase">first entry</p>
    </motion.div>
  );
}

function TicketStub() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="paper-grain-soft border border-ink/20 shadow-md flex items-stretch"
      aria-hidden="true"
    >
      <div className="px-4 py-3">
        <p className="font-mono-term text-[9px] tracking-[0.35em] uppercase text-ink-soft">
          Admit One
        </p>
        <p className="font-serif-display text-lg text-ink leading-tight">
          One Ordinary Tuesday
        </p>
        <p className="font-mono-term text-[9px] tracking-[0.25em] uppercase text-ink-soft">
          seat: beside you
        </p>
      </div>
      <div className="border-l border-dashed border-ink/30 px-3 py-3 flex items-center">
        <p className="font-mono-term text-[9px] tracking-[0.3em] uppercase text-wax rotate-90 whitespace-nowrap">
          no. 001
        </p>
      </div>
    </motion.div>
  );
}

export function Artifacts() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 py-6">
      <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
        Pressed between the pages
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 max-w-lg">
        <TeaRing />
        <PressedFlower />
        <BhuttaReceipt />
        <DateStamp />
        <TicketStub />
      </div>

      <div className="w-12 h-px bg-ink/20 my-8" />
      <p className="font-serif-display italic text-base text-ink-soft text-center">
        YOU are... the reason I kept the receipts.
      </p>
    </div>
  );
}
