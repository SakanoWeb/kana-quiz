/**
 * @file Searchable, infinitely-scrolling kanji browser (loads the full dataset).
 *
 * @packageDocumentation
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BrowseKanji } from '@/domain/characters/kanjiSource';
import { searchKanji } from '@/domain/reference/kanjiSearch';
import { useI18n } from '@/state/i18n';
import { KanjiDetailModal } from './KanjiDetailModal';
import { useKanjiData } from './useKanjiData';

/** How many cards to reveal per page. */
const PAGE_SIZE = 60;
/** Distance from the bottom (px) at which the next page loads. */
const LOAD_THRESHOLD = 700;

/**
 * Kanji browser: a searchable, infinitely-scrolling grid over the full kanji
 * dataset (loaded at runtime), whose cards open a detail dialog.
 *
 * @remarks Search runs over the ENTIRE dataset. The visible window grows as the
 * page nears the bottom and via a "Load more" fallback button; it resets when the
 * query changes.
 *
 * @returns The kanji browser view.
 */
export function KanjiBrowse(): JSX.Element {
  const { t, locale } = useI18n();
  const { status, kanji } = useKanjiData();
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<BrowseKanji | null>(null);

  const filtered = useMemo(() => searchKanji(kanji, query), [kanji, query]);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length));
  }, [filtered.length]);

  // Reset the window when the result set changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, kanji]);

  // Grow the window as the page nears the bottom.
  useEffect(() => {
    if (!hasMore) return;
    const onScroll = (): void => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - LOAD_THRESHOLD;
      if (nearBottom) loadMore();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hasMore, loadMore]);

  return (
    <div className="browse-view">
      <div className="row row--between" style={{ marginBottom: '1rem' }}>
        <Link to="/browse" className="btn btn--ghost" style={{ padding: '0.3rem 0.8rem' }}>
          {t('browse.back')}
        </Link>
        <span className="category__concept">
          {status === 'loading' ? t('browse.loading') : t('browse.resultCount', { count: filtered.length })}
        </span>
      </div>

      {locale === 'es' && (
        <p className="notice notice--info">{t('browse.kanjiEnglishOnly')}</p>
      )}

      <input
        type="search"
        className="kanji-search"
        placeholder={t('browse.searchPlaceholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        aria-label={t('browse.searchPlaceholder')}
        disabled={status === 'loading'}
      />

      {status === 'error' && <p className="category__concept">{t('browse.loadError')}</p>}

      {status === 'loading' ? (
        <p className="notice">{t('browse.loading')}</p>
      ) : filtered.length === 0 ? (
        <p className="notice">{t('browse.noResults')}</p>
      ) : (
        <div className="kanji-grid">
          {visible.map((kanjiItem) => (
            <button
              key={kanjiItem.glyph}
              type="button"
              className="kanji-card"
              onClick={() => setSelected(kanjiItem)}
            >
              <span className="kanji-card__glyph">{kanjiItem.glyph}</span>
              <span className="kanji-card__meaning">{kanjiItem.meanings[0]}</span>
            </button>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="kanji-sentinel">
          <button type="button" className="btn btn--ghost" onClick={loadMore}>
            {t('browse.loadMore')}
          </button>
        </div>
      )}

      {selected && <KanjiDetailModal kanji={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
