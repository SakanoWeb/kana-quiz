# Architecture

This document explains how Kana Quiz is put together and why, so the project is
easy to extend without surprises.

## Layering

Dependencies flow in one direction only:

```
app  →  features  →  state  →  domain
                              i18n → domain
```

- **`domain/`** is pure TypeScript. It imports **no React** and **no i18n
  catalog**. It models characters, pools, modes, the selection engine and the
  session, plus localization *primitives* (the `Locale` union and
  `LocalizedText`/`LocalizedList` shapes). Because it is pure, it is trivially
  unit-tested.
- **`i18n/`** holds the message catalogs and a pure `translate()` function. It
  depends on the domain only for the `Locale` type.
- **`state/`** wraps cross-cutting state in React context providers (current
  locale, settings) and localStorage persistence.
- **`features/`** is the UI, grouped by feature (pool selector, quiz, settings).
- **`app/`** is the shell and router.

A component never reaches "down" past its layer except through these explicit
imports, which keeps the core logic reusable and testable in isolation.

All modules and exported symbols are documented with TSDoc (`@file`, `@param`,
`@returns`, `@remarks`), so the contracts described here are also visible inline
in the source and to editor tooling.

## The mode contract

Everything practice-related is built on a single interface, `QuizMode`
(`domain/modes/types.ts`):

```ts
interface QuizMode {
  id: string;
  experimental?: boolean;
  supports(item, ctx): boolean;     // can this mode use this item?
  build(item, ctx): Question;       // turn an item into a question
  check(question, answer, settings): Result;  // validate an answer
}
```

Responsibilities are split deliberately:

- The **engine** (`domain/quiz/engine.ts`) only *selects*: given the filtered
  pool and a mode, it picks a supported item (avoiding an immediate repeat) and
  asks the mode to build the question. It knows nothing about romaji, drawings or
  React.
- A **mode** owns *building* and *checking*. Adding a new mode means implementing
  the interface and registering it in `registry.ts`. The engine, the pools and
  the other modes are untouched.
- The **UI** renders a question purely from its `inputKind` (`text` | `choice` |
  `drawing`). Add a mode whose input is text or choice and the existing screen
  already renders it.

### Why modes emit keys, not prose

A `Question` carries a structured `Prompt`: an optional `glyph`/`text` plus an
`instructionKey` and optional params (e.g. `{ reading: 'ka' }`). Modes never
produce user-facing sentences. The UI renders the instruction live with
`t(instructionKey, params)`.

This has two benefits: the domain stays free of UI text and of any locale
concept beyond the `Locale` type, and **switching language updates the visible
instruction immediately**, even for the question already on screen.

Mode display names and descriptions live in the i18n catalog under
`mode.<id>.name` / `mode.<id>.description` for the same reason.

## Internationalization

There are two kinds of translatable text, handled differently on purpose:

1. **UI chrome and fixed content** (labels, buttons, instructions, mode names,
   category labels and concept explanations, presets). These are closed sets, so
   they live in flat per-locale catalogs in `i18n/locales/`. `en.ts` is the
   source of truth: `type MessageKey = keyof typeof en`. Other locales are typed
   `satisfies Messages`, so a missing/extra key is a compile error, and a parity
   test (`test/i18n.test.ts`) checks it again at test time.

2. **Per-item data content** (character mnemonics; kanji meanings). This is
   open-ended and authored incrementally per character, so it lives *with the
   data* as `LocalizedText` (one string per locale) or `LocalizedList` (one list
   per locale). `localize(value, locale)` resolves it. Kanji meanings are shown
   **only in the selected language** by reading `meanings[locale]`.

The current locale is provided by `state/i18n.tsx` (`useI18n()` → `{ locale,
setLocale, t }`), persisted in localStorage, and reflected onto
`document.documentElement.lang`.

## Permissive romaji checking

The agreed default is permissive: a romaji answer is correct if it matches *any*
accepted reading of the item. We do not disambiguate the three genuine conflicts
(`ji` → じ/ぢ, `zu` → ず/づ, `o` → お/を). All romaji handling is funnelled
through `domain/romaji.ts`, a thin adapter over `wanakana`; if the library is
ever swapped, only that file changes. Transcription mode validates by converting
the typed kana back to romaji and comparing readings, which also lets a user
without an IME type romaji directly.

## Why HashRouter

GitHub Pages serves static files and cannot rewrite unknown paths to
`index.html`. With a history-based router, refreshing `/quiz` would 404. Hash
routing keeps the route in the URL fragment (`/#/quiz`), which never hits the
server. It is the robust choice for Pages.

## Browse / reference view

The browse view (`features/browse/`) is a read-only counterpart to the quiz,
backed by a small `domain/reference/` layer:

- **Kana chart (`kanaChart.ts`).** Owns *layout* only — which glyph sits in which
  grid cell of the standardized gojūon table and its variation sections. The
  learning *content* (readings, didactics) is resolved against `KANA_ITEMS` by
  glyph, so the dataset stays the single source of truth. A parity test
  (`test/kanaChart.test.ts`) asserts every charted glyph exists in the dataset
  and that no dataset glyph is orphaned, so the two cannot silently diverge. The
  extended-katakana section is exposed only for katakana.
- **Kanji search (`kanjiSearch.ts`).** A pure filter matching the query against
  the glyph, kana readings, the romaji transliteration of those readings, and the
  meanings in every locale. The kanji grid renders an initial page and grows its
  visible window via an `IntersectionObserver` sentinel (infinite scroll),
  resetting on query change. Selecting a card opens an accessible modal dialog
  (focus-safe, closes on backdrop/Escape, locks background scroll) that shows the
  full record, with meanings and example glosses in the selected locale only.

This view reads `KANJI_ITEMS` and the chart directly rather than going through the
practice pool, which stays kana-only.

## Data generation

The kana dataset is generated from compact row tables (`characters/kana.ts`):
each row defines a hiragana/katakana pair sharing a romaji, and an `expand()`
function turns rows into items. This keeps the data DRY, writes the irregular
romaji (shi, chi, tsu, fu) once, and makes adding a sound a one-line change.
Item ids use the glyph itself so じ and ぢ never collide.

## Writing mode (roadmap)

`writingMode` is registered but flagged `experimental`; it currently renders a
stub. It exists to prove a fourth, very different mode fits the same contract
without touching anything else. Planned implementation:

- **v1:** render the target glyph to an offscreen canvas and score pixel overlap
  (intersection-over-union) against the user's drawing.
- **v2:** stroke-based comparison using KanjiVG stroke data for more meaningful
  feedback.

The pass threshold (what percentage counts as correct) will be a setting.

## Kanji phase (roadmap)

The `KanjiItem` type is in place (on/kun readings + localized `meanings`). The
plan is to pre-build a static JSON merging KANJIDIC2 (readings, JLPT, English)
with HISPADIC (Spanish) at author time, bundle a curated subset (e.g. JLPT N5),
and import it in `characters/index.ts`. No app code outside the data layer needs
to change. EDRDG attribution is required for that data (see `LICENSE`).
