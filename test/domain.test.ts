import { describe, expect, it } from 'vitest';
import { matchesAnyReading } from '@/domain/romaji';
import { accuracy, initialSession, recordAnswer } from '@/domain/quiz/session';

describe('permissive romaji checking', () => {
  it('accepts any valid reading of an item', () => {
    expect(matchesAnyReading('shi', ['shi', 'si'])).toBe(true);
    expect(matchesAnyReading('si', ['shi', 'si'])).toBe(true);
    expect(matchesAnyReading('SHI', ['shi', 'si'])).toBe(true); // case-insensitive
    expect(matchesAnyReading('  fu ', ['fu', 'hu'])).toBe(true); // trims
  });

  it('does not disambiguate ji -> じ vs ぢ (both accept "ji")', () => {
    expect(matchesAnyReading('ji', ['ji', 'zi'])).toBe(true); // じ
    expect(matchesAnyReading('ji', ['ji', 'di'])).toBe(true); // ぢ
  });

  it('rejects empty or wrong input', () => {
    expect(matchesAnyReading('', ['a'])).toBe(false);
    expect(matchesAnyReading('ka', ['shi', 'si'])).toBe(false);
  });
});

describe('session and streaks', () => {
  it('increments the streak on correct answers and resets on a miss', () => {
    let s = initialSession;
    s = recordAnswer(s, true);
    s = recordAnswer(s, true);
    expect(s.currentStreak).toBe(2);
    expect(s.bestStreak).toBe(2);
    s = recordAnswer(s, false);
    expect(s.currentStreak).toBe(0);
    expect(s.bestStreak).toBe(2); // best is preserved
  });

  it('computes accuracy', () => {
    let s = initialSession;
    expect(accuracy(s)).toBe(0);
    s = recordAnswer(s, true);
    s = recordAnswer(s, false);
    expect(accuracy(s)).toBe(0.5);
  });
});
