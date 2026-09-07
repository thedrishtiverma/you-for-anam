import { motion } from "framer-motion";
import photo from "@/assets/anam-photo.jpg.asset.json";

/**
 * A photographic plate bound into the book: one printed picture,
 * taped at a slight angle, with a pencilled caption beneath it.
 */
export function PhotoPlate() {
  return (
    <div className="relative min-h-full w-full px-2 sm:px-6 py-4 flex flex-col items-center justify-center">
      <p className="font-mono-term text-[9px] tracking-[0.35em] uppercase text-ink-soft mb-6 text-center">
        Plate I · tipped in by hand
      </p>

      <motion.figure
        initial={{ opacity: 0, y: 18, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -1.6 }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="relative bg-paper border border-ink/10 shadow-[0_18px_40px_-24px_oklch(0.2_0.02_60/0.9)] px-3 pt-3 pb-5 w-full max-w-[280px] sm:max-w-[320px]"
      >
        {/* tape */}
        <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-20 rotate-[-4deg] bg-gold/25 border border-gold/20" />

        <div className="relative overflow-hidden">
          <img
            src={photo.url}
            alt="Anam, photographed on a grass field at night, in a black and white printed dress"
            loading="lazy"
            className="block w-full h-auto"
            style={{
              filter: "sepia(0.18) saturate(0.92) contrast(0.97) brightness(1.03)",
            }}
          />
          {/* aged print wash */}
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, transparent 45%, oklch(0.85 0.05 80 / 0.35) 100%)",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        <figcaption className="mt-3 text-center font-hand text-xl sm:text-2xl text-ink/85">
          exhibit A: the person this book is about
        </figcaption>
      </motion.figure>

      <p className="mt-7 max-w-sm text-center font-serif-display italic text-ink-soft text-sm leading-relaxed">
        Every first edition has one plate. This is ours.
      </p>
    </div>
  );
}
