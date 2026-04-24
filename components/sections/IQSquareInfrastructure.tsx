'use client'

import { useRef }            from 'react'
import Image                 from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

// ─── Shared animated paragraph ────────────────────────────────────────────────
function Para({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref    = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <motion.p
      ref={ref}
      className="font-sans text-text-muted leading-relaxed"
      style={{ fontSize: '1.125rem' }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {text}
    </motion.p>
  )
}

// ─── Image card with HUD overlay ─────────────────────────────────────────────
function HudImageCard({
  src, alt, borderColor, label, sub, hudItems, flip,
}: {
  src: string; alt: string; borderColor: string; label: string; sub: string;
  hudItems: { key: string; val: string }[]; flip?: boolean
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: flip ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: '16/10', background: 'var(--surface-card-el)', border: `1px solid ${borderColor}1a` }}
    >
      <Image src={src} alt={alt} fill className="object-cover" style={{ opacity: 0.82 }} />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(135deg, ${borderColor}14 0%, transparent 60%)`,
      }} />
      {/* Brackets */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
        {[
          { x1: 3, y1: 3, x2: 11, y2: 3 }, { x1: 3, y1: 3, x2: 3, y2: 12 },
          { x1: 97, y1: 3, x2: 89, y2: 3 }, { x1: 97, y1: 3, x2: 97, y2: 12 },
          { x1: 3, y1: 97, x2: 11, y2: 97 }, { x1: 3, y1: 97, x2: 3, y2: 88 },
          { x1: 97, y1: 97, x2: 89, y2: 97 }, { x1: 97, y1: 97, x2: 97, y2: 88 },
        ].map((l, i) => (
          <line key={i} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke={borderColor} strokeWidth="0.9" opacity="0.55" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {/* Bottom HUD */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-end justify-between gap-3">
        <div className="px-3 py-2 rounded-xl" style={{
          background: 'rgba(7,7,15,0.8)',
          border: `1px solid ${borderColor}22`,
          backdropFilter: 'blur(12px)',
        }}>
          <p className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.8125rem', color: borderColor }}>{label}</p>
          <p className="font-mono text-text-muted" style={{ fontSize: '0.48rem' }}>{sub}</p>
        </div>
        <div className="px-3 py-2 rounded-xl" style={{
          background: 'rgba(7,7,15,0.8)',
          border: `1px solid ${borderColor}22`,
          backdropFilter: 'blur(12px)',
        }}>
          {hudItems.map(h => (
            <div key={h.key} className="font-mono" style={{ fontSize: '0.8125rem', color: borderColor }}>
              {h.key}: <span className="text-white">{h.val}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQSquareInfrastructure() {
  const infraRef   = useRef<HTMLDivElement>(null)
  const constructRef = useRef<HTMLDivElement>(null)
  const infraView  = useInView(infraRef,   { once: true, amount: 0.12 })
  const consView   = useInView(constructRef, { once: true, amount: 0.12 })

  return (
    <SectionWrapper id="iq-square-infrastructure" className="bg-background">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
      }} />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <Container>
        <FadeIn className="text-center mb-20">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#34d399' }}>Infrastructure & Construction</p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Autonomous Intelligence<br />
            <span style={{ background: 'linear-gradient(135deg, #34d399, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              for Your Operations
            </span>
          </h2>
          <div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(to right, transparent, #34d399, transparent)' }} />
        </FadeIn>

        {/* ── Infrastructure Inspections ──────────────────────────────────────── */}
        <div ref={infraRef} className="grid lg:grid-cols-2 gap-12 items-center mb-24">

          <HudImageCard
            src="/images/zenadrone-iq-square.jpeg"
            alt="IQ Square infrastructure inspection"
            borderColor="#34d399"
            label="Infrastructure Inspection"
            sub="Autonomous · Real-time"
            hudItems={[
              { key: 'MODE', val: 'AUTO-INSPECT' },
              { key: 'DATA', val: 'STREAMING' },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={infraView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full self-start" style={{
              background: 'rgba(52,211,153,0.1)',
              border: '1px solid rgba(52,211,153,0.28)',
            }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'iqs-inf-blink 2s ease-in-out infinite' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem', color: '#34d399' }}>IQ Square & Infrastructure</span>
            </div>

            <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.65rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              IQ Square &amp;<br />Infrastructure Inspections
            </h3>

            <Para text="Autonomous flight with the ZenaDrone IQ Square can provide real time information to your facility managers to ensure that your industrial equipment isn't getting damaged. This helps to boost efficiency and accuracy while saving on manual inspection costs." />
            <Para delay={0.12} text="The ZenaDrone IQ Square's advanced technology ensures precise data gathering and recording through automation. The IQ drone is also designed for maneuvering in tight spaces, making it the ideal choice for indoor/outdoor evaluations in the oil and gas sector among others." />

            {/* Benefits grid */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { label: 'Real-time Data', color: '#34d399' },
                { label: 'Cost Reduction',  color: '#00d4ff' },
                { label: 'Tight Spaces',    color: '#fbbf24' },
                { label: 'Oil & Gas Ready', color: '#a78bfa' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{
                  background: `${b.color}08`,
                  border: `1px solid ${b.color}20`,
                }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: b.color, opacity: 0.85 }} />
                  <span className="font-mono text-text-muted" style={{ fontSize: '0.8125rem' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Construction Reports ───────────────────────────────────────────── */}
        <div ref={constructRef} className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={consView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full self-start" style={{
              background: 'rgba(251,191,36,0.1)',
              border: '1px solid rgba(251,191,36,0.28)',
            }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#fbbf24', boxShadow: '0 0 6px #fbbf24', animation: 'iqs-inf-blink 2s ease-in-out infinite 0.5s' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>IQ Square & Construction</span>
            </div>

            <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.65rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              IQ Square &amp;<br />Construction Reports
            </h3>

            <Para text="The ZenaDrone IQ Square's autonomous flight and real time image capturing make it ideal for helping you capture the latest information for your construction reports. Explore your build sites from an aerial perspective and capture relevant photos and videos to make your life easier." />
            <Para delay={0.12} text="Its lightweight, carbon-fiber body ensures durability and portability, making it your go-to autonomous drone solution in the construction industry. See firsthand the autonomous indoor/outdoor flight of the ZenaDrone IQ Square. Its intuitive controls and compact size ensure smooth navigation, making it ideal for use in any scenario." />

            {/* Benefits grid */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { label: 'Aerial Photos',    color: '#fbbf24' },
                { label: 'Video Capture',    color: '#f472b6' },
                { label: 'Carbon-Fiber Body', color: '#34d399' },
                { label: 'Indoor / Outdoor', color: '#00d4ff' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{
                  background: `${b.color}08`,
                  border: `1px solid ${b.color}20`,
                }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: b.color, opacity: 0.85 }} />
                  <span className="font-mono text-text-muted" style={{ fontSize: '0.8125rem' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <HudImageCard
            src="/images/IQ-Nano.png"
            alt="IQ Square construction site reporting"
            borderColor="#fbbf24"
            label="Construction Reports"
            sub="Autonomous · Aerial Capture"
            hudItems={[
              { key: 'CAM', val: '4K ACTIVE' },
              { key: 'REC', val: 'STREAMING' },
            ]}
            flip
          />
        </div>
      </Container>

      <style>{`
        @keyframes iqs-inf-blink { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </SectionWrapper>
  )
}
