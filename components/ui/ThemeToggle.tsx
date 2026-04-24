'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/lib/theme-context'

// ─── Sun icon ─────────────────────────────────────────────────────────────────
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={15} height={15} aria-hidden>
      <circle cx={12} cy={12} r={4.5} stroke="currentColor" strokeWidth={1.6} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
        const r = (deg * Math.PI) / 180
        const x1 = 12 + 7 * Math.cos(r), y1 = 12 + 7 * Math.sin(r)
        const x2 = 12 + 9 * Math.cos(r), y2 = 12 + 9 * Math.sin(r)
        return (
          <line key={deg}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

// ─── Moon icon ────────────────────────────────────────────────────────────────
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={15} height={15} aria-hidden>
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor" strokeWidth={1.6}
        strokeLinecap="round" strokeLinejoin="round"
        fill="currentColor" fillOpacity={0.12}
      />
    </svg>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="relative flex items-center justify-center rounded-xl transition-colors duration-300 focus-visible:outline-none"
      style={{
        width: 36,
        height: 36,
        background: isDark
          ? 'rgba(0,212,255,0.08)'
          : 'rgba(0,153,204,0.1)',
        border: isDark
          ? '1px solid rgba(0,212,255,0.2)'
          : '1px solid rgba(0,153,204,0.25)',
        color: isDark ? '#00d4ff' : '#0099cc',
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
    >
      {/* Glow ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          boxShadow: isDark
            ? '0 0 14px rgba(0,212,255,0.35)'
            : '0 0 14px rgba(0,153,204,0.3)',
        }}
      />

      {/* Icon swap with rotate animation */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: isDark ? -90 : 90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: isDark ? 90 : -90, scale: 0.6 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
