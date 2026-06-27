import type { CharacterCategory, Didactics, KanaItem } from '../types';

/**
 * @file Compact source of truth for the kana dataset.
 *
 * @remarks
 * Each {@link KanaRow} defines the hiragana/katakana pair that shares a romaji;
 * {@link expand} turns rows into {@link KanaItem}s. Adding a sound is adding a
 * row, romaji is never duplicated, and the irregular readings (shi, chi, tsu, fu)
 * are written once. `hira`/`kata` may be `null` when a sound exists in only one
 * syllabary (e.g. extended katakana has no hiragana counterpart).
 *
 * @packageDocumentation
 */

/** A single row of the compact kana tables. */
interface KanaRow {
  hira: string | null;
  kata: string | null;
  /** Accepted romanizations; primary first (enables permissive checking). */
  romaji: readonly string[];
  category: CharacterCategory;
}

// --- Basics (gojūon) ----------------------------------------------------------
const BASE: readonly KanaRow[] = [
  { hira: 'あ', kata: 'ア', romaji: ['a'], category: 'base' },
  { hira: 'い', kata: 'イ', romaji: ['i'], category: 'base' },
  { hira: 'う', kata: 'ウ', romaji: ['u'], category: 'base' },
  { hira: 'え', kata: 'エ', romaji: ['e'], category: 'base' },
  { hira: 'お', kata: 'オ', romaji: ['o'], category: 'base' },
  { hira: 'か', kata: 'カ', romaji: ['ka'], category: 'base' },
  { hira: 'き', kata: 'キ', romaji: ['ki'], category: 'base' },
  { hira: 'く', kata: 'ク', romaji: ['ku'], category: 'base' },
  { hira: 'け', kata: 'ケ', romaji: ['ke'], category: 'base' },
  { hira: 'こ', kata: 'コ', romaji: ['ko'], category: 'base' },
  { hira: 'さ', kata: 'サ', romaji: ['sa'], category: 'base' },
  { hira: 'し', kata: 'シ', romaji: ['shi', 'si'], category: 'base' },
  { hira: 'す', kata: 'ス', romaji: ['su'], category: 'base' },
  { hira: 'せ', kata: 'セ', romaji: ['se'], category: 'base' },
  { hira: 'そ', kata: 'ソ', romaji: ['so'], category: 'base' },
  { hira: 'た', kata: 'タ', romaji: ['ta'], category: 'base' },
  { hira: 'ち', kata: 'チ', romaji: ['chi', 'ti'], category: 'base' },
  { hira: 'つ', kata: 'ツ', romaji: ['tsu', 'tu'], category: 'base' },
  { hira: 'て', kata: 'テ', romaji: ['te'], category: 'base' },
  { hira: 'と', kata: 'ト', romaji: ['to'], category: 'base' },
  { hira: 'な', kata: 'ナ', romaji: ['na'], category: 'base' },
  { hira: 'に', kata: 'ニ', romaji: ['ni'], category: 'base' },
  { hira: 'ぬ', kata: 'ヌ', romaji: ['nu'], category: 'base' },
  { hira: 'ね', kata: 'ネ', romaji: ['ne'], category: 'base' },
  { hira: 'の', kata: 'ノ', romaji: ['no'], category: 'base' },
  { hira: 'は', kata: 'ハ', romaji: ['ha'], category: 'base' },
  { hira: 'ひ', kata: 'ヒ', romaji: ['hi'], category: 'base' },
  { hira: 'ふ', kata: 'フ', romaji: ['fu', 'hu'], category: 'base' },
  { hira: 'へ', kata: 'ヘ', romaji: ['he'], category: 'base' },
  { hira: 'ほ', kata: 'ホ', romaji: ['ho'], category: 'base' },
  { hira: 'ま', kata: 'マ', romaji: ['ma'], category: 'base' },
  { hira: 'み', kata: 'ミ', romaji: ['mi'], category: 'base' },
  { hira: 'む', kata: 'ム', romaji: ['mu'], category: 'base' },
  { hira: 'め', kata: 'メ', romaji: ['me'], category: 'base' },
  { hira: 'も', kata: 'モ', romaji: ['mo'], category: 'base' },
  { hira: 'や', kata: 'ヤ', romaji: ['ya'], category: 'base' },
  { hira: 'ゆ', kata: 'ユ', romaji: ['yu'], category: 'base' },
  { hira: 'よ', kata: 'ヨ', romaji: ['yo'], category: 'base' },
  { hira: 'ら', kata: 'ラ', romaji: ['ra'], category: 'base' },
  { hira: 'り', kata: 'リ', romaji: ['ri'], category: 'base' },
  { hira: 'る', kata: 'ル', romaji: ['ru'], category: 'base' },
  { hira: 'れ', kata: 'レ', romaji: ['re'], category: 'base' },
  { hira: 'ろ', kata: 'ロ', romaji: ['ro'], category: 'base' },
  { hira: 'わ', kata: 'ワ', romaji: ['wa'], category: 'base' },
  { hira: 'を', kata: 'ヲ', romaji: ['wo', 'o'], category: 'base' },
  { hira: 'ん', kata: 'ン', romaji: ['n', 'nn'], category: 'base' },
];

