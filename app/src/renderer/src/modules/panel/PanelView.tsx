import { useRef } from 'react'
import { AccessibilityNotice } from './components/AccessibilityNotice'
import { PanelFooter } from './components/PanelFooter'
import { PanelHeader } from './components/PanelHeader'
import { PanelShell } from './components/PanelShell'
import { PromptBar } from './components/PromptBar'
import { QuickActions } from './components/QuickActions'
import { ResultView } from './components/ResultView'
import { SelectedTextPreview } from './components/SelectedTextPreview'
import { useAutoResize } from './hooks/useAutoResize'
import { usePanel } from './hooks/usePanel'

/** The floating panel opened by the hotkey: selected text, prompt, quick actions, result and Copy/Paste. */
export function PanelView(): React.JSX.Element {
  const shellRef = useRef<HTMLDivElement>(null)
  useAutoResize(shellRef)
  const panel = usePanel()

  return (
    <PanelShell ref={shellRef}>
      <PanelHeader />
      {!panel.context.accessibilityGranted && <AccessibilityNotice />}
      <SelectedTextPreview text={panel.context.selectedText} />
      <PromptBar
        value={panel.prompt}
        placeholder={panel.placeholder}
        isStreaming={panel.isStreaming}
        sessionId={panel.sessionId}
        onChange={panel.setPrompt}
        onSubmit={() => panel.run(panel.prompt)}
        onStop={panel.stop}
      />
      <QuickActions hasText={Boolean(panel.workingText.trim())} disabled={panel.isStreaming} onRun={panel.run} />
      <ResultView
        status={panel.stream.status}
        output={panel.stream.output}
        error={panel.stream.error}
        onRegenerate={panel.regenerate}
      />
      <PanelFooter
        canAct={panel.hasResult}
        copied={panel.copied}
        error={panel.actionError}
        onCopy={() => void panel.copy()}
        onPaste={() => void panel.paste()}
      />
    </PanelShell>
  )
}
