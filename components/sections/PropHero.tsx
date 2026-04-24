'use client'

import { useRef } from 'react'
import Image      from 'next/image'
import Link       from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const STATS = [
  { end: 60, suffix: '%', u: 'COST REDUCTION'   },
  { end: 3,  suffix: '×', u: 'FASTER SURVEYS'   },
  { end: 85, suffix: '%', u: 'SAFER OPERATIONS'  },
]

export function PropHero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.12 })
    tl.fromTo('.prop-word',
      { y: 90, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.95, ease: 'power4.out', stagger: 0.07 }
    )
    tl.fromTo('.prop-sub',  { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.68, ease: 'power3.out' }, '-=0.52')
    tl.fromTo('.prop-stat', { y: 20, opacity: 0, scale: 0.88 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 }, '-=0.42')
    tl.fromTo('.prop-cta',  { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5,  ease: 'power3.out', stagger: 0.1 }, '-=0.35')
    tl.fromTo('.prop-img',  { x: 55, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' }, '-=1.25')

    // Scan line on image
    gsap.set('.prop-scan-line', { y: 0 })
    gsap.to('.prop-scan-line', { y: 340, duration: 3.2, ease: 'none', repeat: -1, delay: 1.4, repeatDelay: 0.6 })

    // Floating badge entrance
    gsap.fromTo('.prop-badge', { opacity: 0, y: 10, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.15, delay: 1.6 })

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

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 55% at 72% 46%, rgba(0,212,255,0.07) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 45% at 20% 70%, rgba(0,212,255,0.04) 0%, transparent 55%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 88% 82% at 50% 50%, black 25%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 88% 82% at 50% 50%, black 25%, transparent 100%)',
      }} />

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.12fr] gap-14 xl:gap-20 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* Left */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-7"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'propBlink 2s ease-in-out infinite' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Property Management</span>
            </motion.div>

            <h1 className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 0.96, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="prop-word inline-block" style={{ opacity: 0 }}>Drone</span>
              </span>
              <span className="block overflow-hidden">
                <span className="prop-word inline-block" style={{ opacity: 0 }}>
                  <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Property</span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="prop-word inline-block" style={{ opacity: 0 }}>Surveys</span>
              </span>
            </h1>

            <p className="prop-sub font-sans text-text-muted leading-relaxed mb-9"
              style={{ fontSize: '1.1rem', maxWidth: 490, opacity: 0, lineHeight: 1.72 }}
            >
              Checking properties manually is dangerous, slow, and expensive. ZenaDrone 1000 makes inspections safer, faster, and more accurate — covering rooftops, facades, and large grounds without scaffolding or risk.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-9" style={{ borderTop: '1px solid rgba(0,212,255,0.12)', paddingTop: '1.2rem' }}>
              {STATS.map((s, i) => (
                <div key={s.u} className="prop-stat flex flex-col gap-1" style={{ opacity: 0 }}>
                  <span className="font-display font-bold" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#00d4ff', lineHeight: 1, letterSpacing: '-0.035em' }}>
                    <span ref={el => { counterRefs.current[i] = el }}>0{s.suffix}</span>
                  </span>
                  <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.6rem', lineHeight: 1.4 }}>{s.u}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="#book-demo"
                className="prop-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', boxShadow: '0 0 26px rgba(0,212,255,0.35), 0 4px 18px rgba(0,212,255,0.18)', color: '#07070f', fontSize: '0.9rem', opacity: 0 }}
              >
                Contact Us
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="#book-demo"
                className="prop-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.11)', fontSize: '0.9rem', opacity: 0 }}
              >
                Book A Service
              </Link>
            </div>
          </div>

          {/* Right — image with inspection overlays */}
          <div className="prop-img relative" style={{ opacity: 0 }}>
            <div className="absolute -inset-6 rounded-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 68%)', filter: 'blur(28px)', zIndex: 0 }} />
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', zIndex: 1 }}>
              <Image
                src="/images/smart-UAV.webp"
                alt="ZenaDrone — property management and aerial surveys"
                fill
                className="object-cover"
                style={{ filter: 'brightness(0.68) saturate(1.05)' }}
                priority
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, rgba(7,7,15,0.45) 0%, rgba(7,7,15,0.1) 55%, rgba(0,212,255,0.05) 100%)' }} />

              {/* Grid overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />

              {/* Scan line */}
              <div className="prop-scan-line absolute inset-x-0 h-px pointer-events-none" style={{
                background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.7) 30%, rgba(0,212,255,0.9) 50%, rgba(0,212,255,0.7) 70%, transparent)',
                boxShadow: '0 0 12px rgba(0,212,255,0.5)',
                top: 0,
              }} />
              <div className="prop-scan-line absolute inset-x-0 h-5 pointer-events-none" style={{
                background: 'linear-gradient(to bottom, rgba(0,212,255,0.07), transparent)',
                top: 0,
              }} />

              {/* Corner brackets */}
              {[['top-2 left-2', '0 14 0 0 L 0 0 L 14 0'], ['top-2 right-2', '0 0 L 14 0 L 14 14'], ['bottom-2 left-2', '0 0 L 0 14 L 14 14'], ['bottom-2 right-2', '14 0 L 14 14 L 0 14']].map(([pos, d], i) => (
                <svg key={i} className={`absolute ${pos} pointer-events-none`} width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <path d={`M ${d}`} stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" opacity={0.7} />
                </svg>
              ))}

              {/* Top scan badge */}
              <div className="prop-badge absolute top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg pointer-events-none" style={{ background: 'rgba(7,7,15,0.85)', border: '1px solid rgba(0,212,255,0.3)', backdropFilter: 'blur(12px)', opacity: 0 }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#00d4ff', animation: 'propBlink 1.4s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.62rem', color: '#00d4ff' }}>Roof Scan — 94% Complete</span>
              </div>

              {/* Right side data panel */}
              <div className="prop-badge absolute top-12 right-3 flex flex-col gap-1 px-2.5 py-2 rounded-lg pointer-events-none" style={{ background: 'rgba(7,7,15,0.82)', border: '1px solid rgba(0,212,255,0.2)', backdropFilter: 'blur(10px)', opacity: 0 }}>
                <span className="font-mono" style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em' }}>THERMAL</span>
                <span className="font-display font-bold" style={{ fontSize: '0.9rem', color: '#00d4ff', letterSpacing: '-0.02em' }}>23.4°C</span>
                <div className="w-full h-px mt-0.5" style={{ background: 'rgba(0,212,255,0.2)' }} />
                <span className="font-mono" style={{ fontSize: '0.5rem', color: 'rgba(0,212,255,0.35)', letterSpacing: '0.1em' }}>NO ANOMALY</span>
              </div>

              {/* Bottom status */}
              <div className="absolute bottom-0 inset-x-0 p-4">
                <div className="prop-badge inline-flex items-center gap-2 px-3.5 py-2 rounded-xl" style={{ background: 'rgba(7,7,15,0.82)', border: '1px solid rgba(0,212,255,0.22)', backdropFilter: 'blur(14px)', opacity: 0 }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#00d4ff', animation: 'propBlink 2s ease-in-out infinite' }} />
                  <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.67rem', color: '#00d4ff' }}>ZenaDrone 1000 — Property Survey Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-text-muted tracking-[0.32em] uppercase" style={{ fontSize: '0.8125rem' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)', animation: 'propBlink 2.2s ease-in-out infinite' }} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)' }} />

      <style>{`
        @keyframes propBlink { 0%,100% { opacity:.28; } 50% { opacity:1; } }
      `}</style>
    </section>
  )
}
