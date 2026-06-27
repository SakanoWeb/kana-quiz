/**
 * @file Transcription mode: show the romaji, type the kana.
 *
 * @packageDocumentation
 */

import type { LearnItem, Settings } from '../types';
import { isKana, readingsOf } from '../types';
import { matchesAnyReading, normalizeRomaji, toRomaji } from '../romaji';
import type { Answer, Question, QuizMode, Result } from './types';

/**
 * Transcription mode.
 *
 * @remarks Validates by reading, not by exact glyph: the typed kana is converted
 * back to romaji and compared against the item's accepted readings. This keeps
 * the ji/zu/wo homophones correct and lets a user without an IME type romaji
 * directly.
 */
export const scriptMode: QuizMode = {
  id: 'script',

  supports: (item: LearnItem) => isKana(item),

  build(item: LearnItem): Question {
    const reading = readingsOf(item)[0] ?? '';
    return {
      id: `script:${item.id}`,
      modeId: this.id,
      item,
      inputKind: 'text',
      expects: 'kana',
      prompt: {
        text: reading,
        instructionKey: 'quiz.instruction.script',
        instructionParams: { reading },
      },
    };
  },

  check(question: Question, answer: Answer, _settings: Settings): Result {
    const readings = readingsOf(question.item);
    const givenKana = answer.type === 'text' ? answer.value.trim() : '';
    const givenAsRomaji = normalizeRomaji(toRomaji(givenKana));
    return {
      correct: givenKana.length > 0 && matchesAnyReading(givenAsRomaji, readings),
      expected: question.item.glyph,
      given: givenKana,
    };
  },
};
