import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { FOOTER_LINK_GROUPS } from '@/constants/navigation.constants'
import { SITE } from '@/constants/site.constants'
import { FooterColumn } from './FooterColumn'

/** Ink footer with the brand, link columns, a giant wordmark and the copyright line. */
export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-ink text-canvas">
      <Container className="flex flex-col gap-14 pt-16 pb-8">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="flex max-w-xs flex-col gap-4">
            <Logo tone="paper" />
            <p className="text-sm leading-relaxed text-canvas/60">{SITE.tagline} An AI writing assistant that lives in your Mac&apos;s menu bar.</p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            {FOOTER_LINK_GROUPS.map((group) => (
              <FooterColumn key={group.title} group={group} />
            ))}
          </div>
        </div>

        <p
          aria-hidden
          className="bg-linear-to-b from-canvas/15 to-transparent bg-clip-text text-center font-display text-[22vw] leading-[0.8] tracking-[-0.04em] text-transparent select-none lg:text-[260px]"
        >
          phasetype
        </p>

        <div className="flex flex-col justify-between gap-3 border-t border-canvas/10 pt-6 text-[13px] text-canvas/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Made for macOS · {SITE.domain}</p>
        </div>
      </Container>
    </footer>
  )
}
