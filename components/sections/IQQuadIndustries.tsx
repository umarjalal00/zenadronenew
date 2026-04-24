'use client'

import { useRef }            from 'react'
import Image                 from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

// ─── Industry data ────────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    id: 'land-surveys',
    tag: 'Land Surveys',
    tagColor: '#fbbf24',
    title: 'Land Surveys',
    body: 'Acquire comprehensive site data to conceptualize, design, and develop any type of terrain. The IQ Quad delivers survey-grade accuracy for topographic mapping, boundary determination, and volumetric analysis.',
    badges: ['Topographic Mapping', 'Boundary Surveys', 'Site Analysis', 'Geospatial Data'],
    img: '/images/Land-Surveys2.jpeg',
    imgAlt: 'IQ Quad land survey application',
    imgRight: false,
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <path d="M4 24 L10 14 L16 18 L22 10 L28 16" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <line x1={4} y1={28} x2={28} y2={28} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <circle cx={10} cy={14} r={2} fill={c} opacity={0.8} />
        <circle cx={22} cy={10} r={2} fill={c} opacity={0.8} />
      </svg>
    ),
  },
  {
    id: 'construction',
    tag: 'Construction & Earthworks',
    tagColor: '#f97316',
    title: 'Construction &\nEarthworks',
    body: 'Assess site features, including volumetrics, to design and develop landscapes, buildings, and operations. Track earthwork progress, cut/fill volumes, and site compliance with aerial precision.',
    badges: ['Volume Calculations', 'Site Progress', 'Cut & Fill Analysis', 'As-Built Surveys'],
    img: '/images/Construction.png',
    imgAlt: 'IQ Quad construction application',
    imgRight: true,
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <rect x={4} y={18} width={24} height={10} rx={2} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M4 18 L8 10 L16 6 L24 10 L28 18" stroke={c} strokeWidth={1.3} strokeLinejoin="round" />
        <line x1={16} y1={6} x2={16} y2={28} stroke={c} strokeWidth={0.8} opacity={0.4} />
      </svg>
    ),
  },
  {
    id: 'urban-planning',
    tag: 'Urban Planning',
    tagColor: '#a78bfa',
    title: 'Urban Planning',
    body: 'Assess landscape features and usage, infrastructure design and condition, traffic patterns, emergency response plans, pollution levels, and more. Deliver data-driven insights for smart city development.',
    badges: ['Infrastructure Audit', 'Traffic Analysis', 'City Mapping', 'Green Space'],
    img: '/images/Urban.png',
    imgAlt: 'IQ Quad urban planning application',
    imgRight: false,
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <rect x={4} y={14} width={8} height={14} rx={1} stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <rect x={14} y={8} width={8} height={20} rx={1} stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <rect x={22} y={16} width={6} height={12} rx={1} stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <line x1={2} y1={28} x2={30} y2={28} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    id: 'mining',
    tag: 'Mining',
    tagColor: '#34d399',
    title: 'Mining',
    body: 'Explore potential sites, develop mine operations, accurately assess volumetrics, plan drilling and blasting, and identify hazards. Reduce risk and optimize operations with comprehensive aerial data.',
    badges: ['Site Exploration', 'Volume Assessment', 'Hazard Mapping', 'Drill Planning'],
    img: '/images/Mining.jpeg',
    imgAlt: 'IQ Quad mining application',
    imgRight: true,
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <path d="M8 28 L8 18 Q8 10 16 8 Q24 10 24 18 L24 28" stroke={c} strokeWidth={1.4} fill={`${c}08`} strokeLinejoin="round" />
        <path d="M12 20 Q16 15 20 20" stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <circle cx={16} cy={22} r={3} stroke={c} strokeWidth={1.2} />
        <circle cx={16} cy={22} r={1.2} fill={c} opacity={0.8} />
      </svg>
    ),
  },
  {
    id: 'golf-courses',
    tag: 'Golf Courses & Racecourses',
    tagColor: '#00d4ff',
    title: 'Golf Courses &\nRacecourses',
    body: 'Obtain insights into course design and renovations, turf health, water management, and operations. Multispectral sensors reveal subsurface moisture, drainage issues, and vegetation stress.',
    badges: ['Turf Health', 'Water Management', 'Course Design', 'Multispectral'],
    img: '/images/Golf-Courses.jpeg',
    imgAlt: 'IQ Quad golf course application',
    imgRight: false,
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <path d="M4 22 Q8 16 12 18 Q16 20 20 12 Q24 4 28 10" stroke={c} strokeWidth={1.5} strokeLinecap="round" fill="none" />
        <path d="M4 22 Q8 26 12 24 Q16 22 20 20 Q24 18 28 22 L28 28 L4 28 Z" fill={`${c}15`} stroke={c} strokeWidth={0.8} />
        <line x1={16} y1={28} x2={16} y2={12} stroke={c} strokeWidth={0.8} opacity={0.4} strokeDasharray="2 3" />
      </svg>
    ),
  },
]

