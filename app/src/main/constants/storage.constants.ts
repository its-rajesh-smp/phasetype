export const SETTINGS_FILE_NAME = 'settings.json'
/** The request history: one JSON record per line, appended as requests finish. */
export const USAGE_FILE_NAME = 'usage-history.jsonl'
/** Older records are dropped beyond this, so the file stays small. */
export const MAX_USAGE_RECORDS = 2000
/** How much of the selected text and the answer each record keeps. */
export const USAGE_INPUT_PREVIEW_CHARS = 600
export const USAGE_OUTPUT_PREVIEW_CHARS = 4000
