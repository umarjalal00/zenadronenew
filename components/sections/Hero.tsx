'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

// ─── Model definitions ────────────────────────────────────────────────────────

interface Model {
  id: string
  navName: string
  brand: string
  model: string
  subtitle?: string
  modelSize: string
  category: string
  tagline: string
  hideTagline?: boolean
  image: string
  accent: string
  accentBg: string
  tag?: string
  href: string
}

const MODELS: Model[] = [
  {
    id: 'zd1000',
    navName: 'ZenaDrone 1000',
    brand: 'ZenaDrone',
    model: '1000',
    modelSize: 'clamp(2.8rem, 8vw, 5.5rem)',
    category: 'Heavy-Lift Industrial Platform',
    tagline: 'Power Without Compromise.',
    hideTagline: true,
    image: '/images/ZenaDrone-1000.webp',
    accent: '#00d4ff',
    accentBg: 'rgba(0,212,255,0.06)',
    href: '/zenadrone-1000',
  },
  {
    id: 'zdiqquad',
    navName: 'ZenaDrone IQ Quad',
    brand: 'ZenaDrone',
    model: 'IQ Quad',
    modelSize: 'clamp(1.8rem, 5.5vw, 4.5rem)',
    category: 'Professional Quadcopter Series',
    tagline: 'Engineered for Perfection.',
    hideTagline: true,
    image: '/images/IQ-Quad.webp',
    accent: '#34d399',
    accentBg: 'rgba(52,211,153,0.06)',
    href: '/iq-quad',
  },
  {
    id: 'zdiqsquare',
    navName: 'ZenaDrone IQ Square',
    brand: 'ZenaDrone',
    model: 'IQ Square',
    modelSize: 'clamp(1.7rem, 5vw, 4rem)',
    category: 'Intelligent Surveillance System',
    tagline: 'Intelligence. Precision. Everywhere.',
    hideTagline: true,
    image: '/images/iq-nano-hero.jpeg',
    accent: '#22d3ee',
    accentBg: 'rgba(34,211,238,0.06)',
    tag: 'New',
    href: '/iq-square',
  },
  {
    id: 'zdiqnano',
    navName: 'ZenaDrone IQ Nano',
    brand: 'ZenaDrone',
    model: 'IQ Nano',
    modelSize: 'clamp(1.8rem, 5.5vw, 4.5rem)',
    category: 'Ultra-Compact Tactical Unit',
    tagline: 'Small Form. Infinite Range.',
    hideTagline: true,
    image: '/images/iq-square-hero.jpeg',
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.06)',
    href: '/iq-nano',
  },
]

// ─── Nav drone icon ───────────────────────────────────────────────────────────

function DroneIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: 22,
        height: 22,
        color: active ? color : 'rgba(255,255,255,0.3)',
        transition: 'color 0.4s',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="3" fill="currentColor" />
      <line x1="22" y1="22" x2="7"  y2="7"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="22" x2="37" y2="7"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="22" x2="7"  y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="22" x2="37" y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="7"  cy="7"  rx="5" ry="2" fill="currentColor" opacity="0.65" transform="rotate(-45 7 7)" />
      <ellipse cx="37" cy="7"  rx="5" ry="2" fill="currentColor" opacity="0.65" transform="rotate(45 37 7)" />
      <ellipse cx="7"  cy="37" rx="5" ry="2" fill="currentColor" opacity="0.65" transform="rotate(45 7 37)" />
      <ellipse cx="37" cy="37" rx="5" ry="2" fill="currentColor" opacity="0.65" transform="rotate(-45 37 37)" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg
      width="13" height="13" fill="none" viewBox="0 0 13 13" aria-hidden="true"
      className="group-hover:translate-x-[2px] transition-transform duration-300 flex-shrink-0"
    >
      <path d="M4 2.5 8 6.5l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const AUTO_INTERVAL = 5000

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const bgRef        = useRef<HTMLDivElement>(null)
  const tintRef      = useRef<HTMLDivElement>(null)

  const navIdxRef    = useRef(0)
  const [navIdx,     setNavIdx]     = useState(0)
  const [displayIdx, setDisplayIdx] = useState(0)
  const isAnimating  = useRef(false)
  const isFirstSwitch = useRef(true)

  const autoTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null)

  const m = MODELS[displayIdx]

  // ── Entrance animation ───────────────────────────────────────────────────────
  useGSAP(() => {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.h-brand',   { opacity: 0, y: 24,  duration: 0.8 }, 0.5)
      .from('.h-model',   { opacity: 0, y: 70,  duration: 1.0 }, 0.55)
      .from('.h-sub',     { opacity: 0, y: 18,  duration: 0.65 }, 0.78)
      .from('.h-tagline', { opacity: 0, y: 16,  duration: 0.65 }, 0.82)
      .from('.h-btn',     { opacity: 0, y: 14, stagger: 0.12, duration: 0.55 }, 0.96)
      .from('.h-nav',     { opacity: 0, y: 44, duration: 0.9 }, 0.65)

    gsap.to(bgRef.current, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: containerRef })

  // ── Model switch ─────────────────────────────────────────────────────────────
  const switchModel = useCallback((idx: number) => {
    if (isAnimating.current || idx === navIdxRef.current) return

    navIdxRef.current = idx
    setNavIdx(idx)
    isAnimating.current = true

    const q = gsap.utils.selector(containerRef.current)

    gsap.timeline({ onComplete: () => setDisplayIdx(idx) })
      .to(q('.h-brand'),   { opacity: 0, y: -24, duration: 0.24, ease: 'power3.in' }, 0)
      .to(q('.h-model'),   { opacity: 0, y: -52, duration: 0.3,  ease: 'power3.in' }, 0.04)
      .to(q('.h-sub'),     { opacity: 0, y: -18, duration: 0.2,  ease: 'power2.in' }, 0.04)
      .to(q('.h-tagline'), { opacity: 0, y: -12, duration: 0.18, ease: 'power2.in' }, 0.07)
      .to(q('.h-btn'),     { opacity: 0, y: -10, stagger: 0.04,  duration: 0.15, ease: 'power2.in' }, 0.07)

    gsap.to(tintRef.current, {
      backgroundColor: MODELS[idx].accentBg,
      duration: 0.75,
      ease: 'power2.inOut',
    })
  }, [])

  // ── Auto-rotation ────────────────────────────────────────────────────────────
  const startAutoPlay = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current)
    autoTimerRef.current = setInterval(() => {
      const next = (navIdxRef.current + 1) % MODELS.length
      switchModel(next)
    }, AUTO_INTERVAL)
  }, [switchModel])

  const handleNavClick = useCallback((idx: number) => {
    switchModel(idx)
    startAutoPlay()
  }, [switchModel, startAutoPlay])

  useEffect(() => {
    startAutoPlay()
    return () => { if (autoTimerRef.current) clearInterval(autoTimerRef.current) }
  }, [startAutoPlay])

  // ── IN animation fires after React commits new displayIdx ────────────────────
  useEffect(() => {
    if (isFirstSwitch.current) { isFirstSwitch.current = false; return }
    if (!isAnimating.current) return

    const q = gsap.utils.selector(containerRef.current)

    gsap.set(q('.h-brand'),   { opacity: 0, y: 24 })
    gsap.set(q('.h-model'),   { opacity: 0, y: 58 })
    gsap.set(q('.h-sub'),     { opacity: 0, y: 20 })
    gsap.set(q('.h-tagline'), { opacity: 0, y: 15 })
    gsap.set(q('.h-btn'),     { opacity: 0, y: 13 })

    gsap.timeline({ onComplete: () => { isAnimating.current = false } })
      .to(q('.h-brand'),   { opacity: 1, y: 0, duration: 0.5,  ease: 'power3.out' }, 0)
      .to(q('.h-model'),   { opacity: 1, y: 0, duration: 0.68, ease: 'power3.out' }, 0.08)
      .to(q('.h-sub'),     { opacity: 1, y: 0, duration: 0.44, ease: 'power3.out' }, 0.22)
      .to(q('.h-tagline'), { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' }, 0.27)
      .to(q('.h-btn'),     { opacity: 1, y: 0, stagger: 0.1,   duration: 0.4, ease: 'power3.out' }, 0.4)
  }, [displayIdx])

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[680px] overflow-hidden"
      aria-label={`${m.brand} ${m.model} hero`}
    >
      {/* Background photos — one per model, crossfade on switch */}
      <div ref={bgRef} className="absolute inset-0 scale-100 md:scale-[1.15] origin-center will-change-transform">
        {MODELS.map((mod, i) => (
          <Image
            key={mod.id}
            src={mod.image}
            alt={`${mod.brand} ${mod.model}`}
            fill
            priority={i === 0}
            quality={92}
            sizes="100vw"
            className="object-cover transition-opacity duration-700"
            style={{
              objectPosition: 'center center',
              opacity: displayIdx === i ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Per-model colour tint */}
      <div
        ref={tintRef}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: MODELS[0].accentBg }}
      />

      {/* Top gradient — darkens sky for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgb(var(--color-background) / 0.88) 0%, rgb(var(--color-background) / 0.55) 22%, rgb(var(--color-background) / 0.18) 46%, transparent 62%)',
        }}
      />

      {/* Bottom gradient — anchors the nav */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgb(var(--color-background) / 0.97) 0%, rgb(var(--color-background) / 0.55) 13%, transparent 32%)',
        }}
      />

      {/* ── Content — DJI-style upper-center layout ────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ paddingTop: 'clamp(5rem, 13vh, 8rem)' }}
      >

        {/* Brand — small label above the big name */}
        <p
          className="h-brand font-display font-light text-white/50 tracking-[0.18em] uppercase select-none"
          style={{
            fontSize: 'clamp(0.82rem, 1.6vw, 1.3rem)',
            lineHeight: 1,
            marginBottom: '0.18em',
          }}
        >
          {m.brand}
        </p>

        {/* Model name — the big DJI-style display text */}
        <h1
          className="h-model font-display font-bold text-white select-none"
          style={{
            fontSize: m.modelSize,
            lineHeight: 0.9,
            letterSpacing: '-0.025em',
          }}
        >
          {m.model}
        </h1>

        {/* Optional subtitle (e.g. "& IQ Glider", "P‑1") */}
        {m.subtitle && (
          <p
            className="h-sub font-display font-semibold select-none"
            style={{
              fontSize: 'clamp(1.2rem, 3.8vw, 3.5rem)',
              letterSpacing: '-0.01em',
              color: m.accent,
              lineHeight: 1,
              marginTop: '0.08em',
            }}
          >
            {m.subtitle}
          </p>
        )}

        {/* Tagline — hidden for models with hideTagline */}
        {!m.hideTagline && (
          <p
            className="h-tagline font-sans font-semibold text-white/85 select-none"
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.22rem)',
              letterSpacing: '0.03em',
              marginTop: '1.0rem',
              marginBottom: '1.75rem',
            }}
          >
            {m.tagline}
          </p>
        )}

        {/* CTAs — ghost pill style matching reference */}
        <div
          className="flex items-center gap-5 flex-wrap justify-center"
          style={{ marginTop: m.hideTagline ? '1.75rem' : 0 }}
        >
          <Link
            href={m.href}
            className="h-btn group inline-flex items-center gap-2.5 rounded-full font-sans font-medium focus-visible:outline-none"
            style={{
              padding: 'clamp(0.68rem, 1.1vw, 0.9rem) clamp(1.8rem, 2.8vw, 2.8rem)',
              fontSize: 'clamp(0.82rem, 1.1vw, 0.96rem)',
              color: '#ffffff',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.5)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              transition: 'background 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.14)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
            }}
            aria-label={`Learn more about ${m.brand} ${m.model}`}
          >
            Learn More <ChevronRight />
          </Link>

          <Link
            href="/#book-demo"
            className="h-btn group inline-flex items-center gap-2.5 rounded-full font-sans font-medium focus-visible:outline-none"
            style={{
              padding: 'clamp(0.68rem, 1.1vw, 0.9rem) clamp(1.8rem, 2.8vw, 2.8rem)',
              fontSize: 'clamp(0.82rem, 1.1vw, 0.96rem)',
              color: '#ffffff',
              background: 'rgba(0,212,255,0.06)',
              border: '1px solid rgba(255,255,255,0.5)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              transition: 'background 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.14)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
            }}
            aria-label="Contact us — Book a Demo"
          >
            Contact Us <ChevronRight />
          </Link>
        </div>
      </div>

      {/* ── Bottom model nav — DJI-style icon + label ─────────────────────── */}
      <nav
        className="h-nav absolute bottom-0 inset-x-0"
        style={{
          background: 'rgb(var(--color-background) / 0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        aria-label="Explore ZenaDrone models"
      >
        <ul
          className="flex items-stretch justify-center max-w-5xl mx-auto w-full"
          style={{ height: '5.5rem' }}
          role="list"
        >
          {MODELS.map((mod, i) => {
            const isActive = navIdx === i
            const label = mod.navName.replace('ZenaDrone ', '')

            return (
              <li
                key={mod.id}
                className="flex-1 min-w-0"
                style={{
                  borderRight: i < MODELS.length - 1
                    ? '1px solid rgba(255,255,255,0.07)'
                    : 'none',
                }}
              >
                <button
                  onClick={() => handleNavClick(i)}
                  className={cn(
                    'relative w-full h-full flex flex-col items-center justify-center gap-[6px] px-1',
                    'focus-visible:outline-none transition-colors duration-300',
                    !isActive && 'hover:bg-white/[0.03]',
                  )}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`View ${mod.navName}`}
                >
                  {/* Accent indicator line at top */}
                  <span
                    className="absolute top-0 inset-x-0 transition-all duration-500"
                    style={{
                      height: 2,
                      background: isActive
                        ? `linear-gradient(to right, transparent, ${mod.accent}, transparent)`
                        : 'transparent',
                      boxShadow: isActive ? `0 0 14px ${mod.accent}bb` : 'none',
                    }}
                  />

                  {/* Auto-slide progress bar at bottom of active tab */}
                  {isActive && (
                    <span
                      key={`p-${navIdx}`}
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{
                        background: `linear-gradient(to right, ${mod.accent}66, ${mod.accent})`,
                        animation: `heroProgress ${AUTO_INTERVAL}ms linear forwards`,
                      }}
                    />
                  )}

                  <DroneIcon active={isActive} color={mod.accent} />

                  <span
                    className={cn(
                      'font-sans leading-tight text-center transition-colors duration-300 select-none',
                      isActive ? 'text-white' : 'text-white/32',
                    )}
                    style={{
                      fontSize: 'clamp(0.68rem, 0.9vw, 0.85rem)',
                      fontWeight: isActive ? 500 : 400,
                      letterSpacing: '0.02em',
                      maxWidth: '100%',
                    }}
                  >
                    {label}
                    {mod.tag && (
                      <> <span className="font-bold" style={{ color: mod.accent, fontSize: '0.46rem' }}>
                        {mod.tag}
                      </span></>
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <style>{`@keyframes heroProgress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  )
}
