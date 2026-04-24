'use client'

import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { FadeIn }    from '@/components/animations/FadeIn'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const FEATURES = [
  {
    title: '24/7 Availability',
    desc: 'Our services are accessible around the clock, ensuring we are always here to support you whenever you need us.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <circle cx="12" cy="12" r="9" stroke="#00d4ff" strokeWidth={1.3} />
        <path d="M12 6v6l4 2" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'High-Quality Images',
    desc: 'Enjoy high-quality aerial images precisely when and where you need them — no compromise on resolution or accuracy.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <rect x="2" y="5" width="20" height="15" rx="2" stroke="#00d4ff" strokeWidth={1.3} />
        <circle cx="12" cy="12.5" r="3.5" stroke="#00d4ff" strokeWidth={1.2} />
        <circle cx="12" cy="12.5" r="1.4" fill="#00d4ff" opacity={0.8} />
      </svg>
    ),
  },
  {
    title: 'Tailored Solutions',
    desc: 'Connect with us, outline your needs, and witness how we craft a solution exclusively for your organisation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <circle cx="12" cy="12" r="3.5" stroke="#00d4ff" strokeWidth={1.3} />
        <path d="M12 2v3M12 19v3M3 12H2M22 12h-3M5 5l1.5 1.5M18.5 18.5 L17 17M5 19 l1.5-1.5M18.5 5.5 L17 7" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    title: 'Impactful Results',
    desc: 'Our team excels in delivering straightforward and impactful solutions for both organisational projects and specific requirements.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <path d="M5 15 L9 9 L12 12 L15 7 L19 11" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 18 L19 18" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
]

const COUNTERS = [
  { end: 40,   suffix: '+',  label: 'Countries Served'  },
  { end: 24,   suffix: '/7', label: 'Always Available'  },
  { end: 500,  suffix: '+',  label: 'Projects Completed'},
  { end: 100,  suffix: '%',  label: 'Cloud Secured'     },
]

