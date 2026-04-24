'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Industry { name: string; accent: string; icon: React.ReactNode }

const INDUSTRIES: Industry[] = [
  {
    name: 'Agriculture & Farm Plantations', accent: '#34d399',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <path d="M14 24 L14 10" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 16 Q10 12 6 13" stroke="#34d399" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M14 13 Q18 9 22 10" stroke="#34d399" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M14 20 Q11 17 8 18" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
      <circle cx="14" cy="9" r="3" stroke="#34d399" strokeWidth="1.3" fill="rgba(52,211,153,0.1)"/>
    </svg>,
  },
  {
    name: 'Environmental Monitoring', accent: '#22d3ee',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <circle cx="14" cy="14" r="10" stroke="#22d3ee" strokeWidth="1.3" opacity="0.5"/>
      <ellipse cx="14" cy="14" rx="4" ry="10" stroke="#22d3ee" strokeWidth="1.2" opacity="0.7"/>
      <line x1="4" y1="14" x2="24" y2="14" stroke="#22d3ee" strokeWidth="1.2" opacity="0.5"/>
      <path d="M6 9 Q14 11 22 9" stroke="#22d3ee" strokeWidth="1" opacity="0.4" fill="none"/>
      <path d="M6 19 Q14 17 22 19" stroke="#22d3ee" strokeWidth="1" opacity="0.4" fill="none"/>
    </svg>,
  },
  {
    name: 'City Planning', accent: '#00d4ff',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <rect x="3"  y="12" width="6"  height="13" rx="1" stroke="#00d4ff" strokeWidth="1.3"/>
      <rect x="11" y="7"  width="6"  height="18" rx="1" stroke="#00d4ff" strokeWidth="1.3"/>
      <rect x="19" y="10" width="6"  height="15" rx="1" stroke="#00d4ff" strokeWidth="1.3"/>
      <line x1="2" y1="25" x2="26" y2="25" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      <line x1="14" y1="4" x2="14" y2="7" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
    </svg>,
  },
  {
    name: 'Property Management', accent: '#60a5fa',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <path d="M4 13 L14 5 L24 13" stroke="#60a5fa" strokeWidth="1.4" strokeLinejoin="round"/>
      <rect x="7" y="13" width="14" height="12" rx="1" stroke="#60a5fa" strokeWidth="1.3"/>
      <rect x="11" y="18" width="4" height="7" rx="1" stroke="#60a5fa" strokeWidth="1.2"/>
      <circle cx="20" cy="10" r="2" stroke="#60a5fa" strokeWidth="1.1" opacity="0.6"/>
    </svg>,
  },
  {
    name: 'Power Line Inspection', accent: '#fbbf24',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <line x1="14" y1="3" x2="14" y2="25" stroke="#fbbf24" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="6"  y1="9" x2="22" y2="9"  stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="8"  y1="16" x2="20" y2="16" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M4 25 Q6 20 8 16" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
      <path d="M24 25 Q22 20 20 16" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
    </svg>,
  },
  {
    name: 'Security & Surveillance', accent: '#a78bfa',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <path d="M14 3 L23 7 L23 14 C23 19 18.5 23.5 14 25 C9.5 23.5 5 19 5 14 L5 7 Z" stroke="#a78bfa" strokeWidth="1.3" fill="rgba(167,139,250,0.06)"/>
      <circle cx="14" cy="13" r="3.5" stroke="#a78bfa" strokeWidth="1.2"/>
      <circle cx="14" cy="13" r="1.2" fill="#a78bfa"/>
    </svg>,
  },
  {
    name: 'Military Industry', accent: '#f87171',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <circle cx="14" cy="14" r="10" stroke="#f87171" strokeWidth="1.3" opacity="0.4"/>
      <circle cx="14" cy="14" r="6"  stroke="#f87171" strokeWidth="1.2" opacity="0.65"/>
      <circle cx="14" cy="14" r="2.5" fill="#f87171"/>
      <line x1="14" y1="4"  x2="14" y2="8"  stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="20" x2="14" y2="24" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="4"  y1="14" x2="8"  y2="14" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="14" x2="24" y2="14" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>,
  },
  {
    name: 'LiveStock Management', accent: '#fb923c',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <ellipse cx="14" cy="16" rx="8" ry="6" stroke="#fb923c" strokeWidth="1.3" fill="rgba(251,146,60,0.06)"/>
      <circle cx="14" cy="10" r="4" stroke="#fb923c" strokeWidth="1.3"/>
      <path d="M10 7 L8 4" stroke="#fb923c" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M18 7 L20 4" stroke="#fb923c" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10" y1="22" x2="10" y2="26" stroke="#fb923c" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
      <line x1="18" y1="22" x2="18" y2="26" stroke="#fb923c" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
    </svg>,
  },
  {
    name: 'Architecture & Construction', accent: '#fbbf24',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <rect x="10" y="10" width="12" height="15" rx="1" stroke="#fbbf24" strokeWidth="1.3"/>
      <path d="M6 14 L10 10" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="6" y1="14" x2="6" y2="25" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="14" y1="10" x2="14" y2="6" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round"/>
      <rect x="13" y="18" width="4" height="7" rx="0.5" stroke="#fbbf24" strokeWidth="1.1"/>
      <line x1="14" y1="13" x2="20" y2="13" stroke="#fbbf24" strokeWidth="1" opacity="0.5"/>
    </svg>,
  },
  {
    name: 'Warehousing & Inventory', accent: '#60a5fa',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <rect x="4" y="11" width="20" height="14" rx="1" stroke="#60a5fa" strokeWidth="1.3"/>
      <path d="M4 11 L14 4 L24 11" stroke="#60a5fa" strokeWidth="1.3" strokeLinejoin="round"/>
      <line x1="14" y1="11" x2="14" y2="25" stroke="#60a5fa" strokeWidth="1.1" opacity="0.4"/>
      <rect x="9"  y="17" width="4" height="4" rx="0.5" stroke="#60a5fa" strokeWidth="1.1"/>
      <rect x="15" y="17" width="4" height="4" rx="0.5" stroke="#60a5fa" strokeWidth="1.1"/>
    </svg>,
  },
  {
    name: 'Search & Rescue Missions', accent: '#f87171',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <circle cx="12" cy="12" r="7" stroke="#f87171" strokeWidth="1.4"/>
      <line x1="17.5" y1="17.5" x2="24" y2="24" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="9"  y1="12" x2="15" y2="12" stroke="#f87171" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="9"  x2="12" y2="15" stroke="#f87171" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>,
  },
  {
    name: 'Emergency Services', accent: '#fb923c',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <path d="M14 3 L16.5 10.5 L24 10.5 L18 15.5 L20.5 23 L14 18 L7.5 23 L10 15.5 L4 10.5 L11.5 10.5 Z" stroke="#fb923c" strokeWidth="1.3" fill="rgba(251,146,60,0.08)" strokeLinejoin="round"/>
    </svg>,
  },
  {
    name: 'Oil & Gas Industry', accent: '#f59e0b',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <line x1="14" y1="4" x2="14" y2="12" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="8"  y1="6" x2="8"  y2="12" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="8"  y1="6" x2="14" y2="6"  stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="8"  y1="12" x2="20" y2="12" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M14 12 Q14 20 18 22 Q22 24 20 18 Q18 14 14 12Z" stroke="#f59e0b" strokeWidth="1.2" fill="rgba(245,158,11,0.1)"/>
    </svg>,
  },
  {
    name: 'Renewable Energy', accent: '#34d399',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <circle cx="14" cy="14" r="4" stroke="#34d399" strokeWidth="1.4"/>
      <line x1="14" y1="3"  x2="14" y2="7"  stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="21" x2="14" y2="25" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3"  y1="14" x2="7"  y2="14" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="21" y1="14" x2="25" y2="14" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="5.5"  y1="5.5"  x2="8.5"  y2="8.5"  stroke="#34d399" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="19.5" y1="19.5" x2="22.5" y2="22.5" stroke="#34d399" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="22.5" y1="5.5"  x2="19.5" y2="8.5"  stroke="#34d399" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="8.5"  y1="19.5" x2="5.5"  y2="22.5" stroke="#34d399" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>,
  },
  {
    name: 'Crop Insurance', accent: '#22d3ee',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <path d="M14 22 C14 22 7 18 7 12 L7 7 L14 5 L21 7 L21 12 C21 18 14 22 14 22Z" stroke="#22d3ee" strokeWidth="1.3" fill="rgba(34,211,238,0.06)"/>
      <path d="M11 14 L13 16 L17 12" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  },
  {
    name: 'Industrial Zoning', accent: '#a78bfa',
    icon: <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
      <rect x="3"  y="14" width="9"  height="11" rx="1" stroke="#a78bfa" strokeWidth="1.3"/>
      <rect x="14" y="9"  width="11" height="16" rx="1" stroke="#a78bfa" strokeWidth="1.3"/>
      <line x1="3"  y1="25" x2="25" y2="25" stroke="#a78bfa" strokeWidth="1" opacity="0.4"/>
      <path d="M7 14 L7 10 L11 10 L11 14" stroke="#a78bfa" strokeWidth="1.1" opacity="0.5"/>
      <rect x="17" y="13" width="3" height="3" rx="0.5" stroke="#a78bfa" strokeWidth="1" opacity="0.6"/>
      <rect x="17" y="19" width="3" height="3" rx="0.5" stroke="#a78bfa" strokeWidth="1" opacity="0.6"/>
    </svg>,
  },
]

