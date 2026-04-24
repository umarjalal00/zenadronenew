// Server Component — pure layout, no interactivity needed.

import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: Size
  as?: React.ElementType
}

const sizeStyles: Record<Size, string> = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-none',
  xl:   'max-w-screen-2xl',
  full: 'max-w-none',
}

export function Container({
  children,
  className,
  size = 'lg',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] 2xl:px-[200px]',
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Component>
  )
}
