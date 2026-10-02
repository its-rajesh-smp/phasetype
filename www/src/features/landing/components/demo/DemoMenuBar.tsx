import { LogoMark } from '@/components/ui/LogoMark'

/** A slim macOS menu bar with the PhaseType tray icon. */
export function DemoMenuBar({ app }: { app: string }) {
  return (
    <div className="flex h-8 items-center justify-between border-b border-ink/5 bg-surface/60 px-4 text-xs text-ink-soft backdrop-blur">
      <span className="flex items-center gap-4">
        <span className="font-semibold text-ink">{app}</span>
        <span className="hidden sm:inline">File</span>
        <span className="hidden sm:inline">Edit</span>
        <span className="hidden sm:inline">View</span>
      </span>
      <span className="flex items-center gap-3">
        <LogoMark className="size-4" />
        <span>Thu 9:41</span>
      </span>
    </div>
  )
}
