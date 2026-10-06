import type { ComponentType } from 'react'
import { PasteIllustration } from '../components/ui/illustrations/PasteIllustration'
import { PressIllustration } from '../components/ui/illustrations/PressIllustration'
import { SelectIllustration } from '../components/ui/illustrations/SelectIllustration'
import type { StepIllustrationId } from '../types/landing.types'

export const STEP_ILLUSTRATIONS: Record<StepIllustrationId, ComponentType> = {
  select: SelectIllustration,
  press: PressIllustration,
  paste: PasteIllustration
}
