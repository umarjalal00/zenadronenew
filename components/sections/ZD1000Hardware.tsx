'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Container }  from '@/components/ui/Container'
import { FadeIn }     from '@/components/animations/FadeIn'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

// ─── Hardware component data ──────────────────────────────────────────────────
const HARDWARE = [
  {
    name: 'Quick Swap Batteries',
    color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <rect x={4} y={10} width={21} height={12} rx={2.5} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <rect x={25} y={13} width={3} height={6} rx={1.5} stroke={c} strokeWidth={1.1} />
        <rect x={6} y={12} width={14} height={8} rx={1.5} fill={c} opacity={0.7} />
        <path d="M16 8 L13 16 L16 16 L13 24" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: '4K Camera',
    color: '#f472b6',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <rect x={2} y={9} width={18} height={14} rx={2.5} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <path d="M20 13.5 L30 10 L30 22 L20 18.5 Z" stroke={c} strokeWidth={1.2} strokeLinejoin="round" />
        <circle cx={11} cy={16} r={3} stroke={c} strokeWidth={1.2} />
        <circle cx={11} cy={16} r={1.2} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    name: 'Li-Po Battery',
    color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <rect x={5} y={8} width={18} height={16} rx={2.5} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <rect x={23} y={12} width={4} height={8} rx={2} stroke={c} strokeWidth={1.1} />
        <rect x={7} y={10} width={14} height={4} rx={1} fill={c} opacity={0.7} />
        <rect x={7} y={15} width={10} height={4} rx={1} fill={c} opacity={0.45} />
        <line x1={10} y1={8} x2={10} y2={4}  stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <line x1={18} y1={8} x2={18} y2={4}  stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    name: 'Sunshine Sensor',
    color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <circle cx={16} cy={16} r={6}  fill={`${c}20`} stroke={c} strokeWidth={1.3} />
        <circle cx={16} cy={16} r={2.5} fill={c} opacity={0.9} />
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const r = deg * Math.PI / 180
          const x1 = 16 + 8.5 * Math.cos(r), y1 = 16 + 8.5 * Math.sin(r)
          const x2 = 16 + 12 * Math.cos(r),  y2 = 16 + 12 * Math.sin(r)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={i % 2 === 0 ? 1.5 : 1} strokeLinecap="round" opacity={0.75} />
        })}
      </svg>
    ),
  },
  {
    name: 'Multispectral Sensors',
    color: '#a78bfa',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <path d="M16 4 L28 10 L28 22 L16 28 L4 22 L4 10 Z" stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <circle cx={16} cy={16} r={4} fill={c} opacity={0.85} />
        {[0,60,120,180,240,300].map((deg, i) => {
          const r = deg * Math.PI / 180, x = 16+10*Math.cos(r), y = 16+10*Math.sin(r)
          return <circle key={i} cx={x} cy={y} r={1.5} fill={c} opacity={0.5} />
        })}
      </svg>
    ),
  },
  {
    name: 'Telemetry Antenna',
    color: '#22d3ee',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <path d="M16 28 L16 14" stroke={c} strokeWidth={2} strokeLinecap="round" />
        <path d="M10 20 C10 16 22 16 22 20" stroke={c} strokeWidth={1.3} strokeLinecap="round" />
        <path d="M6 24 C6 15 26 15 26 24" stroke={c} strokeWidth={1.1} strokeLinecap="round" opacity={0.5} />
        <circle cx={16} cy={14} r={2.5} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    name: '360° Lidar',
    color: '#00d4ff',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <circle cx={16} cy={16} r={12} stroke={c} strokeWidth={0.7} strokeDasharray="3 5" opacity={0.3} />
        <circle cx={16} cy={16} r={8}  stroke={c} strokeWidth={0.9} strokeDasharray="2 4" opacity={0.4} />
        <circle cx={16} cy={16} r={4}  stroke={c} strokeWidth={1.3} />
        <circle cx={16} cy={16} r={1.5} fill={c} opacity={0.95} />
        {[0,90,180,270].map((deg,i) => {
          const r = deg*Math.PI/180, x = 16+11*Math.cos(r), y = 16+11*Math.sin(r)
          return <circle key={i} cx={x} cy={y} r={1} fill={c} opacity={0.6} />
        })}
      </svg>
    ),
  },
  {
    name: 'Carbon Fiber Body',
    color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        {Array.from({length:4}).map((_,r) =>
          Array.from({length:4}).map((_,col) => {
            const cx = 8+col*6, cy = 8+r*6
            const pts = [0,1,2,3,4,5].map(k => { const a=(k*60-30)*Math.PI/180; return `${cx+4*Math.cos(a)},${cy+4*Math.sin(a)}` }).join(' ')
            return <polygon key={`${r}-${col}`} points={pts} stroke={c} strokeWidth={0.6} fill={`${c}06`} opacity={0.55} />
          })
        )}
        <circle cx={16} cy={16} r={4} stroke={c} strokeWidth={1.3} fill={`${c}15`} />
        <circle cx={16} cy={16} r={1.5} fill={c} />
      </svg>
    ),
  },
  {
    name: '90° Tilting Rotors',
    color: '#f472b6',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <circle cx={16} cy={16} r={7} stroke={c} strokeWidth={0.9} opacity={0.3} />
        {[0,90,180,270].map((deg,i) => {
          const r = deg*Math.PI/180, ax = 16+7*Math.cos(r), ay = 16+7*Math.sin(r)
          return (
            <g key={i}>
              <line x1={16+3*Math.cos(r)} y1={16+3*Math.sin(r)} x2={ax} y2={ay} stroke={c} strokeWidth={1.3} opacity={0.6} />
              <line x1={ax-5*Math.sin(r)} y1={ay+5*Math.cos(r)} x2={ax+5*Math.sin(r)} y2={ay-5*Math.cos(r)} stroke={c} strokeWidth={2} strokeLinecap="round" opacity={0.8} />
            </g>
          )
        })}
        <circle cx={16} cy={16} r={3} stroke={c} strokeWidth={1.2} fill={`${c}15`} />
        <circle cx={16} cy={16} r={1.2} fill={c} />
      </svg>
    ),
  },
  {
    name: 'BLDC Motors',
    color: '#00d4ff',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <circle cx={16} cy={16} r={10} stroke={c} strokeWidth={1} strokeDasharray="4 3" opacity={0.25} />
        <circle cx={16} cy={16} r={7}  stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <circle cx={16} cy={16} r={3.5} fill={`${c}30`} stroke={c} strokeWidth={1} />
        <circle cx={16} cy={16} r={1.5} fill={c} opacity={0.9} />
        {[0,72,144,216,288].map((deg,i) => {
          const r=deg*Math.PI/180, x1=16+4.5*Math.cos(r), y1=16+4.5*Math.sin(r), x2=16+7*Math.cos(r), y2=16+7*Math.sin(r)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />
        })}
      </svg>
    ),
  },
  {
    name: 'Propeller Guards',
    color: '#a78bfa',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <circle cx={16} cy={16} r={11} stroke={c} strokeWidth={1.4} fill={`${c}05`} />
        <circle cx={16} cy={16} r={8}  stroke={c} strokeWidth={0.7} strokeDasharray="3 4" opacity={0.4} />
        <circle cx={16} cy={16} r={4}  stroke={c} strokeWidth={1.2} />
        <circle cx={16} cy={16} r={1.5} fill={c} opacity={0.9} />
        <line x1={5}  y1={16} x2={12} y2={16} stroke={c} strokeWidth={1.4} strokeLinecap="round" opacity={0.6} />
        <line x1={20} y1={16} x2={27} y2={16} stroke={c} strokeWidth={1.4} strokeLinecap="round" opacity={0.6} />
      </svg>
    ),
  },
  {
    name: 'Retractable Landing Gear',
    color: '#22d3ee',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <rect x={10} y={6} width={12} height={8} rx={2} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <line x1={16} y1={14} x2={16} y2={20} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={16} y1={20} x2={10} y2={26} stroke={c} strokeWidth={1.3} strokeLinecap="round" />
        <line x1={16} y1={20} x2={22} y2={26} stroke={c} strokeWidth={1.3} strokeLinecap="round" />
        <line x1={7}  y1={26} x2={13} y2={26} stroke={c} strokeWidth={2} strokeLinecap="round" />
        <line x1={19} y1={26} x2={25} y2={26} stroke={c} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Universal Attachment',
    color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <rect x={10} y={10} width={12} height={12} rx={2} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <line x1={16} y1={4}  x2={16} y2={10} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={16} y1={22} x2={16} y2={28} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={4}  y1={16} x2={10} y2={16} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={22} y1={16} x2={28} y2={16} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <circle cx={16} cy={16} r={2.5} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    name: 'Internal Storage',
    color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <rect x={5} y={7} width={22} height={18} rx={2.5} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <line x1={5} y1={14} x2={27} y2={14} stroke={c} strokeWidth={1} opacity={0.35} />
        <rect x={8}  y={17} width={5} height={5} rx={1} fill={c} opacity={0.55} />
        <rect x={14} y={17} width={5} height={5} rx={1} fill={c} opacity={0.4} />
        <rect x={20} y={17} width={4} height={5} rx={1} fill={c} opacity={0.3} />
        <circle cx={8}  cy={10.5} r={1.5} fill={c} opacity={0.7} />
        <circle cx={12} cy={10.5} r={1.5} fill={c} opacity={0.5} />
      </svg>
    ),
  },
]

