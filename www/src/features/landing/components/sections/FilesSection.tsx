import { Container } from '@/components/ui/Container'
import { KeyCombo } from '@/components/ui/KeyCombo'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FILE_KINDS, MAX_FILES } from '../../constants/files.constants'
import { FileKindList } from '../ui/FileKindList'
import { FilesVisual } from '../ui/FilesVisual'

/** Asking about files and recordings selected in Finder: the panel on the stage, and what it can read. */
export function FilesSection() {
  return (
    <section id="files" aria-labelledby="files-title" className="pb-24 sm:pb-32">
      <Container className="reveal flex flex-col gap-14">
        <SectionHeading
          id="files-title"
          badge="Files"
          title="Select a file. Ask it anything."
          description="Pick documents, images or recordings in Finder and press your hotkey. Summarise a deck, pull numbers from a scan, or get the action items from a call."
        />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="relative flex min-h-96 items-center justify-center overflow-hidden rounded-[28px] border border-stage-line bg-stage p-6 sm:p-10">
            <div aria-hidden className="absolute inset-0 grid-lines" />
            <div aria-hidden className="absolute -top-24 -left-20 size-80 rounded-full bg-lime/15 blur-3xl" />
            <div className="relative w-full max-w-md">
              <FilesVisual />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <FileKindList items={FILE_KINDS} />
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 px-1 text-sm text-muted">
              Up to {MAX_FILES} files at once. Select them, then press
              <KeyCombo keys={['⌘', '⇧', 'Space']} label="Command Shift Space" />
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
