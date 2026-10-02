import { Eyebrow } from '@/components/ui/Eyebrow'
import { countWords, pluralize } from '../../helpers/text.helper'

/** The text captured from the other app, with a word count. */
export function PanelSelection({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-2 px-5 pb-3">
      <Eyebrow className="text-[10px]">Selected · {pluralize(countWords(text), 'word')}</Eyebrow>
      <p className="line-clamp-2 border-l-2 border-lime-deep pl-3 text-[13px] leading-relaxed text-ink-soft">{text}</p>
    </div>
  )
}
