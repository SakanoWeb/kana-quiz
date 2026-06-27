/**
 * @file Answer reveal card: result, readings and (for kanji) localized meanings.
 *
 * @packageDocumentation
 */

import type { LearnItem } from '@/domain/types';
import { isKana, isKanji, localizeList } from '@/domain/types';
import type { Result } from '@/domain/modes/types';
import { useI18n } from '@/state/i18n';

interface Props {
  result: Result;
  item: LearnItem;
}

/**
 * Render the post-answer reveal.
 *
 * @remarks Shows whether the answer was right, the item's reading(s), and—for
 * kanji only—its meanings in the selected locale. Kana didactics are not shown
 * here; richer explanations live in the kanji browse view.
 *
 * @param props - Component props (result and item).
 * @returns The reveal card.
 */
export function AnswerReveal({ result, item }: Props): JSX.Element {
  const { locale, t } = useI18n();

  const readings = isKana(item) ? item.romaji.join(' / ') : readingsLine(item);
  const meanings = isKanji(item) ? localizeList(item.meanings, locale).join(', ') : '';

  return (
    <div className={`reveal ${result.correct ? 'reveal--correct' : 'reveal--wrong'}`} role="status">
      <div className="reveal__headline">
        {result.correct ? t('reveal.correct') : t('reveal.wrong')}
      </div>

      <div>
        <strong className="reveal__glyph">{item.glyph}</strong>{' '}
        {readings && <span>— {readings}</span>}
      </div>

      {meanings && (
        <div className="reveal__didactics">
          {t('reveal.meaning')}: {meanings}
        </div>
      )}

      {!result.correct && (
        <div className="reveal__didactics">
          {t('reveal.yourAnswer', { given: result.given || '—', expected: result.expected })}
        </div>
      )}
    </div>
  );
}

/** on + kun readings line for a kanji. */
function readingsLine(item: LearnItem): string {
  if (!isKanji(item)) return '';
  return [...item.onReadings, ...item.kunReadings].join(' / ');
}
