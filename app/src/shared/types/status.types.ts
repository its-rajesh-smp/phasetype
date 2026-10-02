/** What the status pill shows while the quick fix hotkey runs. */
export type QuickFixStatus = { state: 'working' } | { state: 'done' } | { state: 'error'; message: string }
