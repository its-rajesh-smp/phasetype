import { HOME_LINK, NAV_LINKS } from '@/constants/navigation.constants'
import { cn } from '@/utils/cn.util'

/** Section links in the floating nav; the current one sits on a lime pill. Hidden below large screens. */
export function NavLinks({ activeHref }: { activeHref: string }) {
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {[HOME_LINK, ...NAV_LINKS].map((link) => {
        const isActive = link.href === activeHref
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors',
                isActive ? 'bg-lime text-ink' : 'text-ink-soft hover:bg-sunken hover:text-ink'
              )}
            >
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
