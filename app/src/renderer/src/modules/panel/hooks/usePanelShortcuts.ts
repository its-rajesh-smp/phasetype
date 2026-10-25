import { useEffect } from 'react'
import { useLatestRef } from '../../../hooks/useLatestRef'

interface PanelShortcuts {
  onEscape: () => void
  onPaste: () => void
  onCopy: () => void
  onTogglePresets: () => void
}

/** Registers the panel keyboard shortcuts: Esc closes (or stops generating), ⌘↵ pastes, ⇧⌘C copies, ⌘P picks a preset. */
export function usePanelShortcuts(shortcuts: PanelShortcuts): void {
  const shortcutsRef = useLatestRef(shortcuts)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault()
        shortcutsRef.current.onEscape()
      } else if (event.metaKey && event.key === 'Enter') {
        event.preventDefault()
        shortcutsRef.current.onPaste()
      } else if (event.metaKey && event.shiftKey && event.code === 'KeyC') {
        event.preventDefault()
        shortcutsRef.current.onCopy()
      } else if (event.metaKey && !event.shiftKey && event.code === 'KeyP') {
        event.preventDefault()
        shortcutsRef.current.onTogglePresets()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [shortcutsRef])
}
