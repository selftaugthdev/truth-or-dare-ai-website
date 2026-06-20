"use client";

import { useState } from "react";
import Link from "next/link";
import QuestionCard from "./QuestionCard";

type DemoQuestion = { type: "truth" | "dare"; text: string; intensity: number };

export default function HomeDemoWidget({ questions }: { questions: DemoQuestion[] }) {
  const [index, setIndex] = useState(0);
  const current = questions[index];

  return (
    <div className="mx-auto w-full max-w-sm">
      <QuestionCard mode={current.type} text={current.text} intensity={current.intensity} />

      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % questions.length)}
        className="mt-5 w-full rounded-2xl bg-accent py-4 font-display font-bold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-[1.02] active:scale-95"
      >
        Next question
      </button>

      <p className="mt-4 text-center text-sm text-white/50">
        That&apos;s the free preview.{" "}
        <Link href="/play" className="font-bold text-accent-light underline-offset-2 hover:underline">
          Keep playing free
        </Link>{" "}
        or get unlimited AI questions in the app.
      </p>
    </div>
  );
}
