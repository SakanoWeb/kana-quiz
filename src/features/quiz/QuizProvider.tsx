/* eslint-disable react-refresh/only-export-components -- Provider and hook intentionally co-located */
/**
 * @file Quiz context provider exposing the controller to the feature tree.
 *
 * @packageDocumentation
 */

import { createContext, useContext, type ReactNode } from 'react';
import { useQuizController, type QuizController } from './useQuizController';

const QuizContext = createContext<QuizController | null>(null);

/**
 * Provide the quiz controller to descendants.
 *
 * @param props - Component props.
 * @param props.children - Subtree that may consume {@link useQuiz}.
 * @returns The provider element.
 */
export function QuizProvider({ children }: { children: ReactNode }): JSX.Element {
  const controller = useQuizController();
  return <QuizContext.Provider value={controller}>{children}</QuizContext.Provider>;
}

/**
 * Access the quiz controller.
 *
 * @returns The controller.
 * @throws If used outside a {@link QuizProvider}.
 */
export function useQuiz(): QuizController {
  const ctx = useContext(QuizContext);
  if (ctx === null) throw new Error('useQuiz must be used within <QuizProvider>');
  return ctx;
}
