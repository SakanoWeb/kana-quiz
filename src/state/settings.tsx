/* eslint-disable react-refresh/only-export-components -- Provider and hook intentionally co-located */
/**
 * @file React settings provider with localStorage persistence.
 *
 * @packageDocumentation
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Settings } from '@/domain/types';
import { DEFAULT_SETTINGS } from '@/domain/types';
import { loadJSON, saveJSON } from './persist';

/** localStorage key for persisted settings. */
const STORAGE_KEY = 'kana-quiz:settings';

/** Value exposed by the settings context. */
interface SettingsContextValue {
  readonly settings: Settings;
  /** Merge a partial patch into the current settings. */
  update(patch: Partial<Settings>): void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

/**
 * Provide settings state to the tree.
 *
 * @param props - Component props.
 * @param props.children - Subtree that may consume {@link useSettings}.
 * @returns The provider element.
 */
export function SettingsProvider({ children }: { children: ReactNode }): JSX.Element {
  const [settings, setSettings] = useState<Settings>(() =>
    loadJSON<Settings>(STORAGE_KEY, DEFAULT_SETTINGS),
  );

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveJSON(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<SettingsContextValue>(() => ({ settings, update }), [settings, update]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

/**
 * Access the settings context.
 *
 * @returns The current settings and an `update` function.
 * @throws If used outside a {@link SettingsProvider}.
 */
export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (ctx === null) throw new Error('useSettings must be used within <SettingsProvider>');
  return ctx;
}
