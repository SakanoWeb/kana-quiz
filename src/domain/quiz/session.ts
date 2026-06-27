/**
 * @file Session and streak state (pure logic).
 *
 * @packageDocumentation
 */

/** Counters for the current practice run. */
export interface SessionState {
  /** Consecutive correct answers in the current streak. */
  readonly currentStreak: number;
  /** Best streak reached this session. */
  readonly bestStreak: number;
  /** Total questions answered this session. */
  readonly answered: number;
  /** Total correct answers this session. */
  readonly correct: number;
}

/** A fresh, zeroed session. */
export const initialSession: SessionState = {
  currentStreak: 0,
  bestStreak: 0,
  answered: 0,
  correct: 0,
};

/**
 * Record an answer and return the next state (immutably).
 *
 * @param state - Current session state.
 * @param wasCorrect - Whether the answer was correct.
 * @returns The updated session state.
 */
export function recordAnswer(state: SessionState, wasCorrect: boolean): SessionState {
  const currentStreak = wasCorrect ? state.currentStreak + 1 : 0;
  return {
    currentStreak,
    bestStreak: Math.max(state.bestStreak, currentStreak),
    answered: state.answered + 1,
    correct: state.correct + (wasCorrect ? 1 : 0),
  };
}

/**
 * Reset the current run.
 *
 * @returns A fresh session.
 */
export function resetSession(): SessionState {
  return initialSession;
}

/**
 * Session accuracy.
 *
 * @param state - Current session state.
 * @returns Accuracy as a ratio in `[0, 1]` (0 when nothing answered).
 */
export function accuracy(state: SessionState): number {
  return state.answered === 0 ? 0 : state.correct / state.answered;
}
