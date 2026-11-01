import { AudioLines, FileText, Film, SpellCheck, type LucideIcon } from 'lucide-react'
import type { AttachmentKind, PanelContext } from '@shared/types'

export const EMPTY_PANEL_CONTEXT: PanelContext = { selectedText: '', attachments: [], accessibilityGranted: true, capturing: false, presets: [] }

export const QUICK_ACTION_ICONS: Record<string, LucideIcon> = {
  fix: SpellCheck
}

/** Shown in an attachment chip when macOS has no thumbnail for the file. */
export const ATTACHMENT_ICONS: Partial<Record<AttachmentKind, LucideIcon>> = { audio: AudioLines, video: Film }
export const DEFAULT_ATTACHMENT_ICON: LucideIcon = FileText

export const PROMPT_PLACEHOLDERS = {
  withSelection: 'Tell PhaseType what to do… e.g. make it more natural',
  withFiles: 'Ask about the file… e.g. summarize it, or pull out the key numbers',
  withMedia: 'Ask about the recording… e.g. what happens in it, or give me a transcript',
  withoutSelection: 'Tell PhaseType what to write… e.g. tell Sourav we are ok',
  refining: 'Refine the result… e.g. make it shorter'
} as const
