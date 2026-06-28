import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { PaintFuture } from "./PaintFuture";
import { BugCard, BUG_CARDS } from "./BugCard";

type Page = {
  kind: "toc" | "chapter" | "paint" | "end";
  title?: string;
  part?: string;
  body?: ReactNode;
};

const PAGES: Page[] = [
  { kind: "toc" },
  {
    kind: "chapter",
    part: "Part I",
    title: "Why Some People Stay",
    body: (
      <PlaceholderProse para={3} />
    ),
  },
  {
    kind: "chapter",
    part: "Part II",
    title: "Evidence",
    body: <PlaceholderProse para={3} />,
  },
  {
    kind: "chapter",
    part: "Part III",
    title: "The Experiment",
    body: <PlaceholderProse para={3} />,
  },
  { kind: "paint" },
  {
    kind: "chapter",
    part: "Part IV",
    title: "The Missing Chapter",
    body: <PlaceholderProse para={2} />,
  },
  { kind: "end" },
];

export function Book({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [bug, setBug] = useState<number | null>(null);
  const [turns, setTurns] = useState(0);

  const page = PAGES[index];

  const next = () => {
    if (index >= PAGES.length - 1) {
      onFinish();
      return;
    }
    setDirection(1);
    setIndex((i) => i + 1);
    const t = turns + 1;
    setTurns(t);
    if (t % 2 === 0) {
      const id = BUG_CARDS[Math.floor(Math.random() * BUG_CARDS.length)].id;
      setBug(id);
    }
  };

  const prev = () => {
    if (index === 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  };

  useEffect(() => {
    if (bug === null) return;
    const id = setTimeout(() => setBug(null), 3200);
    return () => clearTimeout(id);
  }, [bug]);

  return (
    <div className="paper-grain min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-3xl">
        <div
          className="relative bg-paper rounded-sm book-shadow overflow-hidden"
          style={{ aspectRatio: "3 / 4", minHeight: 520 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ rotateY: direction > 0 ? 25 : -25, opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ rotateY: 0, opacity: 1, x: 0 }}
              exit={{ rotateY: direction > 0 ? -25 : 25, opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 origin-left"
              style={{ transformStyle: "preserve-3d" }}
            >
              <PageInner page={page} pageNumber={index + 1} total={PAGES.length} />
            </motion.div>
          </AnimatePresence>

          {/* dog-ear */}
          <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(225deg, oklch(0.86 0.03 80) 0% 50%, transparent 50%)",
              boxShadow: "-1px 1px 2px oklch(0.2 0.02 60 / 0.15)",
            }}
          />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={index === 0}
            className="font-mono-term text-xs tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition disabled:opacity-30"
          >
            ← Previous
          </button>
          <span className="font-serif-display italic text-ink-soft text-sm">
            page {index + 1} of {PAGES.length}
          </span>
          <button
            onClick={next}
            className="font-mono-term text-xs tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition"
          >
            {index >= PAGES.length - 1 ? "Close →" : "Next →"}
          </button>
        </div>
      </div>

      <AnimatePresence>{bug !== null && <BugCard id={bug} />}</AnimatePresence>
    </div>
  );
}

function PageInner({ page, pageNumber, total }: { page: Page; pageNumber: number; total: number }) {
  if (page.kind === "toc") {
    return (
      <div className="w-full h-full p-10 md:p-16 flex flex-col">
        <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft mb-2">
          Contents
        </p>
        <h2 className="font-serif-display text-4xl ink-text mb-10">Table of Contents</h2>
        <ul className="space-y-6 flex-1">
          {PAGES.filter((p) => p.kind === "chapter").map((p, i) => (
            <li key={i} className="flex items-baseline gap-3">
              <span className="font-serif-display italic text-ink-soft text-sm w-20 shrink-0">
                {p.part}
              </span>
              <span className="flex-1 border-b border-dotted border-ink/30 translate-y-[-3px]" />
              <span className="font-serif-display text-xl ink-text">{p.title}</span>
            </li>
          ))}
        </ul>
        <Footer pageNumber={pageNumber} total={total} />
      </div>
    );
  }

  if (page.kind === "paint") return <PaintFuture pageNumber={pageNumber} total={total} />;

  if (page.kind === "end") {
    return (
      <div className="w-full h-full p-10 md:p-16 flex flex-col items-center justify-center text-center">
        <p className="font-serif-display italic text-ink-soft">— end of part four —</p>
        <p className="mt-8 font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
          turn the page to continue
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-10 md:p-16 flex flex-col">
      <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
        {page.part}
      </p>
      <h2 className="font-serif-display text-4xl md:text-5xl ink-text mt-2 mb-10">
        {page.title}
      </h2>
      <div className="flex-1 font-serif-body text-ink text-lg leading-[1.9] space-y-5 max-w-prose">
        {page.body}
      </div>
      <Footer pageNumber={pageNumber} total={total} />
    </div>
  );
}

function Footer({ pageNumber, total }: { pageNumber: number; total: number }) {
  return (
    <div className="mt-8 flex items-center justify-between font-serif-display italic text-xs text-ink-soft">
      <span>YOU — First Edition</span>
      <span>· {pageNumber} ·</span>
    </div>
  );
}

function PlaceholderProse({ para }: { para: number }) {
  const text = [
    "[ Placeholder. The author will set this passage by hand. Sit with the silence in the margin — it is part of the book. ]",
    "[ Another paragraph waits here, slow and unhurried. The page is patient. ]",
    "[ A third, kept in pencil, faint enough to be read twice. ]",
  ];
  return (
    <>
      {Array.from({ length: para }).map((_, i) => (
        <p key={i}>{text[i % text.length]}</p>
      ))}
      <p className="font-hand text-ink-soft text-xl pt-2">— a margin note will live here</p>
    </>
  );
}
