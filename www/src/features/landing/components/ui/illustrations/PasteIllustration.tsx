import { Check } from 'lucide-react'

/** The fixed sentence in place, with a small "Pasted" confirmation. */
export function PasteIllustration() {
  return (
    <div className="flex w-full max-w-60 flex-col items-start gap-3">
      <p className="rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[13px] leading-snug text-ink shadow-card">
        I can&apos;t make Thursday&apos;s sync. Could we move it?
      </p>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-medium text-white">
        <Check aria-hidden className="size-3.5 text-lime" strokeWidth={3} /> Pasted
      </span>
    </div>
  )
}
