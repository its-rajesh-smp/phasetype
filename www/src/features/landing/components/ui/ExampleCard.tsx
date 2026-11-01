import { ArrowRight, WandSparkles } from 'lucide-react'
import { KeyCombo } from '@/components/ui/KeyCombo'
import type { WritingExample } from '../../types/landing.types'

/** Before and after for one example, joined by the prompt that was used. */
export function ExampleCard({ example }: { example: WritingExample }) {
  return (
    <div
      role="tabpanel"
      id={`example-panel-${example.id}`}
      aria-labelledby={`example-tab-${example.id}`}
      key={example.id}
      className="grid animate-pop-in gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch"
    >
      <div className="flex flex-col gap-4 rounded-[28px] border border-peach-edge bg-peach-tint p-6 sm:p-7">
        <p className="text-sm font-semibold text-peach-ink">Before · {example.app}</p>
        {example.before ? (
          <p className="text-lg leading-relaxed text-ink-soft">{example.before}</p>
        ) : (
          <p className="text-lg leading-relaxed text-subtle">Nothing selected, just a blinking cursor.</p>
        )}
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3.5 shadow-card">
          <KeyCombo keys={example.keys} />
          {example.preset && (
            <p className="rounded-full border border-peach-edge bg-peach-tint px-2.5 py-0.5 text-[11px] font-semibold text-peach-ink">
              Preset · {example.preset}
            </p>
          )}
          <p className="flex max-w-44 items-start gap-1.5 text-center text-[13px] font-semibold text-ink">
            <WandSparkles aria-hidden className="mt-0.5 size-3.5 shrink-0 text-violet-ink" />
            {example.prompt}
          </p>
          <ArrowRight aria-hidden className="size-4 rotate-90 text-subtle lg:rotate-0" />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[28px] border border-mint-edge bg-mint-tint p-6 sm:p-7">
        <p className="text-sm font-semibold text-mint-ink">After</p>
        <p className="text-lg leading-relaxed text-ink">{example.after}</p>
      </div>
    </div>
  )
}
