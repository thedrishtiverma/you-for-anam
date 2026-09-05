import { useEffect, useState } from "react";
import { soundEnabled, setSoundEnabled } from "@/lib/sound";

export function SoundToggle({ className = "" }: { className?: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(soundEnabled());
  }, []);

  return (
    <button
      onClick={() => {
        const next = !on;
        setOn(next);
        setSoundEnabled(next);
      }}
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      className={`no-print font-mono-term text-[10px] tracking-[0.3em] uppercase transition ${
        on ? "text-ink" : "text-ink-soft hover:text-ink"
      } ${className}`}
    >
      {on ? "Sound on" : "Sound off"}
    </button>
  );
}
