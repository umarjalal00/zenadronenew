'use client'

import { useRef } from 'react'
import Link  from 'next/link'
import { motion } from 'framer-motion'
import { Header }    from '@/components/layout/Header'
import { Footer }    from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { useGSAP }  from '@/hooks/useGSAP'
import { gsap }     from '@/lib/gsap'

const EVENTS = [
  {
    id: 'fidae-2024',
    tag: 'Aerospace & Defense',
    title: 'ZD 1000 Team Joins the Annual 23rd FIDAE',
    dates: 'Apr 9 – 12, 2024',
    location: 'Santiago, Chile',
    status: 'Past Event',
    desc: 'FIDAE is the leading exhibition in Latin America for aerospace, defense, and security. The worldwide recognized event had activities such as conferences, business rounds, and flying displays — bringing together industry leaders, government officials, and innovators from across the globe. The ZenaDrone 1000 team attended to present its multi-mission drone capabilities and explore partnerships across the Latin American defense and security markets.',
    highlights: ['Live drone demonstrations', 'Latin America defense networking', 'B2B partnership meetings', 'Aerospace innovation showcases'],
  },
  {
    id: 'dubai-airshow-2023',
    tag: 'International Airshow',
    title: 'Dubai Airshow 2023: ZenaDrone Inc. to Showcase ZD 1000 Innovative Drone Technologies at the 18th Dubai Airshow',
    dates: 'Nov 13 – 17, 2023',
    location: 'Dubai, UAE',
    status: 'Past Event',
    desc: 'ZenaDrone, a leading innovator in drone technology and the defense sector, showcased its advanced capabilities in a setting that fosters networking with global defense contractors, government agencies, and aerospace pioneers. The 18th Dubai Airshow is one of the world\'s premier air events, drawing over 100,000 visitors and 1,400+ exhibitors. ZenaDrone Inc. presented the ZD 1000 platform\'s multi-mission capabilities, including surveillance, data collection, and precision payload delivery.',
    highlights: ['ZD 1000 live technology showcase', 'Global defense sector engagement', '1,400+ exhibitors present', 'Government agency meetings'],
  },
  {
    id: 'thunderstorm-2023',
    tag: 'Defense Procurement',
    title: 'ZenaDrone Secures Coveted Invite to Bid at Defense Department\'s Thunderstorm 23-5 Event',
    dates: 'Oct 23 – 27, 2023',
    location: 'Red Springs, NC',
    status: 'Past Event',
    desc: 'ZenaDrone Inc., a pioneer in drone technology and logistical solutions, received an official invitation to take part in the Defense Department\'s highly selective Thunderstorm 23-5 procurement event. The invitation reflects ZenaDrone\'s growing recognition as a trusted, capable partner in the US defense supply chain. The event brought together vetted defense contractors to demonstrate solutions for military logistics, surveillance, and tactical support missions.',
    highlights: ['DoD official procurement event', 'Selective vendor invitation', 'Military logistics demonstration', 'Tactical UAV evaluation'],
  },
]

