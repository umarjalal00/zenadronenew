'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const USE_CASES = [
  { title: 'Asset Documentation',  desc: 'Clear visual capture of buildings, facilities, and infrastructure with precise geo-tagging.' },
  { title: 'Progress Tracking',    desc: 'Monitor changes over time using consistent drone data and automated comparison reports.' },
  { title: 'Marketing Materials',  desc: 'High-quality visual elements that highlight properties and projects for stakeholders.' },
  { title: 'Insurance Documentation', desc: 'Reliable visual evidence to support claims and risk assessments with timestamped data.' },
  { title: 'Site Planning',        desc: 'Complete drone data analysis for future development planning and volumetric measurements.' },
]

const TECH_SPECS = [
  { label: '4K/8K Cameras',       color: '#00d4ff', desc: 'Ultra-high-definition for precise drone data capture' },
  { label: 'Stable Flight Control', color: '#a78bfa', desc: 'Ensures consistent data collection performance' },
  { label: 'Advanced Stabilization', color: '#34d399', desc: 'Improves clarity in aerial data collection' },
  { label: 'Multiple Lens Options',  color: '#fbbf24', desc: 'Supports detailed drone data analysis' },
  { label: 'Pro Processing Suite',   color: '#f472b6', desc: 'Improves overall output quality' },
  { label: 'Secure Delivery System', color: '#00d4ff', desc: 'Safe drone data management and delivery' },
]

export function EDCAerial() {
  return (
    <SectionWrapper id="aerial" className="bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <Container>

        {/* Header */}
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem' }}>
            Aerial Photography Services
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            High-Quality{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Aerial Data Collection
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 580, lineHeight: 1.7 }}>
            ZenaDrone delivers clear, detailed views of your site, project, or property. Drone imagery enables accurate aerial data collection and analysis, improving planning, monitoring, and reporting.
          </p>
        </FadeIn>

        {/* Two-column: image + use cases */}
        <div className="grid lg:grid-cols-2 gap-14 items-start mb-20">

          {/* Image */}
          <FadeIn direction="right">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/images/ZenaDrone-1000.webp"
                alt="Aerial photography and data collection services"
                fill
                className="object-cover"
              />

              {/* Grid overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />

              {/* Corner badge */}
              <div className="absolute bottom-5 left-5 px-4 py-3 rounded-xl" style={{
                background: 'rgba(7,7,15,0.88)', border: '1px solid rgba(0,212,255,0.25)', backdropFilter: 'blur(14px)',
              }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: 'edcaGlow 1.8s ease-in-out infinite' }} />
                  <span className="font-mono text-primary font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.68rem' }}>Aerial Survey</span>
                </div>
                <div className="font-mono text-text-muted" style={{ fontSize: '0.65rem' }}>4K · LiDAR · Thermal · GPS</div>
              </div>

              {/* Top-right resolution badge */}
              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-lg" style={{
                background: 'rgba(7,7,15,0.85)', border: '1px solid rgba(167,139,250,0.3)', backdropFilter: 'blur(12px)',
              }}>
                <span className="font-mono font-bold" style={{ fontSize: '0.68rem', color: '#a78bfa' }}>4K / 8K UHD</span>
              </div>
            </div>
          </FadeIn>

          {/* Use cases */}
          <div>
            <FadeIn delay={0.1}>
              <p className="font-mono font-bold uppercase tracking-[0.2em] mb-5" style={{ fontSize: '0.75rem', color: '#a78bfa' }}>
                Service Applications
              </p>
            </FadeIn>
            <StaggerChildren staggerDelay={0.08} className="flex flex-col gap-3">
              {USE_CASES.map((uc, i) => (
                <motion.div
                  key={uc.title}
                  variants={itemVariants}
                  className="flex gap-4 p-4 rounded-xl group transition-all duration-200 hover:bg-white/[0.03]"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{
                      background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
                    }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-200" style={{ fontSize: '0.9rem' }}>
                      {uc.title}
                    </h4>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.825rem', lineHeight: 1.6 }}>
                      {uc.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>

        {/* Technical Excellence */}
        <FadeIn>
          <div className="relative rounded-2xl p-8 md:p-10" style={{
            background: 'var(--surface-elevated)',
            border: '1px solid rgba(0,212,255,0.12)',
            boxShadow: '0 0 60px rgba(0,212,255,0.06)',
          }}>
            <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at top left, rgba(0,212,255,0.08) 0%, transparent 70%)',
            }} />
            <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(167,139,250,0.07) 0%, transparent 70%)',
            }} />

            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.4), transparent)' }} />
              <p className="font-mono font-bold text-primary uppercase tracking-[0.25em]" style={{ fontSize: '0.75rem' }}>
                Technical Excellence
              </p>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(0,212,255,0.4), transparent)' }} />
            </div>
            <p className="font-sans text-text-muted text-center mb-8" style={{ fontSize: '1rem' }}>
              Our aerial data collection systems are built for accuracy, reliability, and performance.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TECH_SPECS.map((spec) => (
                <div key={spec.label} className="flex items-start gap-3 p-3.5 rounded-xl" style={{
                  background: `${spec.color}07`,
                  border: `1px solid ${spec.color}1a`,
                }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: spec.color, boxShadow: `0 0 8px ${spec.color}` }} />
                  <div>
                    <div className="font-sans font-semibold text-white mb-0.5" style={{ fontSize: '1rem' }}>{spec.label}</div>
                    <div className="font-sans text-text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.55 }}>{spec.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>

      <style>{`
        @keyframes edcaGlow { 0%,100% { opacity:.4; } 50% { opacity:1; } }
      `}</style>
    </SectionWrapper>
  )
}
