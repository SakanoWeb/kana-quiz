/**
 * @file Writing mode (experimental): show the romaji, draw the glyph.
 *
 * @remarks Registered but flagged experimental; currently a stub. It proves a
 * fourth, very different mode fits the same {@link QuizMode} contract without
 * touching the engine or other modes. Planned scoring: canvas pixel-overlap
 * (IoU) first, then KanjiVG stroke comparison. See `docs/ARCHITECTURE.md`.
 *
 * @packageDocumentation
 */

import type { LearnItem, Settings } from '../types';
import { readingsOf } from '../types';
import type { Answer, Question, QuizMode, Result } from './types';

/** Fraction of similarity required to count a drawing as correct. */
const PASS_THRESHOLD = 0.6;

/** Experimental drawing mode. */
export const writingMode: QuizMode = {
  id: 'writing',
  experimental: true,

  supports: () => true,

  build(item: LearnItem): Question {
    const reading = readingsOf(item)[0] ?? '';
    return {
      id: `writing:${item.id}`,
      modeId: this.id,
      item,
      inputKind: 'drawing',
      promptRomaji: reading,
      prompt: {
        text: reading,
        instructionKey: 'quiz.instruction.writing',
        instructionParams: { reading },
      },
    };
  },

  check(question: Question, answer: Answer, _settings: Settings): Result {
    const score = answer.type === 'drawing' ? answer.score : 0;
    return {
      correct: score >= PASS_THRESHOLD,
      expected: question.item.glyph,
      given: `${Math.round(score * 100)}%`,
    };
  },
};
