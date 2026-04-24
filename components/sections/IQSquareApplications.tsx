'use client'

import { useRef }            from 'react'
import Image                 from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

// ─── Application data ─────────────────────────────────────────────────────────
const APPS = [
  {
    id: 'inspections',
    tag: 'Commercial Inspections',
    tagColor: '#00d4ff',
    title: 'IQ Square for\nCommercial Inspections',
    body: 'Conduct inspections of power lines, oil and gas facilities, construction sites and other outdoor company assets or storage facilities, for a variety of monitoring and security applications. The IQ Square is designed for these applications to improve the regular flow and quality of information for decision making, enabling companies to save on manual inspection costs while reducing safety infractions.',
    img: '/images/sequre.jpeg',
    imgAlt: 'IQ Square commercial inspection',
    badges: ['Power Lines', 'Oil & Gas', 'Construction Sites', 'Storage Facilities'],
    imgRight: false,
  },
  {
    id: 'land-surveys',
    tag: 'Land Surveys',
    tagColor: '#a78bfa',
    title: 'IQ Square for\nLand Surveys',
    body: 'For line-of-site land surveys, the IQ Square can revolutionize the precision and speed of collection, calculation and plotting of land survey data versus legacy methods including use of Total Stations. ZenaDrone teams are currently working on perfecting solutions including data analysis for conducting comprehensive land surveys using the IQ Square.',
    img: '/images/Land-Surveys.jpeg',
    imgAlt: 'IQ Square land survey',
    badges: ['Precision Mapping', 'Data Analysis', 'Survey Plotting', 'vs Total Stations'],
    imgRight: true,
  },
  {
    id: 'power-washing',
    tag: 'Power Washing',
    tagColor: '#34d399',
    title: 'IQ Square for\nPower Washing',
    body: 'For larger-scale cleaning jobs such as stadium seating, building exteriors, and public spaces; drones eliminate the need for scaffolding, lifts, or manual labor by providing a more efficient, safe, and cost-effective solution. Tethered to a ground-based water and a power source, the IQ Square is designed to be equipped with a power wash system for these applications.',
    img: '/images/Power-Washing.jpeg',
    imgAlt: 'IQ Square power washing application',
    badges: ['Stadium Seating', 'Building Exteriors', 'No Scaffolding', 'Tethered System'],
    imgRight: false,
  },
]

// ─── Application card ─────────────────────────────────────────────────────────
function AppCard({ app }: { app: typeof APPS[0] }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: app.imgRight ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center"
    >
      {/* Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 self-start" style={{
        background: `${app.tagColor}0e`,
        border: `1px solid ${app.tagColor}28`,
      }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: app.tagColor, boxShadow: `0 0 6px ${app.tagColor}` }} />
        <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem', color: app.tagColor }}>{app.tag}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-white mb-5" style={{
        fontSize: 'clamp(1.85rem, 3.7vw, 2.9rem)',
        letterSpacing: '-0.025em',
        lineHeight: 1.1,
        whiteSpace: 'pre-line',
      }}>
        {app.title}
      </h3>

      {/* Body */}
      <p className="font-sans text-text-muted leading-relaxed mb-6" style={{ fontSize: '1.125rem' }}>
        {app.body}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {app.badges.map(b => (
          <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{
            background: `${app.tagColor}0a`,
            border: `1px solid ${app.tagColor}20`,
            fontSize: '1.125rem',
            color: app.tagColor,
            fontFamily: 'monospace',
          }}>
            <span className="w-1 h-1 rounded-full" style={{ background: app.tagColor, opacity: 0.85 }} />
            {b}
          </span>
        ))}
      </div>
    </motion.div>
  )

  const imgCol = (
    <motion.div
      initial={{ opacity: 0, x: app.imgRight ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: '16/10', background: 'var(--surface-card-el)', border: `1px solid ${app.tagColor}18` }}
    >
      <Image
        src={app.img}
        alt={app.imgAlt}
        fill
        className="object-cover"
        style={{ opacity: 0.85 }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(135deg, ${app.tagColor}15 0%, transparent 60%)`,
      }} />

      {/* Corner brackets */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
        {[
          { x1: 3, y1: 3, x2: 11, y2: 3 }, { x1: 3, y1: 3, x2: 3, y2: 12 },
          { x1: 97, y1: 3, x2: 89, y2: 3 }, { x1: 97, y1: 3, x2: 97, y2: 12 },
          { x1: 3, y1: 97, x2: 11, y2: 97 }, { x1: 3, y1: 97, x2: 3, y2: 88 },
          { x1: 97, y1: 97, x2: 89, y2: 97 }, { x1: 97, y1: 97, x2: 97, y2: 88 },
        ].map((l, i) => (
          <line key={i} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke={app.tagColor} strokeWidth="0.9" opacity="0.6" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      {/* Bottom label */}
      <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1.5 rounded-lg" style={{
        background: 'rgba(7,7,15,0.78)',
        border: `1px solid ${app.tagColor}22`,
        backdropFilter: 'blur(10px)',
      }}>
        <p className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.8125rem', color: app.tagColor }}>{app.tag}</p>
      </div>
    </motion.div>
  )

  return (
    <div ref={ref} id={app.id} className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
      {app.imgRight ? (
        <>
          {textCol}
          {imgCol}
        </>
      ) : (
        <>
          {imgCol}
          {textCol}
        </>
      )}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQSquareApplications() {
  return (
    <SectionWrapper id="iq-square-applications" className="bg-background">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
      }} />

      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <Container>
        <FadeIn className="text-center mb-20">
          <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem' }}>Applications</p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Commercial Use{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Cases
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 540, lineHeight: 1.7 }}>
            The IQ Square is designed for numerous outdoor commercial applications, delivering precision, efficiency, and cost savings across industries.
          </p>
          <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(to right, transparent, #00d4ff, transparent)' }} />
        </FadeIn>

        <div className="flex flex-col gap-24">
          {APPS.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
