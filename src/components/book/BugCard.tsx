import { motion } from "framer-motion";

export const BUG_CARDS = [
  { id: 0, tag: "Known Issue", body: "Still impossible to stop thinking about you." },
  { id: 1, tag: "Compiler Warning", body: "Excessive admiration detected." },
  { id: 2, tag: "Memory Cache", body: "Still replaying that conversation." },
  { id: 3, tag: "Patch 2.4", body: "Her smile continues to fix bad days." },
];

export function BugCard({ id }: { id: number }) {
  const bug = BUG_CARDS[id] ?? BUG_CARDS[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-10 right-10 z-40 max-w-[260px] paper-grain-soft border border-ink/15 px-4 py-3 rounded-sm shadow-md"
      style={{ boxShadow: "0 10px 20px -10px oklch(0.2 0.02 60 / 0.35)" }}
    >
      <p className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-wax">
        {bug.tag}
      </p>
      <p className="font-serif-body text-sm text-ink mt-1 leading-snug">{bug.body}</p>
    </motion.div>
  );
}
