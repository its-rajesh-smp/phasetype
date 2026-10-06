import { StatusPill } from './StatusPill'

/** Before and after a quick fix, with the status pill between them. */
export function QuickFixVisual() {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <p className="w-full rounded-2xl border border-stage-line bg-white/[0.04] px-5 py-4 text-[15px] leading-relaxed text-white/60">
        i think we should <span className="underline decoration-ember decoration-wavy underline-offset-4">definately</span> ship
        it <span className="underline decoration-ember decoration-wavy underline-offset-4">tommorow</span>
      </p>
      <StatusPill state="done" />
      <p className="w-full rounded-2xl bg-surface px-5 py-4 text-[15px] leading-relaxed text-ink">
        I think we should <span className="marker">definitely</span> ship it <span className="marker">tomorrow</span>.
      </p>
    </div>
  )
}
