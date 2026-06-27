import { describe, expect, it } from 'vitest';
import { KANA_CHART, resolveCell, sectionsFor } from '@/domain/reference/kanaChart';
import { KANA_ITEMS } from '@/domain/characters/kana';

describe('kana chart layout', () => {
  it('resolves every non-gap cell to a dataset item', () => {
    for (const section of KANA_CHART) {
      for (const row of section.rows) {
        for (const cell of row) {
          if (cell.hiragana) expect(resolveCell(cell, 'hiragana')).toBeDefined();
          if (cell.katakana) expect(resolveCell(cell, 'katakana')).toBeDefined();
        }
      }
    }
  });

  it('does not orphan any dataset glyph (every item appears in the chart)', () => {
    const charted = new Set<string>();
    for (const section of KANA_CHART) {
      for (const row of section.rows) {
        for (const cell of row) {
          if (cell.hiragana) charted.add(`hiragana:${cell.hiragana}`);
          if (cell.katakana) charted.add(`katakana:${cell.katakana}`);
        }
      }
    }
    for (const item of KANA_ITEMS) expect(charted.has(item.id)).toBe(true);
  });

  it('exposes the extended section only for katakana', () => {
    expect(sectionsFor('katakana')).toContain('extended');
    expect(sectionsFor('hiragana')).not.toContain('extended');
  });
});
