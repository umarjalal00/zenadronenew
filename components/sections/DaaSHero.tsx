'use client'

import { useRef } from 'react'
import Link       from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const STATS = [
  { end: 12, suffix: '+', u: 'KEY INDUSTRIES'  },
  { end: 5,  suffix: '+', u: 'SENSOR TYPES'    },
  { end: 100, suffix: '%', u: 'FLEXIBLE TERMS'  },
]

const NODES = [
  { cx: 240, cy: 62,  label: 'FIELD SCAN',   sub: 'LiDAR + GPS'   },
  { cx: 356, cy: 150, label: 'MULTISPECT.',  sub: 'Crop & Env'    },
  { cx: 314, cy: 292, label: 'INSPECTION',   sub: '3D Footage'    },
  { cx: 166, cy: 292, label: 'SECURITY',     sub: 'Surveillance'  },
  { cx: 124, cy: 150, label: 'AGRICULTURE',  sub: 'Crop Health'   },
]

export function DaaSHero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo('.daas-word',
      { y: 90, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.95, ease: 'power4.out', stagger: 0.07 }
    )
    tl.fromTo('.daas-sub',  { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, '-=0.5')
    tl.fromTo('.daas-stat', { y: 20, opacity: 0, scale: 0.88 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 }, '-=0.4')
    tl.fromTo('.daas-cta',  { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.35')
    tl.fromTo('.daas-hub-wrap', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power4.out' }, '-=0.85')
    tl.fromTo('.daas-drone-center', { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power3.out' }, '-=0.35')
    NODES.forEach((_, i) => {
      tl.fromTo(`.daas-node-${i}`, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }, `-=${i === 0 ? 0.15 : 0.28}`)
    })
    tl.fromTo(['.daas-hub-topbar', '.daas-hub-botbar'], { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.1 }, '-=0.1')

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
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'daasBlink 2s ease-in-out infinite' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Drone as a Service</span>
            </motion.div>

            <h1 className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 0.96, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="daas-word inline-block" style={{ opacity: 0 }}>Versatile</span>
              </span>
              <span className="block overflow-hidden">
                <span className="daas-word inline-block" style={{ opacity: 0 }}>
                  <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Drone</span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="daas-word inline-block" style={{ opacity: 0 }}>Services</span>
              </span>
            </h1>

            <p className="daas-sub font-sans text-text-muted leading-relaxed mb-9"
              style={{ fontSize: '1.1rem', maxWidth: 490, opacity: 0, lineHeight: 1.72 }}
            >
              ZenaDrone delivers versatile drone surveillance and scanning solutions through a flexible subscription model. Choose precisely the services you need — your vision, your terms.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-9" style={{ borderTop: '1px solid rgba(0,212,255,0.12)', paddingTop: '1.2rem' }}>
              {STATS.map((s, i) => (
                <div key={s.u} className="daas-stat flex flex-col gap-1" style={{ opacity: 0 }}>
                  <span className="font-display font-bold" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#00d4ff', lineHeight: 1, letterSpacing: '-0.035em' }}>
                    <span ref={el => { counterRefs.current[i] = el }}>0{s.suffix}</span>
                  </span>
                  <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.6rem', lineHeight: 1.4 }}>{s.u}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="#book-demo"
                className="daas-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', boxShadow: '0 0 26px rgba(0,212,255,0.35), 0 4px 18px rgba(0,212,255,0.18)', color: '#07070f', fontSize: '0.9rem', opacity: 0 }}
              >
                Contact Us
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="#book-demo"
                className="daas-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.11)', fontSize: '0.9rem', opacity: 0 }}
              >
                Book A Service
              </Link>
            </div>
          </div>

          {/* Right — animated service hub */}
          <div className="daas-hub-wrap relative" style={{ opacity: 0 }}>
            <div className="absolute -inset-6 rounded-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 68%)', filter: 'blur(28px)', zIndex: 0 }} />
            <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,212,255,0.15)', background: 'rgba(0,5,15,0.72)', backdropFilter: 'blur(8px)', zIndex: 1 }}>

              {/* Top status bar */}
              <div className="daas-hub-topbar flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(0,212,255,0.1)', opacity: 0 }}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'daasBlink 1.6s ease-in-out infinite' }} />
                  <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>DaaS Platform — Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono" style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.1em' }}>SUBSCRIPTION</span>
                  <div className="px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.22)' }}>
                    <span className="font-mono font-bold" style={{ fontSize: '0.5rem', color: '#00d4ff' }}>ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* SVG service hub */}
              <svg viewBox="0 0 480 360" fill="none" width="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="daasNodeGlow">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="daasCtrGlow">
                    <feGaussianBlur stdDeviation="5" result="b" />
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <radialGradient id="daasRadBg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(0,212,255,0.05)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                <ellipse cx="240" cy="180" rx="195" ry="158" fill="url(#daasRadBg)" />

                {/* Rotating orbit rings (CSS animated) */}
                <circle cx="240" cy="180" r="115" stroke="rgba(0,212,255,0.11)" strokeWidth="1" strokeDasharray="3 7"
                  style={{ animation: 'daasOrbit 28s linear infinite', transformBox: 'fill-box', transformOrigin: 'center' }} />
                <circle cx="240" cy="180" r="62" stroke="rgba(0,212,255,0.07)" strokeWidth="1" strokeDasharray="2 6"
                  style={{ animation: 'daasOrbitRev 18s linear infinite', transformBox: 'fill-box', transformOrigin: 'center' }} />

                {/* Connection lines with flowing dashes */}
                {NODES.map((n, i) => (
                  <line key={i}
                    x1="240" y1="180" x2={n.cx} y2={n.cy}
                    stroke="rgba(0,212,255,0.18)" strokeWidth="1"
                    strokeDasharray="4 8"
                    style={{ animation: `daasLineFlow 2.2s linear ${i * 0.3}s infinite` }}
                  />
                ))}

                {/* Center pulse rings */}
                <circle cx="240" cy="180" r="20" stroke="rgba(0,212,255,0.55)" strokeWidth="1.5" fill="none"
                  style={{ animation: 'daasPulse 2.8s ease-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }} />
                <circle cx="240" cy="180" r="20" stroke="rgba(0,212,255,0.35)" strokeWidth="1" fill="none"
                  style={{ animation: 'daasPulse 2.8s ease-out 1.4s infinite', transformBox: 'fill-box', transformOrigin: 'center' }} />

                {/* Service nodes */}
                {NODES.map((n, i) => (
                  <g key={i} className={`daas-node-${i}`} style={{ opacity: 0 }}>
                    <circle cx={n.cx} cy={n.cy} r="26" fill="rgba(0,5,15,0.92)" stroke="rgba(0,212,255,0.28)" strokeWidth="1.2" />
                    <circle cx={n.cx} cy={n.cy} r="26" fill="rgba(0,212,255,0.04)" />
                    <circle cx={n.cx} cy={n.cy} r="5" fill="#00d4ff" opacity="0.85" filter="url(#daasNodeGlow)" />
                    <text x={n.cx} y={n.cy + 38} textAnchor="middle" fill="rgba(0,212,255,0.85)" fontSize="6.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.06em">{n.label}</text>
                    <text x={n.cx} y={n.cy + 48} textAnchor="middle" fill="rgba(0,212,255,0.4)" fontSize="5.5" fontFamily="monospace">{n.sub}</text>
                  </g>
                ))}

                {/* Central drone hub */}
                <g className="daas-drone-center" style={{ opacity: 0 }}>
                  <circle cx="240" cy="180" r="32" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.16)" strokeWidth="1.5" filter="url(#daasCtrGlow)" />
                  <circle cx="240" cy="180" r="20" fill="rgba(0,5,15,0.95)" stroke="rgba(0,212,255,0.45)" strokeWidth="1.5" />
                  {/* Drone body */}
                  <rect x="234" y="174" width="12" height="12" rx="2" fill="rgba(0,212,255,0.12)" stroke="#00d4ff" strokeWidth="1.1" />
                  {/* Arms */}
                  <line x1="228" y1="177" x2="234" y2="177" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="246" y1="177" x2="252" y2="177" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="228" y1="183" x2="234" y2="183" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="246" y1="183" x2="252" y2="183" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" />
                  {/* Propellers */}
                  <circle cx="226" cy="177" r="4" stroke="#00d4ff" strokeWidth="0.9" fill="none" opacity="0.5" />
                  <circle cx="254" cy="177" r="4" stroke="#00d4ff" strokeWidth="0.9" fill="none" opacity="0.5" />
                  <circle cx="226" cy="183" r="4" stroke="#00d4ff" strokeWidth="0.9" fill="none" opacity="0.5" />
                  <circle cx="254" cy="183" r="4" stroke="#00d4ff" strokeWidth="0.9" fill="none" opacity="0.5" />
                  <circle cx="240" cy="180" r="2.5" fill="#00d4ff" />
                </g>

                {/* Corner brackets */}
                {[[8,8,'0 16 0 0 L 0 0 L 16 0'],[472,8,'0 0 L 16 0 L 16 16'],[8,352,'0 0 L 0 16 L 16 16'],[472,352,'16 0 L 16 16 L 0 16']].map(([x,y,d],i)=>(
                  <svg key={i} x={Number(x)-8} y={Number(y)-8} width="18" height="18" viewBox="0 0 18 18">
                    <path d={`M ${d}`} stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" fill="none" />
                  </svg>
                ))}
              </svg>

              {/* Bottom bar */}
              <div className="daas-hub-botbar flex items-center justify-between px-4 py-2.5" style={{ borderTop: '1px solid rgba(0,212,255,0.1)', opacity: 0 }}>
                <span className="font-mono" style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.1em' }}>5 SERVICE NODES</span>
                <div className="flex items-center gap-1">
                  {NODES.map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full" style={{ background: '#00d4ff', opacity: 0.5 + i * 0.1, animation: `daasBlink ${1.4 + i * 0.2}s ease-in-out infinite` }} />
                  ))}
                </div>
                <span className="font-mono font-bold" style={{ fontSize: '0.55rem', color: '#00d4ff', letterSpacing: '0.1em' }}>ZENADRONE 1000</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-text-muted tracking-[0.32em] uppercase" style={{ fontSize: '0.8125rem' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)', animation: 'daasBlink 2.2s ease-in-out infinite' }} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)' }} />

      <style>{`
        @keyframes daasBlink { 0%,100%{opacity:.28;}50%{opacity:1;} }
        @keyframes daasOrbit { to { transform: rotate(360deg); } }
        @keyframes daasOrbitRev { to { transform: rotate(-360deg); } }
        @keyframes daasPulse { 0%{transform:scale(1);opacity:.55;} 100%{transform:scale(2.9);opacity:0;} }
        @keyframes daasLineFlow { to { stroke-dashoffset: -24; } }
      `}</style>
    </section>
  )
}
