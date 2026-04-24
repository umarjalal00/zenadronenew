'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Container }   from '@/components/ui/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

// ─── Data ─────────────────────────────────────────────────────────────────────

const DRONES = [
  { name: 'ZenaDrone 1000',             desc: 'Multi-mission enterprise drone',     img: '/images/zenadrone-1000.jpeg',    href: '/zenadrone-1000' },
  { name: 'ZenaDrone IQ Square',        desc: 'Compact surveillance solution',      img: '/images/zenadrone-iq-square.jpeg', href: '/iq-square' },
  { name: 'ZenaDrone IQ Nano',          desc: 'Portable tactical drone',            img: '/images/zenadrone-iq-nano.jpeg', href: '/iq-nano' },
  { name: 'ZenaDrone IQ Quad',          desc: 'High-performance quadcopter',        img: '/images/zenadrone-iq-quad.png',  href: '/iq-quad' },
  { name: 'ZenaDrone 2000 & IQ Glider', desc: 'Extended range operations',          img: '/images/hero-drone.jpeg',        href: '/zenadrone-2000' },
  { name: 'ZenaDrone Interceptor P-1',  desc: 'Defense-grade interceptor',          img: '/images/drone-showcase.png',     href: '/interceptor-p1' },
]

const INDUSTRY_HREFS: Record<string, string> = {
  'Electronic Data Collection': '/electronic-data-collection',
  'Wildfires': '/wildfires',
  'Agriculture & Farm Plantations': '/agriculture',
  'Environmental Monitoring': '/environmental-monitoring',
  'City Planning': '/city-planning',
  'Property Management': '/property-management',
  'Power Line Inspection': '/power-line-inspection',
  'Drone as a Service (DaaS)': '/drone-as-a-service',
  'Services Order': '/services-order',
  'Military Drones Industry': '/military-drone',
  'Security & Surveillance': '/security-surveillance',
  'Warehousing & Inventory': '/warehousing-inventory',
}

const INDUSTRIES_COL1 = [
  'Electronic Data Collection', 'Wildfires', 'Agriculture & Farm Plantations',
  'Environmental Monitoring',
]
const INDUSTRIES_COL2 = [
  'City Planning', 'Property Management', 'Power Line Inspection',
  'Drone as a Service (DaaS)',
]
const INDUSTRIES_COL3 = [
  'Security & Surveillance', 'Military Drones Industry', 'Services Order',
  'Warehousing & Inventory',
]

const RESOURCES = [
  { name: 'Events',                href: '/events', icon: <svg viewBox="0 0 20 20" fill="none" width={16} height={16}><rect x="3" y="4" width="14" height="14" rx="2" stroke="#00d4ff" strokeWidth="1.3"/><line x1="7" y1="2" x2="7" y2="6" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round"/><line x1="13" y1="2" x2="13" y2="6" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round"/><line x1="3" y1="9" x2="17" y2="9" stroke="#00d4ff" strokeWidth="1.1" opacity="0.5"/></svg> },
  { name: 'News Room',             href: '/newsroom', icon: <svg viewBox="0 0 20 20" fill="none" width={16} height={16}><rect x="3" y="3" width="14" height="14" rx="2" stroke="#00d4ff" strokeWidth="1.3"/><line x1="6" y1="7" x2="14" y2="7" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="10" x2="14" y2="10" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="13" x2="10" y2="13" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { name: 'Videos',                href: '/videos', icon: <svg viewBox="0 0 20 20" fill="none" width={16} height={16}><rect x="2" y="5" width="12" height="10" rx="2" stroke="#00d4ff" strokeWidth="1.3"/><path d="M14 8 L18 6 L18 14 L14 12 Z" stroke="#00d4ff" strokeWidth="1.2" strokeLinejoin="round"/></svg> },
]

// ─── Resources simple dropdown variants ───────────────────────────────────────

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  exit:   { opacity: 0, y: -6, scale: 0.96, transition: { duration: 0.15, ease: 'easeIn' as const } },
}

