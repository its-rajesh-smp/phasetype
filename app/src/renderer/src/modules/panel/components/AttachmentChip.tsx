import type { AttachmentSummary } from '@shared/types'
import { FileText, X } from 'lucide-react'
import { cn } from '../../../utils/cn.util'
import { formatBytes } from '../../../utils/text.util'

interface AttachmentChipProps {
  attachment: AttachmentSummary
  onRemove: () => void
}

/** A captured file: thumbnail, name, type and size (or why it can't be sent), with a remove button. */
export function AttachmentChip({ attachment, onRemove }: AttachmentChipProps): React.JSX.Element {
  const { name, extension, sizeBytes, thumbnail, error } = attachment
  const meta = [extension, sizeBytes ? formatBytes(sizeBytes) : ''].filter(Boolean).join(' · ')

  return (
    <li
      className={cn(
        'flex max-w-full min-w-0 items-center gap-3 rounded-xl border py-2 pr-2 pl-2.5',
        error ? 'border-danger/30 bg-danger/5' : 'border-line-strong bg-canvas/60'
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sunken">
        {thumbnail ? (
          <img src={thumbnail} alt="" draggable={false} className="size-full object-contain" />
        ) : (
          <FileText className="size-5 text-muted" strokeWidth={1.6} />
        )}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[13.5px] font-medium text-ink" title={name}>
          {name}
        </span>
        <span className={cn('truncate text-[12px]', error ? 'text-danger' : 'text-subtle')}>{error ?? meta}</span>
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${name}`}
        className="ml-1 flex size-7 shrink-0 items-center justify-center rounded-full text-subtle transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <X className="size-3.5" />
      </button>
    </li>
  )
}
