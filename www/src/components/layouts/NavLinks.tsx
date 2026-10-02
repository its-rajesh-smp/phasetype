import { NAV_LINKS } from '@/constants/navigation.constants'

/** The in-page section links in the header. Hidden on small screens. */
export function NavLinks() {
  return (
    <ul className="hidden items-center gap-1 md:flex">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="rounded-full px-3.5 py-2 text-sm text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
