import type { LucideIcon } from 'lucide-react'

export type StepIllustrationId = 'select' | 'press' | 'paste'

export interface Step {
  number: string
  title: string
  description: string
  illustration: StepIllustrationId
}

export type CardTone = 'violet' | 'sky' | 'peach' | 'mint' | 'plain'

export type FeatureVisualId = 'activity' | 'hotkeys' | 'presets' | 'usage'

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

export interface PresetItem {
  name: string
  instructions: string
  selected?: boolean
}

export interface UsageItem {
  model: string
  detail: string
  cost: string
}

export interface FileKind {
  icon: LucideIcon
  name: string
  formats: string
  tone: CardTone
}

export interface DemoAttachment {
  name: string
  /** Page count or length, shown under the name. */
  detail: string
  kind: 'document' | 'audio'
}

export interface Fact {
  value: string
  label: string
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface WritingExample {
  id: string
  label: string
  app: string
  keys: readonly string[]
  /** The saved preset applied on top of the prompt, if any. */
  preset?: string
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
