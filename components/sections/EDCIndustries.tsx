'use client'

import { useState } from 'react'
import { motion }   from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const INDUSTRIES = [
  {
    name: 'Agriculture',
    color: '#34d399',
    points: ['Crop health monitoring via drone data analysis', 'Soil condition assessment', 'Irrigation system inspection', 'Seasonal aerial data collection'],
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 4 C14 4 6 10 6 18 C6 22 9.6 25 14 25 C18.4 25 22 22 22 18 C22 10 14 4 14 4Z" stroke={c} strokeWidth={1.3} fill={`${c}15`} />
        <path d="M14 14 L14 25" stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        <path d="M14 18 L10 15M14 20 L18 17" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    name: 'Construction',
    color: '#fbbf24',
    points: ['Site data collection and documentation', 'Construction timeline monitoring', 'Volumetric measurements (cut/fill)', 'Mapping and site modeling'],
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x={4} y={8} width={20} height={16} rx={1.5} stroke={c} strokeWidth={1.2} fill={`${c}08`} />
        <path d="M4 8 L14 3 L24 8" stroke={c} strokeWidth={1.3} strokeLinejoin="round" fill={`${c}10`} />
        <line x1={11} y1={8} x2={11} y2={24} stroke={c} strokeWidth={0.8} opacity={0.35} />
        <line x1={17} y1={8} x2={17} y2={24} stroke={c} strokeWidth={0.8} opacity={0.35} />
        <line x1={4} y1={14} x2={24} y2={14} stroke={c} strokeWidth={0.8} opacity={0.35} />
      </svg>
    ),
  },
  {
    name: 'Utilities & Energy',
    color: '#f472b6',
    points: ['Asset inspection with data collection drones', 'Power grid inspection and monitoring', 'Pipeline inspection and assessment', 'Preventive maintenance planning'],
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <line x1={3} y1={20} x2={25} y2={20} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={8} y1={8} x2={8} y2={20} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={20} y1={8} x2={20} y2={20} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={6} y1={8} x2={10} y2={8} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={18} y1={8} x2={22} y2={8} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M13 12 L11 16 L14 16 L12 20" stroke={c} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Infrastructure & Smart Cities',
    color: '#a78bfa',
    points: ['Road and bridge inspection', 'Urban planning with aerial data analysis', 'Construction progress tracking', 'City infrastructure monitoring'],
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x={3} y={14} width={6} height={10} rx={1} stroke={c} strokeWidth={1.2} fill={`${c}10`} />
        <rect x={11} y={10} width={6} height={14} rx={1} stroke={c} strokeWidth={1.2} fill={`${c}10`} />
        <rect x={19} y={12} width={6} height={12} rx={1} stroke={c} strokeWidth={1.2} fill={`${c}10`} />
        <line x1={1} y1={24} x2={27} y2={24} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        <line x1={8} y1={7} x2={8} y2={3} stroke={c} strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
        <circle cx={8} cy={3} r={1.5} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    name: 'Defense & Security',
    color: '#00d4ff',
    points: ['Secure aerial surveillance', 'Situational awareness and reconnaissance', 'Risk assessment and threat monitoring', 'Mission planning and operational support'],
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 3 L22 7 L22 15 C22 19.4 18.4 23 14 24 C9.6 23 6 19.4 6 15 L6 7 Z" stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <circle cx={14} cy={13} r={3.5} stroke={c} strokeWidth={1.2} />
        <circle cx={14} cy={13} r={1.2} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    name: 'Environmental Monitoring',
    color: '#22d3ee',
    points: ['Land surveying and mapping', 'Habitat and wildlife monitoring', 'Environmental impact assessment', 'Long-term drone data analysis'],
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx={14} cy={14} r={9} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <path d="M5 14 Q8 10 14 14 Q20 18 23 14" stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={14} y1={5} x2={14} y2={23} stroke={c} strokeWidth={0.8} opacity={0.35} />
        <circle cx={14} cy={14} r={2} fill={c} opacity={0.9} />
      </svg>
    ),
  },
]

export function EDCIndustries() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <SectionWrapper id="industries" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)',
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(167,139,250,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.03) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>
            Industry Applications
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Industry-Specific<br />
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Applications
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 540 }}>
            ZenaDrone delivers precision data collection solutions across diverse industries and operational environments.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.07} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.name}
              variants={itemVariants}
              className="group relative p-5 rounded-2xl cursor-default transition-all duration-300"
              style={{
                background: active === i ? `${ind.color}0c` : 'var(--surface-card)',
                border: `1px solid ${active === i ? ind.color + '35' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: active === i ? `0 0 40px ${ind.color}10` : 'none',
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{
                  background: active === i ? `${ind.color}18` : `${ind.color}0c`,
                  border: `1px solid ${active === i ? ind.color + '40' : ind.color + '20'}`,
                }}>
                  {ind.icon(ind.color)}
                </div>
                <h3 className="font-display font-bold transition-colors duration-200" style={{
                  fontSize: '1.2rem', color: active === i ? '#f0f4ff' : '#c8d5ea', letterSpacing: '-0.01em',
                }}>
                  {ind.name}
                </h3>
              </div>

              {/* Points */}
              <ul className="flex flex-col gap-1.5">
                {ind.points.map(pt => (
                  <li key={pt} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5 transition-all duration-300" style={{
                      background: active === i ? ind.color : 'rgba(255,255,255,0.25)',
                    }} />
                    <span className="font-sans text-text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-5 right-5 h-px rounded-full transition-all duration-300" style={{
                background: active === i ? `linear-gradient(to right, transparent, ${ind.color}55, transparent)` : 'transparent',
              }} />
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  )
}
