import type { CardTone } from '../types/landing.types'

/** Background, border and title colour for each pastel card tone. */
export const TONE_CLASSES: Record<CardTone, { card: string; title: string }> = {
  violet: { card: 'border-violet-edge bg-violet-tint', title: 'text-violet-ink' },
  sky: { card: 'border-sky-edge bg-sky-tint', title: 'text-sky-ink' },
  peach: { card: 'border-peach-edge bg-peach-tint', title: 'text-peach-ink' },
  mint: { card: 'border-mint-edge bg-mint-tint', title: 'text-mint-ink' },
  plain: { card: 'border-line bg-surface', title: 'text-ink' }
}
