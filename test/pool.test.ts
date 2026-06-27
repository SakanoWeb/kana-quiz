import { describe, expect, it } from 'vitest';
import { KANA_ITEMS } from '@/domain/characters/kana';
import { ALL_ITEMS } from '@/domain/characters';
import { filterPool } from '@/domain/pool/filter';

describe('kana dataset', () => {
  it('has the expected number of base hiragana and katakana', () => {
    const baseHiragana = KANA_ITEMS.filter((k) => k.kind === 'hiragana' && k.category === 'base');
    const baseKatakana = KANA_ITEMS.filter((k) => k.kind === 'katakana' && k.category === 'base');
    expect(baseHiragana).toHaveLength(46);
    expect(baseKatakana).toHaveLength(46);
  });

  it('uses unique ids (じ and ぢ do not collide)', () => {
    const ids = KANA_ITEMS.map((k) => k.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain('hiragana:じ');
    expect(ids).toContain('hiragana:ぢ');
  });

  it('expands to the expected total count', () => {
    // 92 base + 50 dakuten/handakuten + 66 yoon + 14 extended + 4 obsolete = 226
    expect(KANA_ITEMS.length).toBe(226);
  });
});

describe('filterPool', () => {
  it('returns nothing when no kind or no category is selected', () => {
    expect(
      filterPool(ALL_ITEMS, { kinds: new Set(), categories: new Set(['base']) }),
    ).toHaveLength(0);
    expect(
      filterPool(ALL_ITEMS, { kinds: new Set(['hiragana']), categories: new Set() }),
    ).toHaveLength(0);
  });

  it('returns only the matching intersection', () => {
    const pool = filterPool(ALL_ITEMS, {
      kinds: new Set(['hiragana']),
      categories: new Set(['base']),
    });
    expect(pool).toHaveLength(46);
    expect(pool.every((i) => i.kind === 'hiragana' && i.category === 'base')).toBe(true);
  });
});
