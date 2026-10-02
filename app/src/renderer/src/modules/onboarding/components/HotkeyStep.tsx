import { DEFAULT_HOTKEYS } from '@shared/constants'
import type { HotkeySettingKey } from '@shared/types'
import { useState } from 'react'
import { HotkeyRecorder } from '../../../components/common/HotkeyRecorder'
import { Marker } from '../../../components/ui/Marker'
import { useSettings } from '../../../hooks/useSettings'
import type { OnboardingStepProps } from '../types/onboarding.types'
import { StepFooter } from './StepFooter'
import { StepLayout } from './StepLayout'

const HOTKEY_FIELDS: { key: HotkeySettingKey; label: string; hint: string }[] = [
  { key: 'hotkey', label: 'Open PhaseType', hint: 'Opens the panel to rewrite the selection or write something new.' },
  { key: 'quickFixHotkey', label: 'Quick fix', hint: 'Fixes the selected text in place. No panel, just a small status at the bottom.' }
]

/** Onboarding step for choosing the global hotkeys. Each change is saved straight away. */
export function HotkeyStep({ onContinue, onBack }: OnboardingStepProps): React.JSX.Element {
  const { settings, update } = useSettings()
  const [errors, setErrors] = useState<Partial<Record<HotkeySettingKey, string>>>({})
  const [saving, setSaving] = useState(false)

  const saveHotkey = async (key: HotkeySettingKey, hotkey: string): Promise<boolean> => {
    setSaving(true)
    setErrors((current) => ({ ...current, [key]: undefined }))
    const result = await update({ [key]: hotkey })
    setSaving(false)
    if (!result.ok) setErrors((current) => ({ ...current, [key]: result.error }))
    return result.ok
  }

  const handleContinue = async (): Promise<void> => {
    if (!settings) return
    // Re-check the shortcuts are free (the defaults may already be taken by another app).
    for (const { key } of HOTKEY_FIELDS) {
      if (!(await saveHotkey(key, settings[key]))) return
    }
    onContinue()
  }

  return (
    <StepLayout
      eyebrow="Setup · Hotkeys"
      title={
        <>
          Pick your <Marker>hotkeys.</Marker>
        </>
      }
      description="Select text in any app and press a shortcut. Open PhaseType to rewrite it, or quick fix it right where it is."
      footer={<StepFooter onBack={onBack} onContinue={() => void handleContinue()} loading={saving} />}
    >
      {settings && (
        <div className="flex flex-col gap-6">
          {HOTKEY_FIELDS.map(({ key, label, hint }) => (
            <div key={key} className="flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium text-ink-soft">{label}</span>
                <span className="text-[13px] text-muted">{hint}</span>
              </div>
              <HotkeyRecorder
                value={settings[key]}
                defaultValue={DEFAULT_HOTKEYS[key]}
                error={errors[key]}
                disabled={saving}
                onChange={(hotkey) => void saveHotkey(key, hotkey)}
              />
            </div>
          ))}
        </div>
      )}
    </StepLayout>
  )
}
