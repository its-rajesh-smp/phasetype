import { Button } from '../../../components/ui/Button'
import { useAppVersion } from '../../../hooks/useAppVersion'
import { bridge } from '../../../services/bridge.service'
import { SettingsSection } from './SettingsSection'

/** Settings section showing the app version, with a Quit button. */
export function AboutSetting(): React.JSX.Element {
  const version = useAppVersion()

  return (
    <SettingsSection
      title="PhaseType"
      description={version ? `Version ${version}` : undefined}
      action={
        <Button variant="secondary" size="sm" onClick={bridge.app.quit}>
          Quit PhaseType
        </Button>
      }
    />
  )
}
