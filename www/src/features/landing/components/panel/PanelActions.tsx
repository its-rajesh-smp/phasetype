import { ClipboardPaste, Copy } from 'lucide-react'
import { KeyCombo } from '@/components/ui/KeyCombo'
import { cn } from '@/utils/cn.util'

interface PanelActionsProps {
  isReady: boolean
  isPasting?: boolean
}

/** Panel footer with shortcut hints and the Copy and Paste buttons. */
export function PanelActions({ isReady, isPasting = false }: PanelActionsProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line bg-canvas/50 px-4 py-3">
      <span className="hidden items-center gap-1.5 text-[11px] text-muted sm:flex">
        <KeyCombo keys={['⌘', '↵']} label="Command Return" /> paste
      </span>
      <div className={cn('ml-auto flex items-center gap-2 transition-opacity', !isReady && 'opacity-40')}>
        <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 text-[13px] font-medium">
          <Copy aria-hidden className="size-3.5" /> Copy
        </span>
        <span
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-full bg-lime px-3.5 text-[13px] font-medium shadow-lime transition-transform',
            isPasting && 'scale-95 bg-lime-deep'
          )}
        >
          <ClipboardPaste aria-hidden className="size-3.5" /> Paste
        </span>
      </div>
    </div>
  )
}
