import appIcon from '@assets/icon/icon.svg'
import { cn } from '../../utils/cn.util'

/** The PhaseType app icon, optionally followed by the PhaseType wordmark. */
export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }): React.JSX.Element {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      {/* The icon file has transparent padding around the tile; the negative margin keeps the tile ~24px. */}
      <img src={appIcon} alt="" draggable={false} className="-m-[3px] size-[30px]" />
      {showWordmark && <span className="text-[16px] font-bold tracking-[-0.01em] text-ink">PhaseType</span>}
    </span>
  )
}
