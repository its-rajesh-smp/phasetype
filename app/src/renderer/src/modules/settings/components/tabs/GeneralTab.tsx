import { AboutSetting } from '../AboutSetting'
import { AccessibilitySetting } from '../AccessibilitySetting'
import { ApiKeySetting } from '../ApiKeySetting'
import { LaunchAtLoginSetting } from '../LaunchAtLoginSetting'
import { ModelSetting } from '../ModelSetting'
import { SettingsPage } from '../SettingsPage'
import { SystemPromptSetting } from '../SystemPromptSetting'

/** General settings: API key, model, system prompt, permissions, open at login and the app version. */
export function GeneralTab(): React.JSX.Element {
  return (
    <SettingsPage>
      <ApiKeySetting />
      <ModelSetting />
      <SystemPromptSetting />
      <AccessibilitySetting />
      <LaunchAtLoginSetting />
      <AboutSetting />
    </SettingsPage>
  )
}
