import { WRITING_APPS } from '../../constants/apps.constants'
import { MarqueeTrack } from '../ui/MarqueeTrack'

/** An endless strip of apps PhaseType works in. */
export function AppsMarquee() {
  return (
    <section aria-labelledby="apps-title" className="py-10">
      <h2 id="apps-title" className="mb-6 text-center text-sm font-medium text-muted">
        Works wherever you write
      </h2>
      <div className="fade-x flex overflow-hidden py-2">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          <MarqueeTrack items={WRITING_APPS} />
          <MarqueeTrack items={WRITING_APPS} hidden />
        </div>
      </div>
    </section>
  )
}
