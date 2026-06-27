/**
 * @file Application route table.
 *
 * @remarks
 * Uses a hash router on purpose. GitHub Pages serves static files and cannot
 * rewrite unknown paths to `index.html`, so a history router would 404 on a
 * refresh of a deep link such as `/quiz`. Hash routing keeps the route in the URL
 * fragment, which never reaches the server.
 *
 * @packageDocumentation
 */

import { createHashRouter } from 'react-router-dom';
import { App } from './App';
import { SetupPage } from '@/features/quiz/SetupPage';
import { QuizScreen } from '@/features/quiz/QuizScreen';
import { BrowsePage } from '@/features/browse/BrowsePage';
import { KanaBrowse } from '@/features/browse/KanaBrowse';
import { KanjiBrowse } from '@/features/browse/KanjiBrowse';

/** The configured hash router for the whole app. */
export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <SetupPage /> },
      { path: 'quiz', element: <QuizScreen /> },
      { path: 'browse', element: <BrowsePage /> },
      { path: 'browse/hiragana', element: <KanaBrowse kind="hiragana" /> },
      { path: 'browse/katakana', element: <KanaBrowse kind="katakana" /> },
      { path: 'browse/kanji', element: <KanjiBrowse /> },
    ],
  },
]);
