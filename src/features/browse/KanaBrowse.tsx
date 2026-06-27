/**
 * @file Standardized kana chart view with an optional full variation list.
 *
 * @remarks The chart is laid out with the vowels as ROWS (so the first row is all
 * the -a sounds: a, ka, sa, ...) and the consonant families as columns. This
 * makes the chart wide, so each section scrolls horizontally and the mouse wheel
 * is translated to lateral scrolling.
 *
 * @packageDocumentation
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  KANA_CHART,
  resolveCell,
  sectionsFor,
  type ChartCell,
  type ChartSectionId,
} from '@/domain/reference/kanaChart';
import type { MessageKey } from '@/i18n';
import { useI18n } from '@/state/i18n';
import { useMediaQuery, VERTICAL_CHART_QUERY } from '@/state/useMediaQuery';

/** Sections whose columns are vowel-aligned and therefore transposable. */
const VOWEL_ALIGNED: ReadonlySet<ChartSectionId> = new Set([
  'gojuon',
  'dakuten',
  'handakuten',
  'yoon',
]);

/**
 * Transpose a section's rows so vowels become rows.
 *
 * @param rows - The authored rows (one consonant family per row).
 * @returns Rows indexed by vowel position; missing cells become `null` gaps.
 */
function transpose(rows: readonly (readonly ChartCell[])[]): (ChartCell | null)[][] {
  const maxLen = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const out: (ChartCell | null)[][] = [];
  for (let col = 0; col < maxLen; col++) {
    out.push(rows.map((row) => row[col] ?? null));
  }
  return out;
}

/**
 * A single horizontally-scrollable chart section. Converts vertical mouse-wheel
 * input into lateral scrolling when the grid overflows its width.
 *
 * @param props - Component props.
 * @param props.rows - Rows of cells to render (already oriented).
 * @param props.kind - Which syllabary's glyph to show.
 * @returns The scrollable grid.
 */
function ChartGrid({
  rows,
  kind,
}: {
  rows: readonly (readonly (ChartCell | null)[])[];
  kind: 'hiragana' | 'katakana';
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent): void => {
      if (e.deltaY === 0) return;
      if (el.scrollWidth <= el.clientWidth) return; // nothing to scroll sideways
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div className="kana-chart" ref={ref}>
      {rows.map((row, rowIndex) => (
        <div className="kana-chart__row" key={rowIndex}>
          {row.map((cell, cellIndex) => {
            const item = cell ? resolveCell(cell, kind) : undefined;
            const glyph = cell ? (kind === 'hiragana' ? cell.hiragana : cell.katakana) : null;
            if (!glyph || !item) {
              return <span className="kana-cell kana-cell--gap" key={cellIndex} aria-hidden />;
            }
            return (
              <span className="kana-cell" key={cellIndex}>
                <span className="kana-cell__glyph">{glyph}</span>
                <span className="kana-cell__romaji">{item.romaji[0]}</span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/**
 * Standardized kana chart view for one syllabary.
 *
 * @remarks Shows the gojūon grid by default; a toggle reveals the full list with
 * all variations (dakuten, handakuten, yōon, extended for katakana, obsolete).
 *
 * @param props - Component props.
 * @param props.kind - Which syllabary to display.
 * @returns The chart view.
 */
export function KanaBrowse({ kind }: { kind: 'hiragana' | 'katakana' }): JSX.Element {
  const { t } = useI18n();
  const [showVariations, setShowVariations] = useState(false);
  // On phones and portrait tablets the screen is tall and narrow, so keep the
  // classic vertical orientation (consonant families as rows) and let it fill
  // the full width. On wider screens, transpose so vowels become rows.
  const verticalChart = useMediaQuery(VERTICAL_CHART_QUERY);

  const allowed = sectionsFor(kind);
  const allowedSet = new Set<ChartSectionId>(allowed);
  const sections = KANA_CHART.filter(
    (section) =>
      allowedSet.has(section.id) &&
      (showVariations || section.id === 'gojuon'),
  );

  return (
    <div className="browse-view">
      <div className="row row--between" style={{ marginBottom: '1rem' }}>
        <Link to="/browse" className="btn btn--ghost" style={{ padding: '0.3rem 0.8rem' }}>
          {t('browse.back')}
        </Link>
        <button
          type="button"
          className="chip chip--accent"
          aria-pressed={showVariations}
          onClick={() => setShowVariations((v) => !v)}
        >
          {showVariations ? t('browse.baseOnly') : t('browse.showVariations')}
        </button>
      </div>

      <h2 className="panel__title" style={{ fontSize: '1.3rem' }}>
        {kind === 'hiragana' ? t('browse.hiragana') : t('browse.katakana')}
      </h2>

      {sections.map((section) => {
        const rows =
          VOWEL_ALIGNED.has(section.id) && !verticalChart ? transpose(section.rows) : section.rows;
        return (
          <section key={section.id} className="panel">
            <h3 className="kana-section__title">
              {t(`browse.section.${section.id}` as MessageKey)}
            </h3>
            <ChartGrid rows={rows} kind={kind} />
          </section>
        );
      })}
    </div>
  );
}
