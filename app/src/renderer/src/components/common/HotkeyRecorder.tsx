import { useHotkeyRecorder } from '../../hooks/useHotkeyRecorder'
import { cn } from '../../utils/cn.util'
import { Button } from '../ui/Button'
import { InlineMessage } from '../ui/InlineMessage'
import { KeyCombo } from '../ui/KeyCombo'

interface HotkeyRecorderProps {
  value: string
  /** Shortcut the Reset button goes back to. */
  defaultValue: string
  onChange: (accelerator: string) => void
  error?: string | null
  size?: 'sm' | 'lg'
  disabled?: boolean
}

/** Shows the current shortcut with Change/Reset buttons, and records a new one from the keyboard when changing. */
export function HotkeyRecorder({ value, defaultValue, onChange, error, size = 'lg', disabled }: HotkeyRecorderProps): React.JSX.Element {
  const recorder = useHotkeyRecorder(onChange)
  const isLarge = size === 'lg'
  const message = recorder.error ?? error

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          'no-drag flex items-center justify-between gap-4 rounded-2xl border transition-colors',
          isLarge ? 'min-h-24 px-6 py-5' : 'min-h-16 px-4 py-3',
          recorder.isRecording ? 'border-dashed border-ember/70 bg-lime/15' : 'border-line-strong bg-surface/80'
        )}
      >
        {recorder.isRecording ? (
          <div className="flex flex-col gap-1">
            {recorder.heldModifiers.length > 0 ? (
              <KeyCombo accelerator={recorder.heldModifiers.join('+')} size={size} />
            ) : (
              <span className={cn('font-medium text-ink', isLarge ? 'text-lg' : 'text-sm')}>Press your new shortcut…</span>
            )}
            <span className="text-xs text-muted">Esc to cancel</span>
          </div>
        ) : (
          <KeyCombo accelerator={value} size={size} />
        )}

        <div className="flex items-center gap-1">
          {!recorder.isRecording && value !== defaultValue && (
            <Button variant="ghost" size="sm" disabled={disabled} onClick={() => onChange(defaultValue)}>
              Reset
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            disabled={disabled}
            onClick={recorder.isRecording ? recorder.stop : recorder.start}
          >
            {recorder.isRecording ? 'Cancel' : 'Change'}
          </Button>
        </div>
      </div>
      {message && <InlineMessage tone="error">{message}</InlineMessage>}
    </div>
  )
}
