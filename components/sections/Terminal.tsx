'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { FadeIn } from '@/components/animations/FadeIn'
import { Container } from '@/components/ui/Container'

// ─── Data ─────────────────────────────────────────────────────────────────────

type LineType = 'system' | 'cmd' | 'success' | 'data' | 'warning' | 'blank'

interface Line { type: LineType; text: string }

const LINES: Line[] = [
  { type: 'system',  text: 'ZenaDrone Mission Control OS  v2.4.1' },
  { type: 'system',  text: 'Secure boot sequence initiated...' },
  { type: 'blank',   text: '' },
  { type: 'cmd',     text: '> initialize --mission-id ZD-2024-0847 --auth-key ████████' },
  { type: 'success', text: '  ✓  Authentication verified' },
  { type: 'success', text: '  ✓  System initialization complete' },
  { type: 'blank',   text: '' },
  { type: 'cmd',     text: '> load-mission --target "31.5204°N, 74.3587°E"' },
  { type: 'data',    text: '  [COORD]   Target locked      →   31.5204°N, 74.3587°E' },
  { type: 'data',    text: '  [PATH]    Waypoints          →   847 calculated' },
  { type: 'data',    text: '  [DIST]    Flight distance    →   12.4 km' },
  { type: 'blank',   text: '' },
  { type: 'cmd',     text: '> run-preflight-check --verbose' },
  { type: 'success', text: '  ✓  Battery            98%        OPTIMAL' },
  { type: 'success', text: '  ✓  Wind speed          4.2 m/s   WITHIN RANGE' },
  { type: 'success', text: '  ✓  Obstacle detect     ENABLED   ARMED' },
  { type: 'success', text: '  ✓  Thermal imaging     ENABLED   ARMED' },
  { type: 'success', text: '  ✓  AI navigation       v3.1.2    LOCKED' },
  { type: 'success', text: '  ✓  All systems         NOMINAL' },
  { type: 'blank',   text: '' },
  { type: 'cmd',     text: '> launch --drone ZD-1000 --altitude 200m --mode silent' },
  { type: 'warning', text: '  !  Propulsion sequence initiated...' },
  { type: 'data',    text: '  [ALT]     Climbing    →   0m  ›  50m  ›  120m  ›  200m  ✓' },
  { type: 'data',    text: '  [SPEED]   Cruise      →   58 km/h stabilized' },
  { type: 'data',    text: '  [GPS]     Signal      →   LOCKED  (12 satellites)' },
  { type: 'blank',   text: '' },
  { type: 'cmd',     text: '> execute-mission --mode surveillance --stream 4K60' },
  { type: 'success', text: '  ✓  MISSION ACTIVE  ——  ID: ZD-2024-0847' },
  { type: 'data',    text: '  [LIVE]    Stream      →   4K @ 60fps  ●  ACTIVE' },
  { type: 'data',    text: '  [THERM]   Targets     →   3 identified, 1 flagged' },
  { type: 'blank',   text: '' },
  { type: 'success', text: '  ✓  MISSION COMPLETE  ——  Duration: 00:14:32' },
  { type: 'success', text: '  ✓  Data transmitted  →   14.7 GB  |  Integrity: 100%' },
]

// ─── Constants ────────────────────────────────────────────────────────────────

const LINE_H       = 26   // px per line
const VISIBLE      = 12   // lines visible in terminal viewport
const TL_DURATION  = 34   // GSAP timeline units (≈ 1 per line)
const INTERVAL     = TL_DURATION / LINES.length

