import { motion } from "framer-motion";

// Printer's notes — quiet, warm, in the language of a small press.
// Friendship-toned. Never romantic.
export const BUG_CARDS = [
  { id: 0, tag: "Printer's Note", body: "The author smiled while typesetting this page." },
  { id: 1, tag: "Editorial Revision", body: "Originally: \"favourite people.\" Current version: \"favourite person.\"" },
  { id: 2, tag: "Printing Delay", body: "The ink needed a moment to admire the subject." },
  { id: 3, tag: "Known Issue", body: "Difficult to write about her without overusing the word kind." },
  { id: 4, tag: "Margin Note", body: "Seven years and counting. Still her first wish, every June." },
];

export function BugCard({ id }: { id: number }) {
  const bug = BUG_CARDS[id] ?? BUG_CARDS[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-10 right-10 z-40 max-w-[280px] paper-grain-soft border border-ink/15 px-4 py-3 rounded-sm shadow-md"
      style={{ boxShadow: "0 10px 20px -10px oklch(0.2 0.02 60 / 0.35)" }}
    >
      <p className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-wax">
        {bug.tag}
      </p>
      <p className="font-serif-body text-sm text-ink mt-1 leading-snug">{bug.body}</p>
    </motion.div>
  );
}
