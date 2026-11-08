import type { ReleaseNoteBlock } from '../types/release.types'

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' })

/** "Nov 8, 2026", or an empty string for a missing date. */
export const formatReleaseDate = (iso: string): string => (iso ? dateFormat.format(new Date(iso)) : '')

/** "112 MB" */
export const formatSize = (bytes: number): string => `${Math.round(bytes / 1_000_000)} MB`

/** Drops inline markdown (links, bold, code) so notes read as plain text. */
const stripInline = (text: string): string =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/(\*\*|__|`)/g, '')
    .trim()

/** Turns GitHub release notes into headings, list items and paragraphs. Good enough for short changelogs. */
export function parseReleaseNotes(markdown: string): ReleaseNoteBlock[] {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line): ReleaseNoteBlock => {
      if (/^#{1,6}\s/.test(line)) return { kind: 'heading', text: stripInline(line.replace(/^#+\s*/, '')) }
      if (/^[-*+]\s/.test(line)) return { kind: 'item', text: stripInline(line.slice(2)) }
      return { kind: 'text', text: stripInline(line) }
    })
    .filter((block) => block.text)
}
