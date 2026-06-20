// Central place for cross-page constants. Update APP_STORE_URL once the app
// is live, nothing else needs to change.

export const SITE_URL = "https://truthordareai.app";
export const SITE_NAME = "Truth or Dare AI";

export const APP_STORE_URL = "https://apps.apple.com/us/app/truth-or-dare-ai-party-game/id6749600026";

export type CategoryMeta = {
  slug: string;
  title: string;
  occasionLabel: string;
  emoji: string;
  hook: string;
};

// One entry per indexable category page. occasionLabel is what shows in the
// home page occasion grid; title is the page's own heading/H1 text.
export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "truth-or-dare-questions",
    title: "Truth or Dare Questions",
    occasionLabel: "Icebreakers",
    emoji: "👋",
    hook: "Break the ice without the awkward silence.",
  },
  {
    slug: "truth-or-dare-for-couples",
    title: "Truth or Dare for Couples",
    occasionLabel: "Couples & Date Night",
    emoji: "💕",
    hook: "Get closer, laugh harder, learn something new.",
  },
  {
    slug: "bachelorette-party-games",
    title: "Bachelorette Party Games",
    occasionLabel: "Bachelorette",
    emoji: "💍",
    hook: "The bride's last night of chaos, done right.",
  },
  {
    slug: "truth-or-dare-for-adults",
    title: "Truth or Dare for Adults",
    occasionLabel: "Spicy & Adults Only",
    emoji: "🌶️",
    hook: "Turn the heat up when the group's ready.",
  },
  {
    slug: "would-you-rather-questions",
    title: "Would You Rather Questions",
    occasionLabel: "Party Starters",
    emoji: "🎉",
    hook: "Impossible choices, instant arguments.",
  },
  {
    slug: "never-have-i-ever-questions",
    title: "Never Have I Ever Questions",
    occasionLabel: "Girls Night",
    emoji: "💅",
    hook: "Fingers down, secrets out.",
  },
];

export function getCategory(slug: string): CategoryMeta {
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) throw new Error(`Unknown category slug: ${slug}`);
  return category;
}
