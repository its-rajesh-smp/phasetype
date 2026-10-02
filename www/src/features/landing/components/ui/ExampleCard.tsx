import { ArrowRight, WandSparkles } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Eyebrow'
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
      <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-line-strong bg-sunken/60 p-6 sm:p-7">
        <Eyebrow>Before · {example.app}</Eyebrow>
        {example.before ? (
          <p className="text-[17px] leading-relaxed text-muted">{example.before}</p>
        ) : (
          <p className="text-[17px] leading-relaxed text-subtle italic">Nothing selected, just a blinking cursor.</p>
        )}
      </div>

      <div className="flex items-center justify-center lg:flex-col">
        <div className="flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3.5 shadow-card">
          <KeyCombo keys={example.keys} />
          <p className="flex max-w-44 items-start gap-1.5 text-center text-[13px] font-medium text-ink">
            <WandSparkles aria-hidden className="mt-0.5 size-3.5 shrink-0 text-ember" />
            {example.prompt}
          </p>
          <ArrowRight aria-hidden className="size-4 rotate-90 text-subtle lg:rotate-0" />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-line-strong bg-surface p-6 shadow-card sm:p-7">
        <Eyebrow className="text-ember">After</Eyebrow>
        <p className="text-[17px] leading-relaxed text-ink">{example.after}</p>
      </div>
    </div>
  )
}
