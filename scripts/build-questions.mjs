// Builds data/questions.json from data/source/*.json (the real content pipeline
// export) plus hand-written Would You Rather / Never Have I Ever sets (the
// content pipeline doesn't produce those modes yet).
//
// Run with: node scripts/build-questions.mjs
//
// Output schema (see data/README.md for the long version):
// {
//   truthOrDare: { truth: Question[], dare: Question[] },
//   wouldYouRather: WYRQuestion[],
//   neverHaveIEver: Question[]
// }
//
// Question   = { id, text, intensity (1-10), audience }
// WYRQuestion = { id, optionA, optionB, intensity (1-10), audience }
//
// audience is one of: friends | couples | party | deep | awkward
// (matches the tagging vocabulary already used by the content pipeline)

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Source data uses a 1-5 intensity scale. The site's slider is 1-10, so we
// stretch every source value onto the wider scale (x2). This keeps the real
// content's relative ordering intact even though it only lands on even steps.
const SOURCE_INTENSITY_SCALE = 2;

function loadSource(filename, type) {
  const raw = readFileSync(join(root, "data/source", filename), "utf-8");
  const items = JSON.parse(raw);
  return items.map((item) => ({
    id: `${type}-${item.id}`,
    text: item.question,
    intensity: item.intensity * SOURCE_INTENSITY_SCALE,
    audience: item.audience,
  }));
}

const truth = loadSource("truth_questions.json", "truth");
const dare = loadSource("dare_questions.json", "dare");

