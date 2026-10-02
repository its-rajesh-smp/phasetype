import { SpellCheck, type LucideIcon } from 'lucide-react'
import type { PanelContext } from '@shared/types'

export const EMPTY_PANEL_CONTEXT: PanelContext = { selectedText: '', accessibilityGranted: true }

export const QUICK_ACTION_ICONS: Record<string, LucideIcon> = {
  fix: SpellCheck
}

export const PROMPT_PLACEHOLDERS = {
  withSelection: 'Tell PhaseType what to do… e.g. make it more natural',
  withoutSelection: 'Tell PhaseType what to write… e.g. tell Sourav we are ok',
  refining: 'Refine the result… e.g. make it shorter'
} as const
