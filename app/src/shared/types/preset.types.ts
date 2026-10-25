/** A saved writing style the panel can apply to a request, e.g. "Slack reply". */
export interface Preset {
  id: string
  name: string
  /** How the model should respond: tone, style, structure. */
  instructions: string
  /** Facts about the user the model can draw on, e.g. name and role. */
  about: string
  /** Disabled presets stay saved but are hidden from the panel. */
  enabled: boolean
}

/** What the panel needs to list a preset. */
export type PresetSummary = Pick<Preset, 'id' | 'name'>
