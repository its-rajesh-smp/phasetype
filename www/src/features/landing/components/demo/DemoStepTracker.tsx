import { cn } from '@/utils/cn.util'
import { DEMO_STAGE_STEP, DEMO_STEP_LABELS } from '../../constants/demo.constants'
import type { DemoStageId } from '../../types/demo.types'

/** Row of step labels under the demo, highlighting the one currently playing. */
export function DemoStepTracker({ stage }: { stage: DemoStageId }) {
  const activeStep = DEMO_STAGE_STEP[stage]

  return (
    <ol className="flex flex-wrap items-center justify-center gap-2">
      {DEMO_STEP_LABELS.map((label, index) => (
        <li
          key={label}
          className={cn(
            'flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300',
            index === activeStep ? 'border-ink bg-ink text-canvas' : 'border-line-strong text-muted'
          )}
        >
          <span className={cn('tabular-nums', index === activeStep ? 'text-lime' : 'text-subtle')}>0{index + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  )
}
