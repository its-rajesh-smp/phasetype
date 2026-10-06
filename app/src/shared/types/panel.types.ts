export interface PanelContext {
  selectedText: string
  accessibilityGranted: boolean
  /** True while the selection is still being read; the panel is shown but not focused yet. */
  capturing: boolean
}
