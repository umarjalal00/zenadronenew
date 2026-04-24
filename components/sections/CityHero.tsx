'use client'

import { useRef } from 'react'
import Link       from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const STATS = [
  { end: 50,  suffix: '%', u: 'FASTER MAPPING' },
  { end: 360, suffix: '°', u: 'VIEW COVERAGE'  },
  { end: 40,  suffix: '%', u: 'COST SAVINGS'   },
]

/* ─── Building blocks for the city grid ─── */
const BLOCKS = [
  // Row 0
  { x:33,  y:33,  w:79, h:76, v:'normal'    },
  { x:122, y:33,  w:26, h:35, v:'small'     },
  { x:153, y:33,  w:27, h:35, v:'small'     },
  { x:122, y:73,  w:58, h:36, v:'normal'    },
  { x:190, y:33,  w:73, h:76, v:'large'     },
  { x:273, y:33,  w:30, h:76, v:'normal'    },
  { x:308, y:33,  w:34, h:33, v:'small'     },
  { x:308, y:71,  w:34, h:38, v:'small'     },
  { x:352, y:33,  w:95, h:76, v:'wide'      },
  // Row 1 — active survey zone
  { x:33,  y:119, w:79, h:62, v:'normal'    },
  { x:122, y:119, w:58, h:62, v:'active'    },
  { x:190, y:119, w:73, h:62, v:'active'    },
  { x:273, y:119, w:69, h:62, v:'normal'    },
  { x:352, y:119, w:40, h:27, v:'small'     },
  { x:397, y:119, w:50, h:27, v:'small'     },
  { x:352, y:151, w:95, h:30, v:'normal'    },
  // Row 2 — highlight building
  { x:33,  y:191, w:79, h:65, v:'normal'    },
  { x:122, y:191, w:58, h:65, v:'active'    },
  { x:190, y:191, w:73, h:65, v:'highlight' },
  { x:273, y:191, w:29, h:65, v:'normal'    },
  { x:307, y:191, w:35, h:30, v:'small'     },
  { x:307, y:226, w:35, h:30, v:'small'     },
  { x:352, y:191, w:95, h:65, v:'wide'      },
  // Row 3
  { x:33,  y:266, w:79, h:72, v:'normal'    },
  { x:122, y:266, w:25, h:72, v:'thin'      },
  { x:152, y:266, w:28, h:33, v:'small'     },
  { x:152, y:304, w:28, h:34, v:'small'     },
  { x:190, y:266, w:73, h:72, v:'park'      },
  { x:273, y:266, w:69, h:72, v:'normal'    },
  { x:352, y:266, w:95, h:72, v:'wide'      },
]

function blockProps(v: string) {
  switch (v) {
    case 'highlight': return { fill: 'rgba(0,212,255,0.20)', stroke: '#00d4ff',            strokeWidth: 1.3 }
    case 'active':    return { fill: 'rgba(0,212,255,0.09)', stroke: 'rgba(0,212,255,0.55)', strokeWidth: 0.9 }
    case 'park':      return { fill: 'rgba(0,212,255,0.04)', stroke: 'rgba(0,212,255,0.22)', strokeWidth: 0.7, strokeDasharray: '3 3' }
    default:          return { fill: 'rgba(0,212,255,0.055)',stroke: 'rgba(0,212,255,0.28)', strokeWidth: 0.7 }
  }
}

/* ─── Drone waypoints [cx, cy] ─── */
const DRONE_WPS: [number, number][] = [
  [415, 70], [310, 155], [226, 224], [151, 150], [72, 224], [195, 302], [307, 302], [415, 70],
]

