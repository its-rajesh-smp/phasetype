/** Counts whitespace-separated words. */
export const countWords = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length

/** Formats a count with the singular or plural noun, e.g. "1 word" / "3 words". */
export const pluralize = (count: number, singular: string, plural = `${singular}s`): string =>
  `${count} ${count === 1 ? singular : plural}`
