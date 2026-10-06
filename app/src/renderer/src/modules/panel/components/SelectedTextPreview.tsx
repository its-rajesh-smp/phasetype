import { Eyebrow } from '../../../components/ui/Eyebrow'
import { countWords, pluralize } from '../../../utils/text.util'

interface SelectedTextPreviewProps {
  text: string
  /** The selection is still being read from the other app. */
  capturing: boolean
}

/** Shows the text captured from the other app with a word count, or a hint when nothing is selected. */
export function SelectedTextPreview({ text, capturing }: SelectedTextPreviewProps): React.JSX.Element {
  if (capturing) {
    return (
      <div className="flex flex-col gap-2 px-5 pb-3" aria-label="Reading the selection">
        <Eyebrow>Reading selection…</Eyebrow>
        <span className="h-3 w-3/4 animate-shimmer rounded-full bg-[linear-gradient(90deg,var(--color-sunken)_0%,rgb(227_245_66/0.55)_50%,var(--color-sunken)_100%)] bg-[length:200%_100%]" />
      </div>
    )
  }

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
