'use client'

import { useCopyFeedback } from '@/hooks/useCopyFeedback'
import { CommandLine } from './ui/CommandLine'

/** The install command with a working copy button. */
export function CopyCommand({ command }: { command: string }) {
  const { copied, copy } = useCopyFeedback()
  return <CommandLine command={command} copied={copied} onCopy={() => void copy(command)} />
}
