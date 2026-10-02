import type { PhaseTypeBridge } from '@shared/types'

declare global {
  interface Window {
    phasetype: PhaseTypeBridge
  }
}

export {}
