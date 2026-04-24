'use client'

import { useRef } from 'react'
import Image      from 'next/image'
import { Container } from '@/components/ui/Container'
import { FadeIn }    from '@/components/animations/FadeIn'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const FEATURES = [
  {
    title: 'Autonomous Charging',
    desc: 'Enables continuous operations with minimal downtime. The drone automatically returns to its charging station, ready for the next mission without manual intervention.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <path d="M5 12 Q5 5 12 5 Q19 5 19 12 Q19 17 15 19" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <path d="M8 16 L12 12 L12 16 L16 12" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'AI-Driven Awareness',
    desc: 'Enhanced perception of battlefield environments powered by onboard machine learning — object detection, threat classification, and autonomous navigation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#00d4ff" strokeWidth={1.3} />
        <circle cx="12" cy="12" r="4" stroke="#00d4ff" strokeWidth={1.2} />
        <circle cx="12" cy="12" r="1.5" fill="#00d4ff" opacity={0.8} />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
  {
    title: 'Modular Design',
    desc: 'Customisable for diverse military and humanitarian use cases. Swap payloads in the field — from thermal cameras and LiDAR to EW systems and communications relay.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#00d4ff" strokeWidth={1.3} />
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="#00d4ff" strokeWidth={1.3} />
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="#00d4ff" strokeWidth={1.3} />
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="#00d4ff" strokeWidth={0.7} strokeDasharray="2 2" />
        <text x="16.5" y="20.5" fill="#00d4ff" fontSize="8" fontFamily="monospace" opacity={0.55}>+</text>
      </svg>
    ),
  },
  {
    title: 'Military-Grade Reliability',
    desc: 'Built with military-grade durability and tested in extreme environments — dust, rain, high altitude, and intense thermal conditions. Engineered for when failure is not an option.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <path d="M12 2 L20 6 L20 14 C20 17.3 16.4 20 12 21 C7.6 20 4 17.3 4 14 L4 6 Z" stroke="#00d4ff" strokeWidth={1.4} fill="rgba(0,212,255,0.07)" />
        <path d="M9 11.5 L11 13.5 L15.5 9" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const COUNTERS = [
  { end: 500,  suffix: '+',  label: 'Missions Completed'  },
  { end: 40,   suffix: '+',  label: 'Countries Deployed'  },
  { end: 99,   suffix: '.9%',label: 'Mission Success Rate'},
  { end: 1,    suffix: 'hr', label: 'Autonomous Flight'   },
]

export function MDWhyChoose() {
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
      { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', duration: 1.05 }, 0)
    tl.fromTo(eyebrowRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }, 0.38)
    tl.fromTo(titleRef.current,    { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.55 }, 0.50)
    tl.fromTo(subtitleRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.48 }, 0.62)
    tl.fromTo(dividerRef.current,  { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 0.72)
    tl.fromTo(cardRefs.current,
      { opacity: 0, x: 32, filter: 'blur(4px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.45, stagger: 0.08 }, 0.80)
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
    <section ref={sectionRef} id="why-choose" className="relative w-full bg-surface py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)', boxShadow: '0 0 10px rgba(0,212,255,0.1)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(0,212,255,0.035) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 20%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 20%, transparent 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 28% 55%, rgba(0,212,255,0.04) 0%, transparent 65%)' }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'mdwcBlink 2s ease-in-out infinite' }} />
            <span className="font-mono font-bold uppercase tracking-[0.24em]" style={{ fontSize: '0.75rem', color: '#00d4ff' }}>Why ZenaDrone 1000</span>
          </div>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.06 }}>
            Invest in a<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, #ffffff 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smarter Battlefield</span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.05rem', maxWidth: 540, lineHeight: 1.7 }}>
            ZenaDrone is not just innovating defense technology — it&apos;s shaping the future of warfare. Whether you&apos;re a defense strategist or an investor, ZenaDrone 1000 offers a compelling value proposition.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 xl:gap-24 items-center mb-20">

          {/* Left: image overlay */}
          <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '1' }}>
              <Image src="/images/ZenaDrone-1000.webp" alt="ZenaDrone 1000 military operations" fill className="object-cover" />
            </div>
          </div>

          {/* Right: features */}
          <div>
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-5" style={{ opacity: 0 }}>
              <div className="h-px w-10 flex-shrink-0" style={{ background: 'linear-gradient(to right, #00d4ff, transparent)' }} />
              <span className="font-mono font-bold uppercase tracking-[0.24em]" style={{ fontSize: '0.74rem', color: '#00d4ff' }}>Key Capabilities</span>
            </div>
            <h3 ref={titleRef} className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)', letterSpacing: '-0.025em', lineHeight: 1.1, opacity: 0 }}>
              Built for<br /><span style={{ color: '#00d4ff' }}>Extreme Operations</span>
            </h3>
            <p ref={subtitleRef} className="font-sans text-text-muted leading-relaxed mb-6" style={{ fontSize: '0.95rem', maxWidth: 450, opacity: 0 }}>
              Every specification, sensor, and software feature is engineered around the demands of real defense operations in the most challenging environments on Earth.
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
        @keyframes mdwcBlink { 0%,100% { opacity:.35; } 50% { opacity:1; } }
      `}</style>
    </section>
  )
}
