import { ArrowRight } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { DisplayHeading } from '../../../components/ui/DisplayHeading'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import { KeyCombo } from '../../../components/ui/KeyCombo'
import { Marker } from '../../../components/ui/Marker'
import { useSettings } from '../../../hooks/useSettings'
import { bridge } from '../../../services/bridge.service'
import { UsageStep } from './UsageStep'

/** Final onboarding screen explaining how to use the app, with a button that closes the window. */
export function DoneStep(): React.JSX.Element {
  const { settings } = useSettings()

  return (
    <div className="flex flex-1 flex-col">
      <Eyebrow withRule>Ready</Eyebrow>
      <DisplayHeading className="mt-5">
        You&apos;re <Marker>all set.</Marker>
      </DisplayHeading>

      <ol className="mt-10 flex flex-col gap-5">
        <UsageStep number={1}>Select some text in any app.</UsageStep>
        <UsageStep number={2}>
          Press {settings && <KeyCombo accelerator={settings.hotkey} className="mx-1 align-middle" />}
        </UsageStep>
        <UsageStep number={3}>Ask for a change or hit “Fix the sentence”, then Paste.</UsageStep>
      </ol>

      <p className="mt-8 text-[15px] text-ink-soft">
        Just need it fixed? Select the text and press
        {settings && <KeyCombo accelerator={settings.quickFixHotkey} className="mx-1 align-middle" />}
        instead. PhaseType fixes it in place, no panel.
      </p>

      <p className="mt-4 text-[13px] text-muted">PhaseType lives in your menu bar. Open it from there to change settings.</p>

      <div className="mt-auto flex justify-end pt-8">
        <Button variant="accent" size="lg" trailingIcon={<ArrowRight className="size-4" />} onClick={bridge.app.closeWindow}>
          Start using PhaseType
        </Button>
      </div>
    </div>
  )
}
