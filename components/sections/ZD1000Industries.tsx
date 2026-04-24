'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container }    from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }       from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

// ─── Industries data ──────────────────────────────────────────────────────────
const INDUSTRIES = [
  { name: 'Agriculture & Farm Plantations', color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 4 C14 4 6 10 6 18 C6 22 9.6 25 14 25 C18.4 25 22 22 22 18 C22 10 14 4 14 4Z" stroke={c} strokeWidth={1.3} fill={`${c}15`} />
        <path d="M14 14 L14 25" stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        <path d="M14 18 L10 15" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        <path d="M14 20 L18 17" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  { name: 'Environmental Monitoring', color: '#22d3ee',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx={14} cy={14} r={9} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <path d="M5 14 Q8 10 14 14 Q20 18 23 14" stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={14} y1={5} x2={14} y2={23} stroke={c} strokeWidth={0.8} opacity={0.35} />
        <circle cx={14} cy={14} r={2} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  { name: 'City Planning', color: '#a78bfa',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x={3}  y={14} width={6} height={10} rx={1} stroke={c} strokeWidth={1.2} fill={`${c}10`} />
        <rect x={11} y={10} width={6} height={14} rx={1} stroke={c} strokeWidth={1.2} fill={`${c}10`} />
        <rect x={19} y={12} width={6} height={12} rx={1} stroke={c} strokeWidth={1.2} fill={`${c}10`} />
        <line x1={1} y1={24} x2={27} y2={24} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        <line x1={8} y1={7}  x2={8}  y2={3}  stroke={c} strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
        <circle cx={8} cy={3} r={1.5} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  { name: 'Property Management', color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 4 L25 12 L25 24 L3 24 L3 12 Z" stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <rect x={11} y={16} width={6} height={8} rx={1} stroke={c} strokeWidth={1.1} />
        <path d="M14 4 L14 8" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  { name: 'Power Line Inspection', color: '#f472b6',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <line x1={3} y1={20} x2={25} y2={20} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={3} y1={16} x2={25} y2={16} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        <line x1={8}  y1={8} x2={8}  y2={20} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={20} y1={8} x2={20} y2={20} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={6}  y1={8} x2={10} y2={8}  stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={18} y1={8} x2={22} y2={8}  stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M13 12 L11 16 L14 16 L12 20" stroke={c} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  { name: 'Security & Surveillance', color: '#00d4ff',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 3 L22 7 L22 15 C22 19.4 18.4 23 14 24 C9.6 23 6 19.4 6 15 L6 7 Z" stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <circle cx={14} cy={14} r={3.5} stroke={c} strokeWidth={1.2} />
        <circle cx={14} cy={14} r={1.2} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  { name: 'Military Industry', color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 3 L25 8 L22 22 L14 25 L6 22 L3 8 Z" stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <path d="M10 14 L13 17 L19 11" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  { name: 'Livestock Management', color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx={14} cy={10} r={5} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <path d="M5 24 C5 19.6 8.6 16 14 16 C19.4 16 23 19.6 23 24" stroke={c} strokeWidth={1.3} strokeLinecap="round" />
        <line x1={10} y1={5} x2={8}  y2={2} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.6} />
        <line x1={18} y1={5} x2={20} y2={2} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.6} />
      </svg>
    ),
  },
  { name: 'Architecture & Construction', color: '#a78bfa',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x={4} y={8} width={20} height={16} rx={1.5} stroke={c} strokeWidth={1.2} fill={`${c}08`} />
        <line x1={4}  y1={14} x2={24} y2={14} stroke={c} strokeWidth={0.8} opacity={0.35} />
        <line x1={4}  y1={19} x2={24} y2={19} stroke={c} strokeWidth={0.8} opacity={0.35} />
        <line x1={11} y1={8}  x2={11} y2={24} stroke={c} strokeWidth={0.8} opacity={0.35} />
        <line x1={17} y1={8}  x2={17} y2={24} stroke={c} strokeWidth={0.8} opacity={0.35} />
        <path d="M4 8 L14 3 L24 8" stroke={c} strokeWidth={1.3} strokeLinejoin="round" fill={`${c}10`} />
      </svg>
    ),
  },
  { name: 'Warehousing & Inventory', color: '#22d3ee',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x={3} y={10} width={22} height={14} rx={1.5} stroke={c} strokeWidth={1.2} fill={`${c}08`} />
        <path d="M3 10 L14 5 L25 10" stroke={c} strokeWidth={1.2} strokeLinejoin="round" />
        <rect x={11} y={15} width={6} height={9} rx={1} stroke={c} strokeWidth={1.1} />
        <line x1={7} y1={13} x2={7} y2={20} stroke={c} strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
        <line x1={21} y1={13} x2={21} y2={20} stroke={c} strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
      </svg>
    ),
  },
  { name: 'Search & Rescue Missions', color: '#f472b6',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx={12} cy={12} r={7} stroke={c} strokeWidth={1.3} />
        <line x1={17} y1={17} x2={25} y2={25} stroke={c} strokeWidth={2} strokeLinecap="round" />
        <path d="M9 12 L12 15 L16 9" stroke={c} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  { name: 'Emergency Services', color: '#ef4444',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 3 L25 22 L3 22 Z" stroke={c} strokeWidth={1.3} fill={`${c}10`} strokeLinejoin="round" />
        <line x1={14} y1={12} x2={14} y2={16} stroke={c} strokeWidth={2} strokeLinecap="round" />
        <circle cx={14} cy={19} r={1.2} fill={c} />
      </svg>
    ),
  },
  { name: 'Oil & Gas Industry', color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 3 C14 3 9 9 9 15 C9 18.9 11.2 22 14 22 C16.8 22 19 18.9 19 15 C19 9 14 3 14 3Z" stroke={c} strokeWidth={1.3} fill={`${c}12`} />
        <line x1={14} y1={22} x2={14} y2={26} stroke={c} strokeWidth={2} strokeLinecap="round" />
        <line x1={10} y1={26} x2={18} y2={26} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <circle cx={14} cy={15} r={2.5} stroke={c} strokeWidth={1} fill={`${c}20`} />
      </svg>
    ),
  },
  { name: 'Renewable Energy', color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx={14} cy={14} r={5} stroke={c} strokeWidth={1.3} fill={`${c}12`} />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = deg * Math.PI / 180
          const x1 = 14 + 6.5 * Math.cos(r), y1 = 14 + 6.5 * Math.sin(r)
          const x2 = 14 + 11 * Math.cos(r), y2 = 14 + 11 * Math.sin(r)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={i % 2 === 0 ? 2 : 1} strokeLinecap="round" opacity={0.75} />
        })}
        <circle cx={14} cy={14} r={2} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  { name: 'Crop Insurance', color: '#22d3ee',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 3 L22 7 L22 17 C22 21 18.4 24 14 25 C9.6 24 6 21 6 17 L6 7 Z" stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <path d="M9 15 L13 19 L20 10" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  { name: 'Industrial Zoning', color: '#a78bfa',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x={3}  y={3}  width={10} height={10} rx={1.5} stroke={c} strokeWidth={1.2} fill={`${c}10`} />
        <rect x={15} y={3}  width={10} height={10} rx={1.5} stroke={c} strokeWidth={1.2} fill={`${c}08`} />
        <rect x={3}  y={15} width={10} height={10} rx={1.5} stroke={c} strokeWidth={1.2} fill={`${c}08`} />
        <rect x={15} y={15} width={10} height={10} rx={1.5} stroke={c} strokeWidth={1.2} fill={`${c}10`} />
        <circle cx={14} cy={14} r={2} fill={c} opacity={0.7} />
      </svg>
    ),
  },
]

