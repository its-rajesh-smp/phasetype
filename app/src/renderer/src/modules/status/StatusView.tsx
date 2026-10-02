import { StatusPill } from './components/StatusPill'
import { useQuickFixStatus } from './hooks/useQuickFixStatus'

/** The click-through status window: shows the quick fix progress pill, centered. */
export function StatusView(): React.JSX.Element {
  const status = useQuickFixStatus()
  return <div className="flex h-full items-center justify-center px-2">{status && <StatusPill status={status} />}</div>
}
