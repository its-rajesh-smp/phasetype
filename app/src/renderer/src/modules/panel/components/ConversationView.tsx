import type { PresetSummary } from '@shared/types'
import { useLayoutEffect, useRef } from 'react'
import type { ConversationTurn } from '../types/panel.types'
import { ConversationTurnView } from './ConversationTurnView'

interface ConversationViewProps {
  turns: ConversationTurn[]
  presets: PresetSummary[]
  onRegenerate: () => void
}

/** The panel conversation, oldest first. Scrolls on its own and keeps the newest text in view while it streams. */
export function ConversationView({ turns, presets, onRegenerate }: ConversationViewProps): React.JSX.Element | null {
  const scrollRef = useRef<HTMLDivElement>(null)
  const last = turns.at(-1)

  useLayoutEffect(() => {
    const element = scrollRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [turns.length, last?.output, last?.status])

  if (turns.length === 0) return null

  return (
    <div ref={scrollRef} className="flex max-h-[340px] min-h-0 flex-col gap-5 overflow-y-auto border-t border-line px-5 pt-4 pb-4">
      {turns.map((turn, index) => (
        <ConversationTurnView
          key={turn.id}
          turn={turn}
          presetName={presets.find((preset) => preset.id === turn.presetId)?.name ?? null}
          isLatest={index === turns.length - 1}
          onRegenerate={onRegenerate}
        />
      ))}
    </div>
  )
}