export function SOGlobal() {
  const sectionRef  = useRef<HTMLElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const dividerRef  = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const iconRefs    = useRef<(HTMLDivElement | null)[]>([])
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
      defaults: { ease: 'power3.out' },
    })

    tl.fromTo(imageRef.current,
      { opacity: 0, x: -60, scale: 0.93, filter: 'blur(12px)' },
      { opacity: 1, x: 0,   scale: 1,    filter: 'blur(0px)', duration: 1.05 }, 0)
    tl.fromTo(eyebrowRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }, 0.38)
    tl.fromTo(titleRef.current,    { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.55 }, 0.50)
    tl.fromTo(subtitleRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.48 }, 0.62)
    tl.fromTo(dividerRef.current,  { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 0.72)
    tl.fromTo(cardRefs.current,
      { opacity: 0, x: 32, filter: 'blur(4px)' },
      { opacity: 1, x: 0,  filter: 'blur(0px)', duration: 0.45, stagger: 0.08 }, 0.80)
    tl.fromTo(iconRefs.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.36, stagger: 0.08, ease: 'back.out(2)' }, 0.85)

    iconRefs.current.forEach(el => {
      if (!el) return
      gsap.to(el, { boxShadow: '0 0 18px rgba(0,212,255,0.55)', duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 })
    })

    counterRefs.current.forEach((el, i) => {
      if (!el) return
      const c = COUNTERS[i]
      const obj = { val: 0 }
      gsap.to(obj, {
        val: c.end, duration: 1.8, ease: 'power2.out', delay: 1.1 + i * 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        onUpdate() { el.textContent = Math.round(obj.val) + c.suffix },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="global" className="relative w-full bg-surface py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)', boxShadow: '0 0 10px rgba(0,212,255,0.1)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(0,212,255,0.035) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 20%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 20%, transparent 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 28% 55%, rgba(0,212,255,0.035) 0%, transparent 65%)' }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'sogBlink 2s ease-in-out infinite' }} />
            <span className="font-mono font-bold uppercase tracking-[0.24em]" style={{ fontSize: '0.75rem', color: '#00d4ff' }}>Global Reach</span>
          </div>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.06 }}>
            Service Across<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, #ffffff 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>the Globe</span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.05rem', maxWidth: 540, lineHeight: 1.7 }}>
            Experience the ultimate in convenience and global availability with ZenaDrone 1000 — high-quality aerial images precisely when and where you need them.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 xl:gap-24 items-center mb-20">

          {/* Left: animated globe */}
          <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative rounded-2xl overflow-hidden flex items-center justify-center" style={{
              aspectRatio: '1',
              background: 'radial-gradient(circle at center, rgba(0,212,255,0.08) 0%, rgba(7,7,15,0.4) 60%, rgba(7,7,15,0.8) 100%)',
              border: '1px solid rgba(0,212,255,0.2)',
            }}>
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <svg viewBox="0 0 400 400" className="relative w-full h-full">
                <defs>
                  <radialGradient id="sogGlobeGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="rgba(0,212,255,0.25)" />
                    <stop offset="70%" stopColor="rgba(0,212,255,0.05)" />
                    <stop offset="100%" stopColor="rgba(0,212,255,0)" />
                  </radialGradient>
                  <linearGradient id="sogArc" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(0,212,255,0)" />
                    <stop offset="50%" stopColor="rgba(0,212,255,0.8)" />
                    <stop offset="100%" stopColor="rgba(0,212,255,0)" />
                  </linearGradient>
                </defs>

                {/* Glow halo */}
                <circle cx="200" cy="200" r="170" fill="url(#sogGlobeGrad)" />

                {/* Globe — outer sphere */}
                <circle cx="200" cy="200" r="130" fill="rgba(0,212,255,0.025)" stroke="rgba(0,212,255,0.45)" strokeWidth="1.3" />

                {/* Latitude lines */}
                <ellipse cx="200" cy="200" rx="130" ry="42" fill="none" stroke="rgba(0,212,255,0.22)" strokeWidth="1" />
                <ellipse cx="200" cy="200" rx="130" ry="85" fill="none" stroke="rgba(0,212,255,0.18)" strokeWidth="1" />
                <ellipse cx="200" cy="200" rx="130" ry="115" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1" />

                {/* Rotating longitude group — simulates spinning globe */}
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="28s" repeatCount="indefinite" />
                  <ellipse cx="200" cy="200" rx="42" ry="130" fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
                  <ellipse cx="200" cy="200" rx="85" ry="130" fill="none" stroke="rgba(0,212,255,0.24)" strokeWidth="1" />
                  <ellipse cx="200" cy="200" rx="115" ry="130" fill="none" stroke="rgba(0,212,255,0.18)" strokeWidth="1" />
                  <line x1="200" y1="70" x2="200" y2="330" stroke="rgba(0,212,255,0.35)" strokeWidth="1.2" />
                </g>

                {/* Connection arcs (data routes) */}
                <path d="M 105 165 Q 200 60 295 165" fill="none" stroke="url(#sogArc)" strokeWidth="1.6" opacity="0.75">
                  <animate attributeName="stroke-dasharray" values="0 400;400 0" dur="3.5s" repeatCount="indefinite" />
                </path>
                <path d="M 135 260 Q 200 340 285 255" fill="none" stroke="url(#sogArc)" strokeWidth="1.6" opacity="0.7">
                  <animate attributeName="stroke-dasharray" values="0 400;400 0" dur="4s" begin="0.8s" repeatCount="indefinite" />
                </path>
                <path d="M 90 210 Q 200 140 310 205" fill="none" stroke="url(#sogArc)" strokeWidth="1.4" opacity="0.6">
                  <animate attributeName="stroke-dasharray" values="0 400;400 0" dur="4.5s" begin="1.4s" repeatCount="indefinite" />
                </path>

                {/* Location pins */}
                {[
                  { x: 105, y: 165, delay: '0s',   label: 'AMER' },
                  { x: 200, y: 130, delay: '0.4s' },
                  { x: 295, y: 165, delay: '0.8s', label: 'EMEA' },
                  { x: 285, y: 255, delay: '1.2s', label: 'APAC' },
                  { x: 135, y: 260, delay: '1.6s' },
                  { x: 165, y: 305, delay: '2s' },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="10" fill="rgba(0,212,255,0.15)">
                      <animate attributeName="r" values="6;16;6" dur="2.4s" begin={p.delay} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" begin={p.delay} repeatCount="indefinite" />
                    </circle>
                    <circle cx={p.x} cy={p.y} r="4.5" fill="#00d4ff" stroke="rgba(7,7,15,0.8)" strokeWidth="1.5">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin={p.delay} repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}

                {/* Traveling data pulses */}
                <circle r="3" fill="#00d4ff">
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M 105 165 Q 200 60 295 165" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#34d399">
                  <animateMotion dur="4s" begin="0.8s" repeatCount="indefinite" path="M 135 260 Q 200 340 285 255" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="4s" begin="0.8s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#fbbf24">
                  <animateMotion dur="4.5s" begin="1.4s" repeatCount="indefinite" path="M 90 210 Q 200 140 310 205" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" begin="1.4s" repeatCount="indefinite" />
                </circle>

                {/* Orbiting drone icon */}
                <g>
                  <animateMotion dur="14s" repeatCount="indefinite" path="M 200 50 A 150 150 0 1 1 199 50 Z" rotate="auto" />
                  <g transform="rotate(90)">
                    <circle r="12" fill="rgba(7,7,15,0.85)" stroke="#00d4ff" strokeWidth="1.2" />
                    <line x1="-7" y1="0" x2="7" y2="0" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="0" y1="-7" x2="0" y2="7" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="0" cy="0" r="2" fill="#00d4ff" />
                  </g>
                </g>
              </svg>

              {/* Status badges */}
              <div className="absolute top-5 right-5 px-3 py-2 rounded-xl z-20 flex items-center gap-2" style={{ background: 'rgba(7,7,15,0.85)', border: '1px solid rgba(52,211,153,0.35)', backdropFilter: 'blur(10px)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#34d399', animation: 'sogBlink 1.6s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.66rem', color: '#34d399' }}>24/7 Online</span>
              </div>
              <div className="absolute bottom-5 left-5 px-3 py-2 rounded-xl z-20" style={{ background: 'rgba(7,7,15,0.85)', border: '1px solid rgba(0,212,255,0.3)', backdropFilter: 'blur(10px)' }}>
                <span className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.66rem', color: '#00d4ff' }}>Global Network</span>
              </div>
            </div>
          </div>

          {/* Right: features */}
          <div>
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-5" style={{ opacity: 0 }}>
              <div className="h-px w-10 flex-shrink-0" style={{ background: 'linear-gradient(to right, #00d4ff, transparent)' }} />
              <span className="font-mono font-bold uppercase tracking-[0.24em]" style={{ fontSize: '0.74rem', color: '#00d4ff' }}>Why Choose ZenaDrone</span>
            </div>
            <h3 ref={titleRef} className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)', letterSpacing: '-0.025em', lineHeight: 1.1, opacity: 0 }}>
              Wherever You Are,<br /><span style={{ color: '#00d4ff' }}>We Are There</span>
            </h3>
            <p ref={subtitleRef} className="font-sans text-text-muted leading-relaxed mb-6" style={{ fontSize: '0.95rem', maxWidth: 450, opacity: 0 }}>
              Connect with us today, outline your needs, and witness how we craft a solution exclusively for you. Elevate your expectations with ZenaDrone 1000.
            </p>
            <div ref={dividerRef} className="mb-7 origin-left" style={{ height: 1, background: 'linear-gradient(to right, rgba(0,212,255,0.55), transparent)', maxWidth: 200, opacity: 0.65, transform: 'scaleX(0)' }} />

            <div className="flex flex-col gap-3">
              {FEATURES.map((f, i) => (
                <div key={f.title} ref={el => { cardRefs.current[i] = el }}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.03]"
                  style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(0,212,255,0.07)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div ref={el => { iconRefs.current[i] = el }}
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)', opacity: 0 }}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white mb-0.5" style={{ fontSize: '0.9rem' }}>{f.title}</h4>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.815rem', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                  <div className="flex-shrink-0 self-center w-1.5 h-1.5 rounded-full ml-auto" style={{ background: '#00d4ff', boxShadow: '0 0 6px rgba(0,212,255,0.8)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Counter bar */}
        <div className="relative rounded-2xl overflow-hidden p-8 md:p-10" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(0,212,255,0.03) 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
          <div className="absolute top-0 left-1/4 w-96 h-24 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, rgba(0,212,255,0.07) 0%, transparent 70%)' }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COUNTERS.map((c, i) => (
              <div key={c.label} className="flex flex-col items-center text-center">
                <span ref={el => { counterRefs.current[i] = el }} className="font-display font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#00d4ff', letterSpacing: '-0.05em', lineHeight: 1 }}>
                  0{c.suffix}
                </span>
                <div className="w-8 h-px my-2 rounded-full" style={{ background: '#00d4ff', opacity: 0.35 }} />
                <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.7rem' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes sogBlink { 0%,100% { opacity:.35; } 50% { opacity:1; } }
      `}</style>
    </section>
  )
}
