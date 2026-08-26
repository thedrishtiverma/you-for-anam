import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * A handwritten note in the margin — the author talking over the typeset text.
 * Floats into the outer margin on desktop, sits inline on mobile.
 */
export function MarginNote({ children, delay = 0.6 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.aside
      initial={reduced ? false : { opacity: 0, y: 8, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -1.2 }}
      transition={{ delay, duration: 0.7 }}
      className="not-prose font-hand text-[1.15rem] leading-snug text-ink-soft border-l-2 border-wax/40 pl-3 my-4 md:float-right md:clear-both md:w-40 md:ml-6 md:-mr-4 md:my-2"
    >
      {children}
    </motion.aside>
  );
}
