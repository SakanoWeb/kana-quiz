/**
 * @file Browse landing: choose hiragana, katakana or kanji.
 *
 * @packageDocumentation
 */

import { Link } from 'react-router-dom';
import { useI18n } from '@/state/i18n';

/**
 * Browse landing page: choose a writing system to explore.
 *
 * @returns The browse entry view with three large choices.
 */
export function BrowsePage(): JSX.Element {
  const { t } = useI18n();

  const choices = [
    { to: '/browse/hiragana', glyph: 'あ', title: t('browse.hiragana'), desc: t('browse.hiragana.desc') },
    { to: '/browse/katakana', glyph: 'ア', title: t('browse.katakana'), desc: t('browse.katakana.desc') },
    { to: '/browse/kanji', glyph: '漢', title: t('browse.kanji'), desc: t('browse.kanji.desc') },
  ];

  return (
    <div className="browse-view">
      <h2 className="panel__title" style={{ fontSize: '1.3rem' }}>
        {t('browse.title')}
      </h2>
      <p className="panel__hint">{t('browse.subtitle')}</p>

      <div className="browse-grid">
        {choices.map((choice) => (
          <Link key={choice.to} to={choice.to} className="browse-card">
            <span className="browse-card__glyph">{choice.glyph}</span>
            <span className="browse-card__title">{choice.title}</span>
            <span className="browse-card__desc">{choice.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
