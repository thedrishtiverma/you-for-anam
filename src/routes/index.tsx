import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Intro } from "@/components/book/Intro";
import { ErrorPage } from "@/components/book/ErrorPage";
import { PrintingPress } from "@/components/book/PrintingPress";
import { Book } from "@/components/book/Book";
import { ChapterNine } from "@/components/book/ChapterNine";
import { FinalPage } from "@/components/book/FinalPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YOU — A First Edition, for Anam" },
      {
        name: "description",
        content: "A first edition, printed once, for exactly one reader.",
      },
      { property: "og:title", content: "YOU — A First Edition" },
      {
        property: "og:description",
        content: "A first edition, printed once, for exactly one reader.",
      },
      { property: "og:url", content: "https://you-for-anam.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://you-for-anam.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          datePublished: "2026-06-28",
          name: "YOU — A First Edition, for Anam",
          author: { "@type": "Person", name: "Drishti" },
          description: "A first edition, printed once, for exactly one reader.",
          url: "https://you-for-anam.lovable.app/",
          inLanguage: "en",
        }),
      },
    ],
  }),
  component: Index,
});

type Stage = "intro" | "error" | "press" | "book" | "chapter9" | "final";

function Index() {
  const [stage, setStage] = useState<Stage>("intro");
  const [answer, setAnswer] = useState("Yes");
  const [startPage, setStartPage] = useState(0);

  return (
    <main className="min-h-screen bg-paper text-ink overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {stage === "intro" && (
            <Intro
              onOpen={() => {
                setStartPage(0);
                setStage("error");
              }}
              onResume={(p) => {
                setStartPage(p);
                setStage("book");
              }}
            />
          )}
          {stage === "error" && <ErrorPage onDone={() => setStage("press")} />}
          {stage === "press" && <PrintingPress onOpenBook={() => setStage("book")} />}
          {stage === "book" && (
            <Book initialPage={startPage} onFinish={() => setStage("chapter9")} />
          )}
          {stage === "chapter9" && (
            <ChapterNine
              onDone={(a) => {
                setAnswer(a);
                setStage("final");
              }}
            />
          )}
          {stage === "final" && (
            <FinalPage answer={answer} onReset={() => setStage("intro")} />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
