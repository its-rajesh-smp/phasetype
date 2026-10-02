import { Check } from 'lucide-react'
import { cn } from '../../../utils/cn.util'

/** "Saved" confirmation that fades in and out. */
export function SavedIndicator({ visible }: { visible: boolean }): React.JSX.Element {
  return (
    <span
      aria-live="polite"
      className={cn('inline-flex items-center gap-1 text-xs font-medium text-success transition-opacity', visible ? 'opacity-100' : 'opacity-0')}
    >
      <Check className="size-3.5" />
      Saved
    </span>
  )
}
