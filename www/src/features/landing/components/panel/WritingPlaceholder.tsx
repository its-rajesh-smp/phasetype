const LINE_WIDTHS = ['w-full', 'w-11/12', 'w-2/3'] as const

/** Shimmering lines shown before the first streamed word arrives. */
export function WritingPlaceholder() {
  return (
    <div aria-hidden className="flex flex-col gap-2 py-1">
      {LINE_WIDTHS.map((width) => (
        <span
          key={width}
          className={`h-3 ${width} animate-shimmer rounded-full bg-linear-to-r from-sunken via-line to-sunken bg-size-[200%_100%]`}
        />
      ))}
    </div>
  )
}
