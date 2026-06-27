/**
 * @file Settings panel: language, explanation verbosity and permissive checking.
 *
 * @packageDocumentation
 */

import { useI18n } from '@/state/i18n';
import { useSettings } from '@/state/settings';
import { LanguageSelector } from '@/components/LanguageSelector';

/**
 * The settings panel.
 *
 * @returns The settings view.
 */
export function SettingsPanel(): JSX.Element {
  const { t } = useI18n();
  const { settings, update } = useSettings();
  const onOff = (value: boolean): string => (value ? t('common.on') : t('common.off'));

  return (
    <section className="panel">
      <h2 className="panel__title">{t('settings.title')}</h2>

      <div className="toggle-row">
        <div>
          <strong>{t('language.label')}</strong>
        </div>
        <LanguageSelector />
      </div>

      <div className="toggle-row">
        <div>
          <strong>{t('settings.permissive.label')}</strong>
          <p className="category__concept">{t('settings.permissive.desc')}</p>
        </div>
        <button
          type="button"
          className="chip"
          aria-pressed={settings.permissive}
          onClick={() => update({ permissive: !settings.permissive })}
        >
          {onOff(settings.permissive)}
        </button>
      </div>
    </section>
  );
}
