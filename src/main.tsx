/**
 * @file Application entry point: mounts React with all context providers.
 *
 * @packageDocumentation
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { I18nProvider } from './state/i18n';
import { SettingsProvider } from './state/settings';
import { QuizProvider } from './features/quiz/QuizProvider';
import './styles/global.css';
import './styles/app.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find the #root element');

createRoot(rootElement).render(
  <StrictMode>
    <I18nProvider>
      <SettingsProvider>
        <QuizProvider>
          <RouterProvider router={router} />
        </QuizProvider>
      </SettingsProvider>
    </I18nProvider>
  </StrictMode>,
);
