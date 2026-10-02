import { DisplayHeading } from '../../../components/ui/DisplayHeading'
import { Eyebrow } from '../../../components/ui/Eyebrow'

interface StepLayoutProps {
  eyebrow: string
  title: React.ReactNode
  description: React.ReactNode
  children: React.ReactNode
  footer: React.ReactNode
}

/** Shared layout for an onboarding step: eyebrow, heading, description, content and footer. */
export function StepLayout({ eyebrow, title, description, children, footer }: StepLayoutProps): React.JSX.Element {
  return (
    <div className="flex flex-1 flex-col">
      <Eyebrow withRule>{eyebrow}</Eyebrow>
      <DisplayHeading className="mt-5">{title}</DisplayHeading>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">{description}</p>
      <div className="mt-9 flex-1">{children}</div>
      <div className="mt-8">{footer}</div>
    </div>
  )
}
