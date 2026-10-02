import type { PhaseTypeBridge } from '@shared/types'

/** Typed access to the main process. Everything the UI does outside the window goes through here. */
export const bridge: PhaseTypeBridge = window.phasetype
