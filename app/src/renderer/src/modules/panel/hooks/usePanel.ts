import type { QuickAction } from '@shared/types'
import { useCallback, useState } from 'react'
import { useTransientFlag } from '../../../hooks/useTransientFlag'
import { bridge } from '../../../services/bridge.service'
import { PROMPT_PLACEHOLDERS } from '../constants/panel.constants'
import { useConversation } from './useConversation'
import { usePanelSession } from './usePanelSession'
import { usePanelShortcuts } from './usePanelShortcuts'

/** Everything the panel does: a conversation about the selection with an optional preset, copy and paste. */
export function usePanel() {
  const conversation = useConversation()
  const [prompt, setPrompt] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)
  const [copied, flashCopied] = useTransientFlag()
  // The chosen preset stays picked across sessions until changed.
  const [presetId, setPresetId] = useState<string | null>(null)
  const [presetMenuOpen, setPresetMenuOpen] = useState(false)
  const [removedAttachmentIds, setRemovedAttachmentIds] = useState<string[]>([])

  const { reset: resetConversation } = conversation
  const resetSession = useCallback(() => {
    resetConversation()
    setPrompt('')
    setActionError(null)
    setPresetMenuOpen(false)
    setRemovedAttachmentIds([])
  }, [resetConversation])

  const { context, sessionId } = usePanelSession(resetSession)

  const { lastTurn } = conversation
  const isStreaming = lastTurn?.status === 'streaming'
  const hasResult = lastTurn?.status === 'done' && lastTurn.output.trim().length > 0
  const result = hasResult ? lastTurn.output : ''
  // Quick actions work on the latest answer once there is one, otherwise on the selection.
  const workingText = result || context.selectedText
  const attachments = context.attachments.filter((attachment) => !removedAttachmentIds.includes(attachment.id))
  const hasAttachments = attachments.length > 0
  const hasMedia = attachments.some((attachment) => attachment.kind === 'audio' || attachment.kind === 'video')
  // Null if the preset was removed or disabled since it was picked.
  const activePreset = context.presets.find((preset) => preset.id === presetId) ?? null

  const placeholder = hasResult
    ? PROMPT_PLACEHOLDERS.refining
    : hasMedia
      ? PROMPT_PLACEHOLDERS.withMedia
      : hasAttachments
        ? PROMPT_PLACEHOLDERS.withFiles
        : context.selectedText
          ? PROMPT_PLACEHOLDERS.withSelection
          : PROMPT_PLACEHOLDERS.withoutSelection

  /** Sends a prompt; `label` is what the conversation shows for it (defaults to the instruction). */
  const run = (instruction: string, label = instruction): void => {
    if (!instruction.trim() || isStreaming || context.capturing) return
    setActionError(null)
    setPrompt('')
    conversation.send({
      instruction: instruction.trim(),
      label: label.trim(),
      text: context.selectedText,
      presetId: activePreset?.id ?? null,
      attachmentIds: attachments.filter((attachment) => !attachment.error).map((attachment) => attachment.id)
    })
  }

  const runQuickAction = (action: QuickAction): void => run(action.instruction, action.label)

  const copy = async (): Promise<void> => {
    if (!hasResult) return
    await bridge.panel.copy(result)
    flashCopied()
    // Done with the panel once the result is on the clipboard, as with Paste.
    bridge.panel.hide()
  }

  const removeAttachment = (id: string): void => setRemovedAttachmentIds((ids) => [...ids, id])

  // Files come from Finder and the like, where pasting text makes no sense; the result is copied instead.
  const canPaste = context.attachments.length === 0

  const paste = async (): Promise<void> => {
    if (!hasResult || !canPaste) return
    const pasted = await bridge.panel.paste(result)
    if (!pasted.ok) setActionError(pasted.error)
  }

  const selectPreset = (id: string | null): void => {
    setPresetId(id)
    setPresetMenuOpen(false)
  }

  const togglePresetMenu = (): void => {
    if (!isStreaming) setPresetMenuOpen((open) => !open)
  }

  const escape = (): void => {
    if (presetMenuOpen) setPresetMenuOpen(false)
    else if (isStreaming) conversation.cancel()
    else bridge.panel.hide()
  }

  usePanelShortcuts({ onEscape: escape, onPaste: () => void paste(), onCopy: () => void copy(), onTogglePresets: togglePresetMenu })

  return {
    context,
    sessionId,
    prompt,
    setPrompt,
    placeholder,
    workingText,
    attachments,
    hasAttachments,
    removeAttachment,
    canPaste,
    turns: conversation.turns,
    isStreaming,
    hasResult,
    copied,
    actionError,
    activePreset,
    presetMenuOpen,
    selectPreset,
    togglePresetMenu,
    run,
    runQuickAction,
    regenerate: conversation.regenerate,
    copy,
    paste,
    stop: conversation.cancel
  }
}