// ─── Animation variants ────────────────────────────────────────────────────────

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -6, clipPath: 'inset(0% 0% 100% 0% round 0px)' },
  show:   { opacity: 1, y: 0,  clipPath: 'inset(0% 0% 0% 0% round 0px)', transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  exit:   { opacity: 0, y: -4, clipPath: 'inset(0% 0% 100% 0% round 0px)', transition: { duration: 0.18, ease: 'easeIn' as const } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show:   (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.25, delay: i * 0.04, ease: 'easeOut' as const } }),
}

// ─── Panels ───────────────────────────────────────────────────────────────────

function DronesPanel() {
  return (
    <div className="grid grid-cols-3 gap-3 p-6">
      {DRONES.map((d, i) => (
        <motion.div key={d.name} custom={i} variants={itemVariants} initial="hidden" animate="show">
          <Link href={d.href}
            className="flex items-center gap-3 p-3 rounded-xl group transition-all duration-200 hover:bg-white/[0.04]"
            style={{ border: '1px solid transparent' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
          >
            {/* Drone image */}
            <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 64, height: 44, background: 'rgba(0,212,255,0.04)' }}>
              <Image src={d.img} alt={d.name} width={64} height={44} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div>
              <p className="font-sans font-semibold text-white group-hover:text-[#00d4ff] transition-colors duration-200" style={{ fontSize: '0.92rem', lineHeight: 1.3 }}>{d.name}</p>
              <p className="font-sans text-text-muted mt-0.5" style={{ fontSize: '0.7rem' }}>{d.desc}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

function IndustriesPanel() {
  const cols = [INDUSTRIES_COL1, INDUSTRIES_COL2, INDUSTRIES_COL3]
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {cols.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-1">
          {col.map((name, i) => (
            <motion.div key={name} custom={ci * 7 + i} variants={itemVariants} initial="hidden" animate="show">
              <Link href={INDUSTRY_HREFS[name] ?? '#'}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-sans text-text-muted hover:text-white hover:bg-white/[0.04] transition-all duration-150 group"
                style={{ fontSize: '0.9rem' }}
              >
                <div className="rounded-full flex-shrink-0 transition-all duration-150 group-hover:bg-[#00d4ff]" style={{ width: 4, height: 4, background: 'rgba(255,255,255,0.2)' }} />
                {name}
              </Link>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}

function ResourcesPanel() {
  return (
    <div className="grid grid-cols-2 gap-3 p-6 max-w-sm">
      {RESOURCES.map((r, i) => (
        <motion.div key={r.name} custom={i} variants={itemVariants} initial="hidden" animate="show">
          <Link href="#"
            className="flex items-center gap-3 p-3 rounded-xl group transition-all duration-200 hover:bg-white/[0.04]"
            style={{ border: '1px solid transparent' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
          >
            <div className="flex-shrink-0 flex items-center justify-center rounded-lg" style={{ width: 34, height: 34, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}>
              {r.icon}
            </div>
            <span className="font-sans font-medium text-text-muted group-hover:text-white transition-colors duration-200" style={{ fontSize: '0.82rem' }}>{r.name}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Panel label + optional bottom bar ────────────────────────────────────────

function PanelShell({ label, accent = '#00d4ff', children }: { label: string; accent?: string; children: React.ReactNode }) {
  return (
    <div>
      {/* Panel top bar */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="rounded-full" style={{ width: 5, height: 5, background: accent, boxShadow: `0 0 8px ${accent}` }} />
        <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.58rem', color: accent }}>{label}</span>
      </div>
      {children}
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

type MenuKey = 'drones' | 'industries' | null

export function Header() {
  const [isScrolled,     setIsScrolled]     = useState(false)
  const [activeMenu,     setActiveMenu]     = useState<MenuKey>(null)
  const [showResources,  setShowResources]  = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer     = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const resourcesTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const openMenu    = useCallback((key: MenuKey) => { clearTimeout(closeTimer.current); setActiveMenu(key) }, [])
  const delayClose  = useCallback(() => { closeTimer.current = setTimeout(() => setActiveMenu(null), 120) }, [])
  const cancelClose = useCallback(() => clearTimeout(closeTimer.current), [])

  const openResources  = useCallback(() => { clearTimeout(resourcesTimer.current); setShowResources(true) }, [])
  const closeResources = useCallback(() => { resourcesTimer.current = setTimeout(() => setShowResources(false), 140) }, [])
  const cancelCloseRes = useCallback(() => clearTimeout(resourcesTimer.current), [])

  const NAV: { label: string; key?: MenuKey; href?: string; resources?: true }[] = [
    { label: 'Drones',     key: 'drones' },
    { label: 'Features',   href: '/features' },
    { label: 'Industries', key: 'industries' },
    { label: 'Blog',       href: '/blog' },
    { label: 'Resources',  resources: true },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          isScrolled || activeMenu
            ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <Container>
          <nav className="flex items-center justify-between h-[68px]" aria-label="Main navigation">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0" aria-label="Zenadrone home">
              <Image src="/images/logo.png" alt="ZenaDrone" width={140} height={36} priority className="h-9 w-auto" />
            </Link>

            {/* Desktop nav — right */}
            <ul className="hidden md:flex items-center gap-1 ml-auto" role="list">
              {NAV.map(item => (
                <li key={item.label} className="relative">
                  {item.href ? (
                    <Link href={item.href}
                      className="px-4 py-2 rounded-lg font-sans text-base text-text-muted hover:text-white hover:bg-white/[0.05] transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : item.resources ? (
                    /* ── Simple Resources dropdown ── */
                    <>
                      <button
                        onMouseEnter={openResources}
                        onMouseLeave={closeResources}
                        className={cn(
                          'flex items-center gap-1.5 px-4 py-2 rounded-lg font-sans text-base transition-all duration-200',
                          showResources
                            ? 'text-white bg-white/[0.06]'
                            : 'text-text-muted hover:text-white hover:bg-white/[0.05]'
                        )}
                      >
                        {item.label}
                        <svg viewBox="0 0 10 10" fill="none" width={10} height={10} style={{ transition: 'transform 0.2s', transform: showResources ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {showResources && (
                          <motion.div
                            key="resources-drop"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            onMouseEnter={cancelCloseRes}
                            onMouseLeave={closeResources}
                            className="absolute right-0 top-full mt-2 z-50"
                            style={{
                              background: 'var(--surface-panel)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: 16,
                              boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,212,255,0.05)',
                              backdropFilter: 'blur(28px)',
                              minWidth: 210,
                              padding: '6px',
                              transformOrigin: 'top right',
                            }}
                          >
                            {/* Panel label */}
                            <div className="flex items-center gap-2 px-3 pt-2.5 pb-2 mb-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <div className="rounded-full" style={{ width: 4, height: 4, background: '#34d399', boxShadow: '0 0 6px #34d399' }} />
                              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.55rem', color: '#34d399' }}>Resources</span>
                            </div>
                            {RESOURCES.map((r, i) => (
                              <motion.div
                                key={r.name}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.18, delay: i * 0.04 }}
                              >
                                <Link href={r.href}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl group transition-all duration-150 hover:bg-white/[0.05]"
                                >
                                  <div className="flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-150 group-hover:bg-[#34d399]/10"
                                    style={{ width: 30, height: 30, background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.12)' }}>
                                    {r.icon}
                                  </div>
                                  <span className="font-sans text-text-muted group-hover:text-white transition-colors duration-150" style={{ fontSize: '0.82rem' }}>
                                    {r.name}
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    /* ── Mega menu triggers ── */
                    <button
                      onMouseEnter={() => openMenu(item.key!)}
                      onMouseLeave={delayClose}
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-2 rounded-lg font-sans text-base transition-all duration-200',
                        activeMenu === item.key
                          ? 'text-white bg-white/[0.06]'
                          : 'text-text-muted hover:text-white hover:bg-white/[0.05]'
                      )}
                    >
                      {item.label}
                      <svg viewBox="0 0 10 10" fill="none" width={10} height={10} style={{ transition: 'transform 0.2s', transform: activeMenu === item.key ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Contact CTA */}
            <Link href="/contact"
              className="hidden md:inline-flex items-center gap-2 ml-3 px-4 py-2 rounded-xl font-sans font-semibold text-sm transition-all duration-300 hover:scale-[1.04]"
              style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', boxShadow: '0 0 18px rgba(0,212,255,0.28)' }}
            >
              Contact Us
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -mr-2 text-text-muted hover:text-white transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span className={cn('block h-px bg-current transition-all duration-300 origin-center', mobileOpen && 'rotate-45 translate-y-[6px]')} />
                <span className={cn('block h-px bg-current transition-all duration-300', mobileOpen && 'opacity-0 scale-x-0')} />
                <span className={cn('block h-px bg-current transition-all duration-300 origin-center', mobileOpen && '-rotate-45 -translate-y-[6px]')} />
              </div>
            </button>
          </nav>
        </Container>

        {/* ── Mega panel ──────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onMouseEnter={cancelClose}
              onMouseLeave={delayClose}
              className="absolute inset-x-0 top-full z-50 hidden md:block"
              style={{
                background: 'var(--surface-panel)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.06)',
              }}
            >
              <Container>
                {activeMenu === 'drones' && (
                  <PanelShell label="Our Drones" accent="#00d4ff">
                    <DronesPanel />
                  </PanelShell>
                )}
                {activeMenu === 'industries' && (
                  <PanelShell label="Industries We Serve" accent="#a78bfa">
                    <IndustriesPanel />
                  </PanelShell>
                )}
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Backdrop ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pointer-events-none hidden md:block"
            style={{ background: 'var(--surface-overlay)', backdropFilter: 'blur(3px)', top: 68 }}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile full-screen menu ────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: 'var(--surface-mobile-menu)', backdropFilter: 'blur(24px)', paddingTop: 68 }}
          >
            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1">
              {NAV.map((item) => {
                const expandKey = item.key ?? (item.resources ? 'resources' : undefined)
                return (
                  <div key={item.label}>
                    {item.href ? (
                      <Link href={item.href}
                        className="flex items-center px-3 py-3.5 rounded-xl font-sans font-medium text-text-muted hover:text-white hover:bg-white/[0.05] transition-all"
                        style={{ fontSize: '0.95rem' }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div>
                        <button
                          className="w-full flex items-center justify-between px-3 py-3.5 rounded-xl font-sans font-medium transition-all"
                          style={{ fontSize: '0.95rem', color: mobileExpanded === expandKey ? '#00d4ff' : 'rgba(255,255,255,0.55)' }}
                          onClick={() => setMobileExpanded(v => v === expandKey ? null : expandKey!)}
                        >
                          {item.label}
                          <svg viewBox="0 0 12 12" fill="none" width={12} height={12} style={{ transition: 'transform 0.2s', transform: mobileExpanded === expandKey ? 'rotate(180deg)' : 'rotate(0)' }}>
                            <path d="M2 4 L6 8 L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {mobileExpanded === expandKey && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-3 flex flex-col gap-0.5">
                                {item.key === 'drones' && DRONES.map(d => (
                                  <Link key={d.name} href={d.href}
                                    className="px-3 py-2.5 rounded-lg font-sans text-text-muted hover:text-white hover:bg-white/[0.04] transition-all"
                                    style={{ fontSize: '0.85rem' }}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {d.name}
                                  </Link>
                                ))}
                                {item.key === 'industries' && [...INDUSTRIES_COL1, ...INDUSTRIES_COL2, ...INDUSTRIES_COL3].map(name => (
                                  <Link key={name} href={INDUSTRY_HREFS[name] ?? '#'}
                                    className="px-3 py-2 rounded-lg font-sans text-text-muted hover:text-white hover:bg-white/[0.04] transition-all"
                                    style={{ fontSize: '0.82rem' }}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {name}
                                  </Link>
                                ))}
                                {item.resources && RESOURCES.map(r => (
                                  <Link key={r.name} href={r.href}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-sans text-text-muted hover:text-white hover:bg-white/[0.04] transition-all"
                                    style={{ fontSize: '0.85rem' }}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    <span className="opacity-70">{r.icon}</span>
                                    {r.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )
              })}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
