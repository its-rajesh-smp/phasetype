import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WRITING_MODES } from '../../constants/modes.constants'
import { ModeCard } from '../ui/ModeCard'
import { PanelVisual } from '../ui/PanelVisual'
import { QuickFixVisual } from '../ui/QuickFixVisual'

const [PANEL_MODE, QUICK_FIX_MODE] = WRITING_MODES

/** The panel and quick fix, side by side. */
export function ModesSection() {
  return (
    <section aria-labelledby="modes-title" className="pb-24 sm:pb-32">
      <Container className="reveal flex flex-col gap-14">
        <SectionHeading
          id="modes-title"
          eyebrow="Two hotkeys"
          title={
            <>
              One to ask. <em className="text-ember">One to fix.</em>
            </>
          }
          description="Open the panel when you want to steer the rewrite. Use quick fix when you just want it right, without leaving the line you are on."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <ModeCard mode={PANEL_MODE} visual={<PanelVisual />} />
          <ModeCard mode={QUICK_FIX_MODE} visual={<QuickFixVisual />} tone="ink" />
        </div>
      </Container>
    </section>
  )
}
