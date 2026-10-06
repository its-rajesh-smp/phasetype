import type { LucideIcon } from 'lucide-react'

export type StepIllustrationId = 'select' | 'press' | 'paste'

export interface Step {
  number: string
  title: string
  description: string
  illustration: StepIllustrationId
}

export type CardTone = 'violet' | 'sky' | 'peach' | 'mint' | 'plain'

export type FeatureVisualId = 'activity' | 'hotkeys'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  tone: CardTone
  wide?: boolean
  visual?: FeatureVisualId
}

export interface ActivityItem {
  app: string
  action: string
  detail: string
  time: string
}

export interface HotkeyItem {
  name: string
  keys: readonly string[]
}

export interface Fact {
  value: string
  label: string
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface PrivacyPoint {
  icon: LucideIcon
  title: string
  description: string
}

export interface WritingExample {
  id: string
  label: string
  app: string
  keys: readonly string[]
  prompt: string
  /** Null when nothing was selected and PhaseType writes from scratch. */
  before: string | null
  after: string
}

export interface WritingMode {
  id: 'panel' | 'quick-fix'
  name: string
  keys: readonly string[]
  /** First words of the title, drawn in the accent colour. */
  titleAccent: string
  title: string
  description: string
  points: readonly string[]
}