const ROW1 = INDUSTRIES.slice(0, 8)
const ROW2 = INDUSTRIES.slice(8, 16)
const ROW3 = [...INDUSTRIES.slice(3, 11)]

const STATS = [
  { value: '16+',   label: 'Industries Served',    accent: '#00d4ff', target: 16,   suffix: '+',  decimals: 0 },
  { value: '50+',   label: 'Countries Reached',    accent: '#a78bfa', target: 50,   suffix: '+',  decimals: 0 },
  { value: '500+',  label: 'Active Deployments',   accent: '#34d399', target: 500,  suffix: '+',  decimals: 0 },
  { value: '99.8%', label: 'Mission Success Rate', accent: '#fbbf24', target: 99.8, suffix: '%',  decimals: 1 },
]

// ─── Card ─────────────────────────────────────────────────────────────────────

function IndustryCard({ item, index }: { item: Industry; index: number }) {
  return (
    <div
      className="industry-card flex-shrink-0 mx-2 overflow-hidden select-none cursor-default"
      style={{
        borderRadius: 16,
        background: 'rgba(8,8,20,0.92)',
        border: `1px solid ${item.accent}1e`,
        minWidth: 'max-content',
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, transparent, ${item.accent}cc, transparent)`,
      }} />

      {/* Body */}
      <div className="flex items-center gap-3 px-5 py-3.5">
        {/* Faint index number */}
        <span
          className="absolute right-3 top-1/2 font-mono font-extrabold select-none pointer-events-none"
          style={{
            transform: 'translateY(-50%)',
            fontSize: '2rem',
            color: item.accent,
            opacity: 0.045,
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Icon box */}
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            width: 44, height: 44,
            borderRadius: 12,
            background: `${item.accent}0f`,
            border: `1px solid ${item.accent}28`,
          }}
        >
          {item.icon}
        </div>

        {/* Text */}
        <div>
          <span
            className="font-sans font-semibold text-white whitespace-nowrap block"
            style={{ fontSize: '0.84rem', letterSpacing: '-0.01em' }}
          >
            {item.name}
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="rounded-full" style={{ width: 5, height: 5, background: item.accent, boxShadow: `0 0 6px ${item.accent}` }} />
            <span className="font-mono font-medium" style={{ fontSize: '0.8125rem', color: item.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Marquee Row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  items, direction, rowRef, speed = 40,
}: {
  items: Industry[]
  direction: 'left' | 'right'
  rowRef?: React.RefObject<HTMLDivElement | null>
  speed?: number
}) {
  const doubled = [...items, ...items]
  const animName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight'

  function pause(e: React.MouseEvent<HTMLDivElement>) {
    const strip = e.currentTarget.querySelector<HTMLElement>('.strip')
    if (strip) strip.style.animationPlayState = 'paused'
  }
  function resume(e: React.MouseEvent<HTMLDivElement>) {
    const strip = e.currentTarget.querySelector<HTMLElement>('.strip')
    if (strip) strip.style.animationPlayState = 'running'
  }

  return (
    <div
      ref={rowRef}
      className="overflow-hidden py-1.5"
      onMouseEnter={pause}
      onMouseLeave={resume}
      style={{ opacity: rowRef ? 0 : 1 }}
    >
      <div
        className="strip flex"
        style={{ animation: `${animName} ${speed}s linear infinite`, width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <IndustryCard key={i} item={item} index={items.indexOf(item) !== -1 ? items.indexOf(item) : i % items.length} />
        ))}
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null)
  const row2Ref    = useRef<HTMLDivElement>(null)
  const row3Ref    = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const descRef    = useRef<HTMLParagraphElement>(null)
  const badgeRef   = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
      defaults: { ease: 'power3.out' },
    })

    tl.fromTo(badgeRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
    tl.fromTo(titleRef.current,  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.65 }, 0.1)
    tl.fromTo(descRef.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55 }, 0.25)

    tl.fromTo(row2Ref.current, { opacity: 0, x:  60 }, { opacity: 1, x: 0, duration: 0.7 }, 0.38)
    tl.fromTo(row3Ref.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.7 }, 0.48)

    tl.fromTo(statsRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.7,
    )

    STATS.forEach((s, i) => {
      const el = counterRefs.current[i]
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: s.target,
        duration: 2,
        ease: 'power2.out',
        delay: 0.8 + i * 0.1,
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
        onUpdate() {
          el.textContent = (s.decimals > 0 ? obj.val.toFixed(s.decimals) : Math.floor(obj.val).toString()) + s.suffix
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-32 overflow-hidden"
      aria-label="ZenaDrone industries"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.12) 30%, rgba(167,139,250,0.12) 70%, transparent)' }}
      />

      {/* Diagonal grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            60deg,
            rgba(0,212,255,0.022) 0px,
            rgba(0,212,255,0.022) 1px,
            transparent 1px,
            transparent 44px
          ), repeating-linear-gradient(
            -60deg,
            rgba(167,139,250,0.016) 0px,
            rgba(167,139,250,0.016) 1px,
            transparent 1px,
            transparent 44px
          )`,
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* Central glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 30%, rgba(0,212,255,0.04) 0%, transparent 65%)' }}
      />

      <Container>
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="text-center mb-14">

          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2.5 mb-5" style={{ opacity: 0 }}>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{
              background: 'rgba(0,212,255,0.07)',
              border: '1px solid rgba(0,212,255,0.18)',
            }}>
              <div className="rounded-full" style={{ width: 5, height: 5, background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
                16 Industries
              </span>
            </div>
            <div className="h-px w-8" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.4), transparent)' }} />
            <span className="font-mono text-text-muted tracking-widest uppercase" style={{ fontSize: '0.8125rem' }}>
              Global Coverage
            </span>
          </div>

          <h2
            ref={titleRef}
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(2.5rem, 5.4vw, 4.4rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              opacity: 0,
            }}
          >
            Powering Every{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Industry
            </span>
          </h2>

          <p
            ref={descRef}
            className="font-sans text-text-muted mt-4 mx-auto leading-relaxed"
            style={{ fontSize: '1.125rem', maxWidth: '580px', opacity: 0 }}
          >
            From agriculture to defense, ZenaDrone adapts to the exact demands of every sector — delivering autonomous precision where it matters most.
          </p>
        </div>
      </Container>

      {/* ── Marquee rows (full bleed) ──────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        {[
          { items: ROW2, direction: 'right' as const, ref: row2Ref, speed: 45 },
          { items: ROW3, direction: 'left'  as const, ref: row3Ref, speed: 54 },
        ].map(({ items, direction, ref, speed }, ri) => (
          <div key={ri} className="relative">
            <div className="absolute inset-y-0 left-0 z-10 pointer-events-none"
              style={{ width: 140, background: 'linear-gradient(to right, rgb(var(--color-background)), transparent)' }} />
            <div className="absolute inset-y-0 right-0 z-10 pointer-events-none"
              style={{ width: 140, background: 'linear-gradient(to left, rgb(var(--color-background)), transparent)' }} />
            <MarqueeRow items={items} direction={direction} rowRef={ref} speed={speed} />
          </div>
        ))}
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <Container>
        <div ref={statsRef} className="mt-16" style={{ opacity: 0 }}>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden"
            style={{
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.035)',
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="group flex flex-col items-center justify-center gap-1.5 py-8 px-4 text-center transition-all duration-300"
                style={{ background: 'var(--surface-card)', position: 'relative', overflow: 'hidden' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 80% 80% at 50% 100%, ${s.accent}10, transparent)` }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-300 group-hover:w-full"
                  style={{ height: 2, width: '40%', background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }}
                />

                <span
                  ref={el => { counterRefs.current[i] = el }}
                  className="font-display font-bold"
                  style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: s.accent, letterSpacing: '-0.04em', lineHeight: 1 }}
                >
                  0{s.suffix}
                </span>
                <span
                  className="font-sans text-text-muted"
                  style={{ fontSize: '0.8125rem', letterSpacing: '0.04em' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Keyframes + hover styles */}
      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .industry-card {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .industry-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08);
        }
      `}</style>
    </section>
  )
}
