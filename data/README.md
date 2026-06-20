# Question bank

`questions.json` is generated. Don't hand-edit it, edit the sources and rerun:

```
node scripts/build-questions.mjs
```

## Sources

- `source/truth_questions.json` and `source/dare_questions.json` are the real
  export from the TikTok content pipeline. Intensity there is 1-5; the build
  script stretches it to the site's 1-10 scale by multiplying by 2.
- Would You Rather and Never Have I Ever have no pipeline source yet, so
  they're hand-written directly in `scripts/build-questions.mjs`. Replace
  those arrays with real pipeline exports whenever that content exists, same
  shape as the Truth/Dare loader.

## Adding a new category later

1. Add a `source/<category>_questions.json` file, or a hand-written array in
   the build script, matching `{ id, text, intensity (1-10), audience }`
   (or `{ optionA, optionB, ... }` for a Would You Rather style category).
2. Add it to the `output` object in `scripts/build-questions.mjs`.
3. Add a reader function in `lib/questions.ts` (mirrors the existing ones).
4. Rerun the build script.

No component code needs to change. Pages and the `/play` widget read through
`lib/questions.ts`, never `data/questions.json` directly.

## `audience` vocabulary

`friends | couples | party | deep | awkward` — used to filter questions onto
the right occasion page (e.g. `couples` → `/truth-or-dare-for-couples`).
