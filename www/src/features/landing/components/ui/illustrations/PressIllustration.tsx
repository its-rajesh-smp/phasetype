import { KeyCombo } from '@/components/ui/KeyCombo'

/** The default panel hotkey as large key caps. */
export function PressIllustration() {
  return <KeyCombo keys={['⌃', '⌥', 'Space']} size="lg" label="Control Option Space" className="gap-2" />
}
