'use client'

import { CircleAlert, CircleCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { KeyCombo } from '@/components/ui/KeyCombo'
import { useLatestRef } from '@/hooks/useLatestRef'
import { cn } from '@/utils/cn.util'
import { TAKEN_HOTKEYS } from '../../constants/features.constants'
import { findHotkeyOwner, keysFromEvent } from '../../helpers/hotkey.helper'
import type { HotkeyItem } from '../../types/landing.types'

interface HotkeyRowProps {
  item: HotkeyItem
  recording: boolean
  onRecord: () => void
  onDone: () => void
}

/** One shortcut row. While recording it listens for the next modifier + key combo; Escape or clicking away cancels. */
export function HotkeyRow({ item, recording, onRecord, onDone }: HotkeyRowProps) {
  const [keys, setKeys] = useState(item.keys)
  const [presses, setPresses] = useState(0)
  const onDoneRef = useLatestRef(onDone)
  const owner = findHotkeyOwner(keys, TAKEN_HOTKEYS)

  useEffect(() => {
    if (!recording) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') return onDoneRef.current()
      const pressed = keysFromEvent(event)
      if (!pressed) return
      event.preventDefault()
      setKeys(pressed)
      setPresses((count) => count + 1)
      onDoneRef.current()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [recording, onDoneRef])

  return (
    <li>
      <button
        type="button"
        onClick={recording ? onDone : onRecord}
        onBlur={() => recording && onDone()}
        aria-label={recording ? `Recording a shortcut for ${item.name}. Press keys, or Escape to cancel.` : `${item.name}: ${keys.join(' ')}. Click to record a new shortcut.`}
        className={cn(
          'flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border bg-surface/90 px-4 py-3 text-left shadow-card transition duration-200 hover:bg-surface focus-visible:outline-2 focus-visible:outline-sky-ink',
          recording ? 'border-sky-ink ring-4 ring-sky-edge' : 'border-white'
        )}
      >
        <span className="text-sm font-semibold text-ink">{item.name}</span>
        <span className="flex items-center gap-3">
          {recording ? (
            <span className="animate-pulse rounded-md border border-dashed border-sky-ink px-2 py-0.5 text-xs font-medium text-sky-ink">Press keys…</span>
          ) : (
            <KeyCombo key={presses} keys={keys} pressed={presses > 0} />
          )}
          {!recording && (
            <span
              key={`status-${presses}`}
              className={cn('hidden items-center gap-1 text-xs font-medium sm:inline-flex', presses > 0 && 'animate-pop-in', owner ? 'text-ember' : 'text-mint-ink')}
            >
              {owner ? <CircleAlert aria-hidden className="size-3.5" /> : <CircleCheck aria-hidden className="size-3.5" />}
              {owner ? `Used by ${owner}` : 'Available'}
            </span>
          )}
        </span>
      </button>
    </li>
  )
}
