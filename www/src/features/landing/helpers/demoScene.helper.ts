import { DEMO_EMAIL, DEMO_STAGES } from '../constants/demo.constants'
import type { DemoScene, DemoStageId } from '../types/demo.types'

const RESULT_WORDS = DEMO_EMAIL.result.split(' ')

const stageIndexOf = (id: DemoStageId): number => DEMO_STAGES.findIndex((stage) => stage.id === id)

/** How many steps (characters or words) a stage types before it starts holding. */
export function stepsInStage(id: DemoStageId): number {
  if (id === 'prompt') return DEMO_EMAIL.prompt.length
  if (id === 'stream') return RESULT_WORDS.length
  return 0
}

/** Text revealed so far by a typing stage: empty before it, partial during it, complete after it. */
function revealed(stageIndex: number, progress: number, id: DemoStageId, full: string, slice: (count: number) => string): string {
  const typingIndex = stageIndexOf(id)
  if (stageIndex < typingIndex) return ''
  if (stageIndex > typingIndex) return full
  return slice(progress)
}

/** Everything the hero demo needs to render one frame. */
export function buildDemoScene(stageIndex: number, progress: number): DemoScene {
  const stage = DEMO_STAGES[stageIndex].id
  const isBetween = (from: DemoStageId, to: DemoStageId): boolean =>
    stageIndex >= stageIndexOf(from) && stageIndex <= stageIndexOf(to)

  return {
    stage,
    draft: stage === 'done' ? DEMO_EMAIL.result : DEMO_EMAIL.original,
    prompt: revealed(stageIndex, progress, 'prompt', DEMO_EMAIL.prompt, (count) => DEMO_EMAIL.prompt.slice(0, count)),
    output: revealed(stageIndex, progress, 'stream', DEMO_EMAIL.result, (count) => RESULT_WORDS.slice(0, count).join(' ')),
    isSelected: isBetween('select', 'paste'),
    isPanelOpen: isBetween('prompt', 'paste'),
    isStreaming: isBetween('thinking', 'stream') && progress < stepsInStage('stream'),
    isPasting: stage === 'paste',
    justPasted: stage === 'done',
    showHotkey: stage === 'hotkey'
  }
}

/** A finished, still frame for visitors who prefer reduced motion. */
export const STATIC_DEMO_SCENE: DemoScene = {
  ...buildDemoScene(stageIndexOf('paste'), 0),
  isPasting: false
}
