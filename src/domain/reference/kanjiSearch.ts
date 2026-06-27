/**
 * @file Pure search, scoring and ranking for the kanji browser.
 *
 * @packageDocumentation
 */

import type { BrowseKanji } from '../characters/kanjiSource';
import { normalizeRomaji, toRomaji } from '../romaji';

/**
 * Relevance score for a single kanji against a query. Higher is more relevant;
 * `0` means no match. The bands guarantee that exact matches always outrank
 * partial ones (e.g. searching "son" puts the kanji meaning exactly "son" above
 * common kanji that merely contain it inside "person").
 *
 * @param kanji - The candidate kanji.
 * @param raw - The trimmed query (original case, for glyph matching).
 * @param q - The lower-cased query (for meanings).
 * @param qRomaji - The normalized query (for romaji readings).
 * @returns A score from 0 (no match) upwards.
 */
function scoreKanji(kanji: BrowseKanji, raw: string, q: string, qRomaji: string): number {
  // Exact glyph match wins outright.
  if (kanji.glyph === raw) return 1000;

  let best = 0;

  for (const meaning of kanji.meanings) {
    const ml = meaning.toLowerCase();
    if (ml === q) {
      best = Math.max(best, 950); // a meaning is exactly the query
      continue;
    }
    const tokens = ml.split(/[^a-z0-9]+/).filter(Boolean);
    if (tokens.includes(q)) best = Math.max(best, 800); // whole-word match
    else if (ml.startsWith(q)) best = Math.max(best, 520);
    else if (tokens.some((token) => token.startsWith(q))) best = Math.max(best, 460);
    else if (ml.includes(q)) best = Math.max(best, 260); // substring (e.g. per[son])
  }

  for (const reading of [...kanji.on, ...kanji.kun]) {
    const clean = reading.replace(/[.\-]/g, '');
    if (clean === raw) best = Math.max(best, 740);
    else if (clean.includes(raw)) best = Math.max(best, 210);
    const rom = normalizeRomaji(toRomaji(clean));
    if (rom === qRomaji) best = Math.max(best, 700);
    else if (rom.startsWith(qRomaji)) best = Math.max(best, 420);
    else if (rom.includes(qRomaji)) best = Math.max(best, 190);
  }

  if (kanji.glyph.includes(raw)) best = Math.max(best, 150);

  return best;
}

/**
 * Search and rank kanji by a free-text query.
 *
 * @remarks Runs over the ENTIRE dataset. Results are ordered by relevance
 * (exact matches first); ties preserve the input order, which is sorted by
 * frequency, so among equally-relevant matches the more common kanji come first.
 * An empty query returns the full list unchanged.
 *
 * @param items - The kanji to search (assumed pre-sorted by frequency).
 * @param query - The user's search text.
 * @returns The matching kanji, most relevant first.
 */
export function searchKanji(items: readonly BrowseKanji[], query: string): readonly BrowseKanji[] {
  const raw = query.trim();
  if (raw.length === 0) return items;
  const q = raw.toLowerCase();
  const qRomaji = normalizeRomaji(raw);

  const scored: { kanji: BrowseKanji; score: number; index: number }[] = [];
  items.forEach((kanji, index) => {
    const score = scoreKanji(kanji, raw, q, qRomaji);
    if (score > 0) scored.push({ kanji, score, index });
  });

  // Sort by score (desc); break ties by original index to keep frequency order.
  scored.sort((a, b) => b.score - a.score || a.index - b.index);

  return scored.map((entry) => entry.kanji);
}
