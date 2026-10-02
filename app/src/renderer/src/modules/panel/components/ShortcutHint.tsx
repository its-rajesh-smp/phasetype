import { KeyCombo } from '../../../components/ui/KeyCombo'

/** Small key combo with a label, e.g. "⌘↵ paste". */
export function ShortcutHint({ accelerator, label }: { accelerator: string; label: string }): React.JSX.Element {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11.5px] text-subtle">
      <KeyCombo accelerator={accelerator} />
      {label}
    </span>
  )
}
