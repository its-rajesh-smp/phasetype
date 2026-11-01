/** Counts whitespace-separated words. */
export const countWords = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length

/** Formats a count with the singular or plural noun, e.g. "1 word" / "3 words". */
export const pluralize = (count: number, singular: string, plural = `${singular}s`): string =>
  `${count} ${count === 1 ? singular : plural}`

/** Formats seconds as m:ss or h:mm:ss, e.g. 75 → "1:15". */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.round(totalSeconds)
  const [h, m, s] = [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60]
  const pad = (value: number): string => String(value).padStart(2, '0')
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}

const compactNumber = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

/** Formats a count compactly, e.g. 950 → "950", 12_400 → "12.4K". */
export const formatCompact = (count: number): string => compactNumber.format(count)

/** Formats US dollars, with more decimals for the tiny amounts single requests cost, e.g. "$1.24" or "$0.0031". */
export function formatUsd(amount: number): string {
  if (amount === 0) return '$0.00'
  if (amount < 0.0001) return '<$0.0001'
  return `$${amount.toFixed(amount < 0.01 ? 4 : 2)}`
}

/** Formats a byte count for display, e.g. "820 KB" or "1.4 MB". */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
