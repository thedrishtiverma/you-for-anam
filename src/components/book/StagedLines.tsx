import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";

/**
 * Reveals its children one at a time, so a page lands like a spoken confession
 * rather than a wall of text. Respects prefers-reduced-motion.
 */
export function StagedLines({ children, step = 0.9 }: { children: ReactNode; step?: number }) {
  const reduced = useReducedMotion();
  return (
    <>
      {Children.toArray(children).map((child, i) => (
        <motion.div
          key={i}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.25 + i * step, duration: 0.9, ease: "easeOut" }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}
