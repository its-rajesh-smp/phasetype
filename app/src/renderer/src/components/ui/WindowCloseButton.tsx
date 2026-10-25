import { X } from 'lucide-react'
import { cn } from '../../utils/cn.util'

interface WindowCloseButtonProps {
  /** Red when the window is focused, grey otherwise, like native macOS windows. */
  active: boolean
  onClick: () => void
}

/** The macOS red close button for frameless windows. Hovering shows the × and turns it red even when unfocused. */
export function WindowCloseButton({ active, onClick }: WindowCloseButtonProps): React.JSX.Element {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className={cn(
        'group no-drag flex size-3 items-center justify-center rounded-full border-[0.5px] transition-colors',
        'hover:border-traffic-close-edge hover:bg-traffic-close focus-visible:outline-none',
        active ? 'border-traffic-close-edge bg-traffic-close' : 'border-traffic-idle-edge bg-traffic-idle'
      )}
    >
      <X className="size-2 text-black/60 opacity-0 group-hover:opacity-100" strokeWidth={3} />
    </button>
  )
}
