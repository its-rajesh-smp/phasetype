import { LoaderCircle } from 'lucide-react'
import { cn } from '../../utils/cn.util'

/** Spinning loader icon. */
export function Spinner({ className }: { className?: string }): React.JSX.Element {
  return <LoaderCircle aria-hidden className={cn('animate-spin', className)} />
}
