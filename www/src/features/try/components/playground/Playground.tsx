'use client'

import { QUICK_FIX, TRY_PRESETS } from '../../constants/prompt.constants'
import { REFINE_SUGGESTIONS, SAMPLE_TEXTS, START_SUGGESTIONS, TRY_PLACEHOLDERS } from '../../constants/try.constants'
import { usePlayground } from '../../hooks/usePlayground'
import { EditorWindow } from './EditorWindow'
import { PlaygroundPanel } from './PlaygroundPanel'
import { SampleTabs } from './SampleTabs'

/** The web playground: a mock app window with a real draft, and the live PhaseType panel beside it on the stage. */
export function Playground() {
  const { editor, session, promptRef, source, isWholeDraft, isLocked, result, copied, runPrompt, startOver, replace, copyResult } =
    usePlayground()
  const { selection, text, sample } = editor
  const { turns } = session
  const hasText = source.text.trim().length > 0
  const isRefining = turns.length > 0

  const placeholder = isRefining
    ? TRY_PLACEHOLDERS.refining
    : hasText
      ? TRY_PLACEHOLDERS.withText
      : TRY_PLACEHOLDERS.withoutText

  return (
    <div className="flex flex-col gap-6">
      <SampleTabs samples={SAMPLE_TEXTS} activeId={sample.id} onSelect={editor.loadSample} />

      <div className="relative overflow-hidden rounded-[28px] border border-stage-line bg-stage shadow-window">
        <div aria-hidden className="absolute inset-0 grid-lines" />
        <div aria-hidden className="absolute -top-32 -right-24 size-96 rounded-full bg-lime/15 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -left-20 size-96 rounded-full bg-sky-ink/20 blur-3xl" />

        <div className="relative grid grid-cols-1 items-start gap-4 p-3 sm:gap-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <EditorWindow
            editorRef={editor.editorRef}
            title={sample.app}
            text={text}
            selectedText={text.slice(selection.start, selection.end)}
            readOnly={isLocked}
            onTextChange={editor.setText}
            onSelectionChange={editor.syncSelection}
          />

          <PlaygroundPanel
            promptRef={promptRef}
            sourceText={source.text}
            isWholeDraft={isWholeDraft}
            turns={turns}
            prompt={session.prompt}
            placeholder={placeholder}
            primarySuggestion={!isRefining && hasText ? { label: QUICK_FIX.label, instruction: QUICK_FIX.instruction } : undefined}
            suggestions={isRefining ? REFINE_SUGGESTIONS : hasText ? START_SUGGESTIONS : []}
            presets={TRY_PRESETS}
            presetId={session.presetId}
            error={session.error}
            remaining={session.remaining}
            isReady={result.length > 0}
            copied={copied}
            onPromptChange={session.setPrompt}
            onSubmit={() => runPrompt(session.prompt)}
            onSuggestion={(suggestion) => runPrompt(suggestion.instruction, suggestion.label)}
            onStop={session.stop}
            onPresetChange={session.setPresetId}
            onCopy={copyResult}
            onReplace={replace}
            onStartOver={startOver}
          />
        </div>
      </div>
    </div>
  )
}
