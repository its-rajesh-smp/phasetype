import type { Ref } from 'react'

interface PanelShellProps {
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

/** The floating card. The native window is transparent and resized to fit this element. */
export function PanelShell({ children, ref }: PanelShellProps): React.JSX.Element {
  return (
    <div
      ref={ref}
      className="flex max-h-[640px] w-full flex-col overflow-hidden rounded-[18px] border border-line-strong/80 bg-surface bg-[radial-gradient(60%_80%_at_100%_0%,rgb(227_245_66/0.22),transparent_70%)]"
    >
      {children}
    </div>
  )
}
