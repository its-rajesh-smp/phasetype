import { useCallback, useEffect, useRef, useState } from 'react'
import { bridge } from '../services/bridge.service'
import { eventToAccelerator, getModifiers } from '../utils/keyboard.util'
import { useLatestRef } from './useLatestRef'

const MISSING_MODIFIER_ERROR = 'Add ⌘, ⌃ or ⌥ so the shortcut does not clash with normal typing.'

/** Records a global shortcut from the keyboard. The current global hotkey is paused while recording. */
export function useHotkeyRecorder(onRecord: (accelerator: string) => void) {
  const [isRecording, setIsRecording] = useState(false)
  const [heldModifiers, setHeldModifiers] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const onRecordRef = useLatestRef(onRecord)
  const recordingRef = useRef(false)

  const stop = useCallback(() => {
    if (!recordingRef.current) return
    recordingRef.current = false
    setIsRecording(false)
    setHeldModifiers([])
    void bridge.hotkey.resume()
  }, [])

  const start = useCallback(() => {
    recordingRef.current = true
    setError(null)
    setIsRecording(true)
    void bridge.hotkey.pause()
  }, [])

  useEffect(() => {
    if (!isRecording) return

    const onKeyDown = (event: KeyboardEvent): void => {
      event.preventDefault()
      event.stopPropagation()
      if (event.code === 'Escape' && getModifiers(event).length === 0) {
        stop()
        return
      }
      const result = eventToAccelerator(event)
      if (result.kind === 'modifiers-only') setHeldModifiers(result.modifiers)
      else if (result.kind === 'missing-modifier') setError(MISSING_MODIFIER_ERROR)
      else if (result.kind === 'shortcut') {
        stop()
        onRecordRef.current(result.accelerator)
      }
    }
    const onKeyUp = (event: KeyboardEvent): void => setHeldModifiers(getModifiers(event))

    window.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('keyup', onKeyUp, true)
    window.addEventListener('blur', stop)
    return () => {
      window.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('keyup', onKeyUp, true)
      window.removeEventListener('blur', stop)
    }
  }, [isRecording, stop, onRecordRef])

  useEffect(() => stop, [stop])

  return { isRecording, heldModifiers, error, start, stop }
}
