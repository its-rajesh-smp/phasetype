export const MAIN_WINDOW = {
  width: 560,
  height: 720,
  minWidth: 480,
  minHeight: 600,
  backgroundColor: '#F4EEE2'
} as const

export const PANEL_WINDOW = {
  width: 640,
  initialHeight: 220,
  minHeight: 120,
  maxHeight: 640,
  /** Fraction of the work area height above the panel. */
  topOffsetRatio: 0.2
} as const
