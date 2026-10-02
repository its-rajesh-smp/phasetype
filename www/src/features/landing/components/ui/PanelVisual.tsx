import { PanelActions } from '../panel/PanelActions'
import { PanelCard } from '../panel/PanelCard'
import { PanelPrompt } from '../panel/PanelPrompt'
import { PanelResult } from '../panel/PanelResult'

/** A still of the panel with a prompt and finished result. */
export function PanelVisual() {
  return (
    <PanelCard className="w-full max-w-md -rotate-1 shadow-card">
      <PanelPrompt value="Turn this into a bulleted summary" isTyping={false} isStreaming={false} />
      <PanelResult output={'• Launch moves to Friday\n• Maya owns the release notes\n• QA sign-off by Thursday noon'} isStreaming={false} />
      <PanelActions isReady />
    </PanelCard>
  )
}
