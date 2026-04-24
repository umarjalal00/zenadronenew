'use client'

import { useRef } from 'react'
import Image      from 'next/image'
import { Container } from '@/components/ui/Container'
import { FadeIn }    from '@/components/animations/FadeIn'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

// ─── Data ─────────────────────────────────────────────────────────────────────

const DIFFERENTIATORS = [
  {
    num: '01', color: '#00d4ff',
    title: 'Strict Compliance Standards',
    desc: 'Every ZenaDrone deployment meets enterprise and government compliance requirements — from airspace regulations to data handling protocols — ensuring operations run without legal friction.',
    stat: 'ISO Certified',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 3 L22 7 L22 17 C22 21.4 18.4 25 14 26 C9.6 25 6 21.4 6 17 L6 7 Z"
          stroke="#00d4ff" strokeWidth={1.4} fill="rgba(0,212,255,0.08)" />
        <path d="M9.5 14 L12 16.5 L18.5 10"
          stroke="#00d4ff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '02', color: '#a78bfa',
    title: 'Secure Data Management',
    desc: 'End-to-end encryption protects all captured data from drone to dashboard. Role-based access, audit trails, and immutable storage ensure your intelligence stays yours.',
    stat: 'AES-256 Encrypted',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="5" y="12" width="18" height="13" rx="2.5" stroke="#a78bfa" strokeWidth={1.4} />
        <path d="M9 12V8.5a5 5 0 0110 0V12" stroke="#a78bfa" strokeWidth={1.4} strokeLinecap="round" />
        <circle cx="14" cy="18.5" r="2" fill="#a78bfa" opacity={0.85} />
        <line x1="14" y1="20.5" x2="14" y2="22.5" stroke="#a78bfa" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03', color: '#34d399',
    title: 'Enterprise-Grade Scalability',
    desc: 'Whether managing a single inspection site or a global multi-site operation, ZenaDrone scales seamlessly. The same platform supports both a solo pilot and a fleet of 100+ drones.',
    stat: '100+ Drone Fleets',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="2" y="18" width="7" height="8" rx="1.5" stroke="#34d399" strokeWidth={1.4} fill="rgba(52,211,153,0.08)" />
        <rect x="10.5" y="12" width="7" height="14" rx="1.5" stroke="#34d399" strokeWidth={1.4} fill="rgba(52,211,153,0.08)" />
        <rect x="19" y="5" width="7" height="21" rx="1.5" stroke="#34d399" strokeWidth={1.4} fill="rgba(52,211,153,0.08)" />
        <path d="M5.5 14 Q8.5 11.5 14 11.5 Q19.5 11.5 22.5 7" stroke="#34d399" strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    num: '04', color: '#fbbf24',
    title: 'Consistent Cross-Industry Performance',
    desc: 'Validated across agriculture, construction, defense, utilities, and smart cities. ZenaDrone\'s platform maintains peak performance regardless of terrain, climate, or operational complexity.',
    stat: '6+ Industries',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="14" r="10" stroke="#fbbf24" strokeWidth={1.3} fill="rgba(251,191,36,0.06)" />
        <circle cx="14" cy="14" r="5"  stroke="#fbbf24" strokeWidth={1}   opacity={0.4} strokeDasharray="3 4" />
        <path d="M8 14 L11 17 L20 9"
          stroke="#fbbf24" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const COUNTERS = [
  { end: 500, suffix: '+', label: 'Missions Completed',  color: '#00d4ff' },
  { end: 40,  suffix: '+', label: 'Countries Served',    color: '#a78bfa' },
  { end: 99,  suffix: '.9%',label: 'Uptime Reliability', color: '#34d399' },
  { end: 24,  suffix: 'h', label: 'Support Response',    color: '#fbbf24' },
]

// ─── Radar rings (reused ZD1000 pattern) ──────────────────────────────────────

function RadarRings() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="absolute inset-0 w-full h-full pointer-events-none edcwc-radar">
      {[210, 175, 135, 92].map((r, i) => (
        <circle key={r} cx={250} cy={250} r={r}
          stroke="#00d4ff" strokeWidth={i === 0 ? 0.5 : 0.35}
          strokeDasharray={i % 2 === 0 ? '5 8' : '2 10'}
          opacity={0.11 - i * 0.02}
        />
      ))}
      <line x1={250} y1={250} x2={250} y2={42}
        stroke="#00d4ff" strokeWidth={1} opacity={0.28}
        className="edcwc-sweep" style={{ transformOrigin: '250px 250px' }} />
      <line x1={50}  y1={250} x2={450} y2={250} stroke="#00d4ff" strokeWidth={0.35} opacity={0.07} />
      <line x1={250} y1={50}  x2={250} y2={450} stroke="#00d4ff" strokeWidth={0.35} opacity={0.07} />
      {Array.from({ length: 12 }).map((_, k) => {
        const a = (k * 30 - 90) * Math.PI / 180
        return (
          <line key={k}
            x1={250 + 198 * Math.cos(a)} y1={250 + 198 * Math.sin(a)}
            x2={250 + 210 * Math.cos(a)} y2={250 + 210 * Math.sin(a)}
            stroke="#00d4ff" strokeWidth={k % 3 === 0 ? 1 : 0.5} opacity={0.18}
          />
        )
      })}
    </svg>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function EDCWhyChoose() {
  const sectionRef  = useRef<HTMLElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const iconRefs    = useRef<(HTMLDivElement | null)[]>([])
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const dividerRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
      defaults: { ease: 'power3.out' },
    })

    // Drone visual flies in from left
    tl.fromTo(imageRef.current,
      { opacity: 0, x: -60, scale: 0.93, filter: 'blur(12px)' },
      { opacity: 1, x: 0,   scale: 1,    filter: 'blur(0px)', duration: 1.05 },
      0,
    )

    // Right column text staggers in
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }, 0.38,
    )
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.55 }, 0.50,
    )
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.48 }, 0.62,
    )
    tl.fromTo(dividerRef.current,
      { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 0.72,
    )

    // Cards stagger in from right
    tl.fromTo(cardRefs.current,
      { opacity: 0, x: 32, filter: 'blur(4px)' },
      { opacity: 1, x: 0,  filter: 'blur(0px)', duration: 0.48, stagger: 0.09 },
      0.80,
    )

    // Icon chips pop
    tl.fromTo(iconRefs.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.38, stagger: 0.09, ease: 'back.out(2)' },
      0.85,
    )

    // Continuous icon pulse
    iconRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, {
        boxShadow: `0 0 18px ${DIFFERENTIATORS[i].color}60`,
        duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1,
        delay: 1.6 + i * 0.22,
      })
    })

    // Counter count-up
    counterRefs.current.forEach((el, i) => {
      if (!el) return
      const c = COUNTERS[i]
      const obj = { val: 0 }
      gsap.to(obj, {
        val: c.end, duration: 1.8, ease: 'power2.out',
        delay: 1.1 + i * 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        onUpdate() { el.textContent = Math.round(obj.val) + c.suffix },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className="relative w-full bg-surface py-24 md:py-36 overflow-hidden"
    >
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 55% at 28% 55%, rgba(0,212,255,0.05) 0%, transparent 65%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 50% at 80% 40%, rgba(167,139,250,0.05) 0%, transparent 65%)',
      }} />

      <Container>

        {/* ── Section header ────────────────────────────────────────────────── */}
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6" style={{
            background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.18)',
          }}>
            <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: 'edcwcBlink 2s ease-in-out infinite' }} />
            <span className="font-mono font-bold text-primary uppercase tracking-[0.24em]" style={{ fontSize: '0.75rem' }}>
              Why ZenaDrone
            </span>
          </div>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.06 }}>
            The Platform Built for<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, #a78bfa 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Enterprise Performance
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.05rem', maxWidth: 560, lineHeight: 1.7 }}>
            Industries require technology that delivers accuracy, reliability, and performance at scale. ZenaDrone meets these demands through sophisticated systems trusted by enterprise and government clients worldwide.
          </p>
        </FadeIn>

        {/* ── Main two-column layout ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 xl:gap-24 items-center mb-20">

          {/* Left: Drone visual */}
          <div ref={imageRef} className="relative flex items-center justify-center" style={{ opacity: 0 }}>

            {/* Radar rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[460px] h-[460px] relative">
                <RadarRings />
              </div>
            </div>

            {/* Spinning rings */}
            <div className="absolute w-[430px] h-[430px] rounded-full edcwc-ring1" style={{ border: '1px solid rgba(0,212,255,0.1)' }} />
            <div className="absolute w-[340px] h-[340px] rounded-full edcwc-ring2" style={{ border: '1px solid rgba(0,212,255,0.06)' }} />

            {/* Center glow */}
            <div className="absolute w-[250px] h-[250px] rounded-full" style={{
              background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.09) 0%, transparent 70%)',
              animation: 'edcwcGlow 3.5s ease-in-out infinite',
            }} />

            {/* Drone image */}
            <div className="relative z-10 w-[520px] h-[520px]" style={{ animation: 'edcwcFloat 4.5s ease-in-out infinite' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-5 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(0,212,255,0.22) 0%, transparent 70%)',
                filter: 'blur(8px)',
                animation: 'edcwcShadow 4.5s ease-in-out infinite',
              }} />
              <Image
                src="/images/Advanced-UAV-Technology.png"
                alt="ZenaDrone enterprise-grade UAV"
                fill
                className="object-contain"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(0,212,255,0.22)) drop-shadow(0 0 30px rgba(0,212,255,0.12))' }}
              />
            </div>

            {/* HUD — top-right */}
            <div className="absolute right-0 top-[18%] px-3.5 py-3 rounded-xl z-20" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(52,211,153,0.28)',
              backdropFilter: 'blur(14px)',
              animation: 'edcwcHudFloat 5s ease-in-out infinite',
            }}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'edcwcBlink 1.6s ease-in-out infinite' }} />
                <span className="font-mono font-bold text-emerald-400 uppercase tracking-[0.18em]" style={{ fontSize: '0.68rem' }}>System Status</span>
              </div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.7rem', color: 'rgba(52,211,153,0.75)' }}>
                <div>COMPLIANCE: <span className="text-white">VERIFIED</span></div>
                <div>ENCRYPTION: <span className="text-white">AES-256</span></div>
                <div>UPTIME: <span className="text-white">99.9%</span></div>
              </div>
            </div>

            {/* HUD — bottom-left */}
            <div className="absolute left-0 bottom-[22%] px-3.5 py-3 rounded-xl z-20" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(167,139,250,0.25)',
              backdropFilter: 'blur(14px)',
              animation: 'edcwcHudFloat2 6s ease-in-out infinite',
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.7rem', color: '#a78bfa' }}>
                <div>FLEET: <span className="text-white">ONLINE</span></div>
                <div>MISSIONS: <span className="text-white">500+</span></div>
              </div>
            </div>
          </div>

          {/* Right: Differentiators */}
          <div>
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-5" style={{ opacity: 0 }}>
              <div className="h-px w-10 flex-shrink-0" style={{ background: 'linear-gradient(to right, #00d4ff, transparent)' }} />
              <span className="font-mono font-bold text-primary uppercase tracking-[0.26em]" style={{ fontSize: '0.75rem' }}>
                Our Commitment
              </span>
            </div>

            <h3
              ref={titleRef}
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.025em', lineHeight: 1.1, opacity: 0 }}
            >
              Built Different.<br />
              <span className="text-primary">Proven at Scale.</span>
            </h3>

            <p
              ref={subtitleRef}
              className="font-sans text-text-muted leading-relaxed mb-6"
              style={{ fontSize: '0.95rem', maxWidth: 460, opacity: 0 }}
            >
              Built on strict compliance standards, ZenaDrone ensures secure drone data management from capture to processing — a trusted solution for organizations that cannot afford to compromise.
            </p>

            <div ref={dividerRef} className="mb-7 origin-left" style={{
              height: 1,
              background: 'linear-gradient(to right, rgba(0,212,255,0.55), transparent)',
              maxWidth: 220, opacity: 0.65, transform: 'scaleX(0)',
            }} />

            {/* Differentiator cards */}
            <div className="flex flex-col gap-3">
              {DIFFERENTIATORS.map((d, i) => (
                <div
                  key={d.num}
                  ref={el => { cardRefs.current[i] = el }}
                  className="group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-default"
                  style={{
                    background: 'var(--surface-elevated)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    opacity: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = d.color + '35'
                    e.currentTarget.style.background   = d.color + '08'
                    e.currentTarget.style.boxShadow    = `0 0 32px ${d.color}0a`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.background   = 'var(--surface-elevated)'
                    e.currentTarget.style.boxShadow    = 'none'
                  }}
                >
                  {/* Icon */}
                  <div
                    ref={el => { iconRefs.current[i] = el }}
                    className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      width: 44, height: 44,
                      background: `${d.color}0e`,
                      border: `1px solid ${d.color}28`,
                      opacity: 0,
                    }}
                  >
                    {d.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="font-mono font-bold" style={{ fontSize: '0.6rem', color: d.color + 'aa' }}>{d.num}</span>
                      <h4 className="font-sans font-semibold text-white" style={{ fontSize: '0.9rem' }}>{d.title}</h4>
                    </div>
                    <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.805rem' }}>{d.desc}</p>
                  </div>

                  {/* Stat badge */}
                  <div className="flex-shrink-0 self-start px-2.5 py-1 rounded-lg" style={{
                    background: `${d.color}0d`, border: `1px solid ${d.color}25`,
                  }}>
                    <span className="font-mono font-bold whitespace-nowrap" style={{ fontSize: '0.65rem', color: d.color }}>{d.stat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Animated counter bar ──────────────────────────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden p-8 md:p-10" style={{
          background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(167,139,250,0.05) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}>
          {/* Subtle inner glow */}
          <div className="absolute top-0 left-1/4 w-96 h-32 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at top, rgba(0,212,255,0.07) 0%, transparent 70%)',
          }} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COUNTERS.map((c, i) => (
              <div key={c.label} className="flex flex-col items-center text-center">
                <div className="flex items-end gap-0.5 mb-2">
                  <span
                    ref={el => { counterRefs.current[i] = el }}
                    className="font-display font-bold"
                    style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: c.color, letterSpacing: '-0.05em', lineHeight: 1 }}
                  >
                    0{c.suffix}
                  </span>
                </div>
                <div className="w-8 h-px mb-2 rounded-full" style={{ background: c.color, opacity: 0.4 }} />
                <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.7rem' }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </Container>

      <style>{`
        .edcwc-ring1   { animation: edcwcSpin 22s linear infinite; }
        .edcwc-ring2   { animation: edcwcSpin 14s linear infinite reverse; }
        .edcwc-radar   { animation: edcwcSpin 32s linear infinite; }
        .edcwc-sweep   { animation: edcwcSpin 5s linear infinite; }

        @keyframes edcwcSpin    { to { transform: rotate(360deg); } }
        @keyframes edcwcFloat   { 0%,100% { transform: translateY(0); }    50% { transform: translateY(-16px); } }
        @keyframes edcwcShadow  { 0%,100% { opacity:.55; transform:translateX(-50%) scaleX(1); } 50% { opacity:.28; transform:translateX(-50%) scaleX(.75); } }
        @keyframes edcwcGlow    { 0%,100% { opacity:.45; transform:scale(1); } 50% { opacity:.85; transform:scale(1.1); } }
        @keyframes edcwcBlink   { 0%,100% { opacity:.35; } 50% { opacity:1; } }
        @keyframes edcwcHudFloat  { 0%,100% { transform:translateY(0); }  50% { transform:translateY(-6px); } }
        @keyframes edcwcHudFloat2 { 0%,100% { transform:translateY(0); }  50% { transform:translateY(6px); } }
      `}</style>
    </section>
  )
}
