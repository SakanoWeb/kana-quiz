/**
 * @file Application shell: header, navigation, language selector and outlet.
 *
 * @packageDocumentation
 */

import { NavLink, Outlet } from 'react-router-dom';
import { useI18n } from '@/state/i18n';
import { LanguageSelector } from '@/components/LanguageSelector';

/**
 * The app shell rendered around every route.
 *
 * @returns The shell element with the routed outlet.
 */
export function App(): JSX.Element {
  const { t } = useI18n();
  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">
          仮名練習
          <small>{t('app.title')}</small>
        </h1>
        <div className="header__right">
          <nav className="header__nav">
            <NavLink to="/" end>
              {t('nav.configure')}
            </NavLink>
            <NavLink to="/quiz">{t('nav.practice')}</NavLink>
            <NavLink to="/browse">{t('nav.browse')}</NavLink>
          </nav>
          <LanguageSelector />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
