import { WRITING_APPS } from '../../constants/apps.constants'
import { MarqueeTrack } from '../ui/MarqueeTrack'

/** An endless strip of apps PhaseType works in. */
export function AppsMarquee() {
  return (
    <section aria-labelledby="apps-title" className="border-y border-line bg-surface/40 py-10">
      <h2 id="apps-title" className="mb-6 text-center text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">
        Works wherever you write
      </h2>
      <div className="fade-x flex overflow-hidden">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          <MarqueeTrack items={WRITING_APPS} />
          <MarqueeTrack items={WRITING_APPS} hidden />
        </div>
      </div>
    </section>
  )
}
