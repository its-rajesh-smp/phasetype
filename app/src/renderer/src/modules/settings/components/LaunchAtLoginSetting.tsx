import { Toggle } from '../../../components/ui/Toggle'
import { useSettings } from '../../../hooks/useSettings'
import { SettingsSection } from './SettingsSection'

/** Settings section with a toggle for starting the app at login. */
export function LaunchAtLoginSetting(): React.JSX.Element {
  const { settings, update } = useSettings()

  return (
    <SettingsSection
      title="Open at login"
      description="Start PhaseType in the menu bar when you log in."
      action={
        <Toggle
          label="Open at login"
          checked={settings?.launchAtLogin ?? false}
          onChange={(launchAtLogin) => void update({ launchAtLogin })}
        />
      }
    />
  )
}
