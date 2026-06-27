/**
 * @file Streak badge showing the current and best session streak.
 *
 * @packageDocumentation
 */

import type { SessionState } from '@/domain/quiz/session';
import { useI18n } from '@/state/i18n';

/**
 * Display the current streak (and session best).
 *
 * @param props - Component props.
 * @param props.session - The current session state.
 * @returns The badge element.
 */
export function StreakBadge({ session }: { session: SessionState }): JSX.Element {
  const { t } = useI18n();
  return (
    <div className="streak" aria-live="polite">
      <span className="streak__value">{session.currentStreak}</span>
      <span>{t('quiz.streak')}</span>
      {session.bestStreak > 0 && <span>· {t('quiz.best', { best: session.bestStreak })}</span>}
    </div>
  );
}
