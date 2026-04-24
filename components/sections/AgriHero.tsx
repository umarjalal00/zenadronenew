'use client'

import { useRef } from 'react'
import Image      from 'next/image'
import Link       from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const STATS = [
  { end: 60, suffix: '%', u: 'TIME SAVED' },
  { end: 3,  suffix: '×', u: 'FASTER SCOUTING' },
  { end: 40, suffix: '%', u: 'COST REDUCTION' },
]

export function AgriHero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.12 })
    tl.fromTo('.agri-word',
      { y: 90, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.95, ease: 'power4.out', stagger: 0.07 }
    )
    tl.fromTo('.agri-sub',  { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.68, ease: 'power3.out' }, '-=0.52')
    tl.fromTo('.agri-stat', { y: 20, opacity: 0, scale: 0.88 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 }, '-=0.42')
    tl.fromTo('.agri-cta',  { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5,  ease: 'power3.out', stagger: 0.1 }, '-=0.35')
    tl.fromTo('.agri-img',  { x: 55, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' }, '-=1.25')

    // Count-up on stats after they animate in
    STATS.forEach(({ end, suffix }, i) => {
      const el = counterRefs.current[i]
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration: 1.6,
        ease: 'power2.out',
        delay: 1.1 + i * 0.15,
        onUpdate() { el.textContent = Math.round(obj.val) + suffix },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-background" style={{ paddingTop: 68 }}>

      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 55% at 72% 46%, rgba(0,212,255,0.07) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 45% at 20% 70%, rgba(0,212,255,0.04) 0%, transparent 55%)' }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 88% 82% at 50% 50%, black 25%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 88% 82% at 50% 50%, black 25%, transparent 100%)',
      }} />

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 xl:gap-20 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* Left */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-7"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'agriBlink 2s ease-in-out infinite' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Agriculture & Farm Plantations</span>
            </motion.div>

            <h1 className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 0.96, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="agri-word inline-block" style={{ opacity: 0 }}>Agriculture</span>
              </span>
              <span className="block overflow-hidden">
                <span className="agri-word inline-block" style={{ opacity: 0 }}>
                  <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Drone</span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="agri-word inline-block" style={{ opacity: 0 }}>Technology</span>
              </span>
            </h1>

            <p className="agri-sub font-sans text-text-muted leading-relaxed mb-9"
              style={{ fontSize: '1.1rem', maxWidth: 490, opacity: 0, lineHeight: 1.72 }}
            >
              Modern technology is revolutionizing the way farming is practiced today. A UAV drone for farming helps you save time, reduce costs, and achieve healthier, higher-yield crops with real-time aerial intelligence.
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-4 mb-9" style={{ borderTop: '1px solid rgba(0,212,255,0.12)', paddingTop: '1.2rem' }}>
              {STATS.map((s, i) => (
                <div key={s.u} className="agri-stat flex flex-col gap-1" style={{ opacity: 0 }}>
                  <span className="font-display font-bold" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#00d4ff', lineHeight: 1, letterSpacing: '-0.035em' }}>
                    <span ref={el => { counterRefs.current[i] = el }}>0{s.suffix}</span>
                  </span>
                  <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.6rem', lineHeight: 1.4 }}>{s.u}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="#book-demo"
                className="agri-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', boxShadow: '0 0 26px rgba(0,212,255,0.35), 0 4px 18px rgba(0,212,255,0.18)', color: '#07070f', fontSize: '0.9rem', opacity: 0 }}
              >
                Contact Us
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="#book-demo"
                className="agri-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.11)', fontSize: '0.9rem', opacity: 0 }}
              >
                Book A Service
              </Link>
            </div>
          </div>

          {/* Right: Single image */}
          <div className="agri-img relative" style={{ opacity: 0 }}>
            <div className="absolute -inset-6 rounded-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 68%)', filter: 'blur(28px)', zIndex: 0 }} />
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', zIndex: 1 }}>
              <Image
                src="/images/ZenaDrone-1000.webp"
                alt="ZenaDrone 1000 — agricultural drone technology"
                fill
                className="object-cover"
                style={{ filter: 'brightness(0.72) saturate(1.05)' }}
                priority
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, rgba(7,7,15,0.4) 0%, rgba(7,7,15,0.12) 55%, rgba(0,212,255,0.06) 100%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl" style={{ background: 'rgba(7,7,15,0.82)', border: '1px solid rgba(0,212,255,0.22)', backdropFilter: 'blur(14px)' }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#00d4ff', animation: 'agriBlink 2s ease-in-out infinite' }} />
                  <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.67rem', color: '#00d4ff' }}>ZenaDrone 1000 — Smart Farm Technology</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-text-muted tracking-[0.32em] uppercase" style={{ fontSize: '0.8125rem' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)', animation: 'agriBlink 2.2s ease-in-out infinite' }} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)' }} />

      <style>{`
        @keyframes agriBlink { 0%,100% { opacity:.28; } 50% { opacity:1; } }
      `}</style>
    </section>
  )
}
