/**
 * @file Locale catalogs and the pure translation function.
 *
 * @packageDocumentation
 */

import type { Locale } from '@/domain/types';
import { format } from './format';
import { en, type MessageKey, type Messages } from './locales/en';
import { es } from './locales/es';

/** All catalogs, keyed by locale. English is the source of truth. */
export const CATALOG: Readonly<Record<Locale, Messages>> = { en, es };

export type { MessageKey, Messages };

/**
 * Translate a key into a locale, interpolating params.
 *
 * @remarks If a key is missing it falls back to the key itself (and warns in dev)
 * so the UI never crashes on a typo.
 *
 * @param locale - Target locale.
 * @param key - Message key.
 * @param params - Optional interpolation values.
 * @returns The localized, interpolated string.
 */
export function translate(
  locale: Locale,
  key: MessageKey,
  params?: Readonly<Record<string, string | number>>,
): string {
  // Cast through unknown: the type says string, but a missing key at runtime
  // (e.g. stale localStorage, partial catalog) could still produce undefined.
  const template = CATALOG[locale][key] as string | undefined;
  if (template === undefined) {
    if (import.meta.env.DEV) console.warn(`[i18n] missing key "${key}" for locale "${locale}"`);
    return key;
  }
  return format(template, params);
}
