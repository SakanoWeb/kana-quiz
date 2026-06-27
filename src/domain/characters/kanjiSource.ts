/**
 * @file Remote kanji dataset loader for the browse view (English only).
 *
 * @remarks
 * The full kanji list (~13k entries) is too large to hand-author or bundle here,
 * so the browse view loads it at runtime from a public, CORS-enabled JSON dump of
 * KANJIDIC-derived data, served via the jsDelivr CDN. The data is read-only and
 * contains no personal information. If the fetch fails, the UI falls back to the
 * small bundled set in {@link KANJI_ITEMS} so the app keeps working offline.
 *
 * Kanji meanings here are English only by design (there is no reliable per-kanji
 * Spanish meaning source), matching the decision to keep the kanji tab in English.
 *
 * @packageDocumentation
 */

import { KANJI_ITEMS } from './kanji';

/** A lightweight, English-only kanji record used by the browse view. */
export interface BrowseKanji {
  readonly glyph: string;
  readonly meanings: readonly string[];
  /** On'yomi readings (katakana). */
  readonly on: readonly string[];
  /** Kun'yomi readings (hiragana). */
  readonly kun: readonly string[];
  readonly strokes?: number | undefined;
  readonly jlpt?: number | undefined;
  readonly grade?: number | undefined;
}

/** Shape of an entry in the remote dataset (only the fields we use). */
interface RawKanji {
  strokes?: number;
  grade?: number | null;
  freq?: number | null;
  jlpt_old?: number | null;
  jlpt_new?: number | null;
  meanings?: string[];
  readings_on?: string[];
  readings_kun?: string[];
}

/**
 * Remote dataset URL. A well-known, stable KANJIDIC-derived JSON keyed by kanji.
 * Served by jsDelivr (permissive CORS, long-lived caching). Swap here if needed.
 */
const REMOTE_URL = 'https://cdn.jsdelivr.net/gh/davidluzgouveia/kanji-data@master/kanji.json';

/** Map a raw record to our lightweight shape. */
function mapRaw(glyph: string, r: RawKanji): BrowseKanji {
  return {
    glyph,
    meanings: r.meanings ?? [],
    on: r.readings_on ?? [],
    kun: r.readings_kun ?? [],
    strokes: r.strokes,
    grade: r.grade ?? undefined,
    jlpt: r.jlpt_new ?? r.jlpt_old ?? undefined,
  };
}

/** The bundled curated set (JLPT N5), used as an offline fallback. */
export const FALLBACK_KANJI: readonly BrowseKanji[] = KANJI_ITEMS.map((k) => ({
  glyph: k.glyph,
  meanings: k.meanings.en,
  on: k.onReadings,
  kun: k.kunReadings,
  strokes: k.strokes,
  jlpt: k.jlpt,
  grade: k.grade,
}));

let cache: readonly BrowseKanji[] | null = null;
let inflight: Promise<readonly BrowseKanji[]> | null = null;

/**
 * Fetch and normalize the full kanji dataset, once per session.
 *
 * @remarks Results are sorted by newspaper frequency (most common first) so the
 * infinite-scroll grid surfaces useful kanji before rare ones; ties break by
 * stroke count. The promise is cached so repeated calls do not refetch.
 *
 * @returns The full list of {@link BrowseKanji}.
 * @throws If the network request fails or returns a non-OK status.
 */
export function fetchAllKanji(): Promise<readonly BrowseKanji[]> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = (async (): Promise<readonly BrowseKanji[]> => {
      const res = await fetch(REMOTE_URL);
      if (!res.ok) throw new Error(`Failed to load kanji data: HTTP ${res.status}`);
      const data = (await res.json()) as Record<string, RawKanji>;
      const list = Object.entries(data)
        .map(([glyph, raw]) => ({ raw, item: mapRaw(glyph, raw) }))
        .filter(({ item }) => item.meanings.length > 0)
        .sort((a, b) => {
          const fa = a.raw.freq ?? Number.POSITIVE_INFINITY;
          const fb = b.raw.freq ?? Number.POSITIVE_INFINITY;
          if (fa !== fb) return fa - fb;
          return (a.item.strokes ?? 99) - (b.item.strokes ?? 99);
        })
        .map(({ item }) => item);
      cache = list;
      return list;
    })().catch((error: unknown) => {
      inflight = null; // allow a retry on the next call
      throw error;
    });
  }
  return inflight;
}
