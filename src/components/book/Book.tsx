import { motion, AnimatePresence, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { BugCard, BUG_CARDS } from "./BugCard";
import { MarginNote } from "./MarginNote";
import { StagedLines } from "./StagedLines";


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
    <div className="space-y-8 max-w-md">
      <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">
        Dedication
      </p>
      <p className="font-serif-display italic text-3xl md:text-4xl ink-text leading-tight">
        For Anam.
      </p>
      <p className="font-serif-body text-ink/85 text-base md:text-lg leading-relaxed">
        To celebrate another year of you,<br />
        and another year the people around you<br />
        got to have you in their lives.
      </p>
      <Signature>YOU are... worth writing for.</Signature>
    </div>
  </div>
);

const AuthorsNote = () => (
  <Prose>
    <p>This was supposed to be a birthday wish. A few lines. Something thoughtful. Something card-sized.</p>
    <p>Then I had a different idea.</p>
    <p>
      I'm an engineer — my instinct is to build. I'm also, quietly, a writer. The first idea was a book. The second was a website. Somewhere between the two, this became both.
    </p>
    <p className="font-serif-display italic text-ink-soft">
      A book. Disguised as a website.
    </p>
    <p>
      Not because birthdays need bigger gifts. Because some people deserve more effort than money can buy. Over the last seven years, you have very quietly become one of those people.
    </p>
    <p>
      We haven't met in over two years. Life kept us in different cities, different timetables, different kinds of busy. None of it has ever mattered. Some friendships don't ask for constant talking — they pick up exactly where they left off.
    </p>
    <p>This is my way of saying thank you. For being caring. For being steady. For staying.</p>
    <p className="font-serif-display text-ink pt-1">Happy Birthday, Anam ♡</p>
    <p className="font-hand text-2xl text-ink-soft">— Drishti</p>
    <Signature>YOU are... worth every page.</Signature>
  </Prose>
);

const Ch1 = () => (
  <Prose>
    <p>
      Friendship, if you are honest about it, is mostly a numbers problem.
    </p>
    <MarginNote>I checked this math twice.</MarginNote>

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
    <Signature>YOU are... one of the very few.</Signature>
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
    <MarginNote>you do this without knowing you do it.</MarginNote>

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
    <Signature>YOU are... made of invisible things.</Signature>
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
    <Signature>YOU are... proof that ordinary days matter.</Signature>
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
      A museum of small moments. Voice notes. Old screenshots. The exact
      cadence of someone's laugh when something is actually funny — not the
      polite version.
    </p>
    <p>
      Mine has a whole wing devoted to your laugh. The loud one. The
      unguarded one. The one that always makes me feel like I've said
      something better than I actually have.
    </p>
    <p>
      And then there are the running jokes — the small, ridiculous ones
      that survive entire years on their own.
    </p>
    <p className="font-hand text-2xl text-ink/90 pt-1">
      "Vaibhavi se abhi bhi vahi wali dosti hai? Best friends haan?"
    </p>
    <p className="font-serif-display italic text-ink-soft text-sm">
      (Some questions, in this friendship, are required by tradition.)
    </p>
    <p>
      The good museums aren't made of objects. They're made of attention —
      the kind two people pay each other over a long enough time that it
      becomes its own little archive.
    </p>
    <Signature>YOU are... the evidence.</Signature>
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
    <Signature>YOU are... wonderfully rare.</Signature>
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
    <StagedLines>
      <p>
        Class nine. 2019. An ordinary afternoon I would not have remembered
        otherwise.
      </p>
      <p>
        I was upset about something. I don't think I'd planned to say a word.
        And then, somehow, I told you everything — things from my past I had
        never said out loud to anyone, not by myself, not first.
      </p>
      <p>
        You were fifteen. You had no business being that mature. But you
        listened the way you always listen — without flinching, without rushing
        to fix it, without making it about you. And somewhere inside that
        conversation I understood that some people are safe in a way most
        people simply aren't.
      </p>
      <p>
        I think that was the day the weather quietly changed.
      </p>
      <p>
        Seven years later I can say it plainly: a particular version of my life
        would not exist without that afternoon, or without you.
      </p>
      <p className="font-serif-display italic text-ink-soft pt-2">
        Some friendships are not events.<br />They are climates.
      </p>
      <Signature>YOU are... quietly unforgettable.</Signature>
    </StagedLines>
  </Prose>
);


