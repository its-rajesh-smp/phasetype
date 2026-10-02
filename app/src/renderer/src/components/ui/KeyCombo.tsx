import { acceleratorToKeys } from '@shared/utils'
import { cn } from '../../utils/cn.util'
import { Kbd } from './Kbd'

interface KeyComboProps {
  accelerator: string
  size?: 'sm' | 'lg'
  className?: string
}

/** Renders an Electron accelerator (e.g. "Command+Shift+Space") as a row of key caps. */
export function KeyCombo({ accelerator, size = 'sm', className }: KeyComboProps): React.JSX.Element {
  return (
    <span className={cn('inline-flex items-center', size === 'sm' ? 'gap-0.5' : 'gap-2', className)}>
      {acceleratorToKeys(accelerator).map((key, index) => (
        <Kbd key={`${key}-${index}`} size={size}>
          {key}
        </Kbd>
      ))}
    </span>
  )
}
