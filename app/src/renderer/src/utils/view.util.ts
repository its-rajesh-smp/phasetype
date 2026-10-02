import type { AppView } from '../types'

/** Tells which window this renderer is: the panel (`#/panel` hash) or the main window. */
export const getCurrentView = (): AppView => (window.location.hash.startsWith('#/panel') ? 'panel' : 'main')
