/**
 * @file String interpolation for localized templates.
 *
 * @packageDocumentation
 */

/**
 * Replace `{placeholder}` tokens in a template with values.
 *
 * @remarks Unknown placeholders are left untouched so a missing parameter is
 * visible rather than silently dropped.
 *
 * @param template - Template containing `{name}` tokens.
 * @param params - Values keyed by placeholder name.
 * @returns The interpolated string.
 *
 * @example
 * ```ts
 * format('Write {reading}', { reading: 'ka' }); // 'Write ka'
 * ```
 */
export function format(
  template: string,
  params?: Readonly<Record<string, string | number>>,
): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match,
  );
}
