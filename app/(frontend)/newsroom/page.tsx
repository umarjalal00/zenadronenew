'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header }    from '@/components/layout/Header'
import { Footer }    from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { useGSAP }  from '@/hooks/useGSAP'
import { gsap }     from '@/lib/gsap'

// ─── News Data ────────────────────────────────────────────────────────────────

const FEATURED = {
  id: 'dod-contract-2024',
  category: 'Press Release',
  date: 'Nov 20, 2024',
  title: 'ZenaDrone Inc. Secures Multi-Year Contract with the U.S. Department of Defense for ZD 1000 Fleet Deployment',
  excerpt:
    'ZenaDrone Inc. has been awarded a landmark multi-year procurement contract by the U.S. Department of Defense to supply and support ZD 1000 multi-mission drone platforms across several operational commands, marking a significant milestone in ZenaDrone\'s defense sector expansion.',
  highlights: [
    'Multi-year DoD fleet procurement',
    'ZD 1000 deployed across multiple commands',
    'Full lifecycle maintenance support included',
    'Classified mission capability integration',
  ],
}

const NEWS = [
  {
    id: 'top50-defense-2024',
    category: 'Recognition',
    date: 'Oct 14, 2024',
    title: 'ZenaDrone Inc. Named Among Top 50 Defense Technology Companies of 2024',
    excerpt:
      'Defense Technology Review has recognized ZenaDrone Inc. as one of the top 50 most innovative defense technology companies of 2024, citing the ZD 1000\'s versatile multi-mission architecture and rapid DoD adoption.',
  },
  {
    id: 'iq-nano-launch-2024',
    category: 'Product Launch',
    date: 'Sep 3, 2024',
    title: 'ZenaDrone Unveils the IQ Nano — Portable Tactical Drone for Field Operations',
    excerpt:
      'Announced at AUVSI Xponential, the IQ Nano is ZenaDrone\'s most compact yet capable platform, built for individual operator deployment in confined environments, urban reconnaissance, and rapid-response scenarios.',
  },
  {
    id: 'agritech-partnership-2024',
    category: 'Partnership',
    date: 'Aug 19, 2024',
    title: 'ZenaDrone Partners with Leading AgriTech Firms for Precision Agriculture Solutions',
    excerpt:
      'ZenaDrone Inc. has entered into a strategic partnership with three major agritech corporations to integrate ZD 1000 drone fleets into large-scale crop monitoring, soil analysis, and precision irrigation management programs.',
  },
  {
    id: 'counter-uas-pentagon-2024',
    category: 'Defense',
    date: 'Jul 7, 2024',
    title: 'ZenaDrone Demonstrates Counter-UAS Capabilities at Pentagon Innovation Briefing',
    excerpt:
      'ZenaDrone engineers presented the ZD 1000\'s advanced counter-unmanned aerial systems capabilities to senior Pentagon officials, demonstrating real-time drone interception and electronic countermeasure integration in contested airspace scenarios.',
  },
  {
    id: 'middle-east-expansion-2024',
    category: 'Expansion',
    date: 'May 29, 2024',
    title: 'ZenaDrone Inc. Expands Regional Operations Across the Middle East',
    excerpt:
      'Following successful demonstrations at Dubai Airshow 2023, ZenaDrone has established a regional office and distribution network in the UAE, enabling faster deployment support for government and commercial clients across the Gulf region.',
  },
  {
    id: 'iq-square-surveillance-2024',
    category: 'Case Study',
    date: 'Apr 2, 2024',
    title: 'IQ Square Deployed for Critical Infrastructure Surveillance in National Grid Partnership',
    excerpt:
      'The ZenaDrone IQ Square has been selected by a major national utilities provider for 24/7 perimeter surveillance of high-voltage substations and power corridors, replacing traditional manned patrol operations with autonomous drone monitoring.',
  },
]

const CATEGORIES = ['All', 'Press Release', 'Product Launch', 'Partnership', 'Defense', 'Recognition', 'Expansion', 'Case Study']

