/**
 * @file Safe localStorage helpers for non-sensitive preferences.
 *
 * @remarks Every operation is guarded: storage can fail (private mode, quota,
 * disabled storage) and must never crash the app. Only non-sensitive preferences
 * are stored.
 *
 * @packageDocumentation
 */

/**
 * Read and parse a JSON value.
 *
 * @typeParam T - Expected value type.
 * @param key - Storage key.
 * @param fallback - Returned when the key is absent or unreadable.
 * @returns The parsed value, or `fallback`.
 */
export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Serialize and store a JSON value (best-effort).
 *
 * @param key - Storage key.
 * @param value - Value to serialize.
 */
export function saveJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Persistence is best-effort, not critical.
  }
}

/**
 * Read a raw string value.
 *
 * @param key - Storage key.
 * @param fallback - Returned when the key is absent or unreadable.
 * @returns The stored string, or `fallback`.
 */
export function loadString(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Store a raw string value (best-effort).
 *
 * @param key - Storage key.
 * @param value - String to store.
 */
export function saveString(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Persistence is best-effort, not critical.
  }
}
