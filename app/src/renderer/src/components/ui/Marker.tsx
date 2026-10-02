/** Highlights a word with the lime → ember marker stroke. */
export function Marker({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <span className="marker box-decoration-clone px-0.5">{children}</span>
}
