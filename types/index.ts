// Global shared TypeScript types for the Zenadrone project.
// Component-specific types live alongside their component files.

export type NavLink = {
  label: string
  href:  string
  external?: boolean
}

export type SectionId =
  | 'hero'
  | 'products'
  | 'solutions'
  | 'technology'
  | 'stats'
  | 'testimonials'
  | 'cta'
  | 'contact'

// Utility type — makes all props of T optional except those in K
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
