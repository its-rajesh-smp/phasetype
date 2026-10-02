import { DisplayHeading } from '../../components/ui/DisplayHeading'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Logo } from '../../components/ui/Logo'
import { AccessibilitySetting } from './components/AccessibilitySetting'
import { ApiKeySetting } from './components/ApiKeySetting'
import { HotkeySetting } from './components/HotkeySetting'
import { LaunchAtLoginSetting } from './components/LaunchAtLoginSetting'
import { ModelSetting } from './components/ModelSetting'
import { SettingsFooter } from './components/SettingsFooter'
import { SystemPromptSetting } from './components/SystemPromptSetting'

/** Settings screen listing every preference section, with a footer for version and Quit. */
export function SettingsView(): React.JSX.Element {
  return (
    <div className="flex h-full flex-col">
      <header className="drag-region flex h-14 shrink-0 items-center pr-6 pl-22">
        <Logo />
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto px-10 pt-8 pb-6">
        <Eyebrow withRule>Preferences</Eyebrow>
        <DisplayHeading size="md" className="mt-4">
          Settings
        </DisplayHeading>
        <div className="mt-8 flex flex-col divide-y divide-line">
          <ApiKeySetting />
          <ModelSetting />
          <HotkeySetting />
          <SystemPromptSetting />
          <AccessibilitySetting />
          <LaunchAtLoginSetting />
        </div>
      </main>
      <SettingsFooter />
    </div>
  )
}
