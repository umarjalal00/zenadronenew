'use client'

import { useRef } from 'react'
import Link       from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const STATS = [
  { value: '8',    label: 'Rotor System'    },
  { value: 'VTOL', label: 'Deployment'      },
  { value: 'AI',   label: 'Machine Learning'},
  { value: '4K',   label: 'Camera'          },
]

const ORBS = [
  { x: 14, y: 50, w: 600, h: 600, color: '#00d4ff', op: 0.07,  d: 12 },
  { x: 80, y: 65, w: 420, h: 420, color: '#fbbf24', op: 0.04,  d: 15 },
  { x: 50, y: 5,  w: 300, h: 300, color: '#34d399', op: 0.025, d: 9  },
]

// ─── Octa-rotor drone animated SVG ────────────────────────────────────────────
function OctaDroneSVG() {
  const CX = 220, CY = 195, ARM = 70

  const rotors = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180
    return {
      x: CX + ARM * Math.cos(angle),
      y: CY + ARM * Math.sin(angle),
      ccw: i % 2 === 1,
      speed: i % 2 === 0 ? 0.22 : 0.18,
      delay: -(i * 0.045),
    }
  })

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 440 390" fill="none" className="w-full h-full">
        <defs>
          <pattern id="featHeroGrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="featHeroAtmos" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0.14"/>
            <stop offset="70%"  stopColor="#00d4ff" stopOpacity="0.02"/>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="featDroneGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <rect width="440" height="390" fill="rgba(7,7,15,0.55)" rx="16"/>
        <rect width="440" height="390" fill="url(#featHeroGrid)" rx="16"/>
        <ellipse cx={CX} cy={CY} rx={225} ry={210} fill="url(#featHeroAtmos)"/>

        {/* Scan rings */}
        {[80, 145, 205].map((r, i) => (
          <circle key={i} cx={CX} cy={CY} r={r}
            stroke="#00d4ff" strokeWidth={0.5} fill="none"
            opacity={0.12 - i * 0.025}/>
        ))}

        {/* Rotating outer ring */}
        <circle cx={CX} cy={CY} r={185}
          stroke="#00d4ff" strokeWidth={0.6} fill="none"
          strokeDasharray="8 12" opacity={0.18}
          style={{ transformOrigin: `${CX}px ${CY}px`, animation: 'featOuterRing 18s linear infinite' }}/>

        {/* Crosshair */}
        <line x1={CX} y1={8}   x2={CX} y2={382} stroke="#00d4ff" strokeWidth={0.3} opacity={0.07}/>
        <line x1={8}  y1={CY}  x2={432} y2={CY} stroke="#00d4ff" strokeWidth={0.3} opacity={0.07}/>

        {/* Drone arms */}
        {rotors.map((r, i) => (
          <line key={i} x1={CX} y1={CY} x2={r.x} y2={r.y}
            stroke="#00d4ff" strokeWidth={1.5} opacity={0.5} strokeLinecap="round"/>
        ))}

        {/* Motor mounts */}
        {rotors.map((r, i) => (
          <circle key={i} cx={r.x} cy={r.y} r={11}
            stroke="#00d4ff" strokeWidth={1} fill="rgba(0,212,255,0.07)" opacity={0.75}/>
        ))}

        {/* Spinning rotors */}
        {rotors.map((r, i) => (
          <g key={i} style={{
            transformOrigin: `${r.x}px ${r.y}px`,
            animation: `${r.ccw ? 'featRotorCCW' : 'featRotorCW'} ${r.speed}s linear infinite`,
            animationDelay: `${r.delay}s`,
          }}>
            <line x1={r.x - 18} y1={r.y} x2={r.x + 18} y2={r.y}
              stroke="#00d4ff" strokeWidth={1.8} strokeLinecap="round" opacity={0.78}/>
            <line x1={r.x} y1={r.y - 18} x2={r.x} y2={r.y + 18}
              stroke="#00d4ff" strokeWidth={1.8} strokeLinecap="round" opacity={0.78}/>
          </g>
        ))}

        {/* Rotor glow dots */}
        {rotors.map((r, i) => (
          <circle key={i} cx={r.x} cy={r.y} r={3.5} fill="#00d4ff" opacity={0.6}
            style={{ animation: `featRotorGlow 1.8s ease-in-out infinite`, animationDelay: `${i * 0.23}s` }}/>
        ))}

        {/* Center drone body (hex) */}
        <polygon
          points={`${CX},${CY-26} ${CX+22},${CY-13} ${CX+22},${CY+13} ${CX},${CY+26} ${CX-22},${CY+13} ${CX-22},${CY-13}`}
          fill="rgba(0,212,255,0.07)" stroke="#00d4ff" strokeWidth={1.3} opacity={0.88}/>

        {/* Center glow */}
        <circle cx={CX} cy={CY} r={28} fill="url(#featDroneGlow)"
          style={{ animation: 'featCenterGlow 2.5s ease-in-out infinite' }}/>

        {/* Expanding pulse rings */}
        {[0, 1, 2].map(i => (
          <circle key={i} cx={CX} cy={CY} r={22}
            stroke="#00d4ff" strokeWidth={0.8} fill="none"
            style={{ animation: 'featPulseExpand 4s ease-out infinite', animationDelay: `${i * 1.33}s`, transformOrigin: `${CX}px ${CY}px` }}/>
        ))}

        {/* Camera lens */}
        <circle cx={CX} cy={CY} r={8} stroke="#00d4ff" strokeWidth={1.2} fill="rgba(0,212,255,0.12)"/>
        <circle cx={CX} cy={CY} r={3.5} fill="#00d4ff" opacity={0.95}/>

        {/* Corner brackets */}
        <path d="M8,8 L26,8 M8,8 L8,26"       stroke="#00d4ff" strokeWidth={1.2} opacity={0.5} strokeLinecap="round"/>
        <path d="M432,8 L414,8 M432,8 L432,26" stroke="#00d4ff" strokeWidth={1.2} opacity={0.5} strokeLinecap="round"/>
        <path d="M8,382 L26,382 M8,382 L8,364" stroke="#00d4ff" strokeWidth={1.2} opacity={0.5} strokeLinecap="round"/>
        <path d="M432,382 L414,382 M432,382 L432,364" stroke="#00d4ff" strokeWidth={1.2} opacity={0.5} strokeLinecap="round"/>

        {/* HUD panels */}
        <rect x={14} y={14} width={160} height={44} rx={4}
          fill="rgba(7,7,15,0.8)" stroke="rgba(0,212,255,0.22)" strokeWidth={0.6}/>
        <circle cx={23} cy={23} r={2.5} fill="#00d4ff"
          style={{ animation: 'featBlink 1.6s ease-in-out infinite' }}/>
        <text x={32} y={26} fill="#00d4ff" fontSize="6.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">ZENADRONE 1000</text>
        <text x={19} y={39} fill="#00d4ff" fontSize="5.5" fontFamily="monospace" opacity={0.6}>8 ROTORS  AI ACTIVE  VTOL</text>
        <text x={19} y={49} fill="#fbbf24" fontSize="5" fontFamily="monospace" opacity={0.52}>AUTO FLIGHT: ENABLED</text>

        <rect x={14}  y={354} width={196} height={22} rx={3}
          fill="rgba(7,7,15,0.8)" stroke="rgba(0,212,255,0.18)" strokeWidth={0.5}/>
        <text x={22} y={368} fill="#00d4ff" fontSize="5.5" fontFamily="monospace" opacity={0.7}>
          GPS: LOCKED | 4K CAM | MULTISPECTRAL
        </text>

        <rect x={292} y={14} width={134} height={22} rx={3}
          fill="rgba(7,7,15,0.8)" stroke="rgba(251,191,36,0.2)" strokeWidth={0.5}/>
        <text x={300} y={28} fill="#fbbf24" fontSize="5.5" fontFamily="monospace" opacity={0.7}>BATTERY: 98% | SIGNAL: OK</text>

        {/* Compass rose */}
        <g transform={`translate(${CX + 158}, ${CY - 5})`}>
          <circle cx={0} cy={0} r={16} stroke="#00d4ff" strokeWidth={0.6} fill="rgba(0,212,255,0.05)" opacity={0.55}/>
          <text x={0} y={-20} textAnchor="middle" fill="#00d4ff" fontSize="6.5" fontFamily="monospace" opacity={0.65}>N</text>
          <text x={0} y={26}  textAnchor="middle" fill="#00d4ff" fontSize="6.5" fontFamily="monospace" opacity={0.5}>S</text>
          <text x={23} y={4}  textAnchor="middle" fill="#00d4ff" fontSize="6.5" fontFamily="monospace" opacity={0.5}>E</text>
          <text x={-23} y={4} textAnchor="middle" fill="#00d4ff" fontSize="6.5" fontFamily="monospace" opacity={0.5}>W</text>
          <line x1={0} y1={-12} x2={0} y2={4} stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round"/>
          <polygon points="0,-13 -2.5,-4 2.5,-4" fill="#00d4ff" opacity={0.9}/>
        </g>

        {/* Rotor label */}
        <rect x={300} y={354} width={126} height={22} rx={3}
          fill="rgba(7,7,15,0.8)" stroke="rgba(52,211,153,0.2)" strokeWidth={0.5}/>
        <text x={308} y={368} fill="#34d399" fontSize="5.5" fontFamily="monospace" opacity={0.7}>8X ROTOR | CARBON FIBER</text>
      </svg>

      <style>{`
        @keyframes featRotorCW    { from{transform:rotate(0deg)}    to{transform:rotate(360deg)} }
        @keyframes featRotorCCW   { from{transform:rotate(0deg)}    to{transform:rotate(-360deg)} }
        @keyframes featOuterRing  { from{transform:rotate(0deg)}    to{transform:rotate(360deg)} }
        @keyframes featCenterGlow { 0%,100%{opacity:0.9} 50%{opacity:0.3} }
        @keyframes featPulseExpand{ 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(6);opacity:0} }
        @keyframes featRotorGlow  { 0%,100%{opacity:0.6} 50%{opacity:0.15} }
        @keyframes featBlink      { 0%,100%{opacity:1} 50%{opacity:0.15} }
      `}</style>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function FeaturesHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const droneRef   = useRef<HTMLDivElement>(null)
  const scanRef    = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' } })
    tl.from('.feat-eyebrow', { y: -18, opacity: 0 }, 0.2)
      .from('.feat-word', { y: '110%', opacity: 0, stagger: 0.06 }, '-=0.6')
      .from('.feat-sub',  { y: 22, opacity: 0 }, '-=0.55')
      .from('.feat-stat', { y: 16, opacity: 0, stagger: 0.07 }, '-=0.45')
      .from('.feat-cta',  { y: 12, opacity: 0, stagger: 0.1  }, '-=0.35')
    if (droneRef.current) {
      tl.from(droneRef.current, { opacity: 0, scale: 0.92, duration: 1.2 }, 0.1)
    }
    tl.from('.feat-hud', { x: 20, opacity: 0, stagger: 0.1 }, '-=0.9')

    if (scanRef.current) {
      gsap.fromTo(scanRef.current, { top: '0%' }, {
        top: '100%', duration: 3, ease: 'none', repeat: -1,
        onRepeat: () => { if (scanRef.current) gsap.set(scanRef.current, { top: '0%' }) }
      })
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="features-hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-background pt-[68px]">
      {ORBS.map((o, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: `${o.x}%`, top: `${o.y}%`, width: o.w, height: o.h,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(ellipse at center, ${o.color} 0%, transparent 70%)`,
          opacity: o.op, filter: 'blur(70px)',
          animation: `featOrbFloat ${o.d}s ease-in-out infinite`,
          animationDelay: `${i * 4}s`,
        }}/>
      ))}

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 20%, transparent 100%)',
      }}/>

      <div className="absolute inset-x-0 top-[68px] h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.3) 30%, rgba(0,212,255,0.42) 50%, rgba(0,212,255,0.3) 70%, transparent)',
        boxShadow: '0 0 12px rgba(0,212,255,0.12)',
      }}/>

      <div ref={scanRef} className="absolute inset-x-0 h-px pointer-events-none" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.45) 40%, rgba(0,212,255,0.65) 50%, rgba(0,212,255,0.45) 60%, transparent)',
        boxShadow: '0 0 8px rgba(0,212,255,0.25)',
      }}/>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center py-16 md:py-20">

          {/* Text column */}
          <div className="flex flex-col">
            <div className="feat-eyebrow inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 self-start" style={{
              background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)',
            }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }}/>
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Drone Features</span>
            </div>

            {['Smart Drone Technology', 'for Revolutionizing'].map(word => (
              <div key={word} className="overflow-hidden">
                <h1 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.02 }}>
                  <span className="feat-word inline-block">{word}</span>
                </h1>
              </div>
            ))}
            <div className="overflow-hidden mb-7">
              <h1 className="font-display font-bold" style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.02 }}>
                <span className="feat-word inline-block" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Industries
                </span>
              </h1>
            </div>

            <p className="feat-sub font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.125rem', maxWidth: 480 }}>
              ZenaDrone 1000 is an intelligent smart drone for commercial, industrial, and agricultural use — integrated with machine learning software and AI for precise navigation, with detachable hardware components customizable to unique business needs.
            </p>

            <div className="grid grid-cols-4 gap-2.5 mb-10">
              {STATS.map(s => (
                <div key={s.label} className="feat-stat flex flex-col gap-1 p-3 rounded-xl text-center" style={{
                  background: 'var(--surface-card-el)', border: '1px solid rgba(0,212,255,0.14)',
                }}>
                  <span className="font-display font-bold" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: '#00d4ff', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</span>
                  <span className="font-mono text-text-muted uppercase tracking-[0.12em]" style={{ fontSize: '0.46rem' }}>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.div className="feat-cta" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="#features-cta" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-sans font-semibold" style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)',
                  color: '#07070f', fontSize: '0.9rem',
                  boxShadow: '0 0 28px rgba(0,212,255,0.3)',
                }}>
                  Book A Service
                  <svg viewBox="0 0 16 16" fill="none" width={13} height={13}>
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </motion.div>
              <motion.div className="feat-cta" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="#features-cta" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-sans font-medium" style={{
                  background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.28)',
                  color: '#00d4ff', fontSize: '0.9rem',
                }}>
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Drone visual */}
          <div ref={droneRef} className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/14' }}>
            <OctaDroneSVG />
          </div>
        </div>

        {/* HUD badges */}
        <div className="flex flex-wrap gap-3 pb-10 -mt-4">
          {[
            { label: 'AI Active', sub: 'Multi-Industry', color: '#00d4ff' },
            { label: 'Auto Flight', sub: 'Enabled', color: '#fbbf24' },
            { label: 'Multispectral', sub: 'GPS Locked', color: '#34d399' },
          ].map(b => (
            <div key={b.label} className="feat-hud flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{
              background: 'var(--surface-card-el)', border: `1px solid ${b.color}20`,
              backdropFilter: 'blur(16px)',
            }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.color, boxShadow: `0 0 6px ${b.color}`, animation: 'featHudBlink 1.5s ease-in-out infinite' }}/>
              <div>
                <p className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.48rem', color: b.color, opacity: 0.65 }}>{b.sub}</p>
                <p className="font-display font-bold text-white" style={{ fontSize: '0.88rem', letterSpacing: '-0.02em' }}>{b.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <style>{`
        @keyframes featOrbFloat  { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.1)} }
        @keyframes featHudBlink  { 0%,100%{opacity:1} 50%{opacity:0.18} }
      `}</style>
    </section>
  )
}
