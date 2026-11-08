import { Container } from '@/components/ui/Container'
import { GithubIcon } from '@/components/ui/GithubIcon'
import { Logo } from '@/components/ui/Logo'
import { FOOTER_LINK_GROUPS } from '@/constants/navigation.constants'
import { SITE } from '@/constants/site.constants'
import { FooterColumn } from './FooterColumn'

/** Light footer with the brand, link columns, the credit line and a large faint wordmark fading off the bottom. */
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
          <div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-3">
            {FOOTER_LINK_GROUPS.map((group) => (
              <FooterColumn key={group.title} group={group} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line pt-6 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Designed and built by{' '}
            <a
              href={SITE.authorUrl}
              target="_blank"
              rel="noopener"
              className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              {SITE.authorShortName}
            </a>
            .
          </p>
          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-sunken hover:text-ink"
          >
            <GithubIcon className="size-5" />
          </a>
        </div>

        <p
          aria-hidden
          className="-mb-8 bg-linear-to-b from-line-strong to-transparent bg-clip-text text-center text-[19vw] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent select-none lg:text-[230px]"
        >
          phasetype
        </p>
      </Container>
    </footer>
  )
}
