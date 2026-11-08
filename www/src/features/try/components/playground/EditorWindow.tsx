import type { RefObject } from 'react'
import { WindowChrome } from '@/features/landing/components/demo/WindowChrome'
import { EditorStatusBar } from './EditorStatusBar'

interface EditorWindowProps {
  editorRef: RefObject<HTMLTextAreaElement | null>
  title: string
  text: string
  selectedText: string
  /** Locked while PhaseType works on the text, so the captured range still points at the same text. */
  readOnly: boolean
  onTextChange: (text: string) => void
  onSelectionChange: () => void
}

/** A mock app window holding the editable text the visitor selects and rewrites. */
export function EditorWindow({ editorRef, title, text, selectedText, readOnly, onTextChange, onSelectionChange }: EditorWindowProps) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-window">
      <WindowChrome title={title} />
      <label htmlFor="try-editor" className="sr-only">
        Draft to rewrite. Select part of it to rewrite just that part.
      </label>
      <textarea
        id="try-editor"
        ref={editorRef}
        value={text}
        readOnly={readOnly}
        spellCheck={false}
        maxLength={6000}
        onChange={(event) => onTextChange(event.target.value)}
        onSelect={onSelectionChange}
        onKeyUp={onSelectionChange}
        onMouseUp={onSelectionChange}
        className="min-h-[300px] flex-1 resize-none bg-transparent px-5 py-4 text-[15px] leading-relaxed text-ink outline-none placeholder:text-subtle sm:min-h-[360px] sm:px-7 sm:py-6"
        placeholder="Type or paste anything here…"
      />
      <EditorStatusBar selectedText={selectedText} />
    </div>
  )
}
