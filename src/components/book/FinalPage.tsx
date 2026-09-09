import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { readPencilNote } from "./PencilNote";
import {
  SECOND_EDITION_DATE_LABEL,
  daysUntilSecondEdition,
  secondEditionOpen,
} from "@/lib/edition";

const SIGN_KEY = "you-first-edition:signature";
const CLOSING_LINE = "YOU are... my favorite chapter.";

export function FinalPage({
  onReset,
  answer = "Yes",
  onSecondEdition,
}: {
  onReset: () => void;
  answer?: string;
  onSecondEdition?: () => void;
}) {
  const [stage, setStage] = useState<"letter" | "closing" | "cover">("letter");
  const [signature, setSignature] = useState("");
  const [pencil, setPencil] = useState("");
  const [copied, setCopied] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    setSecondOpen(secondEditionOpen());
    setDaysLeft(daysUntilSecondEdition());
  }, []);

  useEffect(() => {
    setPencil(readPencilNote());
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SIGN_KEY);
      if (saved) setSignature(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    try {
      if (signature) localStorage.setItem(SIGN_KEY, signature);
    } catch {
      /* storage unavailable */
    }
  }, [signature]);

  const signedOn = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (stage !== "closing") return;
    const id = setTimeout(() => setStage("cover"), 1700);
    return () => clearTimeout(id);
  }, [stage]);

  return (
    <div className="paper-grain min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <h1 className="sr-only">YOU — A First Edition: closing page</h1>
      <AnimatePresence mode="wait">
        {stage === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl w-full relative"
          >
            <motion.div
              initial={{ y: -40, rotate: -8, opacity: 0 }}
              animate={{ y: 0, rotate: -4, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="absolute -top-6 left-8 w-3 h-24 bg-wax/80 rounded-sm origin-top shadow-md"
              style={{ boxShadow: "0 4px 8px -2px oklch(0.2 0.05 25 / 0.4)" }}
            />

            <div className="paper-grain-soft border border-ink/15 rounded-sm p-6 sm:p-10 md:p-14 shadow-md">
              <p className="font-hand text-3xl text-ink leading-relaxed">Anam —</p>
              <div className="mt-6 font-hand text-[1.6rem] md:text-[1.75rem] text-ink/90 leading-[1.55] space-y-4">
                <p>Thank you.</p>
                <p>
                  For seven years of being the easiest friendship I've ever
                  had to keep. For the conversations I'll remember long after
                  I've forgotten what day they happened on. For being the first
                  girl to wish me, every single time, like it was a small
                  promise we never had to put in writing.
                </p>
                <p>
                  Thank you for not keeping score. For showing up for the
                  ordinary Tuesdays. For laughing the loud, real laugh — the
                  one that always makes me feel like I've said something better
                  than I have.
                </p>
                <p>
                  Happy birthday. Here's to the chapters you've already
                  written, and to the one we still have to write — over bhutta
                  and hot tea, the next time June and the rain agree on a date.
                </p>
                <p className="text-ink-soft">
                  And for the record, when I asked, you said “{answer}.”
                  {pencil ? (
                    <>
                      {" "}Earlier, in pencil, you wrote “{pencil}.” I kept
                      that too.
                    </>
                  ) : null}
                </p>
              </div>
              <p className="mt-10 font-hand text-2xl text-ink text-right">— Drishti</p>

              <div className="mt-10 pt-6 border-t border-ink/10">
                <p className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft">
                  Ownership Plate
                </p>
                <p className="font-serif-display italic text-ink-soft text-sm mt-1">
                  This copy belongs to
                </p>
                <label htmlFor="owner-signature" className="sr-only">
                  Sign your name
                </label>
                <input
                  id="owner-signature"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="sign here"
                  maxLength={32}
                  className="mt-2 w-full bg-transparent border-b border-ink/25 focus:border-ink/60 outline-none font-hand text-3xl text-ink placeholder:text-ink/25 pb-1"
                />
                <div className="mt-3 flex items-center justify-between font-mono-term text-[10px] tracking-[0.25em] uppercase text-ink-soft">
                  <span>No. 001 of 001</span>
                  <span>{signedOn}</span>
                </div>
              </div>

              <p className="mt-8 pt-4 border-t border-ink/10 font-serif-display italic text-base text-ink">
                <span className="font-mono-term not-italic tracking-[0.3em] text-[10px] uppercase text-wax mr-2">⸻</span>
                {CLOSING_LINE}
              </p>

              <div className="mt-8 border border-dashed border-ink/20 rounded-sm px-4 py-3 -rotate-1">
                <p className="font-mono-term text-[9px] tracking-[0.3em] uppercase text-ink-soft">
                  Returns Policy
                </p>
                <p className="font-serif-display italic text-sm text-ink mt-1">
                  This copy may not be returned.
                </p>
              </div>

              {/* The next edition — sealed until its own publication date */}
              <div className="mt-8 border border-ink/15 rounded-sm px-5 py-4 no-print">
                <p className="font-mono-term text-[9px] tracking-[0.3em] uppercase text-ink-soft">
                  Forthcoming
                </p>
                <p className="font-serif-display text-lg text-ink mt-1">
                  YOU — Second Edition
                </p>
                {secondOpen ? (
                  <>
                    <p className="font-serif-display italic text-sm text-ink-soft mt-1">
                      New pages. Published {SECOND_EDITION_DATE_LABEL}.
                    </p>
                    <button
                      onClick={onSecondEdition}
                      className="mt-3 font-mono-term text-[10px] tracking-[0.3em] uppercase text-wax hover:text-ink transition"
                    >
                      Open the Second Edition →
                    </button>
                  </>
                ) : (
                  <>
                    <p className="font-serif-display italic text-sm text-ink-soft mt-1">
                      Sealed until {SECOND_EDITION_DATE_LABEL}.
                    </p>
                    <p className="mt-2 font-mono-term text-[10px] tracking-[0.25em] uppercase text-ink-soft/70">
                      {daysLeft} {daysLeft === 1 ? "day" : "days"} to go
                    </p>
                  </>
                )}
              </div>
            </div>


            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 no-print">
              <button
                onClick={() => window.print()}
                className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition"
              >
                Save as PDF
              </button>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(CLOSING_LINE);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  } catch {
                    /* clipboard unavailable */
                  }
                }}
                className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition"
              >
                {copied ? "Copied ✓" : "Copy the closing line"}
              </button>
              <button
                onClick={() => setStage("closing")}
                className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition"
              >
                Close the book →
              </button>
            </div>
          </motion.div>
        )}

        {stage === "closing" && (
          <motion.div
            key="closing"
            initial={{ scale: 1, opacity: 1, rotateY: 0 }}
            animate={{ scale: 0.85, opacity: 1, rotateY: -90 }}
            transition={{ duration: 1.6, ease: [0.32, 0.72, 0, 1] }}
            className="w-[min(75vw,300px)] h-[min(60vh,420px)] bg-paper border border-ink/20 rounded-sm origin-left book-shadow"
            style={{ transformStyle: "preserve-3d" }}
          />
        )}

        {stage === "cover" && (
          <motion.div
            key="cover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center"
          >
            <div
              className="relative w-[min(75vw,300px)] h-[min(62vh,420px)] md:w-[340px] md:h-[480px] rounded-r-md book-shadow mx-auto"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.32 0.04 60) 0%, oklch(0.22 0.03 60) 60%, oklch(0.18 0.025 60) 100%)",
              }}
            >
              <div className="absolute inset-6 border border-gold/40 rounded-sm" />
              <div className="absolute inset-9 border border-gold/20 rounded-sm" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-10 text-center">
                <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-gold/80">
                  First Edition
                </p>
                <h2 className="font-serif-display text-7xl gold-foil leading-none">YOU</h2>
                <div className="w-16 h-px bg-gold/60" />
                <p className="font-serif-display italic text-gold/90 text-sm">Checked Out</p>
                <p className="absolute bottom-12 font-serif-display italic text-gold/85 text-sm">
                  by Anam
                </p>
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/40 rounded-l-sm" />
            </div>
            <p className="mt-8 font-serif-display italic text-ink-soft text-sm">
              Returning to the shelf…
            </p>
            <button
              onClick={onReset}
              className="mt-6 font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition"
            >
              Read Again →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
