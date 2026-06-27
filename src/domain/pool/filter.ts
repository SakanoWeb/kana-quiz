/**
 * @file Practice-pool selection and filtering (pure functions).
 *
 * @packageDocumentation
 */

import type { CharacterCategory, CharacterKind, LearnItem } from '../types';

/**
 * A freely-composed practice pool: the set of active kinds and categories.
 */
export interface PoolSelection {
  readonly kinds: ReadonlySet<CharacterKind>;
  readonly categories: ReadonlySet<CharacterCategory>;
}

/**
 * Create an empty selection.
 *
 * @returns A selection with no kinds and no categories.
 */
export const emptySelection = (): PoolSelection => ({
  kinds: new Set(),
  categories: new Set(),
});

/**
 * Filter items by a selection.
 *
 * @remarks An empty kind set or empty category set yields an empty pool. Pure:
 * it mutates nothing.
 *
 * @param items - Candidate items.
 * @param selection - Active kinds and categories.
 * @returns The matching items.
 */
export function filterPool(items: readonly LearnItem[], selection: PoolSelection): LearnItem[] {
  if (selection.kinds.size === 0 || selection.categories.size === 0) return [];
  return items.filter(
    (item) => selection.kinds.has(item.kind) && selection.categories.has(item.category),
  );
}

/**
 * Toggle a value in a set, immutably.
 *
 * @typeParam T - Element type.
 * @param set - The source set (not mutated).
 * @param value - The value to add or remove.
 * @returns A new set with `value` toggled.
 */
export function toggleInSet<T>(set: ReadonlySet<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}
