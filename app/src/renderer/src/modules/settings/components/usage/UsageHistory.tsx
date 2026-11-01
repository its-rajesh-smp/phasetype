import type { UsageRecord } from '@shared/types'
import { useState } from 'react'
import { Button } from '../../../../components/ui/Button'
import { Eyebrow } from '../../../../components/ui/Eyebrow'
import { USAGE_HISTORY_PAGE_SIZE } from '../../constants/settings.constants'
import { groupByDay } from '../../helpers/usage.helper'
import { UsageHistoryItem } from './UsageHistoryItem'

/** The request history grouped by day, newest first, a page at a time. */
export function UsageHistory({ records }: { records: UsageRecord[] }): React.JSX.Element {
  const [visibleCount, setVisibleCount] = useState(USAGE_HISTORY_PAGE_SIZE)
  const days = groupByDay(records.slice(0, visibleCount), new Date())

  return (
    <div className="flex flex-col gap-5">
      {days.map((day) => (
        <div key={day.key} className="flex flex-col gap-1">
          <Eyebrow className="px-2 pb-1">{day.label}</Eyebrow>
          <ul className="flex flex-col">
            {day.records.map((record) => (
              <UsageHistoryItem key={record.id} record={record} />
            ))}
          </ul>
        </div>
      ))}
      {records.length > visibleCount && (
        <div className="flex justify-center">
          <Button variant="secondary" size="sm" onClick={() => setVisibleCount((count) => count + USAGE_HISTORY_PAGE_SIZE)}>
            Show more
          </Button>
        </div>
      )}
    </div>
  )
}
