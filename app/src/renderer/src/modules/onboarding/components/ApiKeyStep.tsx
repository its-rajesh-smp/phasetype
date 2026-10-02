import { useState } from 'react'
import { ApiKeyInput } from '../../../components/common/ApiKeyInput'
import { InlineMessage } from '../../../components/ui/InlineMessage'
import { Marker } from '../../../components/ui/Marker'
import { useConnectApiKey } from '../../../hooks/useConnectApiKey'
import { useSettings } from '../../../hooks/useSettings'
import type { OnboardingStepProps } from '../types/onboarding.types'
import { StepFooter } from './StepFooter'
import { StepLayout } from './StepLayout'

/** Onboarding step that verifies and saves the OpenAI key. An already saved key can be kept by leaving the field empty. */
export function ApiKeyStep({ onContinue }: OnboardingStepProps): React.JSX.Element {
  const { settings } = useSettings()
  const [apiKey, setApiKey] = useState('')
  const { connect, reset, error, isConnecting } = useConnectApiKey()
  const keepSavedKey = Boolean(settings?.hasApiKey) && !apiKey.trim()

  const handleContinue = async (): Promise<void> => {
    if (keepSavedKey || (await connect(apiKey))) onContinue()
  }

  return (
    <StepLayout
      eyebrow="Setup · Connect"
      title={
        <>
          Connect <Marker>OpenAI.</Marker>
        </>
      }
      description="PhaseType uses your own OpenAI key. It's stored encrypted in your macOS Keychain and only ever sent to OpenAI."
      footer={<StepFooter onContinue={() => void handleContinue()} loading={isConnecting} continueLabel={isConnecting ? 'Checking key' : 'Continue'} />}
    >
      <div className="flex flex-col gap-4">
        <ApiKeyInput
          value={apiKey}
          autoFocus
          error={error}
          disabled={isConnecting}
          onSubmit={() => void handleContinue()}
          onChange={(value) => {
            setApiKey(value)
            if (error) reset()
          }}
        />
        {keepSavedKey && settings?.apiKeyHint && (
          <InlineMessage tone="success">Connected with {settings.apiKeyHint}. Paste a new key to replace it.</InlineMessage>
        )}
      </div>
    </StepLayout>
  )
}