// ─── Section ──────────────────────────────────────────────────────────────────
export function ZD1000Industries() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <SectionWrapper className="bg-surface">
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(124,58,237,0.05) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>Applications</p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            ZenaDrone Industries
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '0.92rem', maxWidth: 560 }}>
            We provide drone services for a wide range of industries, customized to fit each organization&apos;s operations and drone technology goals.
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" staggerDelay={0.05}>
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.name}
              variants={itemVariants}
              className="group relative flex items-center gap-3 p-3.5 rounded-xl cursor-default transition-all duration-250 hover:scale-[1.02]"
              style={{
                background: hovered === i ? `${ind.color}0c` : 'var(--surface-card)',
                border: `1px solid ${hovered === i ? ind.color + '30' : 'rgba(255,255,255,0.07)'}`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon */}
              <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-250" style={{
                background: hovered === i ? `${ind.color}15` : `${ind.color}09`,
                border: `1px solid ${hovered === i ? ind.color + '35' : ind.color + '18'}`,
              }}>
                {ind.icon(ind.color)}
              </div>

              {/* Name */}
              <p className="font-sans font-medium leading-tight transition-colors duration-200" style={{
                fontSize: '1.125rem',
                color: hovered === i ? '#f0f4ff' : '#8899b4',
              }}>
                {ind.name}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                boxShadow: `inset 0 0 20px ${ind.color}08`,
              }} />
            </motion.div>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <FadeIn className="text-center mt-14">
          <p className="font-sans text-text-muted mb-6" style={{ fontSize: '0.92rem', maxWidth: 480, margin: '0 auto 1.5rem' }}>
            Our team can tailor the ZenaDrone 1000 — along with its attachments and components — to match the exact requirements of your organization.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/zenadrone-1000#book-demo" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.03]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', color: '#fff', fontSize: '0.88rem', boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}>
              Speak With Our Team
            </Link>
          </div>
        </FadeIn>
      </Container>
    </SectionWrapper>
  )
}
