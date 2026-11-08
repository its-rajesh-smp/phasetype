import { KeyCombo } from '@/components/ui/KeyCombo'
import { countWords, pluralize } from '@/features/landing/helpers/text.helper'
import { PANEL_HOTKEY } from '../../constants/try.constants'

/** The editor's footer: how much is selected, and the hotkey that opens PhaseType. */
export function EditorStatusBar({ selectedText }: { selectedText: string }) {
  const words = countWords(selectedText)

  return (
    <div className="flex h-11 items-center justify-between gap-3 border-t border-line bg-canvas/60 px-5 text-[13px] text-muted">
      <span aria-live="polite">{words ? `${pluralize(words, 'word')} selected` : 'Nothing selected · PhaseType uses the whole draft'}</span>
      <span className="hidden items-center gap-2 sm:flex">
        <KeyCombo keys={PANEL_HOTKEY} label="Command Shift Space" /> focus PhaseType
      </span>
    </div>
  )
}
