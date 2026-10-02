import { Settings2 } from 'lucide-react'
import { Logo } from '../../../components/ui/Logo'
import { bridge } from '../../../services/bridge.service'

/** Draggable panel header with the logo and a button that opens the settings window. */
export function PanelHeader(): React.JSX.Element {
  return (
    <div className="drag-region flex h-10 shrink-0 items-center justify-between px-4">
      <Logo showWordmark={false} className="scale-90" />
      <button
        type="button"
        onClick={bridge.app.openSettings}
        aria-label="Open settings"
        className="no-drag rounded-full p-1.5 text-subtle transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <Settings2 className="size-4" />
      </button>
    </div>
  )
}
