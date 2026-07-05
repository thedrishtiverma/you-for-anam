import { motion } from "framer-motion";

export function PrintingPress({ onOpenBook }: { onOpenBook: () => void }) {
  return (
    <div className="paper-grain min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="text-center space-y-3 mb-12">
        <p className="sr-only">Title page — YOU, a first edition for Anam, by Drishti</p>
        <Stamp delay={0.2}>
          <h1 className="font-serif-display text-[7rem] md:text-[10rem] leading-none tracking-tight ink-text">
            YOU
          </h1>
        </Stamp>
        <Stamp delay={0.9}>
          <p className="font-serif-display italic text-xl text-ink-soft">A First Edition</p>
        </Stamp>
        <Stamp delay={1.4}>
          <div className="pt-6 space-y-1">
            <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
              Written for
            </p>
            <p className="font-serif-display text-4xl gold-foil">Anam</p>
          </div>
        </Stamp>
        <Stamp delay={1.9}>
          <div className="pt-4 space-y-1">
            <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">by</p>
            <p className="font-serif-display italic text-2xl text-ink">Drishti</p>
          </div>
        </Stamp>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <BookCover onClick={onOpenBook} />
      </motion.div>
    </div>
  );
}

function Stamp({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function BookCover({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative block focus:outline-none"
      aria-label="Open the book"
    >
      <div
        className="relative w-[280px] h-[400px] md:w-[340px] md:h-[480px] rounded-r-md book-shadow transition-transform duration-700 group-hover:-rotate-1 group-hover:-translate-y-2"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.32 0.04 60) 0%, oklch(0.22 0.03 60) 60%, oklch(0.18 0.025 60) 100%)",
        }}
      >
        <div className="absolute inset-0 rounded-r-md opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="absolute inset-6 border border-gold/40 rounded-sm" />
        <div className="absolute inset-9 border border-gold/20 rounded-sm" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 gap-5">
          <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-gold/80">
            First Edition
          </p>
          <h2 className="font-serif-display text-7xl gold-foil leading-none">YOU</h2>
          <div className="w-16 h-px bg-gold/60" />
          <p className="font-serif-display italic text-gold/90 text-sm">for Anam</p>
          <p className="absolute bottom-8 font-serif-display italic text-gold/70 text-xs">
            — Drishti
          </p>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/40 rounded-l-sm" />
      </div>
      <p className="mt-6 text-center font-mono-term text-[10px] uppercase tracking-[0.3em] text-ink-soft group-hover:text-ink transition">
        Click to open
      </p>
    </button>
  );
}