// ─── Industry card ─────────────────────────────────────────────────────────────
function IndustryCard({ ind }: { ind: typeof INDUSTRIES[0] }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: ind.imgRight ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center"
    >
      {/* Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 self-start" style={{
        background: `${ind.tagColor}0e`, border: `1px solid ${ind.tagColor}28`,
      }}>
        <div className="flex-shrink-0">{ind.icon(ind.tagColor)}</div>
        <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem', color: ind.tagColor }}>{ind.tag}</span>
      </div>

      <h3 className="font-display font-bold text-white mb-5" style={{
        fontSize: 'clamp(1.85rem, 3.7vw, 2.9rem)',
        letterSpacing: '-0.025em', lineHeight: 1.1, whiteSpace: 'pre-line',
      }}>
        {ind.title}
      </h3>

      <p className="font-sans text-text-muted leading-relaxed mb-6" style={{ fontSize: '1.125rem' }}>
        {ind.body}
      </p>

      <div className="flex flex-wrap gap-2">
        {ind.badges.map(b => (
          <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{
            background: `${ind.tagColor}0a`, border: `1px solid ${ind.tagColor}20`,
            fontSize: '1.125rem', color: ind.tagColor, fontFamily: 'monospace',
          }}>
            <span className="w-1 h-1 rounded-full" style={{ background: ind.tagColor, opacity: 0.85 }} />
            {b}
          </span>
        ))}
      </div>
    </motion.div>
  )

  const imgCol = (
    <motion.div
      initial={{ opacity: 0, x: ind.imgRight ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: '16/10', background: 'var(--surface-card-el)', border: `1px solid ${ind.tagColor}18` }}
    >
      <Image src={ind.img} alt={ind.imgAlt} fill className="object-cover" style={{ opacity: 0.85 }} />
      <div className="absolute inset-0" style={{
        background: `linear-gradient(135deg, ${ind.tagColor}15 0%, transparent 60%)`,
      }} />
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
        {[
          { x1: 3, y1: 3, x2: 11, y2: 3 }, { x1: 3, y1: 3, x2: 3, y2: 12 },
          { x1: 97, y1: 3, x2: 89, y2: 3 }, { x1: 97, y1: 3, x2: 97, y2: 12 },
          { x1: 3, y1: 97, x2: 11, y2: 97 }, { x1: 3, y1: 97, x2: 3, y2: 88 },
          { x1: 97, y1: 97, x2: 89, y2: 97 }, { x1: 97, y1: 97, x2: 97, y2: 88 },
        ].map((l, i) => (
          <line key={i} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke={ind.tagColor} strokeWidth="0.9" opacity="0.6" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1.5 rounded-lg" style={{
        background: 'rgba(7,7,15,0.78)', border: `1px solid ${ind.tagColor}22`,
        backdropFilter: 'blur(10px)',
      }}>
        <p className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.8125rem', color: ind.tagColor }}>{ind.tag}</p>
      </div>
    </motion.div>
  )

  return (
    <div ref={ref} id={ind.id} className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
      {ind.imgRight ? <>{textCol}{imgCol}</> : <>{imgCol}{textCol}</>}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQQuadIndustries() {
  return (
    <SectionWrapper id="iq-quad-industries" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <Container>
        <FadeIn className="text-center mb-20">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>
            Ideal Across Industries
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Leading-Edge Survey<br />
            <span style={{ background: 'linear-gradient(135deg, #fbbf24, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Capabilities
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 540, lineHeight: 1.7 }}>
            The IQ Quad&apos;s advanced surveying capabilities are applicable across a wide range of professional industries.
          </p>
          <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(to right, transparent, #fbbf24, transparent)' }} />
        </FadeIn>

        <div className="flex flex-col gap-24">
          {INDUSTRIES.map(ind => (
            <IndustryCard key={ind.id} ind={ind} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
