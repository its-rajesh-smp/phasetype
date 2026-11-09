import { useCallback, useEffect, useRef, useState } from 'react'

const COPIED_MS = 1600

/** Fallback for pages without the async Clipboard API (it needs https or localhost). */
function copyWithTextarea(text: string): boolean {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    textarea.remove()
  }
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Blocked or not allowed here; try the fallback.
  }
  return copyWithTextarea(text)
}

/** Copies text to the clipboard and reports `copied` for a moment afterwards. */
export function useCopyFeedback(): { copied: boolean; copy: (text: string) => Promise<void> } {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(async (text: string) => {
    const ok = await writeClipboard(text)
    setCopied(ok)
    clearTimeout(timer.current)
    if (ok) timer.current = setTimeout(() => setCopied(false), COPIED_MS)
  }, [])

  return { copied, copy }
}
