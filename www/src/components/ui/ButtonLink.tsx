import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn.util'

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'border border-transparent bg-ink text-white hover:bg-ink-soft',
  accent: 'border border-lime-edge/70 bg-lime text-ink hover:bg-lime-deep',
  secondary: 'border border-line bg-surface text-ink shadow-card hover:bg-sunken',
  ghost: 'border border-transparent text-ink-soft hover:bg-sunken hover:text-ink'
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-4 text-sm',
  md: 'h-11 gap-2 px-5 text-[15px]',
  lg: 'h-12 gap-2 px-7 text-base'
}

/** A link styled as a pill button. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        'group inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors',
        'focus-visible:ring-2 focus-visible:ring-lime-edge focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </a>
  )
}
