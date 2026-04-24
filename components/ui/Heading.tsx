// Server Component — semantic heading with design-system sizing.
// Use `as` to control HTML tag (h1–h6) independently of visual size.

import { cn } from '@/lib/utils'

type Level   = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type Size    = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type Balance = 'balance' | 'pretty' | 'none'

interface HeadingProps {
  children: React.ReactNode
  as?: Level
  size?: Size
  gradient?: boolean
  balance?: Balance
  className?: string
}

const sizeStyles: Record<Size, string> = {
  xs:  'text-display-sm',
  sm:  'text-display-md',
  md:  'text-display-lg',
  lg:  'text-display-xl',
  xl:  'text-display-2xl',
  '2xl': 'text-[5.5rem] leading-[1.02] -tracking-[0.035em]',
}

const balanceStyles: Record<Balance, string> = {
  balance: 'text-balance',
  pretty:  'text-pretty',
  none:    '',
}

export function Heading({
  children,
  as: Component = 'h2',
  size          = 'md',
  gradient      = false,
  balance       = 'balance',
  className,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        'font-display font-bold',
        sizeStyles[size],
        balanceStyles[balance],
        gradient && 'text-gradient',
        className
      )}
    >
      {children}
    </Component>
  )
}
