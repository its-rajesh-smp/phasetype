export const countWords = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length

export const pluralize = (count: number, word: string): string => `${count} ${word}${count === 1 ? '' : 's'}`