function CityMapSVG() {
  return (
    <svg viewBox="0 0 480 378" fill="none" width="100%" height="100%">
      <defs>
        <pattern id="cpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="0.5" />
        </pattern>
        <filter id="cpGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="cpScan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,212,255,0.12)" />
          <stop offset="100%" stopColor="rgba(0,212,255,0)" />
        </linearGradient>
      </defs>

      {/* Background grid */}
      <rect width="480" height="378" fill="url(#cpGrid)" />

      {/* Street grid lines */}
      {[28, 114, 186, 261, 343].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="480" y2={y} stroke="rgba(0,212,255,0.10)" strokeWidth="1" />
      ))}
      {[28, 117, 185, 268, 347, 452].map(x => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="378" stroke="rgba(0,212,255,0.10)" strokeWidth="1" />
      ))}

      {/* Column labels */}
      {['A','B','C','D','E'].map((l, i) => (
        <text key={l} x={[32,120,189,271,351][i]} y={24} fill="rgba(0,212,255,0.22)" fontSize="6" fontFamily="monospace" letterSpacing="1">{l}</text>
      ))}
      {/* Row labels */}
      {['01','02','03','04'].map((l, i) => (
        <text key={l} x={14} y={[80,150,224,302][i]} fill="rgba(0,212,255,0.22)" fontSize="5" fontFamily="monospace">{l}</text>
      ))}

      {/* Building blocks */}
      {BLOCKS.map((b, i) => {
        const p = blockProps(b.v)
        return (
          <rect key={i} className="city-svg-block"
            x={b.x} y={b.y} width={b.w} height={b.h}
            fill={p.fill} stroke={p.stroke} strokeWidth={p.strokeWidth}
            strokeDasharray={(p as Record<string, string | number>).strokeDasharray as string | undefined}
            style={{ opacity: 0 }}
          />
        )
      })}

      {/* Active survey zone selection */}
      <rect className="city-zone"
        x={117} y={114} width={151} height={147}
        fill="none" stroke="#00d4ff" strokeWidth="1.2" strokeDasharray="6 3"
        style={{ opacity: 0 }}
      />
      {/* Zone corner dots */}
      {([[117,114],[268,114],[117,261],[268,261]] as [number,number][]).map(([cx,cy], i) => (
        <circle key={i} className="city-zone-dot" cx={cx} cy={cy} r="2.5"
          fill="#00d4ff" style={{ opacity: 0 }} />
      ))}

      {/* Highlight building pulse ring */}
      <rect className="city-hlpulse"
        x={188} y={189} width={77} height={69}
        fill="none" stroke="#00d4ff" strokeWidth="1.8"
        filter="url(#cpGlow)" style={{ opacity: 0 }}
      />

      {/* Drone flight path (trace) */}
      <polyline className="city-drone-path"
        points={DRONE_WPS.map(([x,y]) => `${x},${y}`).join(' ')}
        fill="none" stroke="rgba(0,212,255,0.22)" strokeWidth="1" strokeDasharray="4 4"
        style={{ opacity: 0 }}
      />

      {/* Drone dot + ring */}
      <circle className="city-drone-ring" cx={DRONE_WPS[0][0]} cy={DRONE_WPS[0][1]} r="9"
        fill="none" stroke="rgba(0,212,255,0.4)" strokeWidth="1" style={{ opacity: 0 }} />
      <circle className="city-drone-dot" cx={DRONE_WPS[0][0]} cy={DRONE_WPS[0][1]} r="4"
        fill="#00d4ff" filter="url(#cpGlow)" style={{ opacity: 0 }} />

      {/* Corner L-brackets */}
      <path className="city-bracket" d="M8 22L8 8L22 8"   stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" style={{ opacity: 0 }} />
      <path className="city-bracket" d="M458 8L472 8L472 22"  stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" style={{ opacity: 0 }} />
      <path className="city-bracket" d="M8 356L8 370L22 370"  stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" style={{ opacity: 0 }} />
      <path className="city-bracket" d="M458 370L472 370L472 356" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" style={{ opacity: 0 }} />

      {/* Horizontal scan line group (GSAP will translateY this) */}
      <g className="city-scan-group" style={{ transform: 'translateY(-20px)' }}>
        <line x1="0" y1="0" x2="480" y2="0" stroke="rgba(0,212,255,0.55)" strokeWidth="1.5" />
        <rect x="0" y="0" width="480" height="22" fill="url(#cpScan)" />
      </g>

      {/* HUD panels */}
      <g className="city-hud" style={{ opacity: 0 }}>
        {/* Top-left */}
        <text x="32" y="14" fill="#00d4ff" fontSize="5.5" fontFamily="monospace" letterSpacing="1.2" fontWeight="bold">GIS SURVEY</text>
        <text x="32" y="22" fill="rgba(0,212,255,0.5)" fontSize="4.5" fontFamily="monospace" letterSpacing="1">ACTIVE — ZONE A-1</text>
        {/* Top-right */}
        <text x="353" y="14" fill="rgba(0,212,255,0.7)" fontSize="5" fontFamily="monospace" letterSpacing="1">DRONE: ONLINE</text>
        <text x="353" y="22" fill="rgba(0,212,255,0.4)" fontSize="4.5" fontFamily="monospace" letterSpacing="1">ALT: 120M</text>
        {/* Bottom zone label */}
        <text x="122" y="110" fill="rgba(0,212,255,0.55)" fontSize="5.5" fontFamily="monospace" letterSpacing="1">▸ ACTIVE SURVEY ZONE</text>
        {/* Bottom coordinates */}
        <text x="80" y="372" fill="rgba(0,212,255,0.3)" fontSize="5" fontFamily="monospace" letterSpacing="0.8">14.5995° N / 120.9842° E — URBAN GRID ANALYSIS</text>
      </g>
    </svg>
  )
}

