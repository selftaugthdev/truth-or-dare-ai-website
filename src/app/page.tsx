import Link from "next/link";
import AppStoreBadge from "@/components/AppStoreBadge";
import CategoryGrid from "@/components/CategoryGrid";
import HomeDemoWidget from "@/components/HomeDemoWidget";
import { getDares, getTruths } from "@/lib/questions";

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Pick a mode",
    body: "Truth or Dare, Would You Rather, or Never Have I Ever. Switch any time.",
  },
  {
    step: "2",
    title: "Set the intensity",
    body: "Slide from chill icebreaker to full chaos. Your group decides how far it goes.",
  },
  {
    step: "3",
    title: "Pass it around",
    body: "One phone, the whole group. No cards to shuffle, no accounts to make.",
  },
];

const FEATURES = [
  {
    emoji: "✨",
    title: "AI-generated questions",
    body: "Our AI keeps writing new ones, so your group never plays the same round twice.",
  },
  {
    emoji: "🌡️",
    title: "Intensity slider, 1 to 10",
    body: "Start easy. Crank it up whenever the group's actually ready, not before.",
  },
  {
    emoji: "👥",
    title: "Multiplayer, 2 to 20 players",
    body: "Date night for two or the whole bachelorette party. The app keeps the rotation fair.",
  },
  {
    emoji: "🎮",
    title: "Five ways to play",
    body: "Truth or Dare, Would You Rather, Never Have I Ever, Dares on the Go, and Couples Mode.",
    chips: ["Truth or Dare", "Would You Rather", "Never Have I Ever", "Dares on the Go", "Couples Mode"],
  },
];

export default function Home() {
  const demoQuestions = buildDemoQuestions();

  return (
    <div>
      {/* Hero */}
      <section className="px-4 pt-14 pb-16 text-center sm:pt-20 sm:pb-24">
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
          Your group. Endless questions. <span className="text-gradient-accent">Zero awkward silence.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
          AI-generated truth or dare, would you rather, and never have I ever. Pull it up on one
          phone and pass it around, no cards, no setup.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <AppStoreBadge size="lg" />
          <Link href="/play" className="text-sm font-bold text-white/60 underline-offset-4 hover:text-white hover:underline">
            Or play free in your browser
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 sm:py-20">
        <h2 className="text-center font-display text-3xl font-extrabold text-white">How it works</h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="rounded-2xl border border-surface-border bg-surface p-6">
              <span className="font-display text-3xl font-extrabold text-accent">{item.step}</span>
              <p className="mt-3 font-display text-lg font-bold text-white">{item.title}</p>
              <p className="mt-2 text-sm text-white/60">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo widget */}
      <section className="px-4 py-16 sm:py-20">
        <h2 className="text-center font-display text-3xl font-extrabold text-white">Try it right now</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-white/60">
          No download, no sign up. Hit next and see what your group&apos;s in for.
        </p>
        <div className="mt-10">
          <HomeDemoWidget questions={demoQuestions} />
        </div>
      </section>

      {/* Feature grid */}
      <section className="px-4 py-16 sm:py-20">
        <h2 className="text-center font-display text-3xl font-extrabold text-white">Built for the whole night</h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-surface-border bg-surface p-6">
              <span className="text-3xl">{feature.emoji}</span>
              <p className="mt-3 font-display text-lg font-bold text-white">{feature.title}</p>
              <p className="mt-2 text-sm text-white/60">{feature.body}</p>
              {feature.chips && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {feature.chips.map((chip) => (
                    <span key={chip} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent-light">
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Occasion grid */}
      <section className="px-4 py-16 sm:py-20">
        <h2 className="text-center font-display text-3xl font-extrabold text-white">Pick your occasion</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-white/60">
          Same app, different energy. Jump straight to the questions that fit your night.
        </p>
        <div className="mx-auto mt-10 max-w-4xl">
          <CategoryGrid />
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 text-center sm:py-28">
        <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
          Your friends are waiting. Don&apos;t make them play 20 questions on a napkin.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          Get the app for unlimited AI questions, full multiplayer, and every mode unlocked.
        </p>
        <div className="mt-8 flex justify-center">
          <AppStoreBadge size="lg" />
        </div>
      </section>
    </div>
  );
}

function buildDemoQuestions() {
  const truth = getTruths()
    .filter((q) => q.intensity <= 6)
    .slice(0, 5)
    .map((q) => ({ type: "truth" as const, text: q.text, intensity: q.intensity }));
  const dare = getDares()
    .filter((q) => q.intensity <= 6)
    .slice(0, 5)
    .map((q) => ({ type: "dare" as const, text: q.text, intensity: q.intensity }));

  const mixed = [];
  for (let i = 0; i < 5; i++) {
    if (truth[i]) mixed.push(truth[i]);
    if (dare[i]) mixed.push(dare[i]);
  }
  return mixed;
}
