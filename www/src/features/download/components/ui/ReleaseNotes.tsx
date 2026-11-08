import type { ReleaseNoteBlock } from '../../types/release.types'

/** Parsed release notes. Consecutive list items render as one list. */
export function ReleaseNotes({ blocks }: { blocks: ReleaseNoteBlock[] }) {
  if (!blocks.length) return <p className="text-[15px] text-subtle">No notes for this release.</p>

  const groups = blocks.reduce<ReleaseNoteBlock[][]>((acc, block) => {
    const last = acc.at(-1)
    if (block.kind === 'item' && last?.[0].kind === 'item') last.push(block)
    else acc.push([block])
    return acc
  }, [])

  return (
    <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-ink-soft">
      {groups.map((group, index) => {
        const [first] = group
        if (first.kind === 'item') {
          return (
            <ul key={index} className="flex list-disc flex-col gap-1 pl-5 marker:text-subtle">
              {group.map((item, i) => (
                <li key={i}>{item.text}</li>
              ))}
            </ul>
          )
        }
        if (first.kind === 'heading') {
          return (
            <p key={index} className="mt-1 font-semibold text-ink">
              {first.text}
            </p>
          )
        }
        return <p key={index}>{first.text}</p>
      })}
    </div>
  )
}
