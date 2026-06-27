/**
 * @file Mode picker plus the entry point to the browse/reference view.
 *
 * @packageDocumentation
 */

import { Link } from 'react-router-dom';
import { MODES } from '@/domain/modes/registry';
import type { MessageKey } from '@/i18n';
import { useI18n } from '@/state/i18n';
import { useQuiz } from './QuizProvider';

/**
 * Mode selector, built automatically from the mode registry. Each mode is a
 * selectable row showing its localized name and a short description of what it
 * does. Below the list sits the entry point to the browse/reference view.
 *
 * @returns The mode picker panel.
 */
export function ModePicker(): JSX.Element {
  const quiz = useQuiz();
  const { t } = useI18n();

  return (
    <section className="panel">
      <h2 className="panel__title">{t('modePicker.title')}</h2>

      <div className="mode-list" role="radiogroup" aria-label={t('modePicker.title')}>
        {MODES.map((mode) => {
          const selected = quiz.modeId === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`mode-option${selected ? ' mode-option--selected' : ''}`}
              onClick={() => quiz.setMode(mode.id)}
            >
              <span className="mode-option__name">{t(`mode.${mode.id}.name` as MessageKey)}</span>
              <span className="mode-option__desc">
                {t(`mode.${mode.id}.description` as MessageKey)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="browse-cta">
        <div>
          <strong>{t('modePicker.browse')}</strong>
          <p className="category__concept">{t('modePicker.browseHint')}</p>
        </div>
        <Link to="/browse" className="btn btn--ghost">
          {t('modePicker.browse')}
        </Link>
      </div>
    </section>
  );
}
