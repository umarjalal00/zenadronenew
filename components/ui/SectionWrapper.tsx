// Server Component — layout wrapper for every page section.
// Provides consistent vertical padding, overflow clipping, and an id anchor.

import { cn } from '@/lib/utils'

type Padding = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type Tag     = 'section' | 'div' | 'article' | 'aside'

interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  as?: Tag
  padding?: Padding
  className?: string
}

const paddingStyles: Record<Padding, string> = {
  none: '',
  sm:   'py-12 md:py-16',
  md:   'py-16 md:py-24',
  lg:   'py-24 md:py-32',
  xl:   'py-32 md:py-44',
}

export function SectionWrapper({
  children,
  id,
  as: Component = 'section',
  padding       = 'lg',
  className,
}: SectionWrapperProps) {
  return (
    <Component
      id={id}
      className={cn(
        'relative overflow-hidden',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </Component>
  )
}
