'use client'

import { useRef }            from 'react'
import Image                 from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

// ─── Defense capability cards ─────────────────────────────────────────────────
const DEFENSE_CAPS = [
  {
    label: 'Infrastructure Inspection',
    desc: 'Real-time surveillance of bridges, roads, power stations, and military bases.',
    color: '#00d4ff',
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={30} height={30}>
        <rect x={4} y={18} width={28} height={14} rx={2} stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <path d="M4 18 L10 10 L18 6 L26 10 L32 18" stroke={c} strokeWidth={1.4} strokeLinejoin="round" />
        <line x1={18} y1={6} x2={18} y2={32} stroke={c} strokeWidth={1} opacity={0.5} />
        <line x1={4} y1={22} x2={32} y2={22} stroke={c} strokeWidth={0.8} opacity={0.3} />
      </svg>
    ),
  },
  {
    label: 'Surveillance & Security',
    desc: 'Continuous line-of-site monitoring with advanced camera and sensor payloads.',
    color: '#a78bfa',
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={30} height={30}>
        <circle cx={18} cy={18} r={11} stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <circle cx={18} cy={18} r={6} stroke={c} strokeWidth={1.1} />
        <circle cx={18} cy={18} r={2.5} fill={c} opacity={0.9} />
        <line x1={7} y1={18} x2={12} y2={18} stroke={c} strokeWidth={1.1} strokeLinecap="round" />
        <line x1={24} y1={18} x2={29} y2={18} stroke={c} strokeWidth={1.1} strokeLinecap="round" />
        <line x1={18} y1={7} x2={18} y2={12} stroke={c} strokeWidth={1.1} strokeLinecap="round" />
        <line x1={18} y1={24} x2={18} y2={29} stroke={c} strokeWidth={1.1} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Reconnaissance',
    desc: 'Short-distance reconnaissance reducing need for personnel in dangerous areas.',
    color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={30} height={30}>
        <path d="M18 4 L28 10 L28 22 C28 28 23 32 18 33 C13 32 8 28 8 22 L8 10 Z" stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <path d="M13 18 L16 21 L23 14" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Mission Planning',
    desc: 'Supports mission planning, logistics, and national security with real-time data.',
    color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={30} height={30}>
        <rect x={5} y={5} width={26} height={26} rx={3} stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <line x1={5} y1={13} x2={31} y2={13} stroke={c} strokeWidth={0.8} opacity={0.4} />
        <line x1={13} y1={13} x2={13} y2={31} stroke={c} strokeWidth={0.8} opacity={0.4} />
        <circle cx={9} cy={9} r={1.5} fill={c} opacity={0.7} />
        <path d="M17 20 L20 17 L26 23" stroke={c} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Various Sensors & Cameras',
    desc: 'Equipped with a variety of cameras and sensors for diverse defense missions.',
    color: '#f472b6',
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={30} height={30}>
        <rect x={3} y={11} width={20} height={14} rx={2.5} stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <path d="M23 16 L33 12 L33 24 L23 20 Z" stroke={c} strokeWidth={1.2} strokeLinejoin="round" />
        <circle cx={13} cy={18} r={3.5} stroke={c} strokeWidth={1.2} />
        <circle cx={13} cy={18} r={1.4} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    label: 'Personnel Safety',
    desc: 'Reduces the need for troops to operate in hazardous or contested environments.',
    color: '#22d3ee',
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={30} height={30}>
        <path d="M18 3 L28 8 L28 18 C28 24.6 23.3 30.4 18 32 C12.7 30.4 8 24.6 8 18 L8 8 Z" stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M13 18 L16 21 L23 14" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// ─── Animated stat counter ────────────────────────────────────────────────────
function DefenseStat({ value, label, color }: { value: string; label: string; color: string }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="text-center"
    >
      <p className="font-display font-bold mb-1" style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', color, letterSpacing: '-0.03em', lineHeight: 1 }}>
        {value}
      </p>
      <p className="font-mono text-text-muted uppercase tracking-[0.15em]" style={{ fontSize: '0.8125rem' }}>{label}</p>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQSquareDefense() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <SectionWrapper id="iq-square-defense" className="bg-background">
      {/* Background — darker defense feel */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(167,139,250,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.025) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)',
      }} />

      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.25) 30%, rgba(167,139,250,0.35) 50%, rgba(167,139,250,0.25) 70%, transparent)',
        boxShadow: '0 0 10px rgba(167,139,250,0.15)',
      }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>Defense Applications</p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            IQ Square in<br />
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Defense Applications
            </span>
          </h2>
          <div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(to right, transparent, #a78bfa, transparent)' }} />
        </FadeIn>

        {/* Hero layout: image + text */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center mb-20">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4/3', background: 'var(--surface-card-el)', border: '1px solid rgba(167,139,250,0.18)' }}
          >
            <Image
              src="/images/IQ-Nano.png"
              alt="ZenaDrone IQ Square defense application"
              fill
              className="object-cover"
              style={{ opacity: 0.8 }}
            />

            {/* Purple tint overlay */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, transparent 55%)',
            }} />

            {/* Corner brackets — purple */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
              {[
                { x1: 3, y1: 3, x2: 12, y2: 3 }, { x1: 3, y1: 3, x2: 3, y2: 13 },
                { x1: 97, y1: 3, x2: 88, y2: 3 }, { x1: 97, y1: 3, x2: 97, y2: 13 },
                { x1: 3, y1: 97, x2: 12, y2: 97 }, { x1: 3, y1: 97, x2: 3, y2: 87 },
                { x1: 97, y1: 97, x2: 88, y2: 97 }, { x1: 97, y1: 97, x2: 97, y2: 87 },
              ].map((l, i) => (
                <line key={i} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
                  stroke="#a78bfa" strokeWidth="0.9" opacity="0.65" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>

            {/* Scan effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
              <div className="iqs-def-scan absolute left-0 right-0 h-[1.5px]" style={{
                background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.7) 30%, rgba(167,139,250,1) 50%, rgba(167,139,250,0.7) 70%, transparent)',
                boxShadow: '0 0 10px rgba(167,139,250,0.5)',
              }} />
            </div>

            {/* Label */}
            <div className="absolute bottom-4 left-4 z-20 px-3 py-2 rounded-xl" style={{
              background: 'rgba(7,7,15,0.78)',
              border: '1px solid rgba(167,139,250,0.25)',
              backdropFilter: 'blur(12px)',
            }}>
              <p className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>Defense Ready</p>
              <p className="font-mono text-text-muted" style={{ fontSize: '0.8125rem' }}>Line-of-site · Multi-sensor</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full self-start" style={{
              background: 'rgba(167,139,250,0.1)',
              border: '1px solid rgba(167,139,250,0.28)',
            }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#a78bfa', boxShadow: '0 0 6px #a78bfa', animation: 'iqs-def-blink 2s ease-in-out infinite' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>Military & Defense</span>
            </div>

            <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
              In military and defense applications, drones enhance infrastructure inspection by providing rapid, real-time surveillance of critical assets such as bridges, roads, power stations, and military bases.
            </p>
            <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
              The IQ Square is designed for these line-of-site applications, using a variety of cameras and sensors, to reduce the need for personnel to operate in dangerous areas supporting mission planning, logistics and national security.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 mt-2 pt-5" style={{ borderTop: '1px solid rgba(167,139,250,0.15)' }}>
              <DefenseStat value="360°" label="Surveillance" color="#a78bfa" />
              <DefenseStat value="LOB" label="Line-of-Site" color="#fbbf24" />
              <DefenseStat value="AI" label="Sensor Fusion" color="#34d399" />
            </div>
          </motion.div>
        </div>

        {/* Capability cards */}
        <FadeIn className="text-center mb-10">
          <p className="font-mono font-bold uppercase tracking-[0.24em] mb-2" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>Capabilities</p>
          <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Built for Critical Missions
          </h3>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.09}>
          {DEFENSE_CAPS.map(cap => (
            <motion.div
              key={cap.label}
              variants={itemVariants}
              className="group relative p-5 rounded-2xl cursor-default transition-all duration-300 hover:scale-[1.02]"
              style={{ background: `${cap.color}07`, border: `1px solid ${cap.color}18` }}
              whileHover={{ borderColor: `${cap.color}40` }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: `radial-gradient(ellipse at top right, ${cap.color}15 0%, transparent 70%)`,
              }} />
              <div className="mb-3 flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 group-hover:scale-110" style={{
                background: `${cap.color}10`,
                border: `1px solid ${cap.color}25`,
              }}>
                {cap.icon(cap.color)}
              </div>
              <p className="font-sans font-semibold text-white/85 group-hover:text-white transition-colors duration-200 mb-1.5" style={{ fontSize: '0.82rem', lineHeight: 1.3 }}>
                {cap.label}
              </p>
              <p className="font-sans text-text-muted" style={{ fontSize: '1.125rem', lineHeight: 1.5 }}>
                {cap.desc}
              </p>
              <div className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: `linear-gradient(to right, transparent, ${cap.color}60, transparent)`,
              }} />
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>

      <style>{`
        .iqs-def-scan { animation: iqsDefScan 3.8s linear infinite; }
        @keyframes iqsDefScan {
          0%   { top: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes iqs-def-blink { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </SectionWrapper>
  )
}