// ─── Category badge colors ─────────────────────────────────────────────────────

function CategoryBadge({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
      style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}
    >
      <div className="w-1 h-1 rounded-full" style={{ background: '#00d4ff' }} />
      <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>
        {label}
      </span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewsroomPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo('.nr-hero-badge',  { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 })
    gsap.fromTo('.nr-hero-title',  { y: 44,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.8,  ease: 'power3.out', delay: 0.15 })
    gsap.fromTo('.nr-hero-sub',    { y: 22,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', delay: 0.32 })
    gsap.fromTo('.nr-featured',    { y: 48,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.5  })
    gsap.fromTo('.nr-card',        { y: 40,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out', delay: 0.65 })
  }, { scope: pageRef })

  return (
    <>
      <Header />
      <div ref={pageRef}>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 bg-background overflow-hidden">
          {/* Atmospheric glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 72% 55% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 65%)' }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)',
          }} />

          <Container>
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                className="nr-hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-7"
                style={{ opacity: 0, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'nrBlink 2s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>News Room</span>
              </motion.div>

              {/* Title */}
              <h1
                className="nr-hero-title font-display font-bold text-white mb-5"
                style={{ opacity: 0, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.06 }}
              >
                Latest News &amp; Updates<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.65) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  from ZenaDrone Inc.
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="nr-hero-sub font-sans text-text-muted mx-auto"
                style={{ opacity: 0, fontSize: '1.05rem', maxWidth: 540, lineHeight: 1.75 }}
              >
                Stay informed with the latest press releases, product announcements, partnerships, and defense industry milestones from ZenaDrone Inc.
              </p>
            </div>
          </Container>
        </section>

        {/* ── Featured Article ── */}
        <section className="pb-10 bg-background">
          <Container>
            <div className="max-w-5xl mx-auto">

              {/* Section label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-full" style={{ width: 5, height: 5, background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>Featured Story</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(0,212,255,0.12)' }} />
              </div>

              {/* Featured card */}
              <div
                className="nr-featured rounded-2xl overflow-hidden"
                style={{
                  opacity: 0,
                  background: 'rgba(0,212,255,0.04)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  boxShadow: '0 0 60px rgba(0,212,255,0.05)',
                }}
              >
                <div className="p-8 md:p-10">
                  {/* Top row */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <CategoryBadge label={FEATURED.category} />
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 16 16" fill="none" width={12} height={12}>
                        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#00d4ff" strokeWidth="1.2" opacity="0.55" />
                        <line x1="5" y1="1.5" x2="5" y2="5" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
                        <line x1="11" y1="1.5" x2="11" y2="5" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
                        <line x1="2" y1="7" x2="14" y2="7" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
                      </svg>
                      <span className="font-mono" style={{ fontSize: '0.72rem', color: 'rgba(0,212,255,0.7)' }}>{FEATURED.date}</span>
                    </div>
                  </div>

                  <h2
                    className="font-display font-bold text-white mb-4"
                    style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', letterSpacing: '-0.025em', lineHeight: 1.22 }}
                  >
                    {FEATURED.title}
                  </h2>

                  <p className="font-sans text-text-muted mb-7" style={{ fontSize: '0.95rem', lineHeight: 1.78, maxWidth: 740 }}>
                    {FEATURED.excerpt}
                  </p>

                  {/* Highlights grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {FEATURED.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl"
                        style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)' }}
                      >
                        <svg viewBox="0 0 10 10" fill="none" width={9} height={9} className="flex-shrink-0 mt-0.5">
                          <path d="M1.5 5 L4 7.5 L8.5 2.5" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-sans text-text-muted" style={{ fontSize: '0.76rem', lineHeight: 1.45 }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.03]"
                      style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.83rem', boxShadow: '0 0 20px rgba(0,212,255,0.28)' }}
                    >
                      Contact Media Relations
                      <svg viewBox="0 0 14 14" fill="none" width={12} height={12}><path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                    <span className="font-mono text-text-muted" style={{ fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                      {FEATURED.date} · Official Press Release
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── News Grid ── */}
        <section className="py-12 pb-28 bg-background">
          <Container>
            <div className="max-w-5xl mx-auto">

              {/* Section label + category filter row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-full" style={{ width: 5, height: 5, background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                  <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>Latest Articles</span>
                </div>
                {/* Category pills — decorative, not interactive for now */}
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(0, 5).map((cat, i) => (
                    <div
                      key={cat}
                      className="px-3 py-1 rounded-full font-mono font-medium cursor-default transition-all duration-150"
                      style={{
                        fontSize: '0.62rem',
                        letterSpacing: '0.1em',
                        background: i === 0 ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)',
                        border: i === 0 ? '1px solid rgba(0,212,255,0.28)' : '1px solid rgba(255,255,255,0.08)',
                        color: i === 0 ? '#00d4ff' : 'rgba(255,255,255,0.38)',
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {NEWS.map((article, i) => (
                  <div
                    key={article.id}
                    className="nr-card flex flex-col rounded-2xl overflow-hidden transition-all duration-300 group"
                    style={{
                      opacity: 0,
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(0,212,255,0.1)',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(0,212,255,0.28)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,212,255,0.04)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(0,212,255,0.1)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)' }}
                  >
                    <div className="p-6 flex flex-col flex-1">
                      {/* Top: category + date */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <CategoryBadge label={article.category} />
                        <span className="font-mono" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.32)' }}>{article.date}</span>
                      </div>

                      {/* Title */}
                      <h3
                        className="font-display font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors duration-200"
                        style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.08rem)', letterSpacing: '-0.018em', lineHeight: 1.35 }}
                      >
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="font-sans text-text-muted flex-1" style={{ fontSize: '0.82rem', lineHeight: 1.72 }}>
                        {article.excerpt}
                      </p>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid rgba(0,212,255,0.08)' }}>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 font-sans font-semibold transition-all duration-200 hover:gap-2.5"
                          style={{ fontSize: '0.78rem', color: '#00d4ff' }}
                        >
                          Read More
                          <svg viewBox="0 0 14 14" fill="none" width={11} height={11}>
                            <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                        <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 12 12" fill="none" width={10} height={10}>
                            <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                            <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" />
                            <line x1="6" y1="6.5" x2="8" y2="7.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                          <span className="font-mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)' }}>ZenaDrone Press</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Press Contact CTA ── */}
              <div
                className="mt-14 rounded-2xl p-8 md:p-10 text-center"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
                    style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'nrBlink 2s ease-in-out infinite' }} />
                    <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.68rem', color: '#00d4ff' }}>Media Inquiries</span>
                  </div>

                  <h3
                    className="font-display font-bold text-white mb-3"
                    style={{ fontSize: 'clamp(1.3rem, 2.6vw, 2rem)', letterSpacing: '-0.022em' }}
                  >
                    Press &amp; Media Contact
                  </h3>

                  <p className="font-sans text-text-muted mb-7 mx-auto" style={{ fontSize: '0.95rem', maxWidth: 480, lineHeight: 1.75 }}>
                    For press inquiries, interview requests, or to receive ZenaDrone media assets and official statements, reach out to our communications team.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                      style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.9rem', boxShadow: '0 0 26px rgba(0,212,255,0.28)' }}
                    >
                      Contact Press Team
                      <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                    <a
                      href="mailto:press@zenadrone.com"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-sans font-medium transition-all duration-200 hover:text-white"
                      style={{ fontSize: '0.88rem', color: 'rgba(0,212,255,0.75)', border: '1px solid rgba(0,212,255,0.18)' }}
                    >
                      <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                        <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M2 6 L8 10 L14 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      press@zenadrone.com
                    </a>
                  </div>
                </motion.div>
              </div>

            </div>
          </Container>
        </section>

      </div>
      <Footer />

      <style>{`
        @keyframes nrBlink { 0%,100%{opacity:.28;}50%{opacity:1;} }
      `}</style>
    </>
  )
}
