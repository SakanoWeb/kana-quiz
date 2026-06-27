/**
 * @file Hook that loads the full kanji dataset for the browse view.
 *
 * @packageDocumentation
 */

import { useEffect, useState } from 'react';
import {
  FALLBACK_KANJI,
  fetchAllKanji,
  type BrowseKanji,
} from '@/domain/characters/kanjiSource';

/** Loading status of the kanji dataset. */
export type KanjiDataStatus = 'loading' | 'ready' | 'error';

/** Result of {@link useKanjiData}. */
export interface KanjiData {
  readonly status: KanjiDataStatus;
  readonly kanji: readonly BrowseKanji[];
}

/**
 * Load the full kanji list once, exposing loading/ready/error states.
 *
 * @remarks On failure it returns the bundled fallback set so the view still
 * works, with `status: 'error'` so the UI can show a gentle notice.
 *
 * @returns The current status and the available kanji.
 */
export function useKanjiData(): KanjiData {
  const [status, setStatus] = useState<KanjiDataStatus>('loading');
  const [kanji, setKanji] = useState<readonly BrowseKanji[]>([]);

  useEffect(() => {
    let alive = true;
    fetchAllKanji()
      .then((list) => {
        if (!alive) return;
        setKanji(list);
        setStatus('ready');
      })
      .catch(() => {
        if (!alive) return;
        setKanji(FALLBACK_KANJI);
        setStatus('error');
      });
    return () => {
      alive = false;
    };
  }, []);

  return { status, kanji };
}