/* ─── Hero ──────────────────────────────────────────────────── */

export function CityHero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    /* ── Left panel entrance ── */
    const tl = gsap.timeline({ delay: 0.12 })
    tl.fromTo('.city-word',
      { y: 90, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.95, ease: 'power4.out', stagger: 0.07 }
    )
    tl.fromTo('.city-sub',  { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.68, ease: 'power3.out' }, '-=0.52')
    tl.fromTo('.city-stat', { y: 20, opacity: 0, scale: 0.88 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 }, '-=0.42')
    tl.fromTo('.city-cta',  { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.35')

    /* ── Count-up ── */
    STATS.forEach(({ end, suffix }, i) => {
      const el = counterRefs.current[i]
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration: end === 360 ? 2.2 : 1.6,
        ease: 'power2.out',
        delay: 1.1 + i * 0.15,
        onUpdate() { el.textContent = Math.round(obj.val) + suffix },
      })
    })

    /* ── SVG map entrance ── */
    // Container fades in
    gsap.fromTo('.city-map-wrap',
      { opacity: 0, x: 40, scale: 0.97 },
      { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power4.out', delay: 0.35 }
    )

    // Building blocks stagger in
    gsap.fromTo('.city-svg-block',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out', stagger: { amount: 1.1, from: 'random' }, delay: 0.6 }
    )

    // Corner brackets enter from corners
    gsap.fromTo('.city-bracket',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.08, delay: 1.0,
        transformOrigin: 'center center' }
    )

    // Zone + dots
    gsap.to('.city-zone',     { opacity: 0.9, duration: 0.6, delay: 1.2 })
    gsap.to('.city-zone-dot', { opacity: 1,   duration: 0.4, stagger: 0.08, delay: 1.3 })
    gsap.to('.city-drone-path',{ opacity: 1,   duration: 0.8, delay: 1.4 })

    // HUD panels
    gsap.to('.city-hud', { opacity: 1, duration: 0.6, delay: 1.5 })

    // Highlight pulse (repeating)
    gsap.to('.city-hlpulse', { opacity: 0.9, duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.6 })

    // Drone dot + ring appear
    gsap.to(['.city-drone-dot', '.city-drone-ring'], { opacity: 1, duration: 0.4, delay: 1.5 })

    // Drone moves along waypoints
    const droneTL = gsap.timeline({ repeat: -1, delay: 1.8, repeatDelay: 0.4 })
    DRONE_WPS.slice(1).forEach(([cx, cy]) => {
      droneTL.to(['.city-drone-dot', '.city-drone-ring'], {
        attr: { cx, cy }, duration: 1.5, ease: 'power2.inOut',
      })
    })

    // Scan line sweeps top → bottom, repeating
    gsap.set('.city-scan-group', { y: -20 })
    gsap.to('.city-scan-group', {
      y: 400, duration: 4, ease: 'none', repeat: -1, delay: 1.0, repeatDelay: 0.6,
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-background" style={{ paddingTop: 68 }}>

      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 72% 44%, rgba(0,212,255,0.08) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 40% at 15% 75%, rgba(0,212,255,0.04) 0%, transparent 55%)' }} />

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 88% 82% at 50% 50%, black 25%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 88% 82% at 50% 50%, black 25%, transparent 100%)',
      }} />

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.18fr] gap-14 xl:gap-18 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* ── Left: Content ── */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-7"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'cityBlink 2s ease-in-out infinite' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>City Planning</span>
            </motion.div>

            <h1 className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 0.96, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="city-word inline-block" style={{ opacity: 0 }}>Urban</span>
              </span>
              <span className="block overflow-hidden">
                <span className="city-word inline-block" style={{ opacity: 0 }}>
                  <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Planning</span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="city-word inline-block" style={{ opacity: 0 }}>Technology</span>
              </span>
            </h1>

            <p className="city-sub font-sans text-text-muted leading-relaxed mb-9"
              style={{ fontSize: '1.1rem', maxWidth: 490, opacity: 0, lineHeight: 1.72 }}
            >
              Smart drones are critical assets in every GIS professional&apos;s toolkit. High-performance cameras and state-of-the-art sensors deliver immersive 360° city views — enabling better decisions across urban design, construction, and environmental planning.
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-4 mb-9" style={{ borderTop: '1px solid rgba(0,212,255,0.12)', paddingTop: '1.2rem' }}>
              {STATS.map((s, i) => (
                <div key={s.u} className="city-stat flex flex-col gap-1" style={{ opacity: 0 }}>
                  <span className="font-display font-bold" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#00d4ff', lineHeight: 1, letterSpacing: '-0.035em' }}>
                    <span ref={el => { counterRefs.current[i] = el }}>0{s.suffix}</span>
                  </span>
                  <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.6rem', lineHeight: 1.4 }}>{s.u}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="#book-demo"
                className="city-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', boxShadow: '0 0 26px rgba(0,212,255,0.35), 0 4px 18px rgba(0,212,255,0.18)', color: '#07070f', fontSize: '0.9rem', opacity: 0 }}
              >
                Contact Us
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="#book-demo"
                className="city-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.11)', fontSize: '0.9rem', opacity: 0 }}
              >
                Book A Service
              </Link>
            </div>
          </div>

          {/* ── Right: Animated city map SVG ── */}
          <div className="city-map-wrap relative" style={{ opacity: 0 }}>
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-2xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.07) 0%, transparent 70%)', filter: 'blur(20px)' }} />

            {/* Map container */}
            <div className="relative rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(0,212,255,0.18)', background: 'rgba(0,5,15,0.85)', backdropFilter: 'blur(12px)', boxShadow: '0 0 60px rgba(0,212,255,0.06), inset 0 0 40px rgba(0,212,255,0.02)' }}
            >
              <CityMapSVG />

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-2.5" style={{ borderTop: '1px solid rgba(0,212,255,0.12)', background: 'rgba(0,212,255,0.03)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'cityBlink 2s ease-in-out infinite' }} />
                  <span className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>Live Survey — GIS Mode Active</span>
                </div>
                <span className="font-mono" style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.4)' }}>ZenaDrone 1000</span>
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
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)', animation: 'cityBlink 2.2s ease-in-out infinite' }} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)' }} />

      <style>{`
        @keyframes cityBlink { 0%,100% { opacity:.28; } 50% { opacity:1; } }
      `}</style>
    </section>
  )
}
