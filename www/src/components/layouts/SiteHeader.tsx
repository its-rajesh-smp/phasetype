import { Download } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { PRIMARY_DOWNLOAD } from '@/constants/download.constants'
import { HeaderFrame } from './HeaderFrame'
import { NavLinks } from './NavLinks'

/** Site header: logo, section links and the download button. */
export function SiteHeader() {
  return (
    <HeaderFrame>
      <Container>
        <nav aria-label="Main" className="flex h-16 items-center justify-between gap-6">
          <a href="#top" aria-label="PhaseType home" className="rounded-lg">
            <Logo />
          </a>
          <NavLinks />
          <ButtonLink
            href={PRIMARY_DOWNLOAD.href}
            size="sm"
            leadingIcon={<Download aria-hidden className="size-3.5" />}
          >
            Download
          </ButtonLink>
        </nav>
      </Container>
    </HeaderFrame>
  )
}
