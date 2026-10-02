import { Settings2 } from 'lucide-react'
import { LogoMark } from '@/components/ui/LogoMark'
import { cn } from '@/utils/cn.util'

/** The floating PhaseType panel: rounded card with the small logo header. */
export function PanelCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-[18px] border border-line-strong/80 bg-surface bg-[radial-gradient(60%_80%_at_100%_0%,rgb(227_245_66/0.22),transparent_70%)] shadow-window',
        className
      )}
    >
      <div className="flex h-10 shrink-0 items-center justify-between px-4">
        <LogoMark className="size-6" />
        <Settings2 aria-hidden className="size-4 text-subtle" />
      </div>
      {children}
    </div>
  )
}
