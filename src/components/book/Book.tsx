import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { BugCard, BUG_CARDS } from "./BugCard";

type Page = {
  kind: "front" | "toc" | "chapter" | "interlude" | "end";
  part?: string;
  chapter?: string;
  title?: string;
  body?: ReactNode;
  epigraph?: string;
};

// ---------- Chapter prose ----------
// Literary, observational, quietly written.
// Reader spends Part I & II thinking it's an essay on friendship,
// begins to suspect by Ch. 6, and is sure by Ch. 8.

const Dedication = () => (
  <div className="h-full flex items-center justify-center text-center">
    <div className="space-y-6 max-w-sm">
      <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
        Dedication
      </p>
      <p className="font-serif-display italic text-2xl ink-text leading-relaxed">
        For the friend who reads this —<br />
        may you see yourself the way<br />the rest of us already do.
      </p>
      <p className="pt-4 font-serif-display italic text-base text-ink">
        YOU are the reader this was printed for.
      </p>
    </div>
  </div>
);

const AuthorsNote = () => (
  <Prose>
    <p>
      This began as a birthday wish. It was supposed to be three lines long, the
      sort of thing you write in the back of a card and worry about for an hour.
    </p>
    <p>
      Somewhere between the first sentence and the second, it became a different
      thing. I think because some people deserve more than a paragraph, and a
      paragraph is all that most birthdays ever get.
    </p>
    <p>
      So I wrote a small book instead. It is about friendship, mostly. It is
      about the people who stay. It is about one person in particular, although
      she does not appear by name until close to the end.
    </p>
    <p className="font-hand text-2xl text-ink-soft pt-2">— D.</p>
    <Signature>YOU are the one person in particular.</Signature>
  </Prose>
);

const Ch1 = () => (
  <Prose>
    <p>
      Friendship, if you are honest about it, is mostly a numbers problem.
    </p>
    <ul className="space-y-2 font-serif-body not-prose">
      <li className="flex justify-between gap-4 border-b border-dotted border-ink/20 pb-1">
        <span>People met</span>
        <span className="font-mono-term text-sm">≈ 1,000</span>
      </li>
      <li className="flex justify-between gap-4 border-b border-dotted border-ink/20 pb-1">
        <span>People remembered</span>
        <span className="font-mono-term text-sm">≈ 200</span>
      </li>
      <li className="flex justify-between gap-4 border-b border-dotted border-ink/20 pb-1">
        <span>People you'd stop to say hello to</span>
        <span className="font-mono-term text-sm">&lt; 50</span>
      </li>
      <li className="flex justify-between gap-4 border-b border-dotted border-ink/20 pb-1">
        <span>People genuinely missed</span>
        <span className="font-mono-term text-sm">&lt; 10</span>
      </li>
      <li className="flex justify-between gap-4 pb-1">
        <span>People who permanently changed your story</span>
        <span className="font-serif-display italic text-sm text-ink-soft">very few</span>
      </li>
    </ul>
    <p>
      Out of a thousand faces, only a handful ever reach the last line of the
      table. The rest are weather. These few are climate.
    </p>
    <Signature>YOU are one of them.</Signature>
  </Prose>
);

const Ch2 = () => (
  <Prose>
    <p>
      There is a particular kind of listening that goes unnoticed because it
      makes no sound. You can tell when someone is doing it: their face quiets,
      their phone stops mattering, they ask the small follow-up question that
      proves they were actually there.
    </p>
    <p>
      Most people listen to reply. A few listen to understand. A very small
      number listen because they genuinely want to know how your week was, and
      this is not a skill the world rewards loudly enough.
    </p>
    <p>
      The invisible things are like that. The check-in for no reason. The
      remembering of a small fear you mentioned once, in passing, two years ago.
      The wishing you a happy birthday before midnight, every single year,
      because they would rather be first than convenient.
    </p>
    <p className="font-serif-display italic text-ink-soft pt-2">
      Care is mostly made of details<br />no one was ever asked to remember.
    </p>
    <Signature>YOU are the one who listens like that.</Signature>
  </Prose>
);

