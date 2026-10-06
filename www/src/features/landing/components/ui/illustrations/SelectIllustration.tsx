import { TextCursor } from 'lucide-react'

/** A few lines of text with one sentence highlighted, as if just selected. */
export function SelectIllustration() {
  return (
    <div className="flex w-full max-w-60 flex-col gap-2.5 text-[13px] leading-snug text-muted">
      <span className="h-2 w-4/5 rounded-full bg-line" />
      <p className="relative">
        <span className="rounded-sm bg-lime/80 text-ink box-decoration-clone">i cant make thursdays sync, can we moved it?</span>
        <TextCursor aria-hidden className="absolute -right-1 -bottom-4 size-5 text-ink" />
      </p>
      <span className="h-2 w-3/5 rounded-full bg-line" />
    </div>
  )
}
