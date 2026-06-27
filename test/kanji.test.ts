import { describe, expect, it } from 'vitest';
import { ALL_KANJI } from '@/domain/characters';
import { FALLBACK_KANJI } from '@/domain/characters/kanjiSource';
import { searchKanji } from '@/domain/reference/kanjiSearch';

describe('bundled kanji dataset', () => {
  it('has unique ids and complete localized meanings', () => {
    const ids = ALL_KANJI.map((k) => k.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const kanji of ALL_KANJI) {
      expect(kanji.meanings.en.length).toBeGreaterThan(0);
      expect(kanji.meanings.es.length).toBeGreaterThan(0);
    }
  });
});

describe('searchKanji', () => {
  it('returns the full list for an empty query', () => {
    expect(searchKanji(FALLBACK_KANJI, '')).toHaveLength(FALLBACK_KANJI.length);
  });

  it('matches by glyph', () => {
    expect(searchKanji(FALLBACK_KANJI, '日').some((k) => k.glyph === '日')).toBe(true);
  });

  it('matches by English meaning', () => {
    expect(searchKanji(FALLBACK_KANJI, 'water').some((k) => k.glyph === '水')).toBe(true);
  });

  it('matches by romaji reading', () => {
    // 山 has the kun reading やま -> "yama"
    expect(searchKanji(FALLBACK_KANJI, 'yama').some((k) => k.glyph === '山')).toBe(true);
  });

  it('ranks an exact meaning match above a substring match', () => {
    const items = [
      { glyph: 'A', meanings: ['person'], on: [], kun: [] },
      { glyph: 'B', meanings: ['son'], on: [], kun: [] },
    ];
    const result = searchKanji(items, 'son');
    expect(result[0]?.glyph).toBe('B');
    expect(result.map((k) => k.glyph)).toContain('A');
  });
});
