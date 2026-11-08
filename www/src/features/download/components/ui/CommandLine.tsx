import { Check, Copy } from 'lucide-react'

interface CommandLineProps {
  command: string
  copied: boolean
  onCopy: () => void
}

/** A dark terminal line showing a command, with a copy button. */
export function CommandLine({ command, copied, onCopy }: CommandLineProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-stage-line bg-stage py-2 pr-2 pl-4 font-mono text-[13px] text-white">
      <span aria-hidden className="text-lime select-none">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto py-1.5 whitespace-nowrap">{command}</code>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? 'Copied' : 'Copy command'}
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 font-sans text-xs font-semibold text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-lime-edge focus-visible:outline-none"
      >
        {copied ? <Check aria-hidden className="size-3.5 text-lime" /> : <Copy aria-hidden className="size-3.5" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
