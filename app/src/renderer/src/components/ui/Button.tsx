import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn.util'
import { Spinner } from './Spinner'

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-canvas hover:bg-ink-soft rounded-full',
  accent: 'bg-lime text-ink shadow-lime hover:bg-lime-deep rounded-full',
  secondary: 'bg-surface text-ink border border-line-strong hover:bg-sunken rounded-full',
  ghost: 'text-muted hover:text-ink hover:bg-ink/5 rounded-full',
  link: 'text-ember underline decoration-ember/40 underline-offset-4 hover:decoration-ember'
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-[13px] gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-[15px] gap-2.5'
}

/** App-wide button with style variants and sizes. Shows a spinner and disables itself while `loading`. */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'no-drag inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-40',
        VARIANT_CLASSES[variant],
        variant !== 'link' && SIZE_CLASSES[size],
        variant === 'link' && 'text-sm',
        className
      )}
      {...rest}
    >
      {loading ? <Spinner className="size-4" /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  )
}
