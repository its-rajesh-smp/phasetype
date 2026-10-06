import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { FOOTER_LINK_GROUPS } from '@/constants/navigation.constants'
import { SITE } from '@/constants/site.constants'
import { FooterColumn } from './FooterColumn'

/** Light footer with the brand, link columns, a large faint wordmark and the copyright line. */
export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-line bg-canvas">
      <Container className="flex flex-col gap-12 pt-16 pb-8">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="flex max-w-xs flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-muted">
              {SITE.tagline} An AI writing assistant that lives in your Mac&apos;s menu bar.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            {FOOTER_LINK_GROUPS.map((group) => (
              <FooterColumn key={group.title} group={group} />
            ))}
          </div>
        </div>

        <p
          aria-hidden
          className="bg-linear-to-b from-line-strong to-transparent bg-clip-text text-center text-[19vw] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent select-none lg:text-[230px]"
        >
          phasetype
        </p>

        <div className="flex flex-col justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Made for macOS · {SITE.domain}</p>
        </div>
      </Container>
    </footer>
  )
}
