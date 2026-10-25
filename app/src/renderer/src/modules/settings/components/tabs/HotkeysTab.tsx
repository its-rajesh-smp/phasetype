import { HotkeySetting } from '../HotkeySetting'
import { SettingsPage } from '../SettingsPage'

/** The global hotkeys: one opens the panel, one fixes the selection in place. */
export function HotkeysTab(): React.JSX.Element {
  return (
    <SettingsPage>
      <HotkeySetting settingKey="hotkey" title="Panel hotkey" description="Press it after selecting text in any app." />
      <HotkeySetting
        settingKey="quickFixHotkey"
        title="Quick fix hotkey"
        description="Fixes the selected text in place, without opening the panel."
      />
    </SettingsPage>
  )
}
