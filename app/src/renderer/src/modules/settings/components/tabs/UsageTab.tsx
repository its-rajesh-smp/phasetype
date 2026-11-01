import { Trash2 } from 'lucide-react'
import { Button } from '../../../../components/ui/Button'
import { InlineMessage } from '../../../../components/ui/InlineMessage'
import { Spinner } from '../../../../components/ui/Spinner'
import { summarizeByModel } from '../../helpers/usage.helper'
import { useUsageHistory } from '../../hooks/useUsageHistory'
import { SettingsPage } from '../SettingsPage'
import { SettingsSection } from '../SettingsSection'
import { ModelBreakdown } from '../usage/ModelBreakdown'
import { UsageEmptyState } from '../usage/UsageEmptyState'
import { UsageHistory } from '../usage/UsageHistory'
import { UsageSummary } from '../usage/UsageSummary'

/** Usage: estimated cost and tokens per period and per model, and the history of requests. All kept on this Mac. */
export function UsageTab(): React.JSX.Element {
  const { records, loading, error, clear } = useUsageHistory()

  const handleClear = (): void => {
    if (window.confirm('Delete the whole request history? The totals start again from zero.')) void clear()
  }

  return (
    <SettingsPage>
      <SettingsSection
        title="Usage"
        description="Tokens and estimated cost from OpenAI’s list prices; your OpenAI dashboard has the exact bill. The history stays on this Mac."
        action={
          <Button variant="secondary" size="sm" disabled={records.length === 0} leadingIcon={<Trash2 className="size-3.5" />} onClick={handleClear}>
            Clear history
          </Button>
        }
      >
        {error && <InlineMessage tone="error">{error}</InlineMessage>}
        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner className="size-5 text-muted" />
          </div>
        ) : records.length === 0 ? (
          <UsageEmptyState />
        ) : (
          <UsageSummary records={records} />
        )}
      </SettingsSection>
      {records.length > 0 && (
        <>
          <SettingsSection title="By model">
            <ModelBreakdown models={summarizeByModel(records)} />
          </SettingsSection>
          <SettingsSection title="History" description="Open a request to see the selected text, files and answer.">
            <UsageHistory records={records} />
          </SettingsSection>
        </>
      )}
    </SettingsPage>
  )
}
