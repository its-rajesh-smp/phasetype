import { Button } from '../../../components/ui/Button'
import { useAppVersion } from '../../../hooks/useAppVersion'
import { bridge } from '../../../services/bridge.service'

/** Settings footer showing the app version and a Quit button. */
export function SettingsFooter(): React.JSX.Element {
  const version = useAppVersion()

  return (
    <footer className="flex h-14 shrink-0 items-center justify-between border-t border-line px-10">
      <span className="text-xs text-subtle">{version && `PhaseType v${version}`}</span>
      <Button variant="ghost" size="sm" onClick={bridge.app.quit}>
        Quit PhaseType
      </Button>
    </footer>
  )
}
