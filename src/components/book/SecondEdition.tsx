import { Prose, Signature, type Page } from "./Book";
import { MarginNote } from "./MarginNote";
import { SECOND_EDITION_DATE_LABEL } from "@/lib/edition";

// ---------- Second Edition ----------
// New pages, same voice. Opens on its own date; continues where the first ended.

const PublishersNote = () => (
  <Prose>
    <p>
      A second edition usually means the first one had mistakes in it. Sometimes
      it just means there was more to say.
    </p>
    <p>
      The first book ended with a question and a plan involving rain, bhutta and
      hot tea. Books end. People keep going. So the pages kept arriving, the way
      they do, in the middle of ordinary weeks.
    </p>
    <p className="font-serif-display italic text-ink-soft">
      Printed {SECOND_EDITION_DATE_LABEL}. Still one copy. Still one reader.
    </p>
    <Signature>YOU are... still the reason for the reprint.</Signature>
  </Prose>
);

const Errata = () => (
  <Prose>
    <p>
      Every book has an errata page — the small honest list of what the first
      printing got wrong. Here is mine.
    </p>
    <MarginNote>corrections, in ink this time.</MarginNote>
    <ul className="space-y-3 not-prose font-serif-body">
      <li className="border-b border-dotted border-ink/20 pb-2">
        <span className="font-mono-term text-xs text-ink-soft">p. 4 </span>
        For <em>“seven years”</em> read <em>“seven years and counting.”</em>
      </li>
      <li className="border-b border-dotted border-ink/20 pb-2">
        <span className="font-mono-term text-xs text-ink-soft">p. 9 </span>
        For <em>“we haven't met in two years”</em> read whatever is true by the
        time you get here. I hope it's a smaller number.
      </li>
      <li className="border-b border-dotted border-ink/20 pb-2">
        <span className="font-mono-term text-xs text-ink-soft">p. 17 </span>
        The word <em>“rare”</em> was underused throughout.
      </li>
      <li>
        <span className="font-mono-term text-xs text-ink-soft">everywhere </span>
        The author understated things. He does that.
      </li>
    </ul>
    <Signature>YOU are... the one correction I'd never make.</Signature>
  </Prose>
);

const TheGap = () => (
  <Prose>
    <p>
      There is a myth that friendships need maintenance the way plants do —
      water on a schedule or they die. Some do. Ours never has.
    </p>
    <p>
      What actually happens is stranger. Months go by. Then a message arrives at
      an odd hour, about nothing, and the whole thing resumes mid-sentence, as
      if the gap were a page we both skipped and neither of us needs to reread.
    </p>
    <p>
      I've come to think that's the real test. Not who talks daily. Who can
      disappear into their own life and come back without a single apology
      being necessary.
    </p>
    <p className="font-serif-display italic text-ink-soft pt-2">
      The gap was never distance.<br />It was just quiet.
    </p>
    <Signature>YOU are... the friendship that survives silence.</Signature>
  </Prose>
);

const SinceThen = () => (
  <Prose>
    <p>
      Since the first edition: a year happened. To you, to me, to everyone
      pretending to have it figured out.
    </p>
    <p>
      You got older in the way you always do — quietly competent, still
      laughing that loud real laugh, still the first to wish people before
      midnight like it's a small promise nobody made you keep.
    </p>
    <p>
      I kept building things. I kept writing them down. Occasionally I catch
      myself testing a sentence against you — would she find this honest, would
      she find this funny — which is, I think, the most useful thing a person
      can be to a writer, and the least repayable.
    </p>
    <MarginNote>you are a very inconvenient editor to keep in my head.</MarginNote>
    <p>
      So this chapter has no lesson in it. It's just an inventory. Proof that
      the story continued and you were still in it.
    </p>
    <Signature>YOU are... the part of the year worth recording.</Signature>
  </Prose>
);

const SecondAsk = () => (
  <Prose>
    <p>
      The first book asked you one question, and you answered it, and I kept the
      answer.
    </p>
    <p>
      This one asks something smaller and harder: keep letting me write these.
      One edition a year. New pages whenever something is worth printing. No
      occasion required, no reply expected, though a reply is always the best
      part.
    </p>
    <p>
      Nothing about that needs a ceremony. It just needs you to keep being the
      person the pages are about.
    </p>
    <p className="font-serif-display italic text-ink-soft pt-2">
      There will be a third edition.<br />You've already given me the material.
    </p>
    <Signature>YOU are... to be continued.</Signature>
  </Prose>
);

const SecondEnd = () => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8">
    <p className="font-serif-display italic text-ink-soft">— end of the second edition —</p>
    <p className="mt-6 font-serif-body text-ink max-w-sm leading-relaxed">
      Shelved beside the first. Same reader. Same author. More pages pending.
    </p>
    <div className="w-12 h-px bg-ink/20 my-8" />
    <p className="font-hand text-2xl text-ink">Happy reading, Anam ♡</p>
    <p className="mt-2 font-hand text-xl text-ink-soft">— Drishti</p>
  </div>
);

export const SECOND_EDITION_PAGES: Page[] = [
  { kind: "front", title: "Publisher's Note", body: <PublishersNote /> },
  { kind: "toc" },
  {
    kind: "chapter",
    part: "Part I — Additions & Corrections",
    chapter: "Chapter One",
    title: "Errata",
    body: <Errata />,
  },
  {
    kind: "chapter",
    part: "Part I",
    chapter: "Chapter Two",
    title: "The Gap Was Never Distance",
    body: <TheGap />,
  },
  {
    kind: "chapter",
    part: "Part II — New Material",
    chapter: "Chapter Three",
    title: "Since Then",
    body: <SinceThen />,
  },
  {
    kind: "chapter",
    part: "Part II",
    chapter: "Chapter Four",
    title: "The Second Ask",
    body: <SecondAsk />,
  },
  { kind: "end", body: <SecondEnd /> },
];
