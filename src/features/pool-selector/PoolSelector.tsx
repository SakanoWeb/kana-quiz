/**
 * @file Pool selector: presets, syllabary toggles and category toggles, all
 * labelled from the i18n catalog.
 *
 * @packageDocumentation
 */

import type { CharacterKind } from '@/domain/types';
import { CATEGORIES } from '@/domain/categories';
import { POOL_PRESETS } from '@/domain/pool/presets';
import type { MessageKey } from '@/i18n';
import { useI18n } from '@/state/i18n';
import { useQuiz } from '../quiz/QuizProvider';

// Kinds available today (kanji arrives in the next phase).
const AVAILABLE_KINDS: CharacterKind[] = ['hiragana', 'katakana'];

/**
 * The practice-pool selector.
 *
 * @returns The pool selection panel.
 */
export function PoolSelector(): JSX.Element {
  const quiz = useQuiz();
  const { t } = useI18n();

  return (
    <section className="panel">
      <h2 className="panel__title">{t('pool.title')}</h2>
      <p className="panel__hint">{t('pool.hint')}</p>

      <div className="chips" role="group" aria-label={t('pool.presets')}>
        {POOL_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="chip chip--accent"
            aria-pressed="false"
            onClick={() => quiz.setSelection([...preset.kinds], [...preset.categories])}
          >
            {t(`preset.${preset.id}` as MessageKey)}
          </button>
        ))}
      </div>

      <div className="category">
        <strong>{t('pool.syllabaries')}</strong>
        <div className="chips" role="group" aria-label={t('pool.syllabaries')} style={{ marginTop: '0.5rem' }}>
          {AVAILABLE_KINDS.map((kind) => (
            <button
              key={kind}
              type="button"
              className="chip"
              aria-pressed={quiz.selection.kinds.has(kind)}
              onClick={() => quiz.toggleKind(kind)}
            >
              {t(`kind.${kind}` as MessageKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="category">
        <strong>{t('pool.categories')}</strong>
        {CATEGORIES.map((cat) => (
          <div className="category" key={cat.id}>
            <button
              type="button"
              className="chip"
              aria-pressed={quiz.selection.categories.has(cat.id)}
              onClick={() => quiz.toggleCategory(cat.id)}
            >
              {t(`category.${cat.id}.label` as MessageKey)}
            </button>
            <p className="category__concept">{t(`category.${cat.id}.concept` as MessageKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
