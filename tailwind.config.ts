import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Enable class-based dark mode so we control via html.light / no-class = dark
  darkMode: 'class',
  theme: {
    extend: {
      // ─── Zenadrone Design System — all colours via CSS custom properties ───
      // Using `rgb(var(...) / <alpha-value>)` so Tailwind opacity modifiers work:
      //   bg-primary/20  →  rgb(0 212 255 / 0.2)
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface)          / <alpha-value>)',
          elevated:'rgb(var(--color-surface-elevated)  / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--color-primary)       / <alpha-value>)',
          light:   'rgb(var(--color-primary-light)  / <alpha-value>)',
          dark:    'rgb(var(--color-primary-dark)   / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent)       / <alpha-value>)',
          light:   'rgb(var(--color-accent-light)  / <alpha-value>)',
          dark:    'rgb(var(--color-accent-dark)   / <alpha-value>)',
        },
        text: {
          DEFAULT: 'rgb(var(--color-text)        / <alpha-value>)',
          muted:   'rgb(var(--color-text-muted)   / <alpha-value>)',
          subtle:  'rgb(var(--color-text-subtle)  / <alpha-value>)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          bright:  'var(--border-bright)',
        },
      },

      // ─── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        sans:    ['var(--font-inter)',        'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)','system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem',   { lineHeight: '1.05', letterSpacing: '-0.03em'  }],
        'display-xl':  ['3.75rem',  { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-lg':  ['3rem',     { lineHeight: '1.1',  letterSpacing: '-0.02em'  }],
        'display-md':  ['2.25rem',  { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm':  ['1.875rem', { lineHeight: '1.2',  letterSpacing: '-0.01em'  }],
      },

      // ─── Spacing scale extension ─────────────────────────────────────────────
      spacing: {
        '18': '4.5rem', '22': '5.5rem', '26': '6.5rem', '30': '7.5rem',
        '34': '8.5rem', '38': '9.5rem', '42': '10.5rem','46': '11.5rem',
      },

      // ─── CSS animations ──────────────────────────────────────────────────────
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out both',
        'fade-up':    'fadeUp 0.6s ease-out both',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                          to: { opacity: '1' } },
        fadeUp:    { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgb(var(--color-primary) / 0.25)' },
          '50%':      { boxShadow: '0 0 50px rgb(var(--color-primary) / 0.55)' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
