import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ACTIVITY_ITEMS, FEATURES, HOTKEY_ITEMS, PRESET_ITEMS, USAGE_ITEMS } from '../../constants/features.constants'
import type { FeatureVisualId } from '../../types/landing.types'
import { ActivityFeed } from '../ui/ActivityFeed'
import { FeatureCard } from '../ui/FeatureCard'
import { HotkeyList } from '../ui/HotkeyList'
import { PresetList } from '../ui/PresetList'
import { UsageList } from '../ui/UsageList'

const FEATURE_VISUALS: Record<FeatureVisualId, React.ReactNode> = {
  activity: <ActivityFeed items={ACTIVITY_ITEMS} />,
  hotkeys: <HotkeyList items={HOTKEY_ITEMS} />,
  presets: <PresetList items={PRESET_ITEMS} />,
  usage: <UsageList items={USAGE_ITEMS} />
}

/** Pastel bento grid of features. */
export function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-title" className="pb-24 sm:pb-32">
      <Container className="reveal flex flex-col gap-14">
        <SectionHeading
          id="features-title"
          badge="Features"
          title="Everything for writing, nothing in the way"
          description="Built around one idea: you should never have to leave the thing you are writing."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} visual={feature.visual && FEATURE_VISUALS[feature.visual]} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
