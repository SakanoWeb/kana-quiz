/**
 * @file The mode contract and its question/answer/result types.
 *
 * @remarks
 * A mode turns an item into a {@link Question} and validates the {@link Answer}.
 * The UI renders a question purely from its `inputKind`; the engine only
 * orchestrates selection. Adding a mode therefore means implementing
 * {@link QuizMode} and registering it — nothing else changes.
 *
 * Modes emit no prose: a {@link Prompt} carries an i18n `instructionKey` plus
 * params, and the UI renders the localized text. This keeps the domain free of
 * UI strings and lets a language switch update the on-screen instruction live.
 *
 * @packageDocumentation
 */

import type { LearnItem, Settings } from '../types';
import type { PoolSelection } from '../pool/filter';

/** Input type a question requires; selects the UI control. */
export type InputKind = 'text' | 'choice' | 'drawing';

/** Parameters interpolated into a localized instruction (e.g. `{ reading: 'ka' }`). */
export type PromptParams = Readonly<Record<string, string | number>>;

/** What is shown as the prompt for a question. */
export interface Prompt {
  /** Large glyph to display, if any. */
  readonly glyph?: string;
  /** Plain text to display (e.g. a romaji reading), if any. */
  readonly text?: string;
  /** i18n key for the instruction; rendered by the UI. */
  readonly instructionKey: string;
  /** Optional interpolation params for the instruction. */
  readonly instructionParams?: PromptParams;
}

/** Fields shared by every question. */
interface QuestionBase {
  readonly id: string;
  readonly modeId: string;
  readonly item: LearnItem;
  readonly prompt: Prompt;
}

/** A question answered by typing text. */
export interface TextQuestion extends QuestionBase {
  readonly inputKind: 'text';
  /** What the learner is expected to type. */
  readonly expects: 'romaji' | 'kana';
}

/** A single selectable option in a choice question. */
export interface ChoiceOption {
  readonly id: string;
  readonly label: string;
  readonly glyph?: string;
  /** Primary romaji reading, revealed after answering so the learner can see
   *  what each option actually was (including the one they wrongly picked). */
  readonly reading?: string;
}

/** A question answered by choosing one option. */
export interface ChoiceQuestion extends QuestionBase {
  readonly inputKind: 'choice';
  readonly options: readonly ChoiceOption[];
  readonly correctOptionId: string;
}

/** A question answered by drawing the glyph. */
export interface DrawingQuestion extends QuestionBase {
  readonly inputKind: 'drawing';
  /** Romaji hint the learner draws from. */
  readonly promptRomaji: string;
}

/** Discriminated union of all question shapes. */
export type Question = TextQuestion | ChoiceQuestion | DrawingQuestion;

/** A learner's answer, discriminated by input type. */
export type Answer =
  | { readonly type: 'text'; readonly value: string }
  | { readonly type: 'choice'; readonly optionId: string }
  | { readonly type: 'drawing'; readonly score: number };

/** The outcome of validating an answer. */
export interface Result {
  /** Whether the answer was correct. */
  readonly correct: boolean;
  /** The expected value, shown on reveal. */
  readonly expected: string;
  /** What the learner actually gave. */
  readonly given: string;
}

/** Context passed to a mode while building a question. */
export interface ModeContext {
  /** Items currently in the pool, used to build plausible distractors. */
  readonly pool: readonly LearnItem[];
  readonly selection: PoolSelection;
  /** Injectable RNG for deterministic tests. */
  readonly random: () => number;
}

/** A practice mode. */
export interface QuizMode {
  readonly id: string;
  /** When set, the UI flags the mode as experimental. */
  readonly experimental?: boolean;
  /**
   * Whether this mode can use the given item.
   *
   * @param item - Candidate item.
   * @param ctx - Mode context.
   * @returns `true` if a question can be built for `item`.
   */
  supports(item: LearnItem, ctx: ModeContext): boolean;
  /**
   * Build a question for an item.
   *
   * @param item - The chosen item.
   * @param ctx - Mode context.
   * @returns The question to present.
   */
  build(item: LearnItem, ctx: ModeContext): Question;
  /**
   * Validate an answer.
   *
   * @param question - The presented question.
   * @param answer - The learner's answer.
   * @param settings - Current settings.
   * @returns The validation result.
   */
  check(question: Question, answer: Answer, settings: Settings): Result;
}
