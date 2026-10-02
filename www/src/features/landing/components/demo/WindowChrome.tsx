const TRAFFIC_LIGHTS = ['bg-[#ff5f57]', 'bg-[#febc2e]', 'bg-[#28c840]'] as const

/** macOS window title bar with traffic lights and a centred title. */
export function WindowChrome({ title }: { title: string }) {
  return (
    <div className="relative flex h-10 items-center border-b border-line px-4">
      <span className="flex gap-2">
        {TRAFFIC_LIGHTS.map((color) => (
          <span key={color} className={`size-3 rounded-full ${color}`} />
        ))}
      </span>
      <p className="absolute inset-x-0 text-center text-xs font-medium text-muted">{title}</p>
    </div>
  )
}
