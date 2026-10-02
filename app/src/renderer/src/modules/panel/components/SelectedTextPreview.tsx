import { Eyebrow } from '../../../components/ui/Eyebrow'
import { countWords, pluralize } from '../../../utils/text.util'

/** Shows the text captured from the other app with a word count, or a hint when nothing is selected. */
export function SelectedTextPreview({ text }: { text: string }): React.JSX.Element {
  if (!text.trim()) {
    return (
      <p className="px-5 pb-3 text-[13px] text-muted">
        Nothing selected. Describe what you need and PhaseType will paste it at your cursor.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2 px-5 pb-3">
      <Eyebrow>Selected · {pluralize(countWords(text), 'word')}</Eyebrow>
      <p
        data-selectable
        className="max-h-24 overflow-y-auto border-l-2 border-lime-deep pl-3 text-sm leading-relaxed whitespace-pre-wrap text-ink-soft"
      >
        {text}
      </p>
    </div>
  )
}
