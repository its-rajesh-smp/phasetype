import { CircleAlert, Check } from 'lucide-react'
import type { QuickFixStatus } from '@shared/types'
import { WaveDots } from './WaveDots'

/** The dark pill shown near the bottom of the screen while the quick fix hotkey runs. */
export function StatusPill({ status }: { status: QuickFixStatus }): React.JSX.Element {
  return (
    <div
      role="status"
      key={status.state}
      className="flex h-10 max-w-full animate-pop-in items-center gap-2.5 rounded-full border-2 border-white/85 bg-ink/90 px-4 text-[13px] font-medium text-white shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)]"
    >
      {status.state === 'working' && (
        <>
          <WaveDots />
          <span className="text-white/80">Fixing</span>
        </>
      )}
      {status.state === 'done' && (
        <>
          <Check className="size-4 text-lime" strokeWidth={3} />
          <span>Fixed</span>
        </>
      )}
      {status.state === 'error' && (
        <>
          <CircleAlert className="size-4 shrink-0 text-ember" />
          <span className="truncate">{status.message}</span>
        </>
      )}
    </div>
  )
}
