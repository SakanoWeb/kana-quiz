/**
 * @file Quiz controller hook: orchestrates pool, mode, engine and session.
 *
 * @remarks Holds all quiz state in a reducer, persists the pool/mode config, and
 * exposes a small imperative API to the UI. Changing the pool or mode invalidates
 * the current question so the practice screen regenerates.
 *
 * @packageDocumentation
 */

import { useCallback, useMemo, useReducer } from 'react';
import type { CharacterCategory, CharacterKind, Settings } from '@/domain/types';
import { ALL_KANA } from '@/domain/characters';
import { filterPool, toggleInSet, type PoolSelection } from '@/domain/pool/filter';
import { getMode } from '@/domain/modes/registry';
import { readingMode } from '@/domain/modes/readingMode';
import type { Answer, Question, Result } from '@/domain/modes/types';
import { generateQuestion, type GenerateError } from '@/domain/quiz/engine';
import {
  initialSession,
  recordAnswer,
  resetSession,
  type SessionState,
} from '@/domain/quiz/session';
import { loadJSON, saveJSON } from '@/state/persist';

const STORAGE_KEY = 'kana-quiz:quiz';

interface PersistedConfig {
  kinds: CharacterKind[];
  categories: CharacterCategory[];
  modeId: string;
}

interface QuizState {
  selection: PoolSelection;
  modeId: string;
  question: Question | null;
  result: Result | null;
  error: GenerateError | null;
  session: SessionState;
}

type QuizAction =
  | { type: 'toggle-kind'; kind: CharacterKind }
  | { type: 'toggle-category'; category: CharacterCategory }
  | { type: 'set-selection'; kinds: CharacterKind[]; categories: CharacterCategory[] }
  | { type: 'set-mode'; modeId: string }
  | { type: 'set-question'; question: Question | null; error: GenerateError | null }
  | { type: 'set-result'; result: Result; correct: boolean }
  | { type: 'reset-session' };

function persist(state: QuizState): void {
  const config: PersistedConfig = {
    kinds: [...state.selection.kinds],
    categories: [...state.selection.categories],
    modeId: state.modeId,
  };
  saveJSON(STORAGE_KEY, config);
}

// Changing the pool or mode invalidates the current question, so the practice
// screen regenerates with the new config instead of showing something stale.
const INVALIDATED = { question: null, result: null, error: null } as const;

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'toggle-kind': {
      const selection = {
        ...state.selection,
        kinds: toggleInSet(state.selection.kinds, action.kind),
      };
      const next = { ...state, selection, ...INVALIDATED };
      persist(next);
      return next;
    }
    case 'toggle-category': {
      const selection = {
        ...state.selection,
        categories: toggleInSet(state.selection.categories, action.category),
      };
      const next = { ...state, selection, ...INVALIDATED };
      persist(next);
      return next;
    }
    case 'set-selection': {
      const selection: PoolSelection = {
        kinds: new Set(action.kinds),
        categories: new Set(action.categories),
      };
      const next = { ...state, selection, ...INVALIDATED };
      persist(next);
      return next;
    }
    case 'set-mode': {
      const next = { ...state, modeId: action.modeId, ...INVALIDATED };
      persist(next);
      return next;
    }
    case 'set-question':
      return { ...state, question: action.question, error: action.error, result: null };
    case 'set-result':
      return {
        ...state,
        result: action.result,
        session: recordAnswer(state.session, action.correct),
      };
    case 'reset-session':
      return { ...state, session: resetSession(), result: null, question: null };
    default:
      return state;
  }
}

function init(): QuizState {
  const config = loadJSON<PersistedConfig>(STORAGE_KEY, {
    kinds: ['hiragana'],
    categories: ['base'],
    modeId: readingMode.id,
  });
  // Fall back to a known mode if the persisted one no longer exists (e.g. a mode
  // that was hidden since the config was saved).
  const modeId = getMode(config.modeId) ? config.modeId : readingMode.id;
  return {
    selection: { kinds: new Set(config.kinds), categories: new Set(config.categories) },
    modeId,
    question: null,
    result: null,
    error: null,
    session: initialSession,
  };
}

export interface QuizController {
  readonly selection: PoolSelection;
  readonly modeId: string;
  readonly question: Question | null;
  readonly result: Result | null;
  readonly error: GenerateError | null;
  readonly session: SessionState;
  readonly poolSize: number;
  toggleKind(kind: CharacterKind): void;
  toggleCategory(category: CharacterCategory): void;
  setSelection(kinds: CharacterKind[], categories: CharacterCategory[]): void;
  setMode(modeId: string): void;
  next(): void;
  submit(answer: Answer, settings: Settings): Result | null;
  resetSession(): void;
}

/**
 * Create the quiz controller.
 *
 * @returns The controller state and actions consumed by {@link QuizProvider}.
 */
export function useQuizController(): QuizController {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  // The practice pool is kana-only by design; kanji live in the browse view.
  const pool = useMemo(() => filterPool(ALL_KANA, state.selection), [state.selection]);

  const next = useCallback(() => {
    const mode = getMode(state.modeId) ?? readingMode;
    const previousItemId = state.question?.item.id;
    const generated = generateQuestion({
      pool,
      selection: state.selection,
      mode,
      ...(previousItemId !== undefined ? { previousItemId } : {}),
    });
    if (generated.ok) {
      dispatch({ type: 'set-question', question: generated.question, error: null });
    } else {
      dispatch({ type: 'set-question', question: null, error: generated.error });
    }
  }, [pool, state.modeId, state.selection, state.question?.item.id]);

  const submit = useCallback(
    (answer: Answer, settings: Settings): Result | null => {
      if (!state.question) return null;
      const mode = getMode(state.question.modeId) ?? readingMode;
      const result = mode.check(state.question, answer, settings);
      dispatch({ type: 'set-result', result, correct: result.correct });
      return result;
    },
    [state.question],
  );

  return {
    selection: state.selection,
    modeId: state.modeId,
    question: state.question,
    result: state.result,
    error: state.error,
    session: state.session,
    poolSize: pool.length,
    toggleKind: useCallback((kind) => dispatch({ type: 'toggle-kind', kind }), []),
    toggleCategory: useCallback((category) => dispatch({ type: 'toggle-category', category }), []),
    setSelection: useCallback(
      (kinds, categories) => dispatch({ type: 'set-selection', kinds, categories }),
      [],
    ),
    setMode: useCallback((modeId) => dispatch({ type: 'set-mode', modeId }), []),
    next,
    submit,
    resetSession: useCallback(() => dispatch({ type: 'reset-session' }), []),
  };
}
