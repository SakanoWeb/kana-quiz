/**
 * @file Core domain data model and localization primitives.
 *
 * @remarks
 * The domain layer is pure TypeScript: it imports neither React nor the i18n
 * message catalog. Characters are modelled as tagged data so that adding a new
 * category (obsolete kana, extended katakana, a JLPT level) or, later, kanji,
 * requires only data changes — never changes to mode, pool or UI logic.
 *
 * Only translatable *content* (mnemonics, kanji meanings, example glosses) is
 * stored here, as {@link LocalizedText} / {@link LocalizedList}. UI chrome
 * (labels, instructions, mode names) lives in the i18n catalog instead.
 *
 * @packageDocumentation
 */

/**
 * Supported interface locales.
 *
 * @remarks English (`'en'`) is the source-of-truth locale: its catalog defines
 * the canonical message-key set.
 */
export type Locale = 'en' | 'es';

/** All supported locales, in display order. */
export const LOCALES: readonly Locale[] = ['en', 'es'];

/** A single string available in every {@link Locale}. */
export type LocalizedText = Readonly<Record<Locale, string>>;

/** A list of strings available in every {@link Locale} (e.g. kanji meanings). */
export type LocalizedList = Readonly<Record<Locale, readonly string[]>>;

/**
 * Resolve a {@link LocalizedText} for a locale.
 *
 * @param text - The localized value, possibly `undefined`.
 * @param locale - The locale to read.
 * @returns The string for `locale`, or `undefined` when `text` is absent.
 */
export const localize = (text: LocalizedText | undefined, locale: Locale): string | undefined =>
  text?.[locale];

/**
 * Resolve a {@link LocalizedList} for a locale.
 *
 * @param list - The localized list, possibly `undefined`.
 * @param locale - The locale to read.
 * @returns The list for `locale`, or an empty array when `list` is absent.
 */
export const localizeList = (list: LocalizedList | undefined, locale: Locale): readonly string[] =>
  list?.[locale] ?? [];

/** Writing system a character belongs to. */
export type CharacterKind = 'hiragana' | 'katakana' | 'kanji';

/**
 * Didactic category of a character. This is the basis of the granular pool
 * selector and of the reference charts.
 *
 * @remarks To add a group, extend this union and register it in `categories.ts`.
 */
export type CharacterCategory =
  | 'base' // gojūon (the 46 basics)
  | 'dakuten' // が ざ だ ば ...
  | 'handakuten' // ぱ ぴ ぷ ...
  | 'yoon' // combined きゃ しゅ ...
  | 'extended' // katakana for loanwords: ファ ティ ...
  | 'obsolete' // ゐ ゑ
  | 'kanji'; // logographic characters

/**
 * Optional per-item didactic content. Every field is filled in incrementally,
 * so all are optional.
 */
export interface Didactics {
  /** Short line, safe to show anywhere (e.g. on the answer card). */
  short?: LocalizedText;
  /** Long explanation, shown on demand. */
  long?: LocalizedText;
  /** Visual mnemonic for beginners (e.g. "き looks like a key → ki"). */
  mnemonic?: LocalizedText;
  /** Usage example. */
  example?: LocalizedText;
}

/** Fields shared by every learnable character. */
interface LearnItemBase {
  /**
   * Stable, globally-unique identifier.
   *
   * @remarks Encodes the glyph to guarantee uniqueness even across homophones
   * (e.g. じ and ぢ).
   */
  readonly id: string;
  readonly kind: CharacterKind;
  readonly category: CharacterCategory;
  /** The glyph shown to the learner: が, カ, 火, ... */
  readonly glyph: string;
  /** Free-form tags (levels, "particle", ...) used for pool filtering. */
  readonly tags: readonly string[];
  /** Optional didactic content. */
  readonly didactics?: Didactics;
}

/** A kana character (hiragana or katakana). */
export interface KanaItem extends LearnItemBase {
  readonly kind: 'hiragana' | 'katakana';
  /**
   * Accepted romanizations, primary first.
   *
   * @remarks Enables permissive checking: し accepts `["shi", "si"]`; ぢ accepts
   * `["ji", "di"]`.
   */
  readonly romaji: readonly string[];
}

/**
 * A single compound-word example for a kanji.
 *
 * @example
 * ```ts
 * { word: '日本', reading: 'にほん', meaning: { en: 'Japan', es: 'Japón' } }
 * ```
 */
export interface KanjiExample {
  /** The written word, e.g. `日本`. */
  readonly word: string;
  /** Kana reading of the word, e.g. `にほん`. */
  readonly reading: string;
  /** Localized gloss of the word. */
  readonly meaning: LocalizedText;
}

/**
 * A kanji (logographic) character.
 *
 * @remarks Meanings are localized so they can be shown in the selected language
 * only. The optional metadata fields power the reference detail view and are
 * sourced, in the planned data pipeline, from KANJIDIC2 + HISPADIC.
 */
export interface KanjiItem extends LearnItemBase {
  readonly kind: 'kanji';
  readonly category: 'kanji';
  /** On'yomi (Sino-Japanese) readings, conventionally written in katakana. */
  readonly onReadings: readonly string[];
  /** Kun'yomi (native) readings, conventionally written in hiragana. */
  readonly kunReadings: readonly string[];
  /** Localized meanings (shown in the selected locale only). */
  readonly meanings: LocalizedList;
  /** Total stroke count, when known. */
  readonly strokes?: number;
  /** JLPT level (5 = N5 … 1 = N1), when known. */
  readonly jlpt?: number;
  /** Japanese school grade (kyōiku/jōyō), when known. */
  readonly grade?: number;
  /** Classifying radical, when known. */
  readonly radical?: string;
  /** Illustrative compound words. */
  readonly examples?: readonly KanjiExample[];
}

/** Discriminated union of everything learnable. */
export type LearnItem = KanaItem | KanjiItem;

/** Application settings, persisted as user preferences. */
export interface Settings {
  /**
   * Permissive romaji checking (the project default).
   *
   * @remarks When enabled, any valid reading of the item is accepted without
   * disambiguating じ/ぢ, ず/づ or を/お.
   */
  readonly permissive: boolean;
}

/** Default settings applied on first run. */
export const DEFAULT_SETTINGS: Settings = {
  permissive: true,
};

/**
 * Type guard: is this item a kana?
 *
 * @param item - Any learn item.
 * @returns `true` if the item is hiragana or katakana.
 */
export const isKana = (item: LearnItem): item is KanaItem =>
  item.kind === 'hiragana' || item.kind === 'katakana';

/**
 * Type guard: is this item a kanji?
 *
 * @param item - Any learn item.
 * @returns `true` if the item is a kanji.
 */
export const isKanji = (item: LearnItem): item is KanjiItem => item.kind === 'kanji';

/**
 * All romanized readings of an item, used by modes for validation.
 *
 * @param item - Any learn item.
 * @returns For kana, its romaji list; for kanji, on + kun readings combined.
 */
export const readingsOf = (item: LearnItem): readonly string[] =>
  isKana(item) ? item.romaji : [...item.onReadings, ...item.kunReadings];
