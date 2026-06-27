/**
 * @file Mode registry. Add a mode here and the UI picks it up automatically.
 *
 * @packageDocumentation
 */

import type { QuizMode } from './types';
import { readingMode } from './readingMode';
import { scriptMode } from './scriptMode';
import { versusMode } from './versusMode';

/**
 * All registered modes, in display order.
 *
 * @remarks `writingMode` exists in the codebase but is intentionally not
 * registered: its scoring is still a stub, so it is hidden from the UI until it
 * works. Re-add it here to surface it again.
 */
export const MODES: readonly QuizMode[] = [readingMode, scriptMode, versusMode];

/** Index of modes by id. */
export const MODE_BY_ID: ReadonlyMap<string, QuizMode> = new Map(MODES.map((mode) => [mode.id, mode]));

/**
 * Look up a mode by id.
 *
 * @param id - The mode id.
 * @returns The mode, or `undefined` if unknown.
 */
export function getMode(id: string): QuizMode | undefined {
  return MODE_BY_ID.get(id);
}
