import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Intro } from "@/components/book/Intro";
import { ErrorPage } from "@/components/book/ErrorPage";
import { PrintingPress } from "@/components/book/PrintingPress";
import { Book } from "@/components/book/Book";
import { Terminal } from "@/components/book/Terminal";
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
    ],
  }),
  component: Index,
});

type Stage =
  | "intro"
  | "error"
  | "press"
  | "book"
  | "terminal"
  | "chapter9"
  | "final";

function Index() {
  const [stage, setStage] = useState<Stage>("intro");

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
          {stage === "intro" && <Intro onOpen={() => setStage("error")} />}
          {stage === "error" && <ErrorPage onDone={() => setStage("press")} />}
          {stage === "press" && <PrintingPress onOpenBook={() => setStage("book")} />}
          {stage === "book" && <Book onFinish={() => setStage("terminal")} />}
          {stage === "terminal" && <Terminal onContinue={() => setStage("chapter9")} />}
          {stage === "chapter9" && <ChapterNine onDone={() => setStage("final")} />}
          {stage === "final" && <FinalPage onReset={() => setStage("intro")} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
