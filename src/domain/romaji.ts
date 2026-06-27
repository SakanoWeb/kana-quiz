/**
 * @file Romanization adapter and permissive answer matching.
 *
 * @remarks The rest of the domain never imports `wanakana` directly; swapping the
 * library would touch only this file.
 *
 * @packageDocumentation
 */

import { toKana as wkToKana, toRomaji as wkToRomaji, isRomaji as wkIsRomaji } from 'wanakana';

/**
 * Normalize romaji for comparison.
 *
 * @param value - Raw romaji input.
 * @returns The input trimmed and lower-cased.
 */
export const normalizeRomaji = (value: string): string => value.trim().toLowerCase();

/**
 * Convert romaji to kana (IME-style).
 *
 * @param value - Romaji text, e.g. `"ka"`.
 * @returns The kana form, e.g. `"か"`.
 */
export const toKana = (value: string): string => wkToKana(value);

/**
 * Convert kana to romaji.
 *
 * @param value - Kana text, e.g. `"か"`.
 * @returns The romaji form, e.g. `"ka"`.
 */
export const toRomaji = (value: string): string => wkToRomaji(value);

/**
 * Test whether text is romaji (Latin script).
 *
 * @param value - Text to inspect.
 * @returns `true` if the text is romaji.
 */
export const isRomaji = (value: string): boolean => wkIsRomaji(value);

/**
 * Permissive reading check (project default).
 *
 * @remarks A romaji answer is correct when, once normalized, it equals one of the
 * item's accepted romanizations. The three genuine homophone conflicts
 * (`ji` → じ/ぢ, `zu` → ず/づ, `o` → お/を) are deliberately not disambiguated.
 *
 * @param given - The learner's romaji answer.
 * @param acceptedReadings - All romanizations accepted for the target item.
 * @returns `true` if `given` matches any accepted reading.
 */
export const matchesAnyReading = (given: string, acceptedReadings: readonly string[]): boolean => {
  const normalized = normalizeRomaji(given);
  if (normalized.length === 0) return false;
  return acceptedReadings.some((reading) => normalizeRomaji(reading) === normalized);
};
