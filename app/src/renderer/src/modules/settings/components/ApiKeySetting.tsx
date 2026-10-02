import { useState } from 'react'
import { ApiKeyInput } from '../../../components/common/ApiKeyInput'
import { Button } from '../../../components/ui/Button'
import { useConnectApiKey } from '../../../hooks/useConnectApiKey'
import { useSettings } from '../../../hooks/useSettings'
import { SettingsSection } from './SettingsSection'

/** Settings section showing the saved key hint. "Replace key" opens an input that verifies the new key before saving. */
export function ApiKeySetting(): React.JSX.Element {
  const { settings } = useSettings()
  const [editing, setEditing] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const { connect, reset, error, isConnecting } = useConnectApiKey()

  const close = (): void => {
    setEditing(false)
    setApiKey('')
    reset()
  }

  const handleSave = async (): Promise<void> => {
    if (await connect(apiKey)) close()
  }

  return (
    <SettingsSection
      title="OpenAI API key"
      description={
        editing ? 'The new key is checked with OpenAI before it replaces the current one.' : (
          <span className="font-mono text-ink-soft">{settings?.apiKeyHint ?? 'No key saved'}</span>
        )
      }
      action={
        !editing && (
          <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
            Replace key
          </Button>
        )
      }
    >
      {editing && (
        <div className="flex flex-col gap-3">
          <ApiKeyInput
            value={apiKey}
            autoFocus
            error={error}
            disabled={isConnecting}
            onSubmit={() => void handleSave()}
            onChange={(value) => {
              setApiKey(value)
              if (error) reset()
            }}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={close}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" loading={isConnecting} onClick={() => void handleSave()}>
              Save key
            </Button>
          </div>
        </div>
      )}
    </SettingsSection>
  )
}
