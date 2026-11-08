import type { LucideIcon } from 'lucide-react'
import { IconBadge } from '@/components/ui/IconBadge'

interface InstallCardProps {
  icon: LucideIcon
  title: string
  tag?: string
  description: React.ReactNode
  children: React.ReactNode
  footnote?: React.ReactNode
}

/** One way to install: icon, title, short explanation, the action, and a small note underneath. */
export function InstallCard({ icon, title, tag, description, children, footnote }: InstallCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <IconBadge icon={icon} tone={tag ? 'ink' : 'plain'} />
        <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">{title}</h2>
        {tag && <span className="rounded-full bg-lime px-2.5 py-0.5 text-xs font-semibold text-ink">{tag}</span>}
      </div>
      <p className="text-[15px] leading-relaxed text-muted">{description}</p>
      <div className="mt-auto flex flex-col gap-3">{children}</div>
      {footnote && <p className="text-[13px] leading-relaxed text-subtle">{footnote}</p>}
    </div>
  )
}
