export const MAIN_WINDOW = {
  /** Wide enough for the Presets tab's list and editor side by side. */
  width: 1140,
  height: 720,
  minWidth: 845,
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

/** The small pill shown while the quick fix hotkey runs. Wider than the pill so error messages fit. */
export const STATUS_WINDOW = {
  width: 420,
  height: 64,
  /** Distance from the bottom of the work area (above the Dock). */
  bottomOffset: 72,
  /** How long the pill stays up after the quick fix finishes. */
  doneDurationMs: 1200,
  errorDurationMs: 3500
} as const
