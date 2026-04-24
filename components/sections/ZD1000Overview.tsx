'use client'

import { useRef }       from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }    from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }       from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

// ─── Capability icons (inline SVG) ───────────────────────────────────────────
const CAPABILITIES = [
  {
    label: 'Autonomous Aerial Surveillance',
    color: '#00d4ff',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={36} height={36}>
        <circle cx={20} cy={20} r={14} stroke={c} strokeWidth={1.2} opacity={0.3} />
        <circle cx={20} cy={20} r={9}  stroke={c} strokeWidth={1.4} />
        <circle cx={20} cy={20} r={3.5} fill={c} opacity={0.9} />
        <line x1={6} y1={20} x2={11} y2={20} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={29} y1={20} x2={34} y2={20} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={20} y1={6}  x2={20} y2={11} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={20} y1={29} x2={20} y2={34} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Smart Multispectral Sensors',
    color: '#a78bfa',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={36} height={36}>
        <path d="M20 6 L34 14 L34 26 L20 34 L6 26 L6 14 Z" stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <circle cx={20} cy={20} r={5} fill={c} opacity={0.85} />
        <path d="M20 14 L20 6" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        <path d="M20 26 L20 34" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        <path d="M26 17 L34 14" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4} />
        <path d="M14 23 L6 26"  stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
  {
    label: 'Intelligent Flight Modes',
    color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={36} height={36}>
        <path d="M8 28 C12 24 16 18 20 18 C24 18 28 24 32 28" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
        <circle cx={20} cy={14} r={5} stroke={c} strokeWidth={1.4} />
        <circle cx={20} cy={14} r={2} fill={c} opacity={0.9} />
        <line x1={20} y1={9} x2={20} y2={5}  stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        <line x1={16} y1={15} x2={13} y2={18} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        <line x1={24} y1={15} x2={27} y2={18} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    label: 'Long-Lasting Battery',
    color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={36} height={36}>
        <rect x={8} y={13} width={26} height={14} rx={3} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <rect x={34} y={17} width={3} height={6} rx={1.5} stroke={c} strokeWidth={1.2} />
        <rect x={10} y={15} width={18} height={10} rx={2} fill={c} opacity={0.7} />
        <path d="M22 11 L18 20 L22 20 L18 29" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="zd-bolt" />
      </svg>
    ),
  },
  {
    label: '4K Video Recording',
    color: '#f472b6',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={36} height={36}>
        <rect x={4}  y={11} width={22} height={18} rx={3} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M26 17 L36 12 L36 28 L26 23 Z" stroke={c} strokeWidth={1.3} strokeLinejoin="round" />
        <circle cx={15} cy={20} r={3} stroke={c} strokeWidth={1.2} />
        <circle cx={15} cy={20} r={1} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    label: 'Drone Surveillance & Mapping',
    color: '#22d3ee',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={36} height={36}>
        <circle cx={20} cy={18} r={8}  stroke={c} strokeWidth={1.4} />
        <circle cx={20} cy={18} r={3}  fill={c} opacity={0.85} />
        <path d="M20 26 L20 35" stroke={c} strokeWidth={2.5} strokeLinecap="round" />
        <path d="M14 30 L26 30"  stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <path d="M12 12 L8 8"   stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4} />
        <path d="M28 12 L32 8"  stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4} />
        <path d="M12 24 L8 28"  stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4} />
        <path d="M28 24 L32 28" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
]

