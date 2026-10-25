import { useRef } from 'react'
import { AccessibilityNotice } from './components/AccessibilityNotice'
import { AttachmentList } from './components/AttachmentList'
import { ConversationView } from './components/ConversationView'
import { PanelFooter } from './components/PanelFooter'
import { PanelHeader } from './components/PanelHeader'
import { PanelShell } from './components/PanelShell'
import { PresetButton } from './components/PresetButton'
import { PresetMenu } from './components/PresetMenu'
import { PromptBar } from './components/PromptBar'
import { QuickActions } from './components/QuickActions'
import { SelectedTextPreview } from './components/SelectedTextPreview'
import { useAutoResize } from './hooks/useAutoResize'
import { usePanel } from './hooks/usePanel'

/** The floating panel opened by the hotkey: selected text or files, the conversation so far, prompt, quick actions, preset picker and Copy/Paste. */
export function PanelView(): React.JSX.Element {
  const shellRef = useRef<HTMLDivElement>(null)
  useAutoResize(shellRef)
  const panel = usePanel()

  return (
    <PanelShell ref={shellRef}>
      <PanelHeader />
      {!panel.context.accessibilityGranted && <AccessibilityNotice />}
      {panel.hasAttachments ? (
        <AttachmentList attachments={panel.attachments} onRemove={panel.removeAttachment} />
      ) : (
        <SelectedTextPreview text={panel.context.selectedText} capturing={panel.context.capturing} />
      )}
      <ConversationView turns={panel.turns} presets={panel.context.presets} onRegenerate={panel.regenerate} />
      <PromptBar
        value={panel.prompt}
        placeholder={panel.placeholder}
        isStreaming={panel.isStreaming}
        sessionId={panel.sessionId}
        suspendFocus={panel.presetMenuOpen}
        onChange={panel.setPrompt}
        onSubmit={() => panel.run(panel.prompt)}
        onStop={panel.stop}
      />
      <div className="flex items-start justify-between gap-3 px-4 pt-3 pb-4">
        {!panel.hasAttachments && (
          <QuickActions hasText={Boolean(panel.workingText.trim())} disabled={panel.isStreaming || panel.context.capturing} onRun={panel.runQuickAction} />
        )}
        <PresetButton
          preset={panel.activePreset}
          open={panel.presetMenuOpen}
          disabled={panel.isStreaming}
          onClick={panel.togglePresetMenu}
        />
      </div>
      {panel.presetMenuOpen && (
        <PresetMenu presets={panel.context.presets} activeId={panel.activePreset?.id ?? null} onSelect={panel.selectPreset} />
      )}
      <PanelFooter
        canAct={panel.hasResult}
        canPaste={panel.canPaste}
        copied={panel.copied}
        error={panel.actionError}
        onCopy={() => void panel.copy()}
        onPaste={() => void panel.paste()}
      />
    </PanelShell>
  )
}
