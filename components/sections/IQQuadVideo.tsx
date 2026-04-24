'use client'

import { useRef, useState }  from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQQuadVideo() {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, amount: 0.2 })
  const [loaded, setLoaded] = useState(false)

  return (
    <SectionWrapper id="iq-quad-video" className="bg-background" padding="md">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.2) 30%, rgba(251,191,36,0.3) 50%, rgba(251,191,36,0.2) 70%, transparent)',
        boxShadow: '0 0 10px rgba(251,191,36,0.1)',
      }} />

      {/* Background radial */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(251,191,36,0.04) 0%, transparent 70%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-10">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>
            Get a Sharper Perspective
          </p>
          <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Take to the Skies with the<br />
            <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Next-Generation IQ Quad
            </span>
          </h2>
          <div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(to right, transparent, #fbbf24, transparent)' }} />
        </FadeIn>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
          style={{ maxWidth: 860 }}
        >
          {/* Outer glow frame */}
          <div className="absolute -inset-px rounded-2xl pointer-events-none z-10" style={{
            boxShadow: '0 0 0 1px rgba(251,191,36,0.18), 0 0 40px rgba(251,191,36,0.08)',
          }} />

          {/* Corner brackets */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
            {[
              { x1: 2, y1: 2, x2: 9, y2: 2 }, { x1: 2, y1: 2, x2: 2, y2: 10 },
              { x1: 98, y1: 2, x2: 91, y2: 2 }, { x1: 98, y1: 2, x2: 98, y2: 10 },
              { x1: 2, y1: 98, x2: 9, y2: 98 }, { x1: 2, y1: 98, x2: 2, y2: 90 },
              { x1: 98, y1: 98, x2: 91, y2: 98 }, { x1: 98, y1: 98, x2: 98, y2: 90 },
            ].map((l, i) => (
              <line key={i} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
                stroke="#fbbf24" strokeWidth="1.2" opacity="0.65" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>

          {/* Video embed */}
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9', background: '#07070f' }}>
            {/* Loading shimmer */}
            {!loaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(251,191,36,0.05) 0%, rgba(7,7,15,0.9) 100%)',
              }}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'rgba(251,191,36,0.5)', borderTopColor: 'transparent' }} />
                  <span className="font-mono text-text-muted uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem' }}>Loading</span>
                </div>
              </div>
            )}
            <iframe
              src="https://www.youtube.com/embed/SyHqsujhNwA?rel=0&modestbranding=1&color=white"
              title="ZenaDrone IQ Quad — Survey Drone Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
              onLoad={() => setLoaded(true)}
            />
          </div>

          {/* Bottom label strip */}
          <div className="mt-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#fbbf24', animation: 'iqqVideoBlink 2s ease-in-out infinite' }} />
              <span className="font-mono text-text-muted uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem' }}>ZenaDrone IQ Quad — Survey Demo</span>
            </div>
            <span className="font-mono text-text-muted" style={{ fontSize: '0.8125rem' }}>HD · 4K Drone Footage</span>
          </div>
        </motion.div>
      </Container>

      <style>{`
        @keyframes iqqVideoBlink { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </SectionWrapper>
  )
}
