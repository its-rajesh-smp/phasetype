import type { FooterLinkGroup } from '@/types/navigation.types'

/** One titled column of links in the footer. */
export function FooterColumn({ group }: { group: FooterLinkGroup }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-canvas/50 uppercase">{group.title}</p>
      <ul className="flex flex-col gap-2.5">
        {group.links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-sm text-canvas/80 transition-colors hover:text-lime">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