// --- Dakuten and handakuten ---------------------------------------------------
const DAKUTEN: readonly KanaRow[] = [
  { hira: 'が', kata: 'ガ', romaji: ['ga'], category: 'dakuten' },
  { hira: 'ぎ', kata: 'ギ', romaji: ['gi'], category: 'dakuten' },
  { hira: 'ぐ', kata: 'グ', romaji: ['gu'], category: 'dakuten' },
  { hira: 'げ', kata: 'ゲ', romaji: ['ge'], category: 'dakuten' },
  { hira: 'ご', kata: 'ゴ', romaji: ['go'], category: 'dakuten' },
  { hira: 'ざ', kata: 'ザ', romaji: ['za'], category: 'dakuten' },
  { hira: 'じ', kata: 'ジ', romaji: ['ji', 'zi'], category: 'dakuten' },
  { hira: 'ず', kata: 'ズ', romaji: ['zu'], category: 'dakuten' },
  { hira: 'ぜ', kata: 'ゼ', romaji: ['ze'], category: 'dakuten' },
  { hira: 'ぞ', kata: 'ゾ', romaji: ['zo'], category: 'dakuten' },
  { hira: 'だ', kata: 'ダ', romaji: ['da'], category: 'dakuten' },
  { hira: 'ぢ', kata: 'ヂ', romaji: ['ji', 'di'], category: 'dakuten' },
  { hira: 'づ', kata: 'ヅ', romaji: ['zu', 'dzu'], category: 'dakuten' },
  { hira: 'で', kata: 'デ', romaji: ['de'], category: 'dakuten' },
  { hira: 'ど', kata: 'ド', romaji: ['do'], category: 'dakuten' },
  { hira: 'ば', kata: 'バ', romaji: ['ba'], category: 'dakuten' },
  { hira: 'び', kata: 'ビ', romaji: ['bi'], category: 'dakuten' },
  { hira: 'ぶ', kata: 'ブ', romaji: ['bu'], category: 'dakuten' },
  { hira: 'べ', kata: 'ベ', romaji: ['be'], category: 'dakuten' },
  { hira: 'ぼ', kata: 'ボ', romaji: ['bo'], category: 'dakuten' },
  { hira: 'ぱ', kata: 'パ', romaji: ['pa'], category: 'handakuten' },
  { hira: 'ぴ', kata: 'ピ', romaji: ['pi'], category: 'handakuten' },
  { hira: 'ぷ', kata: 'プ', romaji: ['pu'], category: 'handakuten' },
  { hira: 'ぺ', kata: 'ペ', romaji: ['pe'], category: 'handakuten' },
  { hira: 'ぽ', kata: 'ポ', romaji: ['po'], category: 'handakuten' },
];

