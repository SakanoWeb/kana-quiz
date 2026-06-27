/**
 * @file Hook to subscribe to a CSS media query from React.
 *
 * @packageDocumentation
 */

import { useEffect, useState } from 'react';

/** Breakpoint (max-width) below which the UI switches to its mobile layout. */
export const MOBILE_QUERY = '(max-width: 640px)';

/**
 * Breakpoint up to which the kana chart uses its vertical, full-width layout.
 *
 * @remarks Wider than {@link MOBILE_QUERY} so portrait tablets also get the
 * comfortable vertical chart instead of the horizontal desktop one.
 */
export const VERTICAL_CHART_QUERY = '(max-width: 820px)';

/**
 * Track whether a media query currently matches, updating on viewport changes.
 *
 * @param query - A media query string, e.g. `'(max-width: 640px)'`.
 * @returns `true` while the query matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent): void => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
