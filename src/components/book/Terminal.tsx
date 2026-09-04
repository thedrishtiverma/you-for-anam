import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const METRICS = [
  { label: "Friendship", value: 100 },
  { label: "Trust", value: 100 },
  { label: "Inside Jokes", value: 100 },
  { label: "Mutual Bullying", value: 100 },
  { label: "Compatibility", value: 100 },
];

export function Terminal({ onContinue }: { onContinue: () => void }) {
  const [stage, setStage] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const timeline: { delay: number; line: string }[] = [
      { delay: 400, line: "> relationship.exe" },
      { delay: 700, line: "Loading..." },
    ];
    let cancelled = false;
    let acc = 0;
    timeline.forEach((t) => {
      acc += t.delay;
      setTimeout(() => !cancelled && setLines((l) => [...l, t.line]), acc);
    });
    setTimeout(() => !cancelled && setStage(1), acc + 600);
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-amber font-mono-term px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="border border-terminal-amber/30 rounded-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-terminal-amber/20 flex items-center gap-2 text-xs">
            <span>●</span><span>●</span><span>●</span>
            <span className="ml-3 opacity-70">tty/anam</span>
          </div>
          <div className="p-6 md:p-8 text-sm md:text-base space-y-2 leading-relaxed min-h-[60vh] sm:min-h-[420px]">
            {lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}

            {stage >= 1 && (
              <div className="pt-3 space-y-2">
                {METRICS.map((m, i) => (
                  <MetricBar key={m.label} {...m} delay={i * 600} onDone={i === METRICS.length - 1 ? () => setStage(2) : undefined} />
                ))}
              </div>
            )}

            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6 space-y-3"
                >
                  <p className="opacity-80">&gt; Unexpected Result Detected...</p>
                  <p className="text-terminal-amber text-lg md:text-xl">
                    &quot;You somehow became my favorite person.&quot;
                  </p>
                  <button
                    onClick={onContinue}
                    className="mt-4 inline-flex border border-terminal-amber/60 px-4 py-1.5 hover:bg-terminal-amber/10 transition"
                  >
                    [ Continue ]
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <span className="cursor-blink">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value, delay, onDone }: { label: string; value: number; delay: number; onDone?: () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const start = setTimeout(() => {
      let v = 0;
      const id = setInterval(() => {
        v += 8;
        if (v >= value) {
          v = value;
          clearInterval(id);
          onDone?.();
        }
        setP(v);
      }, 40);
    }, delay);
    return () => clearTimeout(start);
  }, [delay, value, onDone]);

  const blocks = Math.floor(p / 10);
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 sm:w-40 inline-block shrink-0">{label}</span>
      <span className="tracking-[0.15em] text-xs sm:text-base">{"█".repeat(blocks)}{"░".repeat(10 - blocks)}</span>
    </div>
  );
}
