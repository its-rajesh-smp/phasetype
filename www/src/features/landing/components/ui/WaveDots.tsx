const DOT_DELAYS = ['[animation-delay:0ms]', '[animation-delay:120ms]', '[animation-delay:240ms]'] as const

/** A row of dots pulsing in a wave, shown while the quick fix is working. */
export function WaveDots() {
  return (
    <span aria-hidden className="flex items-center gap-1">
      {DOT_DELAYS.map((delay) => (
        <span key={delay} className={`size-1 animate-wave rounded-full bg-white ${delay}`} />
      ))}
    </span>
  )
}
