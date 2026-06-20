import rawBank from "@data/questions.json";

// See data/README.md for how this file is generated and how to extend it.

export type Audience = "friends" | "couples" | "party" | "deep" | "awkward";

export interface Question {
  id: string;
  text: string;
  intensity: number; // 1-10
  audience: Audience;
}

export interface WYRQuestion {
  id: string;
  optionA: string;
  optionB: string;
  intensity: number; // 1-10
  audience: Audience;
}

interface QuestionBank {
  truthOrDare: { truth: Question[]; dare: Question[] };
  wouldYouRather: WYRQuestion[];
  neverHaveIEver: Question[];
}

const bank = rawBank as QuestionBank;

export type GameMode = "truth-or-dare" | "would-you-rather" | "never-have-i-ever";

export function getTruths(): Question[] {
  return bank.truthOrDare.truth;
}

export function getDares(): Question[] {
  return bank.truthOrDare.dare;
}

export function getWouldYouRather(): WYRQuestion[] {
  return bank.wouldYouRather;
}

export function getNeverHaveIEver(): Question[] {
  return bank.neverHaveIEver;
}

// Truth/Dare's lowest real intensity is 2 (scaled up from the source 1-5
// scale), so a max of 1 would otherwise return nothing. Fall back to the
// lowest tier that actually exists so the slider never produces an empty pool.
function byMaxIntensity<T extends { intensity: number }>(items: T[], maxIntensity: number): T[] {
  const filtered = items.filter((item) => item.intensity <= maxIntensity);
  if (filtered.length > 0) return filtered;
  const minIntensity = Math.min(...items.map((item) => item.intensity));
  return items.filter((item) => item.intensity === minIntensity);
}

// Used by the /play widget: one mixed pool per mode, filtered live by the
// intensity slider. Truth/Dare keeps its type tag so the UI can label cards.
export function getPlayPool(mode: GameMode, maxIntensity: number) {
  switch (mode) {
    case "truth-or-dare": {
      const truth = byMaxIntensity(getTruths(), maxIntensity).map((q) => ({ ...q, type: "truth" as const }));
      const dare = byMaxIntensity(getDares(), maxIntensity).map((q) => ({ ...q, type: "dare" as const }));
      return [...truth, ...dare];
    }
    case "would-you-rather":
      return byMaxIntensity(getWouldYouRather(), maxIntensity);
    case "never-have-i-ever":
      return byMaxIntensity(getNeverHaveIEver(), maxIntensity).map((q) => ({ ...q, type: "nhie" as const }));
  }
}

function interleave<T>(a: T[], b: T[]): T[] {
  const out: T[] = [];
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) {
    if (a[i]) out.push(a[i]);
    if (b[i]) out.push(b[i]);
  }
  return out;
}

export type CategoryQuestion =
  | { kind: "truth-or-dare"; type: "truth" | "dare"; id: string; text: string; intensity: number }
  | { kind: "would-you-rather"; id: string; optionA: string; optionB: string; intensity: number }
  | { kind: "never-have-i-ever"; id: string; text: string; intensity: number };

const CATEGORY_CAP = 50;

// Maps each indexable category page to the slice of the question bank it
// shows. This is the one place that encodes "occasion -> filter" so new
// category pages only need an entry here, no component changes.
export function getCategoryQuestions(slug: string): CategoryQuestion[] {
  switch (slug) {
    case "truth-or-dare-questions": {
      const truth = getTruths();
      const dare = getDares();
      return interleave(truth, dare)
        .slice(0, CATEGORY_CAP)
        .map((q) => ({ kind: "truth-or-dare", type: inferType(q, truth), id: q.id, text: q.text, intensity: q.intensity }));
    }
    case "truth-or-dare-for-couples": {
      const truth = getTruths().filter((q) => q.audience === "couples");
      const dare = getDares().filter((q) => q.audience === "couples");
      return interleave(truth, dare)
        .slice(0, CATEGORY_CAP)
        .map((q) => ({ kind: "truth-or-dare", type: inferType(q, truth), id: q.id, text: q.text, intensity: q.intensity }));
    }
    case "bachelorette-party-games": {
      const truth = getTruths().filter((q) => q.audience === "party");
      const dare = getDares().filter((q) => q.audience === "party");
      return interleave(truth, dare)
        .slice(0, CATEGORY_CAP)
        .map((q) => ({ kind: "truth-or-dare", type: inferType(q, truth), id: q.id, text: q.text, intensity: q.intensity }));
    }
    case "truth-or-dare-for-adults": {
      const truth = getTruths().filter((q) => q.intensity >= 7);
      const dare = getDares().filter((q) => q.intensity >= 7);
      return interleave(truth, dare)
        .slice(0, CATEGORY_CAP)
        .map((q) => ({ kind: "truth-or-dare", type: inferType(q, truth), id: q.id, text: q.text, intensity: q.intensity }));
    }
    case "would-you-rather-questions": {
      return getWouldYouRather()
        .slice(0, CATEGORY_CAP)
        .map((q) => ({ kind: "would-you-rather", id: q.id, optionA: q.optionA, optionB: q.optionB, intensity: q.intensity }));
    }
    case "never-have-i-ever-questions": {
      return getNeverHaveIEver()
        .slice(0, CATEGORY_CAP)
        .map((q) => ({ kind: "never-have-i-ever", id: q.id, text: q.text, intensity: q.intensity }));
    }
    default:
      return [];
  }
}

function inferType(question: Question, truthList: Question[]): "truth" | "dare" {
  return truthList.some((t) => t.id === question.id) ? "truth" : "dare";
}