// --- Yōon (combined) ----------------------------------------------------------
const YOON: readonly KanaRow[] = [
  { hira: 'きゃ', kata: 'キャ', romaji: ['kya'], category: 'yoon' },
  { hira: 'きゅ', kata: 'キュ', romaji: ['kyu'], category: 'yoon' },
  { hira: 'きょ', kata: 'キョ', romaji: ['kyo'], category: 'yoon' },
  { hira: 'しゃ', kata: 'シャ', romaji: ['sha', 'sya'], category: 'yoon' },
  { hira: 'しゅ', kata: 'シュ', romaji: ['shu', 'syu'], category: 'yoon' },
  { hira: 'しょ', kata: 'ショ', romaji: ['sho', 'syo'], category: 'yoon' },
  { hira: 'ちゃ', kata: 'チャ', romaji: ['cha', 'tya'], category: 'yoon' },
  { hira: 'ちゅ', kata: 'チュ', romaji: ['chu', 'tyu'], category: 'yoon' },
  { hira: 'ちょ', kata: 'チョ', romaji: ['cho', 'tyo'], category: 'yoon' },
  { hira: 'にゃ', kata: 'ニャ', romaji: ['nya'], category: 'yoon' },
  { hira: 'にゅ', kata: 'ニュ', romaji: ['nyu'], category: 'yoon' },
  { hira: 'にょ', kata: 'ニョ', romaji: ['nyo'], category: 'yoon' },
  { hira: 'ひゃ', kata: 'ヒャ', romaji: ['hya'], category: 'yoon' },
  { hira: 'ひゅ', kata: 'ヒュ', romaji: ['hyu'], category: 'yoon' },
  { hira: 'ひょ', kata: 'ヒョ', romaji: ['hyo'], category: 'yoon' },
  { hira: 'みゃ', kata: 'ミャ', romaji: ['mya'], category: 'yoon' },
  { hira: 'みゅ', kata: 'ミュ', romaji: ['myu'], category: 'yoon' },
  { hira: 'みょ', kata: 'ミョ', romaji: ['myo'], category: 'yoon' },
  { hira: 'りゃ', kata: 'リャ', romaji: ['rya'], category: 'yoon' },
  { hira: 'りゅ', kata: 'リュ', romaji: ['ryu'], category: 'yoon' },
  { hira: 'りょ', kata: 'リョ', romaji: ['ryo'], category: 'yoon' },
  { hira: 'ぎゃ', kata: 'ギャ', romaji: ['gya'], category: 'yoon' },
  { hira: 'ぎゅ', kata: 'ギュ', romaji: ['gyu'], category: 'yoon' },
  { hira: 'ぎょ', kata: 'ギョ', romaji: ['gyo'], category: 'yoon' },
  { hira: 'じゃ', kata: 'ジャ', romaji: ['ja', 'jya'], category: 'yoon' },
  { hira: 'じゅ', kata: 'ジュ', romaji: ['ju', 'jyu'], category: 'yoon' },
  { hira: 'じょ', kata: 'ジョ', romaji: ['jo', 'jyo'], category: 'yoon' },
  { hira: 'びゃ', kata: 'ビャ', romaji: ['bya'], category: 'yoon' },
  { hira: 'びゅ', kata: 'ビュ', romaji: ['byu'], category: 'yoon' },
  { hira: 'びょ', kata: 'ビョ', romaji: ['byo'], category: 'yoon' },
  { hira: 'ぴゃ', kata: 'ピャ', romaji: ['pya'], category: 'yoon' },
  { hira: 'ぴゅ', kata: 'ピュ', romaji: ['pyu'], category: 'yoon' },
  { hira: 'ぴょ', kata: 'ピョ', romaji: ['pyo'], category: 'yoon' },
];

