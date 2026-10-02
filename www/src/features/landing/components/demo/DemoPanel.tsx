import { cn } from '@/utils/cn.util'
import { DEMO_EMAIL } from '../../constants/demo.constants'
import type { DemoScene } from '../../types/demo.types'
import { PanelActions } from '../panel/PanelActions'
import { PanelCard } from '../panel/PanelCard'
import { PanelPrompt } from '../panel/PanelPrompt'
import { PanelResult } from '../panel/PanelResult'
import { PanelSelection } from '../panel/PanelSelection'

/** The PhaseType panel floating over the mail window, driven by the demo scene. */
export function DemoPanel({ scene }: { scene: DemoScene }) {
  const isTypingPrompt = scene.stage === 'prompt'
  const hasResult = scene.output.length > 0 || scene.isStreaming

  return (
    <div
      className={cn(
        'absolute inset-x-4 bottom-4 z-10 transition-all duration-300 ease-out sm:inset-x-auto sm:top-20 sm:right-8 sm:bottom-auto sm:w-[400px]',
        scene.isPanelOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-95 opacity-0'
      )}
    >
      <PanelCard>
        <PanelSelection text={DEMO_EMAIL.original} />
        <PanelPrompt value={scene.prompt} isTyping={isTypingPrompt} isStreaming={scene.isStreaming} />
        {hasResult ? <PanelResult output={scene.output} isStreaming={scene.isStreaming} /> : <div className="h-4" />}
        <PanelActions isReady={hasResult && !scene.isStreaming} isPasting={scene.isPasting} />
      </PanelCard>
    </div>
  )
}
