import { Settings2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { LogoMark } from '@/components/ui/LogoMark'
import { cn } from '@/utils/cn.util'

interface PanelCardProps {
  children: ReactNode
  /** Replaces the decorative settings icon in the header, e.g. with a close button. */
  action?: ReactNode
  className?: string
}

/** The floating PhaseType panel: rounded card with the small logo header. */
export function PanelCard({ children, action, className }: PanelCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-[18px] border border-line-strong/80 bg-surface bg-[radial-gradient(60%_80%_at_100%_0%,rgb(190_242_100/0.25),transparent_70%)] shadow-window',
        className
      )}
    >
      <div className="flex h-10 shrink-0 items-center justify-between px-4">
        <LogoMark className="size-6" />
        {action ?? <Settings2 aria-hidden className="size-4 text-subtle" />}
      </div>
      {children}
    </div>
  )
}
