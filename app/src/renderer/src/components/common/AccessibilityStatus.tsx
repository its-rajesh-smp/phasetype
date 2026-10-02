import { ShieldCheck } from 'lucide-react'
import { useAccessibilityPermission } from '../../hooks/useAccessibilityPermission'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

/** Accessibility status with a button that opens the right System Settings pane. */
export function AccessibilityStatus(): React.JSX.Element {
  const { granted, request } = useAccessibilityPermission()

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-line-strong bg-surface/80 px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-lime">
          <ShieldCheck className="size-5" />
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-ink">Accessibility</span>
          {granted === null ? (
            <Badge tone="neutral">Checking…</Badge>
          ) : granted ? (
            <Badge tone="success">Allowed</Badge>
          ) : (
            <Badge tone="warning">Not allowed yet</Badge>
          )}
        </div>
      </div>
      {granted === false && (
        <Button variant="primary" size="sm" onClick={() => void request()}>
          Open System Settings
        </Button>
      )}
    </div>
  )
}
