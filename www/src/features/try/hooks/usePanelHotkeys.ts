import { useEffect } from 'react'
import { useLatestRef } from '@/hooks/useLatestRef'

interface PanelHotkeyHandlers {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  /** ⌘↵: put the result back into the editor, like Paste in the app. */
  onReplace: () => void
}

/** ⌘⇧Space (or Ctrl⇧Space) opens the panel, Escape closes it and ⌘↵ replaces the selection, as in the app. */
export function usePanelHotkeys(handlers: PanelHotkeyHandlers): void {
  const latest = useLatestRef(handlers)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      const { isOpen, onOpen, onClose, onReplace } = latest.current
      const withCommand = event.metaKey || event.ctrlKey
      if (withCommand && event.shiftKey && event.code === 'Space') {
        event.preventDefault()
        onOpen()
      } else if (isOpen && event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (isOpen && withCommand && event.key === 'Enter') {
        event.preventDefault()
        onReplace()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [latest])
}
