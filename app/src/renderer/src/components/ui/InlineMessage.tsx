import { CircleAlert, CircleCheck, Info } from 'lucide-react'
import { cn } from '../../utils/cn.util'

type MessageTone = 'error' | 'success' | 'info'

const TONE_STYLES: Record<MessageTone, { className: string; Icon: typeof Info }> = {
  error: { className: 'text-danger', Icon: CircleAlert },
  success: { className: 'text-success', Icon: CircleCheck },
  info: { className: 'text-muted', Icon: Info }
}

interface InlineMessageProps {
  tone: MessageTone
  children: React.ReactNode
  className?: string
}

/** One-line message with a tone-specific icon and colour. Errors are announced to screen readers. */
export function InlineMessage({ tone, children, className }: InlineMessageProps): React.JSX.Element {
  const { className: toneClass, Icon } = TONE_STYLES[tone]
  return (
    <p role={tone === 'error' ? 'alert' : undefined} className={cn('flex items-start gap-1.5 text-[13px] leading-snug', toneClass, className)}>
      <Icon className="mt-px size-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  )
}