// --- Extended katakana (katakana only) ---------------------------------------
const EXTENDED: readonly KanaRow[] = [
  { hira: null, kata: 'ヴ', romaji: ['vu'], category: 'extended' },
  { hira: null, kata: 'ファ', romaji: ['fa'], category: 'extended' },
  { hira: null, kata: 'フィ', romaji: ['fi'], category: 'extended' },
  { hira: null, kata: 'フェ', romaji: ['fe'], category: 'extended' },
  { hira: null, kata: 'フォ', romaji: ['fo'], category: 'extended' },
  { hira: null, kata: 'ティ', romaji: ['ti'], category: 'extended' },
  { hira: null, kata: 'ディ', romaji: ['di'], category: 'extended' },
  { hira: null, kata: 'ウィ', romaji: ['wi'], category: 'extended' },
  { hira: null, kata: 'ウェ', romaji: ['we'], category: 'extended' },
  { hira: null, kata: 'ウォ', romaji: ['wo'], category: 'extended' },
  { hira: null, kata: 'シェ', romaji: ['she'], category: 'extended' },
  { hira: null, kata: 'ジェ', romaji: ['je'], category: 'extended' },
  { hira: null, kata: 'チェ', romaji: ['che'], category: 'extended' },
  { hira: null, kata: 'ツァ', romaji: ['tsa'], category: 'extended' },
];

// --- Obsolete -----------------------------------------------------------------
const OBSOLETE: readonly KanaRow[] = [
  { hira: 'ゐ', kata: 'ヰ', romaji: ['wi'], category: 'obsolete' },
  { hira: 'ゑ', kata: 'ヱ', romaji: ['we'], category: 'obsolete' },
];

/**
 * Per-ITEM didactic content, optional and filled in incrementally. Indexed by
 * primary romaji so it is decoupled from the tables above. A few samples here;
 * the rest is completed over time. Every string is localized.
 */
const DIDACTICS_BY_ROMAJI: Readonly<Record<string, Didactics>> = {
  ki: {
    mnemonic: {
      en: '「き」 looks like a key → ki.',
      es: '「き」 recuerda a una llave (key → ki).',
    },
  },
  ha: {
    short: {
      en: 'ha (pronounced "wa" when used as the topic particle).',
      es: 'ha (suena "wa" cuando funciona como partícula de tema).',
    },
    mnemonic: {
      en: '「は」 looks like a lectern holding a sheet: ha.',
      es: '「は」 parece un atril con una hoja: ha.',
    },
  },
  no: {
    mnemonic: {
      en: '「の」 is a swirl, a "no entry" sign: no.',
      es: '「の」 es un remolino, "no entry": no.',
    },
  },
};

const ALL_ROWS: readonly KanaRow[] = [...BASE, ...DAKUTEN, ...YOON, ...EXTENDED, ...OBSOLETE];

/**
 * Build one {@link KanaItem} from a glyph and its row.
 *
 * @param glyph - The specific glyph (hiragana or katakana form).
 * @param kind - Which syllabary the glyph belongs to.
 * @param row - The source row (provides romaji, category).
 * @returns The expanded item, with an id encoding the glyph for uniqueness.
 */
function toItem(glyph: string, kind: 'hiragana' | 'katakana', row: KanaRow): KanaItem {
  const primary = row.romaji[0] ?? '';
  const didactics = DIDACTICS_BY_ROMAJI[primary];
  return {
    id: `${kind}:${glyph}`, // the glyph guarantees uniqueness (じ ≠ ぢ)
    kind,
    category: row.category,
    glyph,
    romaji: row.romaji,
    tags: [row.category],
    ...(didactics ? { didactics } : {}),
  };
}

/**
 * Expand compact rows into individual hiragana/katakana items.
 *
 * @param rows - Compact source rows.
 * @returns One item per non-null glyph in each row.
 */
function expand(rows: readonly KanaRow[]): KanaItem[] {
  const items: KanaItem[] = [];
  for (const row of rows) {
    if (row.hira) items.push(toItem(row.hira, 'hiragana', row));
    if (row.kata) items.push(toItem(row.kata, 'katakana', row));
  }
  return items;
}

/** The full kana dataset, expanded and ready to filter. */
export const KANA_ITEMS: readonly KanaItem[] = expand(ALL_ROWS);
