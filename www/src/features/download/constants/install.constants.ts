export interface InstallStep {
  title: string
  detail: string
}

/** What macOS asks the first time someone opens the .dmg version, since the app is not notarized by Apple. */
export const OPEN_ANYWAY_STEPS: InstallStep[] = [
  {
    title: 'Drag PhaseType into Applications',
    detail: 'Open the .dmg you downloaded and drag the PhaseType icon onto the Applications folder.'
  },
  {
    title: 'Open it once and click Done',
    detail: 'macOS says it can’t check PhaseType for malicious software, because the app isn’t registered with Apple. Click Done.'
  },
  {
    title: 'Click Open Anyway',
    detail: 'Go to System Settings → Privacy & Security, scroll down, click Open Anyway next to PhaseType, and enter your Mac password.'
  }
]

export const UPDATE_POINTS: InstallStep[] = [
  {
    title: 'Run the same command again',
    detail: 'It quits PhaseType, swaps in the newest version and opens it again. Or download the new .dmg and replace the app.'
  },
  {
    title: 'Your setup stays',
    detail: 'Settings, presets and your API key live outside the app, so an update keeps them.'
  },
  {
    title: 'If shortcuts stop working',
    detail: 'macOS can forget the Accessibility permission after an update. Open System Settings → Privacy & Security → Accessibility, remove PhaseType with the minus button and add it again.'
  }
]
