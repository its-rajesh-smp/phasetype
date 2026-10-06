import { LogoMark } from '@/components/ui/LogoMark'

/** A slim dark macOS menu bar with the PhaseType tray icon. */
export function DemoMenuBar({ app }: { app: string }) {
  return (
    <div className="flex h-8 items-center justify-between border-b border-stage-line bg-white/[0.03] px-4 text-xs text-white/60">
      <span className="flex items-center gap-4">
        <span className="font-semibold text-white">{app}</span>
        <span className="hidden sm:inline">File</span>
        <span className="hidden sm:inline">Edit</span>
        <span className="hidden sm:inline">View</span>
      </span>
      <span className="flex items-center gap-3">
        <LogoMark className="size-4 rounded-[4px] ring-1 ring-white/20" />
        <span>Thu 9:41</span>
      </span>
    </div>
  )
}
