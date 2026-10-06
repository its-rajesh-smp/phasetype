import { Lock } from 'lucide-react'

/** A mock of the masked API key field, the only form of the key the interface ever sees. */
export function KeyHintCard({ hint }: { hint: string }) {
  return (
    <div className="flex max-w-md flex-col gap-2.5 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-card backdrop-blur">
      <p className="text-xs font-semibold text-muted">OpenAI API key</p>
      <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-canvas px-4 py-3">
        <code className="font-mono text-sm text-ink">{hint}</code>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-xs font-semibold text-ink">
          <Lock aria-hidden className="size-3" /> Keychain
        </span>
      </div>
    </div>
  )
}
