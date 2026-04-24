'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme:      Theme
  toggleTheme: () => void
  isDark:     boolean
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:       'dark',
  toggleTheme: () => {},
  isDark:      true,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with 'dark' to match SSR — the inline script in layout.tsx already applied
  // the correct class to <html> before React hydrates, avoiding any visual flash.
  const [theme, setTheme] = useState<Theme>('dark')

  // Sync state with whatever class the anti-flash script applied
  useEffect(() => {
    const stored = localStorage.getItem('zena-theme') as Theme | null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    } else {
      setTheme('dark')
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('zena-theme', next)
      const root = document.documentElement
      if (next === 'light') {
        root.classList.add('light')
      } else {
        root.classList.remove('light')
      }
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

// Inline script — injected before hydration to prevent flash of wrong theme.
// Must be a plain string (no JSX); executed synchronously by the browser.
export const themeScript = `(function(){
  try {
    var s = localStorage.getItem('zena-theme');
    if (s === 'light') {
      document.documentElement.classList.add('light');
    }
  } catch(e){}
})();`
