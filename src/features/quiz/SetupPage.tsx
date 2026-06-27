/**
 * @file Setup page: mode picker, pool selector, settings and the start action.
 *
 * @packageDocumentation
 */

import { Link } from 'react-router-dom';
import { PoolSelector } from '@/features/pool-selector/PoolSelector';
import { ModePicker } from '@/features/quiz/ModePicker';
import { SettingsPanel } from '@/features/settings/SettingsPanel';
import { useI18n } from '@/state/i18n';
import { useQuiz } from '@/features/quiz/QuizProvider';

/**
 * The configuration landing page.
 *
 * @returns The setup view.
 */
export function SetupPage(): JSX.Element {
  const quiz = useQuiz();
  const { t } = useI18n();
  const canStart = quiz.poolSize > 0;

  return (
    <div>
      <ModePicker />
      <PoolSelector />
      <SettingsPanel />

      <div className="row row--between">
        <span className="category__concept">{t('pool.count', { count: quiz.poolSize })}</span>
        <Link
          className="btn"
          to="/quiz"
          aria-disabled={!canStart}
          onClick={(e) => {
            if (!canStart) e.preventDefault();
          }}
        >
          {t('setup.start')}
        </Link>
      </div>
    </div>
  );
}
