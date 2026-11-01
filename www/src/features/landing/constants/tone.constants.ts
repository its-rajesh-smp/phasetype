import type { CardTone } from '../types/landing.types'

/** Background, border, title colour and solid icon square for each pastel card tone. */
export const TONE_CLASSES: Record<CardTone, { card: string; title: string; icon: string }> = {
  violet: { card: 'border-violet-edge bg-violet-tint', title: 'text-violet-ink', icon: 'bg-violet-ink' },
  sky: { card: 'border-sky-edge bg-sky-tint', title: 'text-sky-ink', icon: 'bg-sky-ink' },
  peach: { card: 'border-peach-edge bg-peach-tint', title: 'text-peach-ink', icon: 'bg-peach-ink' },
  mint: { card: 'border-mint-edge bg-mint-tint', title: 'text-mint-ink', icon: 'bg-mint-ink' },
  plain: { card: 'border-line bg-surface', title: 'text-ink', icon: 'bg-ink' }
}
