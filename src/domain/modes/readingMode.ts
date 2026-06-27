/**
 * @file Reading mode: show the glyph, type the romaji.
 *
 * @packageDocumentation
 */

import type { LearnItem, Settings } from '../types';
import { readingsOf } from '../types';
import { matchesAnyReading } from '../romaji';
import type { Answer, Question, QuizMode, Result } from './types';

/**
 * Reading mode.
 *
 * @remarks The glyph is given, so checking only needs to confirm the typed
 * romaji is a valid reading of the character; no homophone disambiguation is
 * required.
 */
export const readingMode: QuizMode = {
  id: 'reading',

  supports: () => true,

  build(item: LearnItem): Question {
    return {
      id: `reading:${item.id}`,
      modeId: this.id,
      item,
      inputKind: 'text',
      expects: 'romaji',
      prompt: { glyph: item.glyph, instructionKey: 'quiz.instruction.reading' },
    };
  },

  check(question: Question, answer: Answer, _settings: Settings): Result {
    const readings = readingsOf(question.item);
    const given = answer.type === 'text' ? answer.value : '';
    return {
      correct: matchesAnyReading(given, readings),
      expected: readings[0] ?? '',
      given,
    };
  },
};