// ─── Section ──────────────────────────────────────────────────────────────────
export function ZD1000Hardware() {
  const [hovered, setHovered] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.zd-hw-card',
      { opacity: 0, y: 30, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.55, ease: 'power3.out',
        stagger: { each: 0.06, from: 'center' },
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative w-full bg-surface py-24 md:py-32 overflow-hidden">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      {/* Hex-dot background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.055) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem' }}>Hardware</p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            ZenaDrone Hardware Components
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '0.92rem', maxWidth: 520 }}>
            Purpose-built hardware engineered for durability, precision, and mission-critical performance in all environments.
          </p>
        </FadeIn>

        {/* Hardware grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xl:gap-4">
          {HARDWARE.map((hw, i) => (
            <motion.div
              key={hw.name}
              className="zd-hw-card group relative flex flex-col items-center gap-3 p-4 rounded-2xl cursor-default transition-all duration-300"
              style={{
                background: hovered === i ? `${hw.color}0d` : 'var(--surface-card)',
                border: `1px solid ${hovered === i ? hw.color + '35' : 'rgba(255,255,255,0.07)'}`,
                opacity: 0,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-12 h-12 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: hovered === i ? 1 : 0,
                  background: `radial-gradient(ellipse at top right, ${hw.color}20 0%, transparent 65%)`,
                }}
              />

              {/* Icon container */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300" style={{
                background: hovered === i ? `${hw.color}15` : `${hw.color}09`,
                border: `1px solid ${hovered === i ? hw.color + '35' : hw.color + '18'}`,
              }}>
                {hw.icon(hw.color)}
              </div>

              {/* Name */}
              <p className="font-sans font-medium text-center leading-tight transition-colors duration-200" style={{
                fontSize: '1.125rem',
                color: hovered === i ? '#f0f4ff' : '#8899b4',
              }}>
                {hw.name}
              </p>

              {/* Number badge */}
              <div className="absolute top-2.5 left-2.5 font-mono font-bold" style={{
                fontSize: '0.8125rem',
                color: hovered === i ? hw.color : 'rgba(255,255,255,0.2)',
                letterSpacing: '0.1em',
                transition: 'color 0.2s',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Bottom glow line */}
              <div className="absolute bottom-0 inset-x-3 h-px transition-opacity duration-300" style={{
                opacity: hovered === i ? 1 : 0,
                background: `linear-gradient(to right, transparent, ${hw.color}70, transparent)`,
              }} />
            </motion.div>
          ))}
        </div>

        {/* Count indicator */}
        <FadeIn delay={0.3} className="text-center mt-8">
          <span className="font-mono text-text-muted" style={{ fontSize: '0.8125rem', letterSpacing: '0.2em' }}>
            {HARDWARE.length} CORE COMPONENTS · PRECISION ENGINEERED
          </span>
        </FadeIn>
      </Container>
    </section>
  )
}
