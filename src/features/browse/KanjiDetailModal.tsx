/**
 * @file Floating kanji detail dialog (English content).
 *
 * @remarks Closes on backdrop click or the Escape key. Rendered through a portal
 * to `document.body` so it centres on the viewport regardless of any transformed
 * ancestor. Kanji content is English only. While open, body scrolling is locked.
 *
 * @packageDocumentation
 */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { BrowseKanji } from '@/domain/characters/kanjiSource';
import { useI18n } from '@/state/i18n';

/**
 * A floating, accessible detail dialog for a single kanji.
 *
 * @param props - Component props.
 * @param props.kanji - The kanji to display.
 * @param props.onClose - Invoked when the dialog requests to close.
 * @returns The modal dialog.
 */
export function KanjiDetailModal({
  kanji,
  onClose,
}: {
  kanji: BrowseKanji;
  onClose: () => void;
}): JSX.Element {
  const { t } = useI18n();
  const meanings = kanji.meanings;

  // Close on Escape and lock background scroll while mounted.
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const facts: { label: string; value: string }[] = [];
  if (kanji.strokes !== undefined) facts.push({ label: t('kanji.strokes'), value: String(kanji.strokes) });
  if (kanji.jlpt !== undefined) facts.push({ label: t('kanji.jlpt'), value: `N${kanji.jlpt}` });
  if (kanji.grade !== undefined) facts.push({ label: t('kanji.grade'), value: String(kanji.grade) });

  return createPortal(
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={meanings.join(', ')}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label={t('kanji.close')}>
          ×
        </button>

        <div className="modal__header">
          <div className="modal__glyph">{kanji.glyph}</div>
          <div>
            <div className="modal__meanings">{meanings.join(', ')}</div>
            {facts.length > 0 && (
              <div className="modal__facts">
                {facts.map((fact) => (
                  <span className="fact" key={fact.label}>
                    <span className="fact__label">{fact.label}</span>
                    <span className="fact__value">{fact.value}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal__readings">
          {kanji.on.length > 0 && (
            <div className="reading-block">
              <span className="reading-block__label">{t('kanji.on')}</span>
              <span className="reading-block__value">{kanji.on.join('、')}</span>
            </div>
          )}
          {kanji.kun.length > 0 && (
            <div className="reading-block">
              <span className="reading-block__label">{t('kanji.kun')}</span>
              <span className="reading-block__value">
                {kanji.kun.map((r) => r.replace(/\./g, '・')).join('、')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
