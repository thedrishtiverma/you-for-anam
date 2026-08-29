import { useEffect, useState } from "react";

export const PENCIL_KEY = "you-first-edition:pencil";

export function readPencilNote(): string {
  try {
    return localStorage.getItem(PENCIL_KEY) ?? "";
  } catch {
    return "";
  }
}

/**
 * A single place in the book where the reader leaves a mark.
 * Written in pencil, kept locally, quoted back in the final letter.
 */
export function PencilNote() {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(readPencilNote());
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PENCIL_KEY, value);
    } catch {
      /* storage unavailable */
    }
  }, [value]);

  return (
    <div className="mt-6 border-l-2 border-ink/15 pl-4">
      <label
        htmlFor="pencil-note"
        className="font-mono-term text-[9px] tracking-[0.3em] uppercase text-ink-soft"
      >
        Your answer, in pencil
      </label>
      <input
        id="pencil-note"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={80}
        placeholder="who did you think it was?"
        className="mt-1 w-full bg-transparent border-b border-dashed border-ink/25 focus:border-ink/50 outline-none font-hand text-2xl text-ink/80 placeholder:text-ink/25 pb-1"
      />
      <p className="mt-1 font-mono-term text-[9px] tracking-[0.25em] uppercase text-ink-soft/70">
        Stays in this copy only
      </p>
    </div>
  );
}
