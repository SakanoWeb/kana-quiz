/**
 * @file React i18n provider: current locale, `setLocale`, and a bound `t`.
 *
 * @packageDocumentation
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Locale } from '@/domain/types';
import { LOCALES } from '@/domain/types';
import { translate, type MessageKey } from '@/i18n';
import { loadString, saveString } from './persist';

/** localStorage key for the persisted locale. */
const STORAGE_KEY = 'kana-quiz:locale';
/** Default locale on first run. */
const DEFAULT_LOCALE: Locale = 'en';

/** A translation function bound to the active locale. */
type TranslateFn = (key: MessageKey, params?: Readonly<Record<string, string | number>>) => string;

/** Value exposed by the i18n context. */
interface I18nContextValue {
  readonly locale: Locale;
  setLocale(locale: Locale): void;
  /** Translate bound to the current locale. */
  readonly t: TranslateFn;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Read the initial locale from storage, falling back to the default.
 *
 * @returns A valid {@link Locale}.
 */
function readInitialLocale(): Locale {
  const stored = loadString(STORAGE_KEY, DEFAULT_LOCALE);
  return (LOCALES as readonly string[]).includes(stored) ? (stored as Locale) : DEFAULT_LOCALE;
}

/**
 * Provide locale state and translation to the tree.
 *
 * @param props - Component props.
 * @param props.children - Subtree that may consume {@link useI18n}.
 * @returns The provider element.
 */
export function I18nProvider({ children }: { children: ReactNode }): JSX.Element {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  // Keep the document language attribute in sync (accessibility / SEO).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    saveString(STORAGE_KEY, next);
  }, []);

  const t = useCallback<TranslateFn>((key, params) => translate(locale, key, params), [locale]);

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Access the i18n context.
 *
 * @returns The current locale, `setLocale`, and a bound `t`.
 * @throws If used outside an {@link I18nProvider}.
 */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (ctx === null) throw new Error('useI18n must be used within <I18nProvider>');
  return ctx;
}
