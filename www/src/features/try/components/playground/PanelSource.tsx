import { Eyebrow } from '@/components/ui/Eyebrow'
import { countWords, pluralize } from '@/features/landing/helpers/text.helper'

interface PanelSourceProps {
  text: string
  isWholeDraft: boolean
}

/** What PhaseType will work on: the selection, or the whole draft when nothing is selected. */
export function PanelSource({ text, isWholeDraft }: PanelSourceProps) {
  if (!text.trim()) return null

  return (
    <div className="flex flex-col gap-2 px-5 pb-3">
      <Eyebrow className="text-[10px]">
        {isWholeDraft ? 'Whole draft' : 'Selected'} · {pluralize(countWords(text), 'word')}
      </Eyebrow>
      <p className="line-clamp-2 border-l-2 border-lime-deep pl-3 text-[13px] leading-relaxed text-ink-soft">{text}</p>
      {isWholeDraft && <p className="text-[12px] text-subtle">Tip: select part of the text to rewrite just that.</p>}
    </div>
  )
}
