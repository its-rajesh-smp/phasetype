import { cn } from '../../utils/cn.util'

interface DisplayHeadingProps {
  children: React.ReactNode
  size?: 'md' | 'lg'
  className?: string
}

/** Large serif page heading in the display font. */
export function DisplayHeading({ children, size = 'lg', className }: DisplayHeadingProps): React.JSX.Element {
  return (
    <h1
      className={cn(
        'font-display font-normal tracking-[-0.01em] text-ink',
        size === 'lg' ? 'text-[56px] leading-[0.95]' : 'text-[40px] leading-none',
        className
      )}
    >
      {children}
    </h1>
  )
}