const Ch7 = () => (
  <Prose>
    <p>
      A short exercise, before we keep going.
    </p>
    <p>
      Re-read the last few chapters and assume, just for a moment, that the
      book has been describing one specific person the whole time. The
      patient listener. The friend who has never once kept score. The one
      who has been wishing me — every single year, somehow always first —
      since we were in school.
    </p>
    <p>
      It is honestly difficult to write about her without sounding like I
      am making her up. She is caring in a way that doesn't perform itself.
      Always cheerful. Almost annoyingly positive. The low-maintenance
      friend everyone claims to want and almost nobody actually is.
    </p>
    <MarginNote>yes. it's you. it was always you.</MarginNote>
    <p>
      My confidant. My favourite. My girl.
    </p>

    <p className="font-hand text-xl text-ink-soft pt-2">
      (Take your time. The next page can wait.)
    </p>
    <Signature>YOU are... one of my favorite people.</Signature>
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
    <div className="w-12 h-px bg-ink/20 my-8" />
    <p className="font-serif-display italic text-base text-ink-soft">
      YOU are right.
    </p>
  </div>
);

const Ch8 = () => (
  <Prose>
    <p>Anam.</p>
    <p>
      You have been the subject of this book since the dedication. I think
      you've known for a few pages now. I hope it arrived gently — the way
      you arrive in my life, without fuss, without warning, without ever
      making it a thing.
    </p>
    <p>
      I'm writing all of this because I want to actually say it. I cannot
      meet you right now, but I refuse to let another year pass without
      telling you, properly, that you are still my most favourite person
      after all this time. My confidant. My favourite. My girl.
    </p>
    <p>
      Seven years. From class nine to whatever strange chapter of life this
      is. Different cities, different timetables, two years since we've been
      in the same room — and somehow nothing about us has had to change.
      You've never once made me apologise for being busy. You've never
      complained about the gaps. You just deliver your part of this
      friendship, quietly, every time, without ever being asked.
    </p>
    <p>
      You are caring without performance. Cheerful in a way that doesn't
      ask for credit. Mature, understanding, naturally expressive — the
      friend everyone hopes they get to have. The one I'm lucky I do.
    </p>
    <p>
      So — happy birthday. Not the polite version. The kind that means:
      I am glad, genuinely, that you exist. I am glad the world made a
      version of itself with you in it. I am glad the climate has been
      different ever since.
    </p>
    <p className="font-serif-display italic text-ink-soft pt-2">
      Some people you wish a happy birthday to.<br />
      Others, you write a book for.
    </p>
    <Signature>YOU are... another year worth celebrating.</Signature>
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
    <div className="w-12 h-px bg-ink/20 my-8" />
    <p className="font-serif-display italic text-base text-ink-soft">
      YOU are why there is a Chapter Nine.
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

const STORAGE_KEY = "you-first-edition:page";

export function Book({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [bug, setBug] = useState<number | null>(null);
  const [resumeAt, setResumeAt] = useState<number | null>(null);
  const [railOpen, setRailOpen] = useState(false);

  // Resume: offer to return to the furthest page read, never jump silently.
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(saved) && saved > 0 && saved < PAGES.length) setResumeAt(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(index));
    } catch {
      /* storage unavailable */
    }
  }, [index]);

  const page = PAGES[index];

  const goTo = (target: number) => {
    if (target === index) return;
    setDirection(target > index ? 1 : -1);
    setIndex(target);
    if (BUG_AT[target] !== undefined) setBug(BUG_AT[target]);
  };

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

  // Keyboard navigation — the page footer promises arrows, so honour them.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el instanceof HTMLElement && /INPUT|TEXTAREA/.test(el.tagName)) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape") {
        setRailOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (bug === null) return;
    const id = setTimeout(() => setBug(null), 3600);
    return () => clearTimeout(id);
  }, [bug]);


  return (
    <div className="paper-grain min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <h1 className="sr-only">YOU — A First Edition: the book</h1>

      {/* Reading ribbon */}
      <div className="fixed left-0 right-0 top-0 h-[3px] bg-ink/10 z-20">
        <motion.div
          className="h-full bg-wax/70"
          animate={{ width: `${((index + 1) / PAGES.length) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>

      <div className="w-full max-w-3xl">
        {/* Chapter rail */}
        <div className="mb-3 flex items-center justify-between gap-4">
          <button
            onClick={() => setRailOpen((o) => !o)}
            aria-expanded={railOpen}
            className="font-mono-term text-[10px] tracking-[0.35em] uppercase text-ink-soft hover:text-ink transition"
          >
            {railOpen ? "Close contents" : "Contents"}
          </button>
          <span className="font-serif-display italic text-xs text-ink-soft">
            {page.chapter ?? page.title ?? "—"}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {railOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden border-y border-ink/10 divide-y divide-ink/5"
            >
              {PAGES.map((p, i) =>
                p.kind === "chapter" || p.kind === "front" ? (
                  <li key={i}>
                    <button
                      onClick={() => {
                        goTo(i);
                        setRailOpen(false);
                      }}
                      className={`w-full flex items-baseline gap-3 py-2 text-left transition hover:opacity-70 ${
                        i === index ? "text-ink" : "text-ink-soft"
                      }`}
                    >
                      <span className="font-mono-term text-[10px] uppercase tracking-[0.25em] w-24 shrink-0">
                        {p.chapter ?? "Front"}
                      </span>
                      <span className="font-serif-display text-sm flex-1">{p.title}</span>
                      <span className="font-serif-display italic text-xs">{i + 1}</span>
                    </button>
                  </li>
                ) : null,
              )}
            </motion.ul>
          )}
        </AnimatePresence>

        <motion.div
          className="relative bg-paper rounded-sm book-shadow overflow-hidden touch-pan-y [perspective:1400px]"
          style={{ aspectRatio: "3 / 4", minHeight: 560 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDrag={(_, info) => dragX.set(info.offset.x)}
          onDragEnd={(_, info) => {
            dragX.set(0);
            if (info.offset.x < -60 || info.velocity.x < -300) next();
            else if (info.offset.x > 60 || info.velocity.x > 300) prev();
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={reduced ? { opacity: 0 } : { rotateY: direction > 0 ? 22 : -22, opacity: 0, x: direction > 0 ? 36 : -36 }}
              animate={{ rotateY: 0, opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { rotateY: direction > 0 ? -22 : 22, opacity: 0, x: direction > 0 ? -36 : 36 }}
              transition={{ duration: reduced ? 0.25 : 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 origin-left"
              style={{ transformStyle: "preserve-3d", rotateY: reduced ? 0 : curl }}
            >
              <PageInner page={page} pageNumber={index + 1} total={PAGES.length} />
            </motion.div>
          </AnimatePresence>

          {/* Spine shadow — keeps the single-page spread feeling bound */}
          <div
            className="absolute left-0 top-0 bottom-0 w-6 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.2 0.02 60 / 0.14), transparent)",
            }}
          />

          {/* Curl shading follows the drag in real time */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: curlShade,
              background:
                "linear-gradient(270deg, oklch(0.2 0.02 60 / 0.45), transparent 45%)",
            }}
          />

          <div
            className="absolute top-0 right-0 w-10 h-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(225deg, oklch(0.86 0.03 80) 0% 50%, transparent 50%)",
              boxShadow: "-1px 1px 2px oklch(0.2 0.02 60 / 0.15)",
            }}
          />
        </motion.div>


        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Go to previous page"
            className="font-mono-term text-xs tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition disabled:opacity-30"
          >
            ← Previous
          </button>
          <span className="font-serif-display italic text-ink-soft text-sm">
            page {index + 1} of {PAGES.length}
            <span className="hidden md:inline ml-2 text-ink-soft/60">· swipe or use arrows</span>
          </span>
          <button
            onClick={next}
            aria-label={index >= PAGES.length - 1 ? "Continue to next section" : "Go to next page"}
            className="font-mono-term text-xs tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition"
          >
            {index >= PAGES.length - 1 ? "Continue →" : "Next →"}
          </button>
        </div>
      </div>

      {/* Bookmark — resume where she left off */}
      <AnimatePresence>
        {resumeAt !== null && index === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 border border-ink/15 bg-paper/95 backdrop-blur-sm rounded-sm px-5 py-3 book-shadow"
          >
            <span className="font-serif-display italic text-sm text-ink-soft">
              You left a bookmark on page {resumeAt + 1}.
            </span>
            <button
              onClick={() => {
                goTo(resumeAt);
                setResumeAt(null);
              }}
              className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-wax hover:text-ink transition"
            >
              Resume
            </button>
            <button
              onClick={() => setResumeAt(null)}
              aria-label="Dismiss bookmark"
              className="font-mono-term text-[10px] tracking-[0.3em] uppercase text-ink-soft/70 hover:text-ink transition"
            >
              Start over
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
        <div className="flex-1 mt-8 overflow-y-auto pr-2">{page.body}</div>
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
      <div className="flex-1 overflow-y-auto pr-2">{page.body}</div>
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
