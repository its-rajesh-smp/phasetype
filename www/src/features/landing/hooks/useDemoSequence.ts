import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { DEMO_STAGES } from '../constants/demo.constants'
import { buildDemoScene, STATIC_DEMO_SCENE, stepsInStage } from '../helpers/demoScene.helper'
import type { DemoScene } from '../types/demo.types'

/** Plays the hero demo on a loop: select, hotkey, prompt, stream, paste. Holds a still frame if motion is reduced. */
export function useDemoSequence(): DemoScene {
  const reducedMotion = usePrefersReducedMotion()
  const [stageIndex, setStageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reducedMotion) return

    const stage = DEMO_STAGES[stageIndex]
    const isTyping = progress < stepsInStage(stage.id)

    const timer = setTimeout(
      () => {
        if (isTyping) {
          setProgress((count) => count + 1)
          return
        }
        setProgress(0)
        setStageIndex((index) => (index + 1) % DEMO_STAGES.length)
      },
      isTyping ? (stage.stepMs ?? 50) : stage.holdMs
    )

    return () => clearTimeout(timer)
  }, [stageIndex, progress, reducedMotion])

  return reducedMotion ? STATIC_DEMO_SCENE : buildDemoScene(stageIndex, progress)
}
