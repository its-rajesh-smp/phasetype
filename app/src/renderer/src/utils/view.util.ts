import type { AppView } from '../types'

/** Tells which window this renderer is: the panel (`#/panel` hash), the status pill (`#/status`) or the main window. */
export function getCurrentView(): AppView {
  if (window.location.hash.startsWith('#/panel')) return 'panel'
  if (window.location.hash.startsWith('#/status')) return 'status'
  return 'main'
}
