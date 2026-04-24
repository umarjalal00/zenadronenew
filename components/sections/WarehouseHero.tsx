'use client'

import { useRef } from 'react'
import Link       from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const STATS = [
  { end: 99, suffix: '%', u: 'SCAN ACCURACY'   },
  { end: 5,  suffix: '×', u: 'FASTER COUNTING' },
  { end: 60, suffix: '%', u: 'COST REDUCTION'  },
]

// Warehouse shelf rows (top-down view)
const SHELVES = [
  { x: 30,  y: 60,  w: 80, h: 16 },
  { x: 30,  y: 100, w: 80, h: 16 },
  { x: 30,  y: 140, w: 80, h: 16 },
  { x: 30,  y: 180, w: 80, h: 16 },
  { x: 150, y: 60,  w: 80, h: 16 },
  { x: 150, y: 100, w: 80, h: 16 },
  { x: 150, y: 140, w: 80, h: 16 },
  { x: 150, y: 180, w: 80, h: 16 },
  { x: 270, y: 60,  w: 80, h: 16 },
  { x: 270, y: 100, w: 80, h: 16 },
  { x: 270, y: 140, w: 80, h: 16 },
  { x: 270, y: 180, w: 80, h: 16 },
]

// Drone waypoints through the aisles
const DRONE_WPS: [number, number][] = [
  [400, 30], [70, 30], [70, 68], [70, 108], [70, 148], [70, 188],
  [120, 210], [190, 210], [190, 188], [190, 148], [190, 108], [190, 68],
  [240, 30], [310, 68], [310, 108], [310, 148], [310, 188],
  [380, 210], [400, 30],
]

