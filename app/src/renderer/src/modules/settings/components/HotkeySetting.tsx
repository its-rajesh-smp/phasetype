import { useState } from 'react'
import { HotkeyRecorder } from '../../../components/common/HotkeyRecorder'
import { useSettings } from '../../../hooks/useSettings'
import { useTransientFlag } from '../../../hooks/useTransientFlag'
import { SavedIndicator } from './SavedIndicator'
import { SettingsSection } from './SettingsSection'

/** Settings section for changing the global hotkey. Saves on change and flashes "Saved". */
export function HotkeySetting(): React.JSX.Element {
  const { settings, update } = useSettings()
  const [error, setError] = useState<string | null>(null)
  const [saved, flashSaved] = useTransientFlag()

  const handleChange = async (hotkey: string): Promise<void> => {
    setError(null)
    const result = await update({ hotkey })
    if (result.ok) flashSaved()
    else setError(result.error)
  }

  return (
    <SettingsSection
      title="Hotkey"
      description="Press it after selecting text in any app."
      action={<SavedIndicator visible={saved} />}
    >
      {settings && <HotkeyRecorder size="sm" value={settings.hotkey} error={error} onChange={(hotkey) => void handleChange(hotkey)} />}
    </SettingsSection>
  )
}
