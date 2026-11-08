'use client'

import { useState } from 'react'
import type { HotkeyItem } from '../../types/landing.types'
import { HotkeyRow } from './HotkeyRow'

/** The default shortcuts. Click one to record your own, and it is checked against shortcuts already in use. */
export function HotkeyList({ items }: { items: HotkeyItem[] }) {
  const [recording, setRecording] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <HotkeyRow
            key={item.name}
            item={item}
            recording={recording === item.name}
            onRecord={() => setRecording(item.name)}
            onDone={() => setRecording(null)}
          />
        ))}
      </ul>
      <p className="px-1 text-xs text-muted">Click a shortcut and press your own.</p>
    </div>
  )
}
