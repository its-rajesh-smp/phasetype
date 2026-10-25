import { SpellCheck, type LucideIcon } from 'lucide-react'
import type { PanelContext } from '@shared/types'

export const EMPTY_PANEL_CONTEXT: PanelContext = { selectedText: '', attachments: [], accessibilityGranted: true, capturing: false, presets: [] }

export const QUICK_ACTION_ICONS: Record<string, LucideIcon> = {
  fix: SpellCheck
}

export const PROMPT_PLACEHOLDERS = {
  withSelection: 'Tell PhaseType what to do… e.g. make it more natural',
  withFiles: 'Ask about the file… e.g. summarize it, or pull out the key numbers',
  withoutSelection: 'Tell PhaseType what to write… e.g. tell Sourav we are ok',
  refining: 'Refine the result… e.g. make it shorter'
} as const
