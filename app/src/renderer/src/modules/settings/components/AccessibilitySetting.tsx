import { AccessibilityStatus } from '../../../components/common/AccessibilityStatus'
import { SettingsSection } from './SettingsSection'

/** Settings section showing the Accessibility permission status. */
export function AccessibilitySetting(): React.JSX.Element {
  return (
    <SettingsSection title="Permissions" description="Needed to copy your selection and paste the result back.">
      <AccessibilityStatus />
    </SettingsSection>
  )
}
