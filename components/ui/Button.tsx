// Server Component — no 'use client' needed for a basic button.
// If you need Framer Motion hover animations, wrap this with MotionButton in a
// separate client file and keep this as the server-safe base.

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-primary text-background font-semibold hover:bg-primary-light shadow-lg shadow-primary/20 active:scale-[0.97]',
  secondary:
    'bg-surface-elevated text-text font-semibold hover:bg-white/10 border border-border active:scale-[0.97]',
  ghost:
    'text-text-muted hover:text-text hover:bg-white/5',
  outline:
    'border border-primary text-primary hover:bg-primary/10 font-semibold active:scale-[0.97]',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-base rounded-xl gap-2',
  lg: 'px-8 py-4 text-lg rounded-xl gap-2.5',
}

export function Button({
  variant = 'primary',
  size    = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base
        'inline-flex items-center justify-center font-sans transition-all duration-200',
        // Focus ring — accessibility
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        // Disabled state
        'disabled:opacity-40 disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
