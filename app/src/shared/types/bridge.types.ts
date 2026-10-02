import type { AiRunRequest, AiStreamEvent } from './ai.types'
import type { PanelContext } from './panel.types'
import type { Result } from './result.types'
import type { PublicSettings, SettingsUpdate } from './settings.types'

export type Unsubscribe = () => void

/** The API exposed on `window.phasetype` by the preload script. */
export interface PhaseTypeBridge {
  settings: {
    get(): Promise<PublicSettings>
    update(patch: SettingsUpdate): Promise<Result<PublicSettings>>
    completeOnboarding(): Promise<Result<PublicSettings>>
  }
  ai: {
    /** Checks a key against the provider and returns the chat models it can use. Omit the key to check the saved one. */
    verifyKey(apiKey?: string): Promise<Result<string[]>>
    run(request: AiRunRequest): void
    cancel(requestId: string): void
    onEvent(listener: (event: AiStreamEvent) => void): Unsubscribe
  }
  hotkey: {
    /** Temporarily releases the global hotkey so it can be recorded. */
    pause(): Promise<void>
    resume(): Promise<void>
  }
  permissions: {
    isAccessibilityGranted(): Promise<boolean>
    requestAccessibility(): Promise<boolean>
  }
  panel: {
    onOpen(listener: (context: PanelContext) => void): Unsubscribe
    onHide(listener: () => void): Unsubscribe
    resize(height: number): void
    hide(): void
    copy(text: string): Promise<void>
    paste(text: string): Promise<Result>
  }
  app: {
    openSettings(): void
    closeWindow(): void
    quit(): void
    getVersion(): Promise<string>
  }
}
