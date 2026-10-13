/** How long the Accessibility helper may take before falling back to copy/paste. */
export const AX_HELPER_TIMEOUT_MS = 1500
/** How long to wait for the frontmost app to put its selection on the clipboard. */
export const COPY_TIMEOUT_MS = 600
/** How long to wait after sending ⌘C a second time, when the first one produced nothing. */
export const COPY_RETRY_TIMEOUT_MS = 600
export const CLIPBOARD_POLL_INTERVAL_MS = 20
/** Delay before restoring the user's clipboard, so the target app has finished reading the paste. */
export const CLIPBOARD_RESTORE_DELAY_MS = 700
