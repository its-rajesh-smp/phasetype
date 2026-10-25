import { CircleUserRound, Plus } from 'lucide-react'
import { Button } from '../../../../components/ui/Button'

/** Shown in place of the editor when there are no presets yet. */
export function PresetsEmptyState({ onAdd }: { onAdd: () => void }): React.JSX.Element {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-lime">
        <CircleUserRound className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-semibold text-ink">No presets yet</p>
        <p className="max-w-64 text-[13px] leading-relaxed text-muted">Save a style you reuse, like a Slack reply or a client email.</p>
      </div>
      <Button variant="primary" size="sm" leadingIcon={<Plus className="size-3.5" />} onClick={onAdd}>
        New preset
      </Button>
    </div>
  )
}
