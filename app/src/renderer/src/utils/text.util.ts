/** Counts whitespace-separated words. */
export const countWords = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length

/** Formats a count with the singular or plural noun, e.g. "1 word" / "3 words". */
export const pluralize = (count: number, singular: string, plural = `${singular}s`): string =>
  `${count} ${count === 1 ? singular : plural}`

/** Formats a byte count for display, e.g. "820 KB" or "1.4 MB". */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
