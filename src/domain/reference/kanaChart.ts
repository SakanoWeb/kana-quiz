/**
 * @file Standardized kana reference layout (gojūon chart + variations).
 *
 * @remarks
 * This module owns *layout* only: which glyph sits in which grid cell. The
 * learning *content* (readings, didactics) is resolved against {@link KANA_ITEMS}
 * by glyph, so there is a single source of truth for the data. A parity test
 * (`test/kanaChart.test.ts`) asserts that every glyph here exists in the dataset
 * and that no dataset glyph is orphaned, preventing divergence.
 *
 * @packageDocumentation
 */

import type { CharacterKind, KanaItem } from '../types';
import { KANA_ITEMS } from '../characters/kana';

/** One position in a kana chart. A fully-null cell renders as an empty gap. */
export interface ChartCell {
  /** Hiragana glyph, or `null` if this cell has no hiragana / is a gap. */
  readonly hiragana: string | null;
  /** Katakana glyph, or `null` if this cell has no katakana / is a gap. */
  readonly katakana: string | null;
  /** Primary romaji label, or `null` for a gap. */
  readonly romaji: string | null;
}

/** Identifier of a chart section, aligned with {@link CharacterCategory}. */
export type ChartSectionId = 'gojuon' | 'dakuten' | 'handakuten' | 'yoon' | 'extended' | 'obsolete';

/** A titled block of chart rows. */
export interface ChartSection {
  /** Section id (used to look up its localized title). */
  readonly id: ChartSectionId;
  /** Rows of cells, in standard reading order. */
  readonly rows: readonly (readonly ChartCell[])[];
}

/** Build a populated cell. */
const c = (hiragana: string | null, katakana: string | null, romaji: string): ChartCell => ({
  hiragana,
  katakana,
  romaji,
});

/** An empty gap cell (e.g. the holes in the や and わ rows). */
const gap: ChartCell = { hiragana: null, katakana: null, romaji: null };

/**
 * The complete standardized kana chart: the gojūon grid followed by the
 * variation sections. Katakana-only sounds (extended) carry `null` hiragana.
 */
