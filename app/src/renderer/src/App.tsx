import { useLayoutEffect } from 'react'
import { PanelView } from './modules/panel/PanelView'
import { SettingsProvider } from './providers/SettingsProvider'
import { getCurrentView } from './utils/view.util'
import { MainWindow } from './views/MainWindow'

const view = getCurrentView()

/** Root component: renders the floating panel or the main window, based on the URL hash this window was opened with. */
export function App(): React.JSX.Element {
  useLayoutEffect(() => {
    document.documentElement.dataset.view = view
  }, [])

  if (view === 'panel') return <PanelView />

  return (
    <SettingsProvider>
      <MainWindow />
    </SettingsProvider>
  )
}