// --- Would You Rather (placeholder, written to match brand tone) ---
const wouldYouRather = [
  { optionA: "Have your texts read out loud to the group", optionB: "Have your camera roll scrolled through for a full minute", intensity: 6, audience: "friends" },
  { optionA: "Always be 20 minutes late", optionB: "Always be an hour early", intensity: 1, audience: "friends" },
  { optionA: "Find out what your friends really think of you", optionB: "Never know but always wonder", intensity: 7, audience: "friends" },
  { optionA: "Be the funniest person in the group", optionB: "Be the most trusted person in the group", intensity: 2, audience: "friends" },
  { optionA: "Lose your phone for a week", optionB: "Lose your wallet for a week", intensity: 3, audience: "friends" },
  { optionA: "Get exposed for a lie in front of everyone here", optionB: "Have to admit your biggest insecurity right now", intensity: 8, audience: "deep" },
  { optionA: "Date your partner's best friend's type", optionB: "Date someone your friends all hate", intensity: 5, audience: "couples" },
  { optionA: "Know exactly when your relationship will end", optionB: "Know exactly how it ends", intensity: 9, audience: "couples" },
  { optionA: "Have your partner read your old messages to an ex", optionB: "Read your partner's", intensity: 8, audience: "couples" },
  { optionA: "Plan every date for the next year", optionB: "Let your partner plan all of them", intensity: 2, audience: "couples" },
  { optionA: "Forget every fight you've ever had", optionB: "Remember every single one in full detail", intensity: 4, audience: "couples" },
  { optionA: "Give a toast with zero prep", optionB: "Be the one everyone toasts about", intensity: 3, audience: "party" },
  { optionA: "Be the designated photographer all night", optionB: "Be in every single photo whether you like it or not", intensity: 2, audience: "party" },
  { optionA: "Have the whole group know your search history from tonight", optionB: "Have one person know your search history from this year", intensity: 7, audience: "party" },
  { optionA: "Be banned from one bar forever", optionB: "Be banned from one friend's house forever", intensity: 4, audience: "party" },
  { optionA: "Get free drinks all night but have to wear a sash", optionB: "Pay for everything but skip the sash", intensity: 1, audience: "party" },
  { optionA: "Have everyone here read your diary from age 15", optionB: "Have everyone here read your texts from last week", intensity: 9, audience: "deep" },
  { optionA: "Know what people say about you when you leave the room", optionB: "Know what they say about you online", intensity: 6, audience: "deep" },
  { optionA: "Give up your phone for a month", optionB: "Give up your closest friend group for a month", intensity: 8, audience: "deep" },
  { optionA: "Always have to say what you're thinking", optionB: "Never be able to say what you're thinking", intensity: 5, audience: "deep" },
  { optionA: "Accidentally call your boss 'babe'", optionB: "Accidentally call your partner by your boss's name", intensity: 3, audience: "awkward" },
  { optionA: "Trip in front of your crush", optionB: "Get caught talking about your crush", intensity: 2, audience: "awkward" },
  { optionA: "Have your mic stay on during a private conversation", optionB: "Send a text to the wrong group chat", intensity: 4, audience: "awkward" },
  { optionA: "Wave back at someone who wasn't waving at you", optionB: "Not wave back at someone who was", intensity: 1, audience: "awkward" },
  { optionA: "Get caught singing alone in the car", optionB: "Get caught talking to yourself in the mirror", intensity: 2, audience: "awkward" },
  { optionA: "Have one friend roast you for ten minutes straight", optionB: "Roast one friend for ten minutes straight in front of everyone", intensity: 5, audience: "friends" },
  { optionA: "Find out your nickname behind your back", optionB: "Keep wondering forever", intensity: 4, audience: "friends" },
  { optionA: "Have this group plan your birthday", optionB: "Plan all of theirs", intensity: 1, audience: "friends" },
  { optionA: "Tell your friend group a secret you've never told anyone", optionB: "Keep carrying it alone", intensity: 7, audience: "friends" },
  { optionA: "Be the friend who always picks the restaurant", optionB: "Be the friend who always picks the playlist", intensity: 1, audience: "friends" },
  { optionA: "Have your partner pick your outfit for a month", optionB: "Pick theirs for a month", intensity: 2, audience: "couples" },
  { optionA: "Find out your partner's exact rating of you out of 10", optionB: "Never ask and never know", intensity: 6, audience: "couples" },
  { optionA: "Have one big blowout fight and move on", optionB: "Have small tension that never fully goes away", intensity: 5, audience: "couples" },
  { optionA: "Share a phone with your partner for a week", optionB: "Share a bank account for a week", intensity: 3, audience: "couples" },
  { optionA: "Get caught checking your ex's profile", optionB: "Get caught by your ex checking yours", intensity: 6, audience: "couples" },
  { optionA: "Host every party from now on", optionB: "Never have to host but never pick the plan either", intensity: 1, audience: "party" },
  { optionA: "Be everyone's designated driver tonight", optionB: "Be everyone's photographer tonight", intensity: 1, audience: "party" },
  { optionA: "Lose the group chat for a year", optionB: "Be added to every group chat forever, including the chaotic ones", intensity: 2, audience: "party" },
  { optionA: "Have to dance every single song tonight", optionB: "Not be allowed to dance at all", intensity: 2, audience: "party" },
  { optionA: "Find out who in this group has talked behind your back", optionB: "Never find out and stay blissfully unaware", intensity: 8, audience: "deep" },
  { optionA: "Relive your most embarrassing year", optionB: "Forget your best year completely", intensity: 6, audience: "deep" },
  { optionA: "Admit the real reason you ended your last friendship", optionB: "Admit the real reason you ended your last relationship", intensity: 8, audience: "deep" },
  { optionA: "Know how every person here actually feels about you right now", optionB: "Know how you'll feel about all of them in five years", intensity: 7, audience: "deep" },
  { optionA: "Have your search history shown on a big screen", optionB: "Have your location history shown on a big screen", intensity: 9, audience: "awkward" },
  { optionA: "Accidentally like a random old photo while stalking someone's profile", optionB: "Get caught mid-stalk by the person themselves", intensity: 5, audience: "awkward" },
  { optionA: "Have spinach in your teeth through an entire first date", optionB: "Call someone by the wrong name on a first date", intensity: 3, audience: "awkward" },
  { optionA: "Send a risky text and get left on read", optionB: "Get a risky text and not know how to respond", intensity: 4, audience: "awkward" },
  { optionA: "Be the first one to fall asleep at every party", optionB: "Be the one who has to wake everyone else up", intensity: 1, audience: "party" },
  { optionA: "Get matched with your friend's ex on an app", optionB: "Get matched with your ex's friend", intensity: 5, audience: "friends" },
  { optionA: "Have one friend keep every secret you tell them", optionB: "Have the whole group know everything but never judge you for it", intensity: 6, audience: "friends" },
  { optionA: "Be told the brutally honest truth about your flaws right now", optionB: "Never be told, even if everyone already knows", intensity: 9, audience: "deep" },
];