export function WarehouseHero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const droneRef    = useRef<SVGCircleElement>(null)
  const droneRingRef = useRef<SVGCircleElement>(null)
  const scanRef     = useRef<SVGRectElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo('.wh-word',
      { y: 90, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.95, ease: 'power4.out', stagger: 0.07 }
    )
    tl.fromTo('.wh-sub',  { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, '-=0.5')
    tl.fromTo('.wh-stat', { y: 20, opacity: 0, scale: 0.88 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 }, '-=0.4')
    tl.fromTo('.wh-cta',  { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.35')
    tl.fromTo('.wh-map-wrap', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power4.out' }, '-=0.85')
    tl.fromTo('.wh-shelf', { opacity: 0 }, { opacity: 1, duration: 0.04, stagger: 0.04, ease: 'none' }, '-=0.4')
    tl.fromTo('.wh-badge', { opacity: 0, y: 8, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(1.6)' }, '-=0.1')

    // Drone path animation
    const drone     = droneRef.current
    const droneRing = droneRingRef.current
    if (!drone || !droneRing) return

    const pathTl = gsap.timeline({ repeat: -1, delay: 1.6 })
    DRONE_WPS.forEach(([cx, cy], i) => {
      pathTl.to([drone, droneRing], {
        attr: { cx, cy },
        duration: i === 0 ? 0 : 1.1,
        ease: 'power1.inOut',
      })
    })

    // Scan beam follows drone
    if (scanRef.current) {
      const scanTl = gsap.timeline({ repeat: -1, delay: 1.6 })
      DRONE_WPS.forEach(([cx, cy], i) => {
        scanTl.to(scanRef.current, {
          attr: { x: cx - 30, y: cy - 2 },
          duration: i === 0 ? 0 : 1.1,
          ease: 'power1.inOut',
        })
      })
    }

    STATS.forEach(({ end, suffix }, i) => {
      const el = counterRefs.current[i]
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, { val: end, duration: 1.6, ease: 'power2.out', delay: 1.0 + i * 0.15,
        onUpdate() { el.textContent = Math.round(obj.val) + suffix }
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
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 xl:gap-20 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* Left */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-7"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'whBlink 2s ease-in-out infinite' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Warehousing &amp; Inventory</span>
            </motion.div>

            <h1 className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 0.96, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="wh-word inline-block" style={{ opacity: 0 }}>Automate,</span>
              </span>
              <span className="block overflow-hidden">
                <span className="wh-word inline-block" style={{ opacity: 0 }}>
                  <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Track,</span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="wh-word inline-block" style={{ opacity: 0 }}>Optimize</span>
              </span>
            </h1>

            <p className="wh-sub font-sans text-text-muted leading-relaxed mb-9"
              style={{ fontSize: '1.1rem', maxWidth: 490, opacity: 0, lineHeight: 1.72 }}
            >
              Efficient and accurate warehouse management starts with ZenaDrone 1000. Automate barcode scanning, real-time inventory tracking, and cycle counting — eliminating slow, error-prone manual operations.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-9" style={{ borderTop: '1px solid rgba(0,212,255,0.12)', paddingTop: '1.2rem' }}>
              {STATS.map((s, i) => (
                <div key={s.u} className="wh-stat flex flex-col gap-1" style={{ opacity: 0 }}>
                  <span className="font-display font-bold" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#00d4ff', lineHeight: 1, letterSpacing: '-0.035em' }}>
                    <span ref={el => { counterRefs.current[i] = el }}>0{s.suffix}</span>
                  </span>
                  <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.6rem', lineHeight: 1.4 }}>{s.u}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="#book-demo"
                className="wh-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', boxShadow: '0 0 26px rgba(0,212,255,0.35)', color: '#07070f', fontSize: '0.9rem', opacity: 0 }}
              >
                Contact Us
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="#book-demo"
                className="wh-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.11)', fontSize: '0.9rem', opacity: 0 }}
              >
                Book A Service
              </Link>
            </div>
          </div>

          {/* Right — animated warehouse floor map */}
          <div className="wh-map-wrap relative" style={{ opacity: 0 }}>
            <div className="absolute -inset-6 rounded-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 68%)', filter: 'blur(28px)', zIndex: 0 }} />
            <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,212,255,0.15)', background: 'rgba(0,5,15,0.82)', backdropFilter: 'blur(8px)', zIndex: 1 }}>

              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(0,212,255,0.1)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'whBlink 1.6s ease-in-out infinite' }} />
                  <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>Warehouse Scan — Live</span>
                </div>
                <div className="px-2 py-0.5 rounded" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.22)' }}>
                  <span className="font-mono font-bold" style={{ fontSize: '0.5rem', color: '#00d4ff', letterSpacing: '0.1em' }}>RFID ACTIVE</span>
                </div>
              </div>

              {/* SVG warehouse top-down view */}
              <svg viewBox="0 0 440 250" fill="none" width="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="whDroneGlow">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="whScanGlow">
                    <feGaussianBlur stdDeviation="2" result="b" />
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* Floor grid */}
                <rect x="0" y="0" width="440" height="250" fill="rgba(0,5,15,0.2)" />
                {Array.from({ length: 22 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="250" stroke="rgba(0,212,255,0.04)" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 13 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 20} x2="440" y2={i * 20} stroke="rgba(0,212,255,0.04)" strokeWidth="0.5" />
                ))}

                {/* Warehouse walls */}
                <rect x="10" y="10" width="420" height="230" rx="2" stroke="rgba(0,212,255,0.2)" strokeWidth="1.2" fill="none" />

                {/* Shelf rows */}
                {SHELVES.map((s, i) => (
                  <g key={i} className="wh-shelf" style={{ opacity: 0 }}>
                    <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="1.5" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.22)" strokeWidth="0.8" />
                    {/* shelf dividers */}
                    {[1, 2, 3].map(d => (
                      <line key={d} x1={s.x + (s.w / 4) * d} y1={s.y} x2={s.x + (s.w / 4) * d} y2={s.y + s.h} stroke="rgba(0,212,255,0.12)" strokeWidth="0.5" />
                    ))}
                    {/* item blocks */}
                    {[0, 1, 2, 3].map(d => (
                      <rect key={d} x={s.x + (s.w / 4) * d + 2} y={s.y + 3} width={s.w / 4 - 4} height={s.h - 6} rx="0.8"
                        fill={`rgba(0,212,255,${0.06 + Math.sin(i + d) * 0.04})`} />
                    ))}
                  </g>
                ))}

                {/* Aisle labels */}
                <text x="120" y="220" fill="rgba(0,212,255,0.25)" fontSize="7" fontFamily="monospace" textAnchor="middle">AISLE A</text>
                <text x="240" y="220" fill="rgba(0,212,255,0.25)" fontSize="7" fontFamily="monospace" textAnchor="middle">AISLE B</text>
                <text x="360" y="220" fill="rgba(0,212,255,0.25)" fontSize="7" fontFamily="monospace" textAnchor="middle">AISLE C</text>

                {/* Scan beam (follows drone) */}
                <rect ref={scanRef} x="370" y="-2" width="60" height="4" rx="2"
                  fill="rgba(0,212,255,0.18)" filter="url(#whScanGlow)"
                  style={{ opacity: 0.8 }}
                />

                {/* Drone trail dots */}
                {DRONE_WPS.slice(0, 6).map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="1.2"
                    fill="#00d4ff"
                    opacity={0.08 + i * 0.04}
                  />
                ))}

                {/* Drone */}
                <circle ref={droneRingRef} cx={400} cy={30} r="10" stroke="rgba(0,212,255,0.3)" strokeWidth="1" fill="none" filter="url(#whDroneGlow)" />
                <circle ref={droneRef} cx={400} cy={30} r="5" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1.2" filter="url(#whDroneGlow)" />
                <circle cx={400} cy={30} r="2" fill="#00d4ff" />

                {/* Scanned item indicators */}
                {[[70, 68], [70, 108], [190, 68]].map(([x, y], i) => (
                  <g key={i}>
                    <rect x={x - 6} y={y - 6} width={12} height={12} rx="1.5" stroke="rgba(0,212,255,0.55)" strokeWidth="0.8" fill="rgba(0,212,255,0.05)"
                      strokeDasharray="2 2"
                      style={{ animation: `whBlink ${1.4 + i * 0.3}s ease-in-out infinite` }}
                    />
                    <line x1={x} y1={y - 6} x2={x} y2={y - 14} stroke="rgba(0,212,255,0.4)" strokeWidth="0.7" />
                    <text x={x + 4} y={y - 16} fill="rgba(0,212,255,0.7)" fontSize="4.5" fontFamily="monospace">✓ SCANNED</text>
                  </g>
                ))}

                {/* Corner brackets */}
                {[[12,12,'0 12 0 0 L 0 0 L 12 0'],[428,12,'0 0 L 12 0 L 12 12'],[12,238,'0 0 L 0 12 L 12 12'],[428,238,'12 0 L 12 12 L 0 12']].map(([x,y,d],i)=>(
                  <svg key={i} x={Number(x)-2} y={Number(y)-2} width="16" height="16" viewBox="0 0 16 16">
                    <path d={`M ${d}`} stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" fill="none" />
                  </svg>
                ))}
              </svg>

              {/* Bottom status row */}
              <div className="flex items-center justify-between px-4 py-2.5" style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}>
                <div className="wh-badge flex items-center gap-2" style={{ opacity: 0 }}>
                  <div className="w-1 h-1 rounded-full" style={{ background: '#00d4ff' }} />
                  <span className="font-mono" style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.6)', letterSpacing: '0.1em' }}>ITEMS SCANNED</span>
                  <span className="font-display font-bold" style={{ fontSize: '0.78rem', color: '#00d4ff' }}>2,847 / 3,200</span>
                </div>
                <div className="wh-badge flex items-center gap-1.5" style={{ opacity: 0 }}>
                  <span className="font-mono" style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.1em' }}>ACCURACY</span>
                  <span className="font-mono font-bold" style={{ fontSize: '0.65rem', color: '#00d4ff' }}>99.2%</span>
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
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)', animation: 'whBlink 2.2s ease-in-out infinite' }} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)' }} />

      <style>{`
        @keyframes whBlink { 0%,100%{opacity:.28;}50%{opacity:1;} }
      `}</style>
    </section>
  )
}
