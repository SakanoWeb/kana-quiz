/**
 * @file Compact language switcher used in the header and settings.
 *
 * @packageDocumentation
 */

import type { Locale } from '@/domain/types';
import { LOCALES } from '@/domain/types';
import { useI18n } from '@/state/i18n';
import type { MessageKey } from '@/i18n';

/** Compact language switcher. Each option is shown by its own endonym. */
/**
 * A `<select>` that switches the interface locale.
 *
 * @returns The language selector element.
 */
export function LanguageSelector(): JSX.Element {
  const { locale, setLocale, t } = useI18n();
  return (
    <select
      className="lang-select"
      value={locale}
      aria-label={t('language.label')}
      onChange={(e) => setLocale(e.target.value as Locale)}
    >
      {LOCALES.map((code) => (
        <option key={code} value={code}>
          {t(`language.${code}` as MessageKey)}
        </option>
      ))}
    </select>
  );
}