export default function EventsPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo('.ev-hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 })
    gsap.fromTo('.ev-hero-sub',   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', delay: 0.3 })
    gsap.fromTo('.ev-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.5 })
  }, { scope: pageRef })

  return (
    <>
      <Header />
      <div ref={pageRef}>

        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-background overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)',
          }} />
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'evBlink 2s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Events</span>
              </motion.div>
              <h1 className="ev-hero-title font-display font-bold text-white mb-5"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05, opacity: 0 }}>
                ZenaDrone at Global<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Defense &amp; Aerospace Events
                </span>
              </h1>
              <p className="ev-hero-sub font-sans text-text-muted mx-auto"
                style={{ fontSize: '1.05rem', maxWidth: 520, lineHeight: 1.75, opacity: 0 }}>
                From Latin America to the Middle East, ZenaDrone is actively engaging with governments, defense agencies, and aerospace leaders worldwide — demonstrating the ZD 1000 on the global stage.
              </p>
            </div>
          </Container>
        </section>

        {/* Events list */}
        <section className="py-16 pb-28 bg-background">
          <Container>
            <div className="flex flex-col gap-10 max-w-5xl mx-auto">
              {EVENTS.map((ev, i) => (
                <div key={ev.id} className="ev-card rounded-2xl overflow-hidden"
                  style={{ opacity: 0, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(0,212,255,0.12)' }}>

                    {/* Content */}
                    <div className="p-7 flex flex-col justify-between gap-5">
                      <div>
                        {/* Tag + Status row */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                            style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.16)' }}>
                            <div className="w-1 h-1 rounded-full" style={{ background: '#00d4ff' }} />
                            <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>{ev.tag}</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.35)' }} />
                            <span className="font-mono uppercase tracking-[0.16em]" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)' }}>{ev.status}</span>
                          </div>
                        </div>

                        <h2 className="font-display font-bold text-white mb-4"
                          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                          {ev.title}
                        </h2>

                        {/* Date + Location */}
                        <div className="flex flex-wrap items-center gap-4 mb-5">
                          <div className="flex items-center gap-2">
                            <svg viewBox="0 0 16 16" fill="none" width={13} height={13}>
                              <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#00d4ff" strokeWidth="1.2" opacity="0.6" />
                              <line x1="5" y1="1.5" x2="5" y2="5" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                              <line x1="11" y1="1.5" x2="11" y2="5" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                              <line x1="2" y1="7" x2="14" y2="7" stroke="#00d4ff" strokeWidth="1" opacity="0.35" />
                            </svg>
                            <span className="font-mono text-text-muted" style={{ fontSize: '0.78rem', color: 'rgba(0,212,255,0.75)' }}>{ev.dates}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg viewBox="0 0 16 16" fill="none" width={13} height={13}>
                              <circle cx="8" cy="7" r="3" stroke="#00d4ff" strokeWidth="1.2" opacity="0.6" />
                              <path d="M8 2 C5.2 2 3 4.2 3 7 C3 10.5 8 14.5 8 14.5 C8 14.5 13 10.5 13 7 C13 4.2 10.8 2 8 2Z" stroke="#00d4ff" strokeWidth="1.2" opacity="0.6" />
                            </svg>
                            <span className="font-mono text-text-muted" style={{ fontSize: '0.78rem' }}>{ev.location}</span>
                          </div>
                        </div>

                        <p className="font-sans text-text-muted mb-5" style={{ fontSize: '0.88rem', lineHeight: 1.75 }}>
                          {ev.desc}
                        </p>

                        {/* Highlights */}
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                          {ev.highlights.map((h, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <svg viewBox="0 0 10 10" fill="none" width={8} height={8} className="flex-shrink-0">
                                <path d="M1.5 5 L4 7.5 L8.5 2.5" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="font-sans text-text-muted" style={{ fontSize: '0.78rem' }}>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(0,212,255,0.08)' }}>
                        <Link href="/contact"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.03]"
                          style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.82rem', boxShadow: '0 0 20px rgba(0,212,255,0.25)' }}>
                          Contact Us
                          <svg viewBox="0 0 14 14" fill="none" width={12} height={12}><path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </Link>
                        <span className="font-mono text-text-muted" style={{ fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                          {ev.dates} · {ev.location}
                        </span>
                      </div>
                    </div>
                </div>
              ))}
            </div>

            {/* Stay updated CTA */}
            <div className="max-w-5xl mx-auto mt-14 rounded-2xl p-8 text-center"
              style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.14)' }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'evBlink 2s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.68rem', color: '#00d4ff' }}>Stay Updated</span>
              </div>
              <h3 className="font-display font-bold text-white mb-3"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', letterSpacing: '-0.02em' }}>
                Want to Meet ZenaDrone at the Next Event?
              </h3>
              <p className="font-sans text-text-muted mb-6 mx-auto" style={{ fontSize: '0.95rem', maxWidth: 460, lineHeight: 1.72 }}>
                Get in touch to schedule a meeting at upcoming defense and aerospace exhibitions, or book a private ZenaDrone 1000 demonstration.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.9rem', boxShadow: '0 0 26px rgba(0,212,255,0.28)' }}>
                Get in Touch
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </Container>
        </section>

      </div>
      <Footer />
      <style>{`
        @keyframes evBlink { 0%,100%{opacity:.28;}50%{opacity:1;} }
      `}</style>
    </>
  )
}
