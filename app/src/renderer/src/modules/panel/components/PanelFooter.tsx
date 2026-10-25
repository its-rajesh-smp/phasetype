import { Check, ClipboardPaste, Copy } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { InlineMessage } from '../../../components/ui/InlineMessage'
import { ShortcutHint } from './ShortcutHint'

interface PanelFooterProps {
  canAct: boolean
  /** False when the selection came from somewhere text can't be pasted (e.g. files in Finder). */
  canPaste: boolean
  copied: boolean
  error: string | null
  onCopy: () => void
  onPaste: () => void
}

/** Panel footer with shortcut hints and Copy/Paste buttons, which are always visible but only enabled once there is a result. */
export function PanelFooter({ canAct, canPaste, copied, error, onCopy, onPaste }: PanelFooterProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2 border-t border-line bg-canvas/50 px-4 py-3">
      {error && <InlineMessage tone="error">{error}</InlineMessage>}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShortcutHint accelerator="Return" label="run" />
          {canPaste && <ShortcutHint accelerator="Command+Return" label="paste" />}
          <ShortcutHint accelerator="Escape" label="close" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={canPaste ? 'secondary' : 'accent'}
            size="sm"
            disabled={!canAct}
            onClick={onCopy}
            leadingIcon={copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
          {canPaste && (
            <Button variant="accent" size="sm" disabled={!canAct} onClick={onPaste} leadingIcon={<ClipboardPaste className="size-3.5" />}>
              Paste
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
