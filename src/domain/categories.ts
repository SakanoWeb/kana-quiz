/**
 * @file Category registry (structure only; labels live in the i18n catalog).
 *
 * @packageDocumentation
 */

import type { CharacterCategory } from './types';

/** Structural metadata for a selectable category. */
export interface CategoryMeta {
  readonly id: CharacterCategory;
  /** Whether the category is enabled by default in a fresh pool. */
  readonly defaultEnabled: boolean;
}

/**
 * Selectable kana categories, in display order.
 *
 * @remarks Human-readable labels and concept explanations are translatable and
 * live under `category.<id>.label` / `category.<id>.concept` in the i18n catalog.
 * `kanji` is intentionally absent: it is a separate kind handled by the browse
 * view, not a kana pool category.
 */
export const CATEGORIES: readonly CategoryMeta[] = [
  { id: 'base', defaultEnabled: true },
  { id: 'dakuten', defaultEnabled: false },
  { id: 'handakuten', defaultEnabled: false },
  { id: 'yoon', defaultEnabled: false },
  { id: 'extended', defaultEnabled: false },
  { id: 'obsolete', defaultEnabled: false },
];

/** The category ids, in display order. */
export const CATEGORY_IDS: readonly CharacterCategory[] = CATEGORIES.map((category) => category.id);
