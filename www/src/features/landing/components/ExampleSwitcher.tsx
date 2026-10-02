'use client'

import { useState } from 'react'
import { WRITING_EXAMPLES } from '../constants/examples.constants'
import { ExampleCard } from './ui/ExampleCard'
import { ExampleTabs } from './ui/ExampleTabs'

/** Lets visitors flip between writing examples. Owns the active tab. */
export function ExampleSwitcher() {
  const [activeId, setActiveId] = useState(WRITING_EXAMPLES[0].id)
  const active = WRITING_EXAMPLES.find((example) => example.id === activeId) ?? WRITING_EXAMPLES[0]

  return (
    <div className="flex flex-col gap-10">
      <ExampleTabs examples={WRITING_EXAMPLES} activeId={activeId} onSelect={setActiveId} />
      <ExampleCard example={active} />
    </div>
  )
}