const Ch3 = () => (
  <Prose>
    <p>
      Ordinary days have a weight of their own. We tend to underestimate them
      because they don't photograph well. There is no anniversary for the
      Tuesday you spent half-bored, half-laughing, complaining about people you
      both barely know.
    </p>
    <p>
      And yet, if you stack enough ordinary days end to end, you get something
      that begins to look very much like a life. The big moments are the chapter
      titles. The ordinary days are the paragraphs.
    </p>
    <p>
      The friends who matter most are usually the ones who show up for the
      paragraphs.
    </p>
    <Signature>YOU are the friend who shows up for the paragraphs.</Signature>
  </Prose>
);

const Interlude1 = () => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8">
    <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft mb-6">
      Interlude
    </p>
    <p className="font-serif-display italic text-xl text-ink leading-relaxed max-w-md">
      Pause here for a moment, if you'd like.<br />
      Think of one person who has shown up for your paragraphs.
    </p>
    <div className="w-12 h-px bg-ink/20 my-8" />
    <p className="font-serif-display italic text-base text-ink-soft">
      YOU are who someone else is thinking of, right now.
    </p>
  </div>
);

const Ch4 = () => (
  <Prose>
    <p>
      If you kept a museum of small moments — not the loud ones, but the small
      ones — what would be on display? A handful of voice notes, probably. A few
      screenshots of conversations that made you laugh on a bad day. The exact
      cadence of someone's laugh when something is genuinely funny, not the
      polite kind.
    </p>
    <p>
      Mine would have one whole wing devoted to a particular kind of laughter:
      the loud, unguarded kind. The kind you can only do around someone who has
      seen the worst of you and decided to stay anyway.
    </p>
    <p>
      Most museums are made of objects. The good ones are made of attention.
    </p>
    <Signature>YOU are the laugh in the first wing.</Signature>
  </Prose>
);

const Ch5 = () => (
  <Prose>
    <p>
      What makes a person rare is rarely the thing they would list on a résumé.
      It is almost never the loud thing. It is the way they remain steady when
      everyone else is performing. It is the lack of upkeep their friendship
      requires, and how this can be mistaken for distance, until you realise it
      is actually trust.
    </p>
    <p>
      A low-maintenance friend is not a low-effort friend. They are simply a
      friend who refuses to keep score. Who picks up the conversation in
      whatever year you happen to be in, without complaint, without performance,
      without making you apologise for being busy.
    </p>
    <p>
      That kind of person is not common. If you have one, do not make the
      mistake of thinking they will always be there because they always have
      been.
    </p>
    <p className="font-serif-display italic text-ink-soft pt-2">
      Quiet loyalty is the most underrated form of love.
    </p>
    <Signature>YOU are the quiet loyalty.</Signature>
  </Prose>
);

const Interlude2 = () => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8">
    <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft mb-6">
      Interlude
    </p>
    <p className="font-serif-display italic text-xl text-ink leading-relaxed max-w-md">
      You may, by now, be thinking of someone in particular.<br />
      That is the correct response.
    </p>
    <div className="w-12 h-px bg-ink/20 my-8" />
    <p className="font-serif-display italic text-base text-ink-soft">
      YOU are the someone in particular.
    </p>
  </div>
);

const Ch6 = () => (
  <Prose>
    <p>
      There is a small effect in physics where one quiet event, far away,
      changes the weather everywhere else. We borrow the metaphor too often, and
      usually for the wrong reasons. But the principle holds.
    </p>
    <p>
      Some people enter your life on what feels like a perfectly ordinary
      afternoon — class nine, say, in a year that no one was paying attention
      to — and seven years later you look back and realise the weather has been
      different ever since.
    </p>
    <p>
      You did not notice at the time. That is the whole point. The best people
      arrive quietly. They do not announce themselves. They simply begin showing
      up, and one day you understand that a particular version of your life
      would not exist without them.
    </p>
    <p className="font-serif-display italic text-ink-soft pt-2">
      Some friendships are not events.<br />They are climates.
    </p>
    <Signature>YOU are the climate.</Signature>
  </Prose>
);

const Ch7 = () => (
  <Prose>
    <p>
      A small exercise, before we continue.
    </p>
    <p>
      Re-read the last few chapters with one change: assume the book has been
      describing you the entire time. The patient listener. The friend who never
      complains. The one who laughs the loud, unguarded laugh. The one who
      wishes people before midnight because she would rather be first than
      convenient.
    </p>
    <p>
      Notice whether anything fits.
    </p>
    <p>
      Notice whether it has, perhaps, always fit.
    </p>
    <p className="font-hand text-xl text-ink-soft pt-2">
      (Take your time. The next page can wait.)
    </p>
    <Signature>YOU are who the book has been describing.</Signature>
  </Prose>
);

