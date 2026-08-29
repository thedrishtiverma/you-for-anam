# Second Audit — Ideas and Alterations

A pass over the current experience (intro → 404 → press → 17-page book → Chapter Nine → letter), listing what's weak now and what would raise it further. Ordered best-first.

## What's working
Linear flow, reading ribbon, contents rail, keyboard + swipe with live page curl, printer's notes, two artifact pages, wax bookmark, signable ownership plate, print stylesheet.

## Gaps found in this audit

1. **Contents rail hides half the book.** The rail only lists `chapter` and `front` pages — the interludes and both artifact pages are unreachable from it, and their numbering looks skipped.
2. **Bookmark ribbon can never appear.** It renders only when the book is on page 1, but a returning reader lands on the intro stage first and usually clicks straight through; there is no resume offer where she actually arrives.
3. **Fixed page box on small screens.** The page is a 3/4 box with `minHeight: 560`, so on a short phone the text area scrolls inside a rigid frame instead of the frame fitting the screen.
4. **No sense of remaining length.** A 3px ribbon is the only progress cue; there's no "4 minutes left" or part marker, so she can't tell whether to keep going.
5. **Chapter Nine is the only interactive beat.** Everything before it is read-only; there's no moment where she leaves a mark mid-book.
6. **Ending stops at the letter.** After "Read Again" there's no way to keep or share the copy beyond the browser print dialog.

## Recommended alterations (priority order)

**1. Full contents rail with parts and artifacts**
List every page grouped under Part I–IV, with interludes and artifacts shown as small italic entries ("Artifacts", "Interlude"). Mark the furthest page reached with a faint wax dot.

**2. Resume offer on the intro, not inside the book**
Move the wax bookmark to the intro screen: "You stopped at page 9 — Return / Start again." Keep the in-book ribbon as a fallback.

**3. Responsive page frame**
Replace the fixed aspect box with a height that tracks the viewport (`min(78vh, …)`) so the page always fits, and keep internal scroll only for the longest chapters.

**4. Reading-time and part markers**
Add "≈ 6 min left" beside the page counter, and a one-second part title card ("Part III — The Experiment") when a new part begins.

**5. One mid-book interaction: the margin she writes in**
On the Reader Exercise chapter, give her a single handwritten input in the margin ("your answer, in pencil") persisted to localStorage and quoted back in the final letter next to her Chapter Nine answer.

**6. Keepsake exit**
On the final page, add "Save as PDF" (existing print path, relabelled) plus a small "Copy the closing line" button, and a soft loop back to the cover instead of an abrupt reset.

**7. Quiet texture upgrades**
- Rain-spotted overlay on the June/monsoon chapter only.
- The chai ring artifact reappears faintly in the margin on a second read.
- A "Returns policy" slip on the final page: "This copy may not be returned."

## Technical notes
All changes are frontend-only inside `src/components/book/*`: `Book.tsx` (rail, page frame, part cards, reading time, resume wiring), `Intro.tsx` (resume ribbon), `Artifacts.tsx` (returns slip, re-read ring), `FinalPage.tsx` (keepsake exit, margin-answer echo). New state persists in the existing `you-first-edition:*` localStorage keys. No backend.

## Suggested build order
Items 1–3 first (navigation and fit), then 4–5 (pacing and the mid-book mark), then 6–7 (ending and texture).
