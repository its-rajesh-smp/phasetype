import { AudioLines, FileText } from 'lucide-react'
import { FILES_DEMO } from '../../constants/files.constants'
import type { DemoAttachment } from '../../types/landing.types'
import { PanelActions } from '../panel/PanelActions'
import { PanelCard } from '../panel/PanelCard'
import { PanelPrompt } from '../panel/PanelPrompt'
import { PanelResult } from '../panel/PanelResult'

const ATTACHMENT_ICONS = { document: FileText, audio: AudioLines } as const

function AttachmentChip({ attachment }: { attachment: DemoAttachment }) {
  const Icon = ATTACHMENT_ICONS[attachment.kind]
  return (
    <li className="flex min-w-0 items-center gap-2.5 rounded-xl border border-line bg-canvas/70 py-1.5 pr-3 pl-1.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sunken text-ink-soft">
        <Icon aria-hidden className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xs font-semibold text-ink">{attachment.name}</span>
        <span className="block text-[11px] text-muted">{attachment.detail}</span>
      </span>
    </li>
  )
}

/** A still of the panel with files from Finder attached and a question answered about them. */
export function FilesVisual() {
  return (
    <PanelCard className="w-full max-w-md rotate-1">
      <ul className="grid grid-cols-2 gap-2 px-4 pb-3">
        {FILES_DEMO.attachments.map((attachment) => (
          <AttachmentChip key={attachment.name} attachment={attachment} />
        ))}
      </ul>
      <PanelPrompt value={FILES_DEMO.prompt} isTyping={false} isStreaming={false} />
      <PanelResult output={FILES_DEMO.result} isStreaming={false} />
      <PanelActions isReady canPaste={false} />
    </PanelCard>
  )
}
