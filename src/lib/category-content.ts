// Hand-written SEO copy per category page. Keep each intro at 100-150 words,
// unique angle per page, no em dashes (house style).

export interface CategoryContent {
  metaTitle: string;
  metaDescription: string;
  intro: string;
}

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  "truth-or-dare-questions": {
    metaTitle: "100+ Truth or Dare Questions for Any Group",
    metaDescription:
      "The best truth or dare questions for friends, couples, and parties. Pick one, ask it, and let the app keep the game going when you run out.",
    intro:
      "Truth or dare is the game that never gets old, and it works for pretty much any group. Pick truth and someone has to answer something real. Pick dare and someone has to actually do something in front of everyone. The questions below cover the basics, ones that work whether you're three drinks in or stone sober at a sleepover. They start light and get bolder the further you scroll, so ease your group in or jump straight to the good stuff. Read one out, decide who's answering, and go. No prep, no cards, nothing to set up. When your group burns through these, and they will, the Truth or Dare AI app keeps generating new ones on the spot, so the game never has to stop just because you ran out of material.",
  },
  "truth-or-dare-for-couples": {
    metaTitle: "Truth or Dare Questions for Couples & Date Night",
    metaDescription:
      "Truth or dare questions made for couples. Get closer, laugh harder, and find out what your partner's never told you. Free to play, no app required.",
    intro:
      "Some truth or dare questions are made for two. These are built for couples, for the kind of night where it's just you and your partner and you actually want to learn something instead of just laughing at your friends. Expect questions about exes, jealousy, secrets you've been sitting on, and dares that get you talking instead of performing for a crowd. Use it for date night, a long drive, or those quiet moments when small talk runs out and you want something with more weight. Go truth for honesty, dare for action, and don't skip the ones that make you a little nervous, those are usually the ones worth asking. Once you've worked through the list, the app keeps the questions coming so date night doesn't have to end.",
  },
  "bachelorette-party-games": {
    metaTitle: "Bachelorette Party Games: Truth or Dare for the Bride Squad",
    metaDescription:
      "The truth or dare questions and dares every bachelorette party needs. Loud, funny, and built for the bride's last night out with her people.",
    intro:
      "A bachelorette party needs games that match the energy: loud, a little chaotic, and built for a group, not just a couple. These truth or dare questions and dares are pulled for exactly that, the bride's last ride with her people before the wedding takes over. Some get the group roasting each other, some get someone dancing on a chair, and a few get genuinely sentimental once the drinks kick in. Use it at the dinner table before you head out, in the limo, or whenever the night needs a reset. Hand the phone to whoever's loudest and let them pick who answers next. Once your group's gone through this list, the app keeps generating new dares and questions all night, so the games never run out before the bride does.",
  },
  "truth-or-dare-for-adults": {
    metaTitle: "Truth or Dare for Adults: The Most Intense Questions",
    metaDescription:
      "The boldest truth or dare questions in the bank. Still clean, still fun, just a lot more honest. For groups who are ready to go there.",
    intro:
      "These are the most intense truth or dare questions in the bank, set aside for groups who actually want to go there. Nothing here is explicit, every question is still clean, but they get personal fast: secrets, regrets, things people don't usually say out loud. The dares ask for more too, vulnerability, honesty, the occasional dramatic confession in front of the room. This is the list for a group that's already comfortable with each other and wants the game to actually mean something, not just fill silence. Save it for later in the night, once everyone's warmed up on the lighter stuff. Read carefully before you ask, some of these will change the mood of the room fast. The app's intensity slider can push even further once you've worked through what's here.",
  },
  "would-you-rather-questions": {
    metaTitle: "Would You Rather Questions That Start Real Arguments",
    metaDescription:
      "Impossible choices for any group. Funny, awkward, and a few genuinely hard would you rather questions to settle once and for all.",
    intro:
      "Would you rather is the easiest party game to start and the hardest to walk away from. Two options, no real right answer, and somehow every group ends up arguing about both. The questions below cover the classics: silly hypotheticals, relationship dilemmas, party stories, and a few that get surprisingly deep once someone actually has to pick. Read both options out loud, make everyone answer before they explain themselves, then let the arguing happen. It works for any group size and any setting, car rides, parties, first dates, family dinners that need a distraction. There's no wrong way to play. Once your group's worked through this list, the Truth or Dare AI app keeps the would you rather questions coming, so the arguing never really has to stop.",
  },
  "never-have-i-ever-questions": {
    metaTitle: "Never Have I Ever Questions for Girls Night",
    metaDescription:
      "The never have I ever questions that get the secrets out. Perfect for girls night, sleepovers, and anyone who loves a little chaos.",
    intro:
      "Never have I ever is the game where the truth comes out one finger at a time. Someone says a sentence, everyone who's done it puts a finger down, and the group slowly learns way more about each other than expected. The questions below move from harmless to a little revealing, covering friendships, relationships, party nights, and the kind of stuff people only admit once the game makes them. It's a girls night staple for a reason: low effort, high payoff, and it works even with people who just met. Play with fingers, drinks, or just points, the format doesn't matter. Read one out at a time and watch who looks away first. Once you've gone through the list, the app keeps the questions coming so the night doesn't have to end early.",
  },
};
