import { WAVE_DOT_COUNT, WAVE_DOT_STAGGER_MS } from '../constants/status.constants'

/** A row of dots pulsing in a wave, shown while the quick fix is working. */
export function WaveDots(): React.JSX.Element {
  return (
    <span aria-hidden className="flex items-center gap-1">
      {Array.from({ length: WAVE_DOT_COUNT }, (_, index) => (
        <span
          key={index}
          className="size-1 animate-wave rounded-full bg-white"
          style={{ animationDelay: `${index * WAVE_DOT_STAGGER_MS}ms` }}
        />
      ))}
    </span>
  )
}
