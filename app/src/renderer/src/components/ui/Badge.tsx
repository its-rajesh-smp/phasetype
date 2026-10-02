import { cn } from '../../utils/cn.util'

type BadgeTone = 'success' | 'warning' | 'neutral'

const TONE_CLASSES: Record<BadgeTone, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-ember/12 text-ember',
  neutral: 'bg-ink/5 text-muted'
}

/** Small pill with a coloured dot, used for status labels. */
export function Badge({ tone, children }: { tone: BadgeTone; children: React.ReactNode }): React.JSX.Element {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium', TONE_CLASSES[tone])}>
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}
