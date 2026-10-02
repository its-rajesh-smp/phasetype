import { ShieldAlert } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { bridge } from '../../../services/bridge.service'

/** Warning banner shown in the panel when Accessibility access is missing, with a button to request it. */
export function AccessibilityNotice(): React.JSX.Element {
  return (
    <div className="mx-4 mb-3 flex items-center justify-between gap-3 rounded-xl border border-ember/30 bg-ember/8 px-4 py-3">
      <p className="flex items-center gap-2 text-[13px] text-ink-soft">
        <ShieldAlert className="size-4 shrink-0 text-ember" />
        Allow Accessibility access so PhaseType can read your selection and paste.
      </p>
      <Button variant="primary" size="sm" onClick={() => void bridge.permissions.requestAccessibility()}>
        Allow
      </Button>
    </div>
  )
}
