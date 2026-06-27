/**
 * @file One-click pool presets layered over the granular tag system.
 *
 * @remarks Presets are not a separate mechanism: each simply predefines which
 * kinds and categories are active. Their labels are translatable and live in the
 * i18n catalog under `preset.<id>`.
 *
 * @packageDocumentation
 */

import type { CharacterCategory, CharacterKind } from '../types';

/** A named shortcut that activates a set of kinds and categories. */
export interface PoolPreset {
  readonly id: string;
  readonly kinds: readonly CharacterKind[];
  readonly categories: readonly CharacterCategory[];
}

/** Built-in presets, from beginner to complete. */
export const POOL_PRESETS: readonly PoolPreset[] = [
  { id: 'hiragana-basic', kinds: ['hiragana'], categories: ['base'] },
  { id: 'katakana-basic', kinds: ['katakana'], categories: ['base'] },
  { id: 'kana-basic', kinds: ['hiragana', 'katakana'], categories: ['base'] },
  {
    id: 'kana-full',
    kinds: ['hiragana', 'katakana'],
    categories: ['base', 'dakuten', 'handakuten', 'yoon'],
  },
];