// Line text colour
const COLORS: Record<LineType, string> = {
  system:  'rgba(255,255,255,0.28)',
  cmd:     '#f0f4ff',
  success: '#34d399',
  data:    '#a78bfa',
  warning: '#fbbf24',
  blank:   'transparent',
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Terminal() {
  const sectionRef  = useRef<HTMLElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const innerRef    = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const lineRefs    = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   'top top',
        end:     '+=420%',
        pin:     true,
        scrub:   1.4,
        anticipatePin: 1,
      },
    })

    // ── Terminal fades in ──────────────────────────────────────────────────────
    tl.from(terminalRef.current, { opacity: 0, y: 40, scale: 0.97, duration: 1.5 }, 0)

    // ── Each line slides in from left ─────────────────────────────────────────
    LINES.forEach((_, i) => {
      const t = 1.5 + i * INTERVAL
      tl.fromTo(
        lineRefs.current[i],
        { opacity: 0, x: -18, filter: 'blur(3px)' },
        { opacity: 1, x: 0,   filter: 'blur(0px)', duration: INTERVAL * 0.7, ease: 'power2.out' },
        t,
      )
    })

    // ── Inner scroll — keeps cursor in view once lines overflow ───────────────
    const overflowStart = 1.5 + VISIBLE * INTERVAL
    const overflowLines = LINES.length - VISIBLE
    const overflowEnd   = 1.5 + LINES.length * INTERVAL

    tl.fromTo(
      innerRef.current,
      { y: 0 },
      { y: -(overflowLines * LINE_H), duration: overflowEnd - overflowStart, ease: 'none' },
      overflowStart,
    )

    // ── Progress bar fills ────────────────────────────────────────────────────
    tl.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: TL_DURATION, ease: 'none' },
      1.5,
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ minHeight: '100svh' }}
      aria-label="ZenaDrone OS — Mission terminal"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 65%)',
        }}
      />

      {/* Top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
        }}
      />

      <Container className="flex flex-col items-center py-24 md:py-32">

        {/* Header */}
        <FadeIn className="text-center mb-12 w-full">
          <p
            className="font-sans font-medium tracking-[0.32em] uppercase mb-3"
            style={{ fontSize: '0.8125rem', color: '#00d4ff' }}
          >
            ZenaDrone OS
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)', letterSpacing: '-0.025em', lineHeight: 1.06 }}
          >
            Mission in Real Time
          </h2>
          <p
            className="font-sans text-text-muted mt-3 mx-auto"
            style={{ fontSize: '1.125rem', maxWidth: '420px' }}
          >
            Every mission runs through the ZenaDrone command interface — from launch to debrief.
          </p>
        </FadeIn>

        {/* ── Terminal window ────────────────────────────────────────────────── */}
        <div
          ref={terminalRef}
          className="w-full max-w-4xl rounded-2xl overflow-hidden"
          style={{
            background: '#05050d',
            border: '1px solid rgba(0,212,255,0.14)',
            boxShadow:
              '0 0 0 1px rgba(0,212,255,0.06), 0 0 60px rgba(0,212,255,0.1), 0 0 120px rgba(0,212,255,0.05)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-4"
            style={{
              height: 44,
              background: '#08080f',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Window dots */}
            <div className="flex items-center gap-1.5">
              {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
                <div key={i} className="rounded-full" style={{ width: 11, height: 11, background: c, opacity: 0.85 }} />
              ))}
            </div>

            {/* Title */}
            <p
              className="font-mono text-center select-none absolute left-1/2"
              style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.35)', transform: 'translateX(-50%)' }}
            >
              ZenaDrone OS — Mission Control  ·  ZD-2024-0847
            </p>

            {/* Status chips */}
            <div className="flex items-center gap-3">
              {[
                { label: 'GPS', color: '#34d399' },
                { label: 'SIG', color: '#00d4ff' },
              ].map(chip => (
                <div key={chip.label} className="flex items-center gap-1.5">
                  <div className="rounded-full animate-pulse" style={{ width: 6, height: 6, background: chip.color }} />
                  <span className="font-mono" style={{ fontSize: '0.8125rem', color: chip.color }}>{chip.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div
            className="relative overflow-hidden px-5 pt-4 pb-4"
            style={{ height: VISIBLE * LINE_H + 32 }}
          >
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.09) 0px, rgba(0,0,0,0.09) 1px, transparent 1px, transparent 3px)',
                backgroundSize: '100% 3px',
              }}
            />

            {/* Lines */}
            <div ref={innerRef} className="relative">
              {LINES.map((line, i) => (
                <div
                  key={i}
                  ref={el => { lineRefs.current[i] = el }}
                  className="font-mono whitespace-pre leading-none select-none"
                  style={{
                    height:    LINE_H,
                    lineHeight: `${LINE_H}px`,
                    fontSize:  '0.775rem',
                    color:     COLORS[line.type],
                    opacity:   0,
                    letterSpacing: '0.01em',
                  }}
                >
                  {line.text || '\u00a0'}
                </div>
              ))}

              {/* Blinking cursor */}
              <div
                className="font-mono"
                style={{
                  height: LINE_H, lineHeight: `${LINE_H}px`,
                  fontSize: '1.125rem', color: '#00d4ff',
                  animation: 'cursorBlink 1s step-end infinite',
                }}
              >
                _
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 2,
              background: 'rgba(255,255,255,0.05)',
              borderTop: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <div
              ref={progressRef}
              className="h-full origin-left"
              style={{
                background: 'linear-gradient(to right, #00d4ff, #a78bfa, #34d399)',
                boxShadow: '0 0 8px rgba(0,212,255,0.6)',
                transform: 'scaleX(0)',
              }}
            />
          </div>

          {/* Footer bar */}
          <div
            className="flex items-center justify-between px-5"
            style={{
              height: 32,
              background: '#08080f',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span className="font-mono" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.2)' }}>
              ZENADRONE OS  v2.4.1  —  SECURE CHANNEL  AES-256
            </span>
            <span className="font-mono" style={{ fontSize: '0.8125rem', color: '#34d399' }}>
              ● CONNECTED
            </span>
          </div>
        </div>
      </Container>

      {/* Cursor blink keyframe */}
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
