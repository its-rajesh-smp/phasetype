import { DEFAULT_HOTKEYS } from '@shared/constants'
import type { HotkeySettingKey } from '@shared/types'
import { useState } from 'react'
import { HotkeyRecorder } from '../../../components/common/HotkeyRecorder'
import { useSettings } from '../../../hooks/useSettings'
import { useTransientFlag } from '../../../hooks/useTransientFlag'
import { SavedIndicator } from './SavedIndicator'
import { SettingsSection } from './SettingsSection'

interface HotkeySettingProps {
  settingKey: HotkeySettingKey
  title: string
  description: string
}

/** Settings section for changing one of the global hotkeys. Saves on change and flashes "Saved". */
export function HotkeySetting({ settingKey, title, description }: HotkeySettingProps): React.JSX.Element {
  const { settings, update } = useSettings()
  const [error, setError] = useState<string | null>(null)
  const [saved, flashSaved] = useTransientFlag()

  const handleChange = async (hotkey: string): Promise<void> => {
    setError(null)
    const result = await update({ [settingKey]: hotkey })
    if (result.ok) flashSaved()
    else setError(result.error)
  }

  return (
    <SettingsSection title={title} description={description} action={<SavedIndicator visible={saved} />}>
      {settings && (
        <HotkeyRecorder
          size="sm"
          value={settings[settingKey]}
          defaultValue={DEFAULT_HOTKEYS[settingKey]}
          error={error}
          onChange={(hotkey) => void handleChange(hotkey)}
        />
      )}
    </SettingsSection>
  )
}
