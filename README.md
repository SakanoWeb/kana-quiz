# Kana Quiz （仮名練習）

A small, fast web app to practice Japanese. It covers **hiragana** and
**katakana** today, with **kanji** designed into the data model for a later
phase. Built to be hosted for free on **GitHub Pages**.

The interface language can be switched between **English** and **Spanish** at any
time; English is the source-of-truth locale.

## Features

- **Freely composable pool.** Mix syllabaries (hiragana/katakana) and categories
  (basics, dakuten, handakuten, yōon, extended katakana, obsolete) however you
  like, or start from a one-click preset.
- **Several practice modes**, all built on one interface so new ones drop in
  cleanly:
  - **Reading** — see the glyph, type the romaji.
  - **Transcription** — see the romaji, type the kana.
  - **Versus** — pick the correct glyph out of two.
  - **Writing** — draw the glyph (experimental stub; see the architecture doc).
- **Browse / reference view.** A no-pressure lookup mode reachable from the mode
  picker:
  - **Hiragana / Katakana** — the standardized gojūon chart, with a toggle to
    reveal the complete list including all variations (dakuten, handakuten, yōon,
    extended katakana, obsolete).
  - **Kanji** — a searchable grid that loads more as you scroll, where any card
    opens a floating detail dialog (readings, meanings, stroke count, JLPT level,
    grade, radical and example words). A curated JLPT N5 set is bundled.
- **Permissive checking** (default on): accepts any valid reading without forcing
  you to disambiguate じ/ぢ, ず/づ or を/お.
- **Streak counter** with a session best.
- **Per-character didactics** (mnemonics, examples) shown on the answer card,
  localized to the selected language.
- **Bilingual UI** (English/Spanish) via a lightweight, dependency-free i18n
  layer.

## Requirements

- **Node.js 20 or newer** and npm.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (Vite prints a local URL)
```

Other useful scripts:

```bash
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm test           # run the test suite (Vitest)
npm run format     # Prettier
```

## Deploying to GitHub Pages

The Vite `base` must match how the site is served. For a **project page**
(`https://<user>.github.io/<repo>/`) it must be `/<repo>/`.

### Option A — GitHub Actions (recommended)

A workflow is included at `.github/workflows/deploy.yml`. It builds on every push
to `main` and **derives the base path automatically from the repository name**,
so nothing needs editing if you rename the repo.

1. Push the project to a GitHub repository.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub
   Actions**.
3. Push to `main`. The workflow lints, type-checks, tests, builds and deploys.

### Option B — `gh-pages` package

```bash
# build with the base matching your repo name, then publish dist/
BASE_PATH=/your-repo-name/ npm run deploy
```

(`deploy` runs `predeploy` → `npm run build` first.)

## Project structure

```
src/
  app/         App shell + router (HashRouter for Pages)
  domain/      Pure, framework-free core (no React):
    characters/  kana dataset (generated from compact tables) + bundled kanji
    reference/   chart layout + kanji search for the browse view
    modes/       quiz modes implementing one shared contract + a registry
    pool/        pool filtering and presets
    quiz/        selection engine + session/streak logic
    romaji.ts    wanakana adapter (permissive checking lives here)
    types.ts     data model + localization primitives
  i18n/        message catalogs (en = source of truth, es), translate()
  state/       React providers: i18n (locale), settings, persistence
  features/    UI by feature: pool selector, quiz, settings, browse
  components/   small shared UI (streak badge, language selector)
  styles/      design tokens + component CSS
test/          Vitest unit tests (dataset, domain logic, i18n + chart parity)
```

The dependency direction is one-way: `app → features → state → domain`, and
`i18n → domain`. The domain imports neither React nor the i18n catalog.

## Extending it

- **Add a mode.** Implement the `QuizMode` interface in `src/domain/modes/` and
  register it in `registry.ts`. Add its name/description keys to the i18n
  catalogs. The mode picker and input rendering pick it up automatically.
- **Add a category.** Add an entry in `src/domain/categories.ts` and the
  `category.<id>.label` / `category.<id>.concept` keys in each locale.
- **Add a character.** Add a row to the relevant table in
  `src/domain/characters/kana.ts`.
- **Add kanji.** The `KanjiItem` type already exists; import a kanji dataset in
  `src/domain/characters/index.ts` (see the kanji-data note below).

## Internationalization

UI text is **not** hard-coded in components. Each locale is a flat catalog of
`key → string` (`src/i18n/locales/`), and components call `t('some.key', params)`.
English (`en.ts`) defines the canonical key set; other locales must provide the
same keys (enforced by `satisfies` and a parity test).

Per-item CONTENT that ships with the data (character mnemonics, and kanji
meanings) uses a `LocalizedText` / `LocalizedList` shape — a value per locale —
so it can be authored incrementally and is shown only in the selected language.

## Code documentation

All TypeScript is documented with **TSDoc** (`/** … */` with `@param`,
`@returns`, `@remarks`, `@example`, and `@file` / `@packageDocumentation` on
module headers), the conventional doc format for the TypeScript/JavaScript
ecosystem. CSS uses block comments. The aim is that every exported symbol and
every module explains its purpose and contract.

## Kanji data (bundled subset + planned pipeline)

The kanji browse view loads the **full kanji list (~13k, English)** at runtime
from a public, CORS-enabled KANJIDIC-derived JSON served via the jsDelivr CDN
(`src/domain/characters/kanjiSource.ts`), so search and infinite scroll work over
every kanji. The data is read-only and English-only by design (there is no
reliable per-kanji Spanish meaning source). If the network request fails, the
view falls back to a small bundled JLPT N5 set (`src/domain/characters/kanji.ts`)
so the app keeps working offline.

Those dictionaries are distributed by the **EDRDG** under the
Creative Commons Attribution-ShareAlike licence; using them requires attribution
(see `LICENSE`). This data is not bundled yet.

## Security

This is a static client-side app with no backend and no secrets. It loads no
third-party scripts or fonts at runtime, and applies a strict Content Security
Policy. See [`SECURITY.md`](./SECURITY.md).

## Licence

MIT — see [`LICENSE`](./LICENSE).