const Interlude3 = () => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8">
    <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft mb-6">
      Interlude
    </p>
    <p className="font-serif-display italic text-xl text-ink leading-relaxed max-w-md">
      If you have begun to suspect that this book is about you —<br />
      you are reading it correctly.
    </p>
    <div className="w-12 h-px bg-ink/20 mt-10" />
  </div>
);

const Ch8 = () => (
  <Prose>
    <p>
      Anam.
    </p>
    <p>
      You have been the subject of this book since the dedication. I suspect you
      have known for a few pages now. I hope the realisation was a slow, warm
      one, and not a sudden one — the kind of recognition that arrives the way
      you arrive in my life, quietly, without making any fuss.
    </p>
    <p>
      Seven years is a long time to know someone, and a short time to do
      justice to them. I will not try to summarise you here. People are not
      summaries. You are, for the record, the friend the chapters were
      describing. The low-maintenance one. The first-wisher. The loud-laugher.
      The one whose understanding has, for the better part of a decade, asked
      almost nothing of me and given more than I have ever thanked her for.
    </p>
    <p>
      So — happy birthday. Not the polite kind. The kind that means: I am glad,
      genuinely, that you exist. I am glad the world made a version of itself
      that included you in it. I am glad the climate has been different ever
      since.
    </p>
    <p className="font-serif-display italic text-ink-soft pt-2">
      Some people you wish a happy birthday to.<br />
      Others, you write a book for.
    </p>
  </Prose>
);

const End = () => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8">
    <p className="font-serif-display italic text-ink-soft">— end of Part IV —</p>
    <p className="mt-6 font-serif-body text-ink max-w-sm leading-relaxed">
      The book, however, is not quite finished.
    </p>
    <p className="mt-8 font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
      Turn the page to continue
    </p>
  </div>
);

// ---------- Page list ----------
const PAGES: Page[] = [
  { kind: "front", title: "Dedication", body: <Dedication /> },
  { kind: "front", title: "Author's Note", body: <AuthorsNote /> },
  { kind: "toc" },
  { kind: "chapter", part: "Part I — Why Some People Stay", chapter: "Chapter One", title: "The Mathematics of Friendship", body: <Ch1 /> },
  { kind: "chapter", part: "Part I", chapter: "Chapter Two", title: "The Invisible Things", body: <Ch2 /> },
  { kind: "chapter", part: "Part I", chapter: "Chapter Three", title: "The Weight of Ordinary Days", body: <Ch3 /> },
  { kind: "interlude", body: <Interlude1 /> },
  { kind: "chapter", part: "Part II — Evidence", chapter: "Chapter Four", title: "Museum of Small Moments", body: <Ch4 /> },
  { kind: "chapter", part: "Part II", chapter: "Chapter Five", title: "What Makes Someone Rare?", body: <Ch5 /> },
  { kind: "interlude", body: <Interlude2 /> },
  { kind: "chapter", part: "Part III — The Experiment", chapter: "Chapter Six", title: "The Butterfly Effect", body: <Ch6 /> },
  { kind: "chapter", part: "Part III", chapter: "Chapter Seven", title: "Reader Exercise", body: <Ch7 /> },
  { kind: "interlude", body: <Interlude3 /> },
  { kind: "chapter", part: "Part IV — The Missing Chapter", chapter: "Chapter Eight", title: "Happy Birthday.", body: <Ch8 /> },
  { kind: "end" },
];

// Bug cards appear after these page indices (sparingly, as per spec).
const BUG_AT: Record<number, number> = { 4: 0, 8: 1, 11: 2, 13: 3 };

