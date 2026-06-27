/**
 * @file Quiz engine: selects an item and delegates question construction.
 *
 * @remarks The engine's only responsibility is to *choose*. It knows nothing of
 * romaji, drawings or React.
 *
 * @packageDocumentation
 */

import type { LearnItem } from '../types';
import type { PoolSelection } from '../pool/filter';
import type { ModeContext, Question, QuizMode } from '../modes/types';
import { pickRandom } from '../modes/random';

/** Inputs for {@link generateQuestion}. */
export interface GenerateOptions {
  readonly pool: readonly LearnItem[];
  readonly selection: PoolSelection;
  readonly mode: QuizMode;
  /** Avoids repeating the same item immediately. */
  readonly previousItemId?: string;
  /** Injectable RNG; defaults to {@link Math.random}. */
  readonly random?: () => number;
}

/** Why a question could not be generated. */
export type GenerateError = { readonly kind: 'empty-pool' } | { readonly kind: 'mode-unusable' };

/** Result of {@link generateQuestion}: a question, or a typed error. */
export type GenerateResult =
  | { readonly ok: true; readonly question: Question }
  | { readonly ok: false; readonly error: GenerateError };

/**
 * Generate the next question.
 *
 * @param options - Pool, selection, mode and optional RNG / previous item.
 * @returns A question, or an error describing why none could be built.
 */
export function generateQuestion(options: GenerateOptions): GenerateResult {
  const random = options.random ?? Math.random;
  const { pool, selection, mode, previousItemId } = options;

  if (pool.length === 0) {
    return { ok: false, error: { kind: 'empty-pool' } };
  }

  const ctx: ModeContext = { pool, selection, random };

  const supported = pool.filter((item) => mode.supports(item, ctx));
  if (supported.length === 0) {
    return { ok: false, error: { kind: 'mode-unusable' } };
  }

  const avoidingRepeat =
    supported.length > 1 && previousItemId !== undefined
      ? supported.filter((item) => item.id !== previousItemId)
      : supported;

  const chosen = pickRandom(avoidingRepeat, random) ?? supported[0];
  if (chosen === undefined) {
    return { ok: false, error: { kind: 'mode-unusable' } };
  }

  return { ok: true, question: mode.build(chosen, ctx) };
}
