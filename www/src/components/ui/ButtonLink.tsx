import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn.util'

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'inverse'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-canvas hover:bg-ink-soft',
  accent: 'bg-lime text-ink shadow-lime hover:bg-lime-deep',
  secondary: 'border border-line-strong bg-surface text-ink hover:bg-sunken',
  ghost: 'text-ink-soft hover:bg-ink/5 hover:text-ink',
  inverse: 'border border-canvas/20 bg-canvas/5 text-canvas hover:bg-canvas/10'
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-4 text-[13px]',
  md: 'h-11 gap-2 px-5 text-sm',
  lg: 'h-14 gap-2.5 px-7 text-[15px]'
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
        'group inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ember/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none',
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