export function Book({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [bug, setBug] = useState<number | null>(null);

  const page = PAGES[index];

  const next = () => {
    if (index >= PAGES.length - 1) {
      onFinish();
      return;
    }
    setDirection(1);
    const nextIndex = index + 1;
    setIndex(nextIndex);
    if (BUG_AT[nextIndex] !== undefined) setBug(BUG_AT[nextIndex]);
  };

  const prev = () => {
    if (index === 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  };

  useEffect(() => {
    if (bug === null) return;
    const id = setTimeout(() => setBug(null), 3600);
    return () => clearTimeout(id);
  }, [bug]);

  return (
    <div className="paper-grain min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-3xl">
        <div
          className="relative bg-paper rounded-sm book-shadow overflow-hidden"
          style={{ aspectRatio: "3 / 4", minHeight: 560 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ rotateY: direction > 0 ? 22 : -22, opacity: 0, x: direction > 0 ? 36 : -36 }}
              animate={{ rotateY: 0, opacity: 1, x: 0 }}
              exit={{ rotateY: direction > 0 ? -22 : 22, opacity: 0, x: direction > 0 ? -36 : 36 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 origin-left"
              style={{ transformStyle: "preserve-3d" }}
            >
              <PageInner page={page} pageNumber={index + 1} total={PAGES.length} />
            </motion.div>
          </AnimatePresence>

          <div
            className="absolute top-0 right-0 w-10 h-10 pointer-events-none"
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
            {index >= PAGES.length - 1 ? "Continue →" : "Next →"}
          </button>
        </div>
      </div>

      <AnimatePresence>{bug !== null && <BugCard id={bug} />}</AnimatePresence>
    </div>
  );
}

function PageInner({ page, pageNumber, total }: { page: Page; pageNumber: number; total: number }) {
  if (page.kind === "toc") {
    const chapters = PAGES.filter((p) => p.kind === "chapter");
    return (
      <div className="w-full h-full p-10 md:p-14 flex flex-col">
        <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft mb-2">
          Contents
        </p>
        <h2 className="font-serif-display text-4xl ink-text mb-8">Table of Contents</h2>
        <ul className="space-y-3.5 flex-1 overflow-hidden">
          {chapters.map((p, i) => (
            <li key={i} className="flex items-baseline gap-3">
              <span className="font-serif-display italic text-ink-soft text-xs w-24 shrink-0">
                {p.chapter}
              </span>
              <span className="flex-1 border-b border-dotted border-ink/30 translate-y-[-3px]" />
              <span className="font-serif-display text-base md:text-lg ink-text text-right">
                {p.title}
              </span>
            </li>
          ))}
        </ul>
        <Footer pageNumber={pageNumber} total={total} />
      </div>
    );
  }

  if (page.kind === "front") {
    return (
      <div className="w-full h-full p-10 md:p-14 flex flex-col">
        <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
          {page.title}
        </p>
        <div className="flex-1 mt-8">{page.body}</div>
        <Footer pageNumber={pageNumber} total={total} />
      </div>
    );
  }

  if (page.kind === "interlude") {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-1">{page.body}</div>
        <div className="p-10 md:p-14 pt-0">
          <Footer pageNumber={pageNumber} total={total} />
        </div>
      </div>
    );
  }

  if (page.kind === "end") {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-1">{End()}</div>
        <div className="p-10 md:p-14 pt-0">
          <Footer pageNumber={pageNumber} total={total} />
        </div>
      </div>
    );
  }

  // chapter
  return (
    <div className="w-full h-full p-10 md:p-14 flex flex-col">
      <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
        {page.part}
      </p>
      <p className="font-serif-display italic text-ink-soft text-sm mt-1">
        {page.chapter}
      </p>
      <h2 className="font-serif-display text-3xl md:text-4xl ink-text mt-2 mb-8">
        {page.title}
      </h2>
      <div className="flex-1 overflow-hidden">{page.body}</div>
      <Footer pageNumber={pageNumber} total={total} />
    </div>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="font-serif-body text-ink text-[1.02rem] md:text-[1.08rem] leading-[1.8] space-y-4 max-w-prose">
      {children}
    </div>
  );
}

function Signature({ children }: { children: ReactNode }) {
  return (
    <p className="pt-6 mt-2 border-t border-ink/10 font-serif-display italic text-base text-ink">
      <span className="font-mono-term not-italic tracking-[0.3em] text-[10px] uppercase text-wax mr-2">
        ⸻
      </span>
      {children}
    </p>
  );
}


function Footer({ pageNumber, total }: { pageNumber: number; total: number }) {
  return (
    <div className="mt-6 pt-3 border-t border-ink/10 flex items-center justify-between font-serif-display italic text-xs text-ink-soft">
      <span>YOU — First Edition</span>
      <span>· {pageNumber} / {total} ·</span>
    </div>
  );
}
