import { Check, ClipboardPaste, Copy } from 'lucide-react'
import { KeyCombo } from '@/components/ui/KeyCombo'
import { cn } from '@/utils/cn.util'

interface PanelFooterProps {
  isReady: boolean
  copied: boolean
  /** Free tries left today, once the server has said. */
  remaining: number | null
  onCopy: () => void
  onReplace: () => void
}

const ACTION_CLASSES =
  'inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-lime-edge focus-visible:outline-none disabled:pointer-events-none'

/** Footer with the tries left, the replace shortcut, and the Copy and Replace buttons. */
export function PanelFooter({ isReady, copied, remaining, onCopy, onReplace }: PanelFooterProps) {
  return (
    <div className="mt-3 flex items-center justify-between gap-3 border-t border-line bg-canvas/50 px-4 py-3">
      <span className="text-[11px] text-muted">
        {remaining !== null ? (
          `${remaining} free ${remaining === 1 ? 'try' : 'tries'} left today`
        ) : (
          <span className="hidden items-center gap-1.5 sm:flex">
            <KeyCombo keys={['⌘', '↵']} label="Command Return" /> replace
          </span>
        )}
      </span>
      <div className={cn('flex items-center gap-2 transition-opacity', !isReady && 'opacity-40')}>
        <button type="button" disabled={!isReady} onClick={onCopy} className={cn(ACTION_CLASSES, 'border border-line-strong bg-surface hover:bg-sunken')}>
          {copied ? <Check aria-hidden className="size-3.5 text-mint-ink" /> : <Copy aria-hidden className="size-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button type="button" disabled={!isReady} onClick={onReplace} className={cn(ACTION_CLASSES, 'bg-lime shadow-lime hover:bg-lime-deep')}>
          <ClipboardPaste aria-hidden className="size-3.5" /> Replace
        </button>
      </div>
    </div>
  )
}
