import { cn } from '../../../utils/cn.util'

/** Progress bars plus a "2/3" counter for the onboarding steps. */
export function StepIndicator({ current, total }: { current: number; total: number }): React.JSX.Element {
  return (
    <div className="flex items-center gap-3" aria-label={`Step ${current} of ${total}`}>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={cn(
              'h-1 w-6 rounded-full transition-colors',
              index + 1 < current && 'bg-ink',
              index + 1 === current && 'bg-gradient-to-r from-lime-deep to-ember',
              index + 1 > current && 'bg-line-strong'
            )}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-muted tabular-nums">
        {current}/{total}
      </span>
    </div>
  )
}
