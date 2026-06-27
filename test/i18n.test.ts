import { describe, expect, it } from 'vitest';
import { en } from '@/i18n/locales/en';
import { es } from '@/i18n/locales/es';
import { translate } from '@/i18n';

describe('i18n catalogs', () => {
  it('every locale has exactly the same keys as English', () => {
    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it('interpolates parameters', () => {
    expect(translate('en', 'quiz.instruction.script', { reading: 'ka' })).toContain('ka');
    expect(translate('es', 'quiz.instruction.script', { reading: 'ka' })).toContain('ka');
  });

  it('translates the same key differently per locale', () => {
    expect(translate('en', 'nav.practice')).not.toBe(translate('es', 'nav.practice'));
  });
});
