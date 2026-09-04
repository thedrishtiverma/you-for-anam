import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type Stage = "appendix" | "agreement" | "ask" | "done";

export function ChapterNine({
  onDone,
}: {
  onDone: (answer: string) => void;
}) {
  const [stage, setStage] = useState<Stage>("appendix");
  const [checked, setChecked] = useState(false);
  const [answer, setAnswer] = useState("Yes");

  const accept = (chosen: string) => {
    setAnswer(chosen);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#C9A24C", "#E8C07A", "#F7F3EC", "#A05A2C"],
      scalar: 0.85,
      ticks: 200,
    });
    setStage("done");
    setTimeout(() => onDone(chosen), 3400);
  };

  return (
    <div className="paper-grain min-h-screen flex items-center justify-center px-4 py-12">
      <h1 className="sr-only">Chapter Nine — The Unwritten Story</h1>
      <div className="w-full max-w-3xl">
        <div
          className="relative bg-paper rounded-sm book-shadow overflow-hidden"
          style={{ height: "min(80vh, 760px)", minHeight: 420 }}
        >
          <AnimatePresence mode="wait">
            {stage === "appendix" && (
              <PageFrame key="appendix">
                <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
                  Appendix
                </p>
                <p className="font-serif-display italic text-ink-soft text-sm mt-1">
                  Chapter Nine
                </p>
                <h2 className="font-serif-display text-4xl md:text-5xl ink-text mt-2 mb-10">
                  Status: Unwritten.
                </h2>
                <div className="font-serif-body text-ink text-[1.05rem] leading-[1.8] space-y-4 max-w-prose">
                  <p>
                    Every book leaves room for one more chapter. The good ones
                    leave room for several.
                  </p>
                  <p>
                    This particular chapter has been left blank on purpose. It
                    cannot be written alone. It needs a co-author — preferably
                    one who already knows the rest of the story.
                  </p>
                  <p className="font-serif-display italic text-ink-soft pt-2">
                    Looking for: co-author.
                  </p>
                </div>
                <div className="mt-10">
                  <BookButton onClick={() => setStage("agreement")}>
                    Continue Writing
                  </BookButton>
                </div>
              </PageFrame>
            )}

            {stage === "agreement" && (
              <PageFrame key="agreement">
                <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
                  Appendix · Chapter Nine
                </p>
                <h2 className="font-serif-display text-3xl md:text-4xl ink-text mt-2 mb-8">
                  Co-Author Agreement
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-serif-body text-ink">
                  <div>
                    <p className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft mb-3">
                      Benefits
                    </p>
                    <ul className="space-y-2 text-[0.98rem]">
                      <li>✓ Hot tea, in a paper cup, in the rain.</li>
                      <li>✓ Bhutta. The proper kind, with chilli and lemon.</li>
                      <li>✓ Seven years of conversation, picked up mid-sentence.</li>
                      <li>✓ The loud, unguarded laugh.</li>
                      <li>✓ Terrible jokes, mostly mine.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft mb-3">
                      Requirements
                    </p>
                    <ul className="space-y-2 text-[0.98rem]">
                      <li>✓ Bring yourself.</li>
                      <li>✓ Wear something rain-proof, ideally.</li>
                      <li>✓ That's it.</li>
                    </ul>
                  </div>
                </div>

                <label
                  htmlFor="coauthor-agreement"
                  className="mt-10 flex items-start gap-3 cursor-pointer select-none"
                >
                  <input
                    id="coauthor-agreement"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    aria-label="Accept the co-author agreement"
                    className="mt-1 w-4 h-4 accent-ink"
                  />
                  <span className="font-serif-display italic text-ink-soft text-sm">
                    I have, in keeping with tradition, read absolutely none of
                    this.
                  </span>
                </label>

                <div className="mt-8">
                  <BookButton onClick={() => setStage("ask")} disabled={!checked}>
                    Continue →
                  </BookButton>
                </div>
              </PageFrame>
            )}

            {stage === "ask" && (
              <PageFrame key="ask" centered>
                <div className="text-center max-w-md mx-auto space-y-8">
                  <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
                    One last question
                  </p>
                  <p className="font-serif-display text-2xl md:text-3xl ink-text leading-relaxed">
                    Would you help me write Chapter Nine —
                    <br />
                    <span className="italic">over bhutta and hot tea, the next time the rain agrees?</span>
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <BookButton onClick={() => accept("Yes")}>❤  Yes</BookButton>
                    <BookButton onClick={() => accept("Definitely Yes")} variant="solid">
                      ❤  Definitely Yes
                    </BookButton>
                  </div>
                  <p className="font-serif-display italic text-ink-soft text-xs pt-6">
                    (There is no other option. That is, after all, what tradition is for.)
                  </p>
                </div>
              </PageFrame>
            )}

            {stage === "done" && (
              <PageFrame key="done" centered>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-md mx-auto space-y-4"
                >
                  <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
                    Chapter Nine
                  </p>
                  <p className="font-serif-display italic text-2xl ink-text">
                    Co-author found.
                  </p>
                  <p className="font-serif-body text-ink-soft">
                    The rest of this chapter will be written in person.
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="font-hand text-2xl text-ink pt-4"
                  >
                    She said “{answer}.”
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.9, duration: 0.8 }}
                    className="font-serif-display italic text-ink-soft text-sm"
                  >
                    Noted, in ink, on the record.
                  </motion.p>
                </motion.div>
              </PageFrame>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PageFrame({
  children,
  centered = false,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30, rotateY: 12 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: -30, rotateY: -12 }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      className={`absolute inset-0 overflow-y-auto p-6 sm:p-10 md:p-14 flex flex-col ${
        centered ? "items-center justify-center" : ""
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

function BookButton({
  children,
  onClick,
  disabled,
  variant = "outline",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "outline" | "solid";
}) {
  const base =
    "font-mono-term text-[11px] tracking-[0.3em] uppercase px-5 py-2.5 rounded-sm transition disabled:opacity-30 disabled:cursor-not-allowed";
  const styles =
    variant === "solid"
      ? "bg-ink text-paper hover:bg-ink/85"
      : "border border-ink/40 text-ink hover:bg-ink/5";
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
