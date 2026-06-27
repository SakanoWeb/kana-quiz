/**
 * @file Randomness helpers with an injectable RNG (for deterministic tests).
 *
 * @packageDocumentation
 */

/**
 * Pick one random element.
 *
 * @typeParam T - Element type.
 * @param items - Candidate elements.
 * @param random - RNG returning a float in `[0, 1)`.
 * @returns A random element, or `undefined` when `items` is empty.
 */
export function pickRandom<T>(items: readonly T[], random: () => number): T | undefined {
  if (items.length === 0) return undefined;
  const index = Math.floor(random() * items.length);
  return items[index];
}

/**
 * Sample up to `count` distinct random elements.
 *
 * @typeParam T - Element type.
 * @param items - Candidate elements (not mutated).
 * @param count - Maximum number of elements to return.
 * @param random - RNG returning a float in `[0, 1)`.
 * @returns Up to `count` distinct elements in random order.
 */
export function sampleDistinct<T>(items: readonly T[], count: number, random: () => number): T[] {
  const pool = [...items];
  const result: T[] = [];
  while (result.length < count && pool.length > 0) {
    const index = Math.floor(random() * pool.length);
    const [taken] = pool.splice(index, 1);
    if (taken !== undefined) result.push(taken);
  }
  return result;
}