// --- Never Have I Ever (placeholder, written to match brand tone) ---
const neverHaveIEver = [
  { text: "Never have I ever pretended to know a song I'd never heard before", intensity: 1, audience: "friends" },
  { text: "Never have I ever shown up to the wrong event entirely", intensity: 2, audience: "friends" },
  { text: "Never have I ever lied about reading something to sound smarter", intensity: 2, audience: "friends" },
  { text: "Never have I ever talked about someone right before they walked in", intensity: 4, audience: "friends" },
  { text: "Never have I ever pretended to like a gift I actually hated", intensity: 1, audience: "friends" },
  { text: "Never have I ever ditched plans because something better came up", intensity: 3, audience: "friends" },
  { text: "Never have I ever forgotten a close friend's birthday", intensity: 3, audience: "friends" },
  { text: "Never have I ever spread a rumor I knew wasn't fully true", intensity: 6, audience: "friends" },
  { text: "Never have I ever been the reason a friend group fell apart", intensity: 8, audience: "friends" },
  { text: "Never have I ever read a friend's messages without asking", intensity: 6, audience: "friends" },
  { text: "Never have I ever stalked an ex's new partner's entire profile", intensity: 5, audience: "couples" },
  { text: "Never have I ever lied about where I was to my partner", intensity: 7, audience: "couples" },
  { text: "Never have I ever compared my partner to an ex out loud", intensity: 6, audience: "couples" },
  { text: "Never have I ever gone through my partner's phone without telling them", intensity: 7, audience: "couples" },
  { text: "Never have I ever faked being asleep to avoid a conversation", intensity: 3, audience: "couples" },
  { text: "Never have I ever stayed friends with someone just because my partner liked them", intensity: 3, audience: "couples" },
  { text: "Never have I ever said 'I love you' before I actually meant it", intensity: 6, audience: "couples" },
  { text: "Never have I ever kept a group chat secret from my partner", intensity: 5, audience: "couples" },
  { text: "Never have I ever cried during an argument just to end it faster", intensity: 5, audience: "couples" },
  { text: "Never have I ever broken up with someone over text", intensity: 4, audience: "couples" },
  { text: "Never have I ever danced on a table at a party", intensity: 2, audience: "party" },
  { text: "Never have I ever lost an item of clothing on a night out", intensity: 3, audience: "party" },
  { text: "Never have I ever made out with someone I just met that night", intensity: 5, audience: "party" },
  { text: "Never have I ever woken up somewhere I didn't recognize", intensity: 4, audience: "party" },
  { text: "Never have I ever been the loudest person at a party and regretted it the next day", intensity: 2, audience: "party" },
  { text: "Never have I ever crashed a party I wasn't invited to", intensity: 3, audience: "party" },
  { text: "Never have I ever gotten someone else in trouble to cover for myself", intensity: 6, audience: "party" },
  { text: "Never have I ever sent a drunk text I deeply regretted", intensity: 4, audience: "party" },
  { text: "Never have I ever thrown up at someone else's house", intensity: 3, audience: "party" },
  { text: "Never have I ever started a rumor just to see if it would come back to me", intensity: 5, audience: "party" },
  { text: "Never have I ever pretended to be okay when I really wasn't", intensity: 5, audience: "deep" },
  { text: "Never have I ever stayed in a friendship I knew was bad for me", intensity: 6, audience: "deep" },
  { text: "Never have I ever felt jealous of someone close to me and hid it", intensity: 6, audience: "deep" },
  { text: "Never have I ever lied to make myself look better in a hard moment", intensity: 7, audience: "deep" },
  { text: "Never have I ever resented someone for something they don't even know about", intensity: 7, audience: "deep" },
  { text: "Never have I ever cut someone off without ever telling them why", intensity: 6, audience: "deep" },
  { text: "Never have I ever cried alone in a bathroom at an event", intensity: 5, audience: "deep" },
  { text: "Never have I ever questioned whether someone actually liked me or just my attention", intensity: 6, audience: "deep" },
  { text: "Never have I ever gone quiet about something that really hurt me", intensity: 6, audience: "deep" },
  { text: "Never have I ever felt like the outsider in my own friend group", intensity: 7, audience: "deep" },
  { text: "Never have I ever called the wrong name during an important moment", intensity: 4, audience: "awkward" },
  { text: "Never have I ever sent a text complaining about someone to that same someone", intensity: 5, audience: "awkward" },
  { text: "Never have I ever shown up way overdressed or underdressed to an event", intensity: 1, audience: "awkward" },
  { text: "Never have I ever liked a photo while deep stalking someone's profile by accident", intensity: 4, audience: "awkward" },
  { text: "Never have I ever walked into a glass door in public", intensity: 1, audience: "awkward" },
  { text: "Never have I ever pretended to recognize someone I had no memory of", intensity: 2, audience: "awkward" },
  { text: "Never have I ever replied 'you too' when someone didn't say anything that warranted it", intensity: 1, audience: "awkward" },
  { text: "Never have I ever gotten caught talking about someone over a video call", intensity: 5, audience: "awkward" },
  { text: "Never have I ever sent a voice note and immediately regretted every word", intensity: 3, audience: "awkward" },
  { text: "Never have I ever been caught checking my phone mid conversation and lied about it", intensity: 2, audience: "awkward" },
];

function withIds(items, prefix) {
  return items.map((item, idx) => ({
    id: `${prefix}-${String(idx + 1).padStart(3, "0")}`,
    ...item,
  }));
}

const output = {
  truthOrDare: {
    truth,
    dare,
  },
  wouldYouRather: withIds(wouldYouRather, "wyr"),
  neverHaveIEver: withIds(neverHaveIEver, "nhie"),
};

mkdirSync(join(root, "data"), { recursive: true });
writeFileSync(join(root, "data/questions.json"), JSON.stringify(output, null, 2));

const counts = {
  truth: truth.length,
  dare: dare.length,
  wouldYouRather: output.wouldYouRather.length,
  neverHaveIEver: output.neverHaveIEver.length,
};
console.log("Wrote data/questions.json", counts);
