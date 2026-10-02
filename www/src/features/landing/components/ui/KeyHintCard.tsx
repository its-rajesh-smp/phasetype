import { Lock } from 'lucide-react'

/** A mock of the masked API key field, the only form of the key the interface ever sees. */
export function KeyHintCard({ hint }: { hint: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-canvas/10 bg-canvas/5 p-5">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-canvas/50 uppercase">OpenAI API key</p>
      <div className="flex items-center justify-between gap-3 rounded-xl border border-canvas/15 bg-ink px-4 py-3">
        <code className="font-mono text-sm text-canvas">{hint}</code>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/15 px-2.5 py-1 text-xs font-medium text-lime">
          <Lock aria-hidden className="size-3" /> Keychain
        </span>
      </div>
    </div>
  )
}
