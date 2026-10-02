import { cn } from '@/utils/cn.util'
import { Kbd } from './Kbd'

interface KeyComboProps {
  keys: readonly string[]
  size?: 'sm' | 'md' | 'lg'
  pressed?: boolean
  label?: string
  className?: string
}

/** A row of key caps for a shortcut, read out as one label by screen readers. */
export function KeyCombo({ keys, size = 'sm', pressed = false, label, className }: KeyComboProps) {
  return (
    <span aria-label={label ?? keys.join(' ')} role="img" className={cn('inline-flex items-center gap-1', className)}>
      {keys.map((key) => (
        <Kbd key={key} size={size} pressed={pressed}>
          {key}
        </Kbd>
      ))}
    </span>
  )
}
