import { cn } from '@/utils/cn.util'
import { DEMO_EMAIL } from '../../constants/demo.constants'
import { WindowChrome } from './WindowChrome'

interface DemoMailWindowProps {
  draft: string
  isSelected: boolean
  justPasted: boolean
}

/** A Mail compose window whose body gets selected, then replaced by the pasted result. */
export function DemoMailWindow({ draft, isSelected, justPasted }: DemoMailWindowProps) {
  return (
    <div className="w-full max-w-[620px] overflow-hidden rounded-2xl border border-line-strong/70 bg-surface shadow-window">
      <WindowChrome title="New Message" />
      <dl className="divide-y divide-line px-5 text-[13px]">
        <div className="flex gap-2 py-2.5">
          <dt className="text-subtle">To:</dt>
          <dd className="text-ink">{DEMO_EMAIL.to}</dd>
        </div>
        <div className="flex gap-2 py-2.5">
          <dt className="text-subtle">Subject:</dt>
          <dd className="text-ink">{DEMO_EMAIL.subject}</dd>
        </div>
      </dl>
      <div className="min-h-44 border-t border-line px-5 pt-4 pb-6 text-[15px] leading-relaxed text-ink-soft sm:min-h-52">
        <p>
          <span
            key={draft}
            className={cn(
              'box-decoration-clone rounded-sm transition-colors duration-300',
              isSelected && 'bg-lime/60 text-ink',
              justPasted && 'animate-flash text-ink'
            )}
          >
            {draft}
          </span>
        </p>
      </div>
    </div>
  )
}
