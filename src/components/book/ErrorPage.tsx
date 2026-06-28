import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ErrorPage({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 2 + Math.random() * 3;
        if (next >= 100) {
          clearInterval(id);
          setTimeout(onDone, 900);
          return 100;
        }
        return next;
      });
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className="paper-grain min-h-screen flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full"
      >
        <div className="border border-ink/15 rounded-md bg-paper/60 backdrop-blur-sm shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-ink/10 bg-paper-deep/40">
            <span className="w-2.5 h-2.5 rounded-full bg-wax/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-gold/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-ink/30" />
            <span className="ml-3 font-mono-term text-xs text-ink-soft">
              birthday-wishes://generic
            </span>
          </div>
          <div className="p-10 space-y-6">
            <div>
              <p className="font-mono-term text-xs tracking-widest text-ink-soft">ERROR</p>
              <h1 className="font-serif-display text-7xl md:text-8xl text-ink leading-none">404</h1>
            </div>
            <p className="font-serif-body text-lg text-ink">
              <em>Generic Birthday Wishes</em> could not be found.
            </p>
            <div className="space-y-1">
              <p className="font-mono-term text-xs uppercase tracking-widest text-ink-soft">Reason</p>
              <p className="font-serif-body text-ink">Recipient requires a custom edition.</p>
            </div>

            <div className="pt-4 space-y-2">
              <p className="font-mono-term text-xs text-ink-soft">
                Loading custom version<span className="cursor-blink">_</span>
              </p>
              <div className="h-[3px] w-full bg-ink/10 overflow-hidden rounded-full">
                <div
                  className="h-full bg-ink transition-[width] duration-150 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="font-mono-term text-[10px] text-ink-soft tabular-nums">
                {Math.floor(progress)}%
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {progress > 60 && (
        <motion.div
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 60, opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="fixed left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full bg-ink pointer-events-none"
        />
      )}
    </div>
  );
}
