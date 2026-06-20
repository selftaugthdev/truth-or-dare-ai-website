"use client";

import { useMemo, useState } from "react";
import AppStoreBadge from "./AppStoreBadge";
import QuestionCard from "./QuestionCard";
import IntensitySlider from "./IntensitySlider";
import { getPlayPool, type GameMode } from "@/lib/questions";

const MODES: { id: GameMode; label: string }[] = [
  { id: "truth-or-dare", label: "Truth or Dare" },
  { id: "would-you-rather", label: "Would You Rather" },
  { id: "never-have-i-ever", label: "Never Have I Ever" },
];

// Soft wall: after this many questions in one sitting, pause and pitch the
// app. Dismissible, reappears every THRESHOLD questions after that.
const THRESHOLD = 18;

function pickRandomIndex(length: number, exclude: number): number {
  if (length <= 1) return 0;
  let next = Math.floor(Math.random() * length);
  while (next === exclude) {
    next = Math.floor(Math.random() * length);
  }
  return next;
}

export default function PlayWidget() {
  const [mode, setMode] = useState<GameMode>("truth-or-dare");
  const [intensity, setIntensity] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [showWall, setShowWall] = useState(false);

  const pool = useMemo(() => getPlayPool(mode, intensity), [mode, intensity]);
  const current = pool[currentIndex] ?? pool[0];

  function handleModeChange(nextMode: GameMode) {
    setMode(nextMode);
    setCurrentIndex(0);
    setShowWall(false);
  }

  function handleIntensityChange(nextIntensity: number) {
    setIntensity(nextIntensity);
    setCurrentIndex(0);
    setShowWall(false);
  }

  function handleNext() {
    const nextCount = count + 1;
    setCount(nextCount);
    if (nextCount % THRESHOLD === 0) {
      setShowWall(true);
    } else {
      setCurrentIndex(pickRandomIndex(pool.length, currentIndex));
    }
  }

  function handleKeepPlaying() {
    setShowWall(false);
    setCurrentIndex(pickRandomIndex(pool.length, currentIndex));
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-8">
      <div className="grid grid-cols-3 gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => handleModeChange(m.id)}
            className={`rounded-xl px-2 py-3 text-xs font-bold leading-tight transition-colors sm:text-sm ${
              mode === m.id ? "bg-accent text-white" : "bg-surface text-white/60 hover:text-white"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <IntensitySlider value={intensity} onChange={handleIntensityChange} className="mt-6" />

      <p className="mt-6 text-center text-xs font-bold uppercase tracking-wide text-white/30">
        Question {count + 1}
      </p>

      <div className="mt-3">
        {showWall ? (
          <div className="rounded-3xl bg-card p-8 text-center text-card-ink shadow-2xl shadow-black/40">
            <span className="text-3xl">🔥</span>
            <p className="mt-3 font-display text-xl font-bold leading-snug">
              Want unlimited AI-generated questions and multiplayer?
            </p>
            <p className="mt-2 text-sm text-card-ink/60">
              Get the app and never run out, with up to 20 players at once.
            </p>
            <div className="mt-5 flex justify-center">
              <AppStoreBadge size="md" />
            </div>
            <button
              type="button"
              onClick={handleKeepPlaying}
              className="mt-4 text-sm font-bold text-card-ink/40 underline-offset-2 hover:text-card-ink/70 hover:underline"
            >
              Keep playing free
            </button>
          </div>
        ) : (
          current && renderCard(mode, current)
        )}
      </div>

      {!showWall && (
        <button
          type="button"
          onClick={handleNext}
          className="mt-5 w-full rounded-2xl bg-accent py-4 font-display font-bold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-[1.02] active:scale-95"
        >
          Next question
        </button>
      )}
    </div>
  );
}

type PlayQuestion = ReturnType<typeof getPlayPool>[number];

function renderCard(mode: GameMode, question: PlayQuestion) {
  if (mode === "would-you-rather" && "optionA" in question) {
    return (
      <QuestionCard mode="would-you-rather" optionA={question.optionA} optionB={question.optionB} intensity={question.intensity} />
    );
  }
  if ("type" in question && question.type === "nhie") {
    return <QuestionCard mode="never-have-i-ever" text={question.text} intensity={question.intensity} />;
  }
  if ("type" in question && (question.type === "truth" || question.type === "dare")) {
    return <QuestionCard mode={question.type} text={question.text} intensity={question.intensity} />;
  }
  return null;
}
