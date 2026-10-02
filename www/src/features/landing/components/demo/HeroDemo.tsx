'use client'

import { DEMO_EMAIL } from '../../constants/demo.constants'
import { useDemoSequence } from '../../hooks/useDemoSequence'
import { DemoHotkeyOverlay } from './DemoHotkeyOverlay'
import { DemoMailWindow } from './DemoMailWindow'
import { DemoMenuBar } from './DemoMenuBar'
import { DemoPanel } from './DemoPanel'
import { DemoStepTracker } from './DemoStepTracker'

/** Looping product demo: an email draft is selected, rewritten in the panel and pasted back. */
export function HeroDemo() {
  const scene = useDemoSequence()

  return (
    <figure className="flex flex-col gap-6">
      <div
        aria-hidden
        className="relative min-h-[620px] overflow-hidden rounded-[28px] border border-line-strong/70 bg-sunken/70 shadow-card sm:min-h-[560px]"
      >
        <div className="absolute inset-0 grid-lines" />
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-lime/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-96 rounded-full bg-ember/20 blur-3xl" />

        <div className="relative">
          <DemoMenuBar app={DEMO_EMAIL.app} />
          <div className="p-4 sm:p-8">
            <DemoMailWindow draft={scene.draft} isSelected={scene.isSelected} justPasted={scene.justPasted} />
          </div>
        </div>

        <DemoPanel scene={scene} />
        {scene.showHotkey && <DemoHotkeyOverlay />}
      </div>

      <figcaption className="flex flex-col items-center gap-3">
        <DemoStepTracker stage={scene.stage} />
        <span className="sr-only">
          Demo: a rough email draft in Mail is selected, PhaseType is opened with Control Option Space, asked to “
          {DEMO_EMAIL.prompt}”, and the polished result is pasted back over the draft.
        </span>
      </figcaption>
    </figure>
  )
}