// ─── Single animated paragraph ────────────────────────────────────────────────
function AnimatedParagraph({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref     = useRef<HTMLParagraphElement>(null)
  const inView  = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.p
      ref={ref}
      className="font-sans text-text-muted leading-relaxed"
      style={{ fontSize: '1.125rem' }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {text}
    </motion.p>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ZD1000Overview() {
  return (
    <SectionWrapper id="overview" className="bg-background">
      {/* Top border line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      {/* Background dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem' }}>Overview</p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            The Future of<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Autonomous Flight
            </span>
          </h2>
          <div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(to right, transparent, #00d4ff, transparent)' }} />
        </FadeIn>

        {/* Two-column: text + safety callout */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 mb-20">
          <div className="space-y-5">
            <AnimatedParagraph
              text="The ZenaDrone 1000 is an advanced unmanned aerial vehicle (UAV) that can lift heavy loads, fly steadily, and move around very well. Built to be one of the best autonomous drones on the market today, it has a long flight time and great long-range performance — making it ideal for military operations, industrial tasks, agricultural surveys, and humanitarian missions."
            />
            <AnimatedParagraph
              delay={0.15}
              text="This high-tech drone leads the way in drone technology advancements, helping businesses and organizations carry out missions with precision and efficiency in drone surveillance and drone mapping. Discover what the ZenaDrone 1000 can do and see what new things you can accomplish with unmanned aerial vehicles and robotic drones."
            />
          </div>

          {/* Safety callout card */}
          <FadeIn delay={0.2} direction="left">
            <div className="relative h-full p-6 rounded-2xl" style={{
              background: 'var(--surface-card-el)',
              border: '1px solid rgba(0,212,255,0.15)',
              backdropFilter: 'blur(20px)',
            }}>
              {/* Glow top-left */}
              <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at top left, rgba(0,212,255,0.12) 0%, transparent 70%)',
              }} />

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{
                  background: 'rgba(0,212,255,0.1)',
                  border: '1px solid rgba(0,212,255,0.25)',
                }}>
                  <svg viewBox="0 0 20 20" fill="none" width={18} height={18}>
                    <path d="M10 2 L16 5 L16 11 C16 14.5 13.2 17.5 10 18.5 C6.8 17.5 4 14.5 4 11 L4 5 Z"
                      stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.08)" />
                    <path d="M7.5 10 L9 11.5 L12.5 8" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-mono font-bold text-primary uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem' }}>Safety First</span>
              </div>

              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.88rem' }}>
                The ZenaDrone 1000 includes a custom power management system, emergency backup, and a parachute for safe landings — delivering reliable, secure performance even in critical scenarios.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {['Power Management', 'Emergency Backup', 'Parachute System'].map(feat => (
                  <span key={feat} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{
                    background: 'rgba(0,212,255,0.07)',
                    border: '1px solid rgba(0,212,255,0.18)',
                    fontSize: '0.8125rem',
                    color: '#00d4ff',
                    fontFamily: 'monospace',
                  }}>
                    <span className="w-1 h-1 rounded-full bg-primary opacity-80" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Total Autonomous Solution header ──────────────────────────────── */}
        <FadeIn className="text-center mb-12">
          <p className="font-mono font-bold uppercase tracking-[0.25em] mb-3" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>Capabilities</p>
          <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Total Autonomous Drone Surveillance,<br className="hidden md:block" /> Inspection, and Monitoring
          </h3>
        </FadeIn>

        {/* Capability cards grid */}
        <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.1}>
          {CAPABILITIES.map(cap => (
            <motion.div
              key={cap.label}
              variants={itemVariants}
              className="group relative p-5 rounded-2xl cursor-default transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `${cap.color}07`,
                border: `1px solid ${cap.color}18`,
              }}
              whileHover={{ borderColor: `${cap.color}40` }}
            >
              {/* Corner glow on hover */}
              <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: `radial-gradient(ellipse at top right, ${cap.color}15 0%, transparent 70%)`,
              }} />

              <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group-hover:scale-110" style={{
                background: `${cap.color}10`,
                border: `1px solid ${cap.color}25`,
              }}>
                {cap.icon(cap.color)}
              </div>

              <p className="font-sans font-medium text-white/80 group-hover:text-white transition-colors duration-200" style={{ fontSize: '0.82rem', lineHeight: 1.35 }}>
                {cap.label}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: `linear-gradient(to right, transparent, ${cap.color}60, transparent)`,
              }} />
            </motion.div>
          ))}
        </StaggerChildren>

        {/* CTA row */}
        <FadeIn className="flex justify-center gap-4 mt-12">
          <a href="/zenadrone-1000#book-demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: '#07070f', fontSize: '0.88rem', boxShadow: '0 0 20px rgba(0,212,255,0.3)' }}>
            Contact Us
          </a>
          <a href="/zenadrone-1000#book-demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
            style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem' }}>
            Book a Service
          </a>
        </FadeIn>
      </Container>

      <style>{`
        .zd-bolt { animation: zdBoltFlash 2s step-end infinite; }
        @keyframes zdBoltFlash { 0%,100%,49%,51% { opacity: 1; } 50% { opacity: 0.2; } }
      `}</style>
    </SectionWrapper>
  )
}
