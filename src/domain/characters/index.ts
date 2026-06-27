/**
 * @file Aggregated character datasets.
 *
 * @remarks The rest of the app consumes {@link ALL_ITEMS} for the practice pool
 * and the kind-specific exports for the reference/browse views.
 *
 * @packageDocumentation
 */

import type { KanaItem, KanjiItem, LearnItem } from '../types';
import { KANA_ITEMS } from './kana';
import { KANJI_ITEMS } from './kanji';

/** Every learnable item (kana + kanji). */
export const ALL_ITEMS: readonly LearnItem[] = [...KANA_ITEMS, ...KANJI_ITEMS];

/** All kana items (hiragana + katakana). */
export const ALL_KANA: readonly KanaItem[] = KANA_ITEMS;

/** All kanji items. */
export const ALL_KANJI: readonly KanjiItem[] = KANJI_ITEMS;

export { KANA_ITEMS, KANJI_ITEMS };
