import { Spinner } from '../components/ui/Spinner'
import { useSettings } from '../hooks/useSettings'
import { MainWindowContent } from './MainWindowContent'

/** The setup/settings window. Shows onboarding until it's finished once, settings afterwards. */
export function MainWindow(): React.JSX.Element {
  const { settings } = useSettings()

  if (!settings) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner className="size-5 text-muted" />
      </div>
    )
  }

  return <MainWindowContent startWithOnboarding={!settings.onboarded} />
}
