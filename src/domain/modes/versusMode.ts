/**
 * @file Versus mode: pick the correct glyph out of two.
 *
 * @packageDocumentation
 */

import type { LearnItem, Settings } from '../types';
import { readingsOf } from '../types';
import type { Answer, ChoiceOption, ModeContext, Question, QuizMode, Result } from './types';
import { sampleDistinct } from './random';

/**
 * Versus mode.
 *
 * @remarks Distractors are drawn from the active pool with the same kind and
 * category as the target so the comparison is fair.
 */
export const versusMode: QuizMode = {
  id: 'versus',

  supports(item: LearnItem, ctx: ModeContext): boolean {
    return siblingsOf(item, ctx.pool).length >= 1;
  },

  build(item: LearnItem, ctx: ModeContext): Question {
    const siblings = siblingsOf(item, ctx.pool);
    const [distractor] = sampleDistinct(siblings, 1, ctx.random);

    const correctOption: ChoiceOption = {
      id: item.id,
      label: item.glyph,
      glyph: item.glyph,
      reading: readingsOf(item)[0] ?? '',
    };
    const options: ChoiceOption[] = [correctOption];
    if (distractor) {
      options.push({
        id: distractor.id,
        label: distractor.glyph,
        glyph: distractor.glyph,
        reading: readingsOf(distractor)[0] ?? '',
      });
    }
    if (ctx.random() < 0.5) options.reverse();

    const reading = readingsOf(item)[0] ?? '';
    return {
      id: `versus:${item.id}`,
      modeId: this.id,
      item,
      inputKind: 'choice',
      options,
      correctOptionId: item.id,
      prompt: {
        text: reading,
        instructionKey: 'quiz.instruction.versus',
        instructionParams: { reading },
      },
    };
  },

  check(question: Question, answer: Answer, _settings: Settings): Result {
    if (question.inputKind !== 'choice') {
      return { correct: false, expected: question.item.glyph, given: '' };
    }
    const chosenId = answer.type === 'choice' ? answer.optionId : '';
    const chosenOption = question.options.find((option) => option.id === chosenId);
    return {
      correct: chosenId === question.correctOptionId,
      expected: question.item.glyph,
      // Show the glyph the learner actually picked, not its internal id.
      given: chosenOption?.glyph ?? chosenOption?.label ?? '',
    };
  },
};

/**
 * Find pool items that share an item's kind and category but differ in glyph.
 *
 * @param item - The target item.
 * @param pool - The active pool.
 * @returns Candidate distractors.
 */
function siblingsOf(item: LearnItem, pool: readonly LearnItem[]): LearnItem[] {
  return pool.filter(
    (other) => other.id !== item.id && other.kind === item.kind && other.category === item.category,
  );
}