export const KANA_CHART: readonly ChartSection[] = [
  {
    id: 'gojuon',
    rows: [
      [c('あ', 'ア', 'a'), c('い', 'イ', 'i'), c('う', 'ウ', 'u'), c('え', 'エ', 'e'), c('お', 'オ', 'o')],
      [c('か', 'カ', 'ka'), c('き', 'キ', 'ki'), c('く', 'ク', 'ku'), c('け', 'ケ', 'ke'), c('こ', 'コ', 'ko')],
      [c('さ', 'サ', 'sa'), c('し', 'シ', 'shi'), c('す', 'ス', 'su'), c('せ', 'セ', 'se'), c('そ', 'ソ', 'so')],
      [c('た', 'タ', 'ta'), c('ち', 'チ', 'chi'), c('つ', 'ツ', 'tsu'), c('て', 'テ', 'te'), c('と', 'ト', 'to')],
      [c('な', 'ナ', 'na'), c('に', 'ニ', 'ni'), c('ぬ', 'ヌ', 'nu'), c('ね', 'ネ', 'ne'), c('の', 'ノ', 'no')],
      [c('は', 'ハ', 'ha'), c('ひ', 'ヒ', 'hi'), c('ふ', 'フ', 'fu'), c('へ', 'ヘ', 'he'), c('ほ', 'ホ', 'ho')],
      [c('ま', 'マ', 'ma'), c('み', 'ミ', 'mi'), c('む', 'ム', 'mu'), c('め', 'メ', 'me'), c('も', 'モ', 'mo')],
      [c('や', 'ヤ', 'ya'), gap, c('ゆ', 'ユ', 'yu'), gap, c('よ', 'ヨ', 'yo')],
      [c('ら', 'ラ', 'ra'), c('り', 'リ', 'ri'), c('る', 'ル', 'ru'), c('れ', 'レ', 're'), c('ろ', 'ロ', 'ro')],
      [c('わ', 'ワ', 'wa'), gap, gap, gap, c('を', 'ヲ', 'wo')],
      [c('ん', 'ン', 'n'), gap, gap, gap, gap],
    ],
  },
  {
    id: 'dakuten',
    rows: [
      [c('が', 'ガ', 'ga'), c('ぎ', 'ギ', 'gi'), c('ぐ', 'グ', 'gu'), c('げ', 'ゲ', 'ge'), c('ご', 'ゴ', 'go')],
      [c('ざ', 'ザ', 'za'), c('じ', 'ジ', 'ji'), c('ず', 'ズ', 'zu'), c('ぜ', 'ゼ', 'ze'), c('ぞ', 'ゾ', 'zo')],
      [c('だ', 'ダ', 'da'), c('ぢ', 'ヂ', 'ji'), c('づ', 'ヅ', 'zu'), c('で', 'デ', 'de'), c('ど', 'ド', 'do')],
      [c('ば', 'バ', 'ba'), c('び', 'ビ', 'bi'), c('ぶ', 'ブ', 'bu'), c('べ', 'ベ', 'be'), c('ぼ', 'ボ', 'bo')],
    ],
  },
  {
    id: 'handakuten',
    rows: [
      [c('ぱ', 'パ', 'pa'), c('ぴ', 'ピ', 'pi'), c('ぷ', 'プ', 'pu'), c('ぺ', 'ペ', 'pe'), c('ぽ', 'ポ', 'po')],
    ],
  },
  {
    id: 'yoon',
    rows: [
      [c('きゃ', 'キャ', 'kya'), c('きゅ', 'キュ', 'kyu'), c('きょ', 'キョ', 'kyo')],
      [c('しゃ', 'シャ', 'sha'), c('しゅ', 'シュ', 'shu'), c('しょ', 'ショ', 'sho')],
      [c('ちゃ', 'チャ', 'cha'), c('ちゅ', 'チュ', 'chu'), c('ちょ', 'チョ', 'cho')],
      [c('にゃ', 'ニャ', 'nya'), c('にゅ', 'ニュ', 'nyu'), c('にょ', 'ニョ', 'nyo')],
      [c('ひゃ', 'ヒャ', 'hya'), c('ひゅ', 'ヒュ', 'hyu'), c('ひょ', 'ヒョ', 'hyo')],
      [c('みゃ', 'ミャ', 'mya'), c('みゅ', 'ミュ', 'myu'), c('みょ', 'ミョ', 'myo')],
      [c('りゃ', 'リャ', 'rya'), c('りゅ', 'リュ', 'ryu'), c('りょ', 'リョ', 'ryo')],
      [c('ぎゃ', 'ギャ', 'gya'), c('ぎゅ', 'ギュ', 'gyu'), c('ぎょ', 'ギョ', 'gyo')],
      [c('じゃ', 'ジャ', 'ja'), c('じゅ', 'ジュ', 'ju'), c('じょ', 'ジョ', 'jo')],
      [c('びゃ', 'ビャ', 'bya'), c('びゅ', 'ビュ', 'byu'), c('びょ', 'ビョ', 'byo')],
      [c('ぴゃ', 'ピャ', 'pya'), c('ぴゅ', 'ピュ', 'pyu'), c('ぴょ', 'ピョ', 'pyo')],
    ],
  },
  {
    id: 'extended',
    rows: [
      [c(null, 'ヴ', 'vu'), c(null, 'ファ', 'fa'), c(null, 'フィ', 'fi'), c(null, 'フェ', 'fe'), c(null, 'フォ', 'fo')],
      [c(null, 'ティ', 'ti'), c(null, 'ディ', 'di'), c(null, 'ウィ', 'wi'), c(null, 'ウェ', 'we'), c(null, 'ウォ', 'wo')],
      [c(null, 'シェ', 'she'), c(null, 'ジェ', 'je'), c(null, 'チェ', 'che'), c(null, 'ツァ', 'tsa')],
    ],
  },
  {
    id: 'obsolete',
    rows: [[c('ゐ', 'ヰ', 'wi'), c('ゑ', 'ヱ', 'we')]],
  },
];

/** Per-kind glyph → item indexes, built once. */
const BY_GLYPH: Record<'hiragana' | 'katakana', ReadonlyMap<string, KanaItem>> = {
  hiragana: new Map(KANA_ITEMS.filter((i) => i.kind === 'hiragana').map((i) => [i.glyph, i])),
  katakana: new Map(KANA_ITEMS.filter((i) => i.kind === 'katakana').map((i) => [i.glyph, i])),
};

/**
 * The glyph a cell shows for a given syllabary.
 *
 * @param cell - A chart cell.
 * @param kind - `'hiragana'` or `'katakana'`.
 * @returns The glyph, or `null` for a gap / missing syllabary.
 */
export function cellGlyph(cell: ChartCell, kind: 'hiragana' | 'katakana'): string | null {
  return kind === 'hiragana' ? cell.hiragana : cell.katakana;
}

/**
 * Resolve the dataset item backing a cell, for detail display.
 *
 * @param cell - A chart cell.
 * @param kind - `'hiragana'` or `'katakana'`.
 * @returns The matching {@link KanaItem}, or `undefined` for gaps.
 */
export function resolveCell(cell: ChartCell, kind: 'hiragana' | 'katakana'): KanaItem | undefined {
  const glyph = cellGlyph(cell, kind);
  return glyph ? BY_GLYPH[kind].get(glyph) : undefined;
}

/** Section ids that exist for the given syllabary (extended is katakana-only). */
export function sectionsFor(kind: CharacterKind): readonly ChartSectionId[] {
  const all: ChartSectionId[] = ['gojuon', 'dakuten', 'handakuten', 'yoon', 'extended', 'obsolete'];
  return kind === 'katakana' ? all : all.filter((id) => id !== 'extended');
}
