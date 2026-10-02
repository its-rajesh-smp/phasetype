import type { LucideIcon } from 'lucide-react'

export interface Step {
  number: string
  title: string
  description: string
  keys?: readonly string[]
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  wide?: boolean
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
  title: string
  description: string
  points: readonly string[]
}
