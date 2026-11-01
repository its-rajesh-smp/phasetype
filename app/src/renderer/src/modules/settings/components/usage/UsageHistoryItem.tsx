import type { UsageRecord } from '@shared/types'
import { ChevronRight, MessageSquareText, SpellCheck } from 'lucide-react'
import { Badge } from '../../../../components/ui/Badge'
import { formatCompact, formatUsd } from '../../../../utils/text.util'
import { recordCost, recordTokens } from '../../helpers/usage.helper'
import { UsageHistoryDetail } from './UsageHistoryDetail'

const timeFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

/** One request: what was asked, the model, tokens, cost and time. Opens to show the selected text, files and answer. */
export function UsageHistoryItem({ record }: { record: UsageRecord }): React.JSX.Element {
  const cost = recordCost(record)
  const Icon = record.source === 'quickFix' ? SpellCheck : MessageSquareText
  const meta = [record.model, record.presetName, `${formatCompact(recordTokens(record))} tokens`, timeFormat.format(record.createdAt)]
    .filter(Boolean)
    .join(' · ')

  return (
    <li>
      <details className="group">
        <summary className="flex cursor-default list-none items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-ink/[0.03] [&::-webkit-details-marker]:hidden">
          <ChevronRight className="size-3.5 shrink-0 text-subtle transition-transform group-open:rotate-90" />
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sunken text-muted">
            <Icon className="size-3.5" strokeWidth={1.8} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[13.5px] font-medium text-ink">{record.instruction}</span>
            <span className="truncate text-[12px] text-subtle">{meta}</span>
          </span>
          {record.status === 'error' && <Badge tone="warning">Failed</Badge>}
          {record.status === 'cancelled' && <Badge tone="neutral">Stopped</Badge>}
          <span className="shrink-0 font-mono text-[12.5px] text-ink-soft">{cost === null ? '—' : formatUsd(cost)}</span>
        </summary>
        <div className="flex flex-col gap-3 pt-1 pr-2 pb-4 pl-[3.25rem]">
          {record.inputPreview && <UsageHistoryDetail label="Selected text">{record.inputPreview}</UsageHistoryDetail>}
          {record.attachmentNames.length > 0 && <UsageHistoryDetail label="Files">{record.attachmentNames.join('\n')}</UsageHistoryDetail>}
          {record.outputPreview && <UsageHistoryDetail label="Answer">{record.outputPreview}</UsageHistoryDetail>}
          {record.error && <UsageHistoryDetail label="Error">{record.error}</UsageHistoryDetail>}
          {record.transcription && (
            <p className="text-[12px] text-subtle">
              Includes {formatCompact(record.transcription.usage.inputTokens + record.transcription.usage.outputTokens)} tokens to
              transcribe audio with {record.transcription.model}.
            </p>
          )}
        </div>
      </details>
    </li>
  )
}
