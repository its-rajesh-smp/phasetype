import { KeyCombo } from '@/components/ui/KeyCombo'
import { DEMO_HOTKEY } from '../../constants/demo.constants'

/** Big key caps flashed in the middle of the desktop when the hotkey is pressed. */
export function DemoHotkeyOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="flex animate-pop-in flex-col items-center gap-3 rounded-3xl border border-line bg-surface/85 px-7 py-5 shadow-window backdrop-blur-md">
        <KeyCombo keys={DEMO_HOTKEY} size="lg" pressed />
        <p className="text-xs font-medium text-muted">Open PhaseType</p>
      </div>
    </div>
  )
}
