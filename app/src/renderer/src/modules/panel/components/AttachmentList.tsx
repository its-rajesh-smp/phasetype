import type { AttachmentSummary } from '@shared/types'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import { pluralize } from '../../../utils/text.util'
import { AttachmentChip } from './AttachmentChip'

interface AttachmentListProps {
  attachments: AttachmentSummary[]
  onRemove: (id: string) => void
}

/** The files selected when the panel opened (e.g. in Finder), which are sent along with the prompt. */
export function AttachmentList({ attachments, onRemove }: AttachmentListProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2 px-5 pb-3">
      <Eyebrow>Selected · {pluralize(attachments.length, 'file')}</Eyebrow>
      <ul className="flex flex-wrap gap-2">
        {attachments.map((attachment) => (
          <AttachmentChip key={attachment.id} attachment={attachment} onRemove={() => onRemove(attachment.id)} />
        ))}
      </ul>
    </div>
  )
}
