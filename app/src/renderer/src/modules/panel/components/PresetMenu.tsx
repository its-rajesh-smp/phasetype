import type { PresetSummary } from '@shared/types'
import { Check } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Button } from '../../../components/ui/Button'
import { bridge } from '../../../services/bridge.service'
import { cn } from '../../../utils/cn.util'

interface PresetMenuProps {
  presets: PresetSummary[]
  activeId: string | null
  onSelect: (id: string | null) => void
}

/** Moves focus to the previous or next menu item, wrapping around. */
function moveFocus(menu: HTMLElement, step: 1 | -1): void {
  const items = Array.from(menu.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'))
  const index = items.indexOf(document.activeElement as HTMLButtonElement)
  items[(index + step + items.length) % items.length]?.focus()
}

/**
 * List of presets to apply to the next request, plus "No preset". Opens focused on the current choice;
 * ↑/↓ move, ↵ picks. It sits in the panel's flow because the panel window is only as tall as its content.
 */
export function PresetMenu({ presets, activeId, onSelect }: PresetMenuProps): React.JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null)
  const options = [{ id: null, name: 'No preset' }, ...presets]

  useEffect(() => {
    menuRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus()
  }, [])

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Presets"
      onKeyDown={(event) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
        event.preventDefault()
        if (menuRef.current) moveFocus(menuRef.current, event.key === 'ArrowDown' ? 1 : -1)
      }}
      className="mx-4 mb-4 flex animate-pop-in flex-col gap-0.5 rounded-xl border border-line-strong bg-canvas/60 p-1.5"
    >
      {options.map((option) => (
        <button
          key={option.id ?? 'none'}
          type="button"
          role="menuitemradio"
          aria-checked={option.id === activeId}
          onClick={() => onSelect(option.id)}
          className={cn(
            'flex h-9 items-center justify-between gap-3 rounded-lg px-3 text-left text-[13.5px] outline-none transition-colors',
            'hover:bg-ink/5 focus:bg-sunken',
            option.id === null ? 'text-muted' : 'text-ink-soft'
          )}
        >
          <span className="truncate">{option.name}</span>
          {option.id === activeId && <Check className="size-3.5 shrink-0 text-ink" />}
        </button>
      ))}
      {presets.length === 0 && (
        <p className="flex items-center justify-between gap-3 px-3 pt-1 pb-1.5 text-[13px] text-muted">
          No presets yet.
          <Button variant="link" onClick={bridge.app.openSettings}>
            Create one in Settings
          </Button>
        </p>
      )}
    </div>
  )
}
