'use client'

import { useRef } from 'react'
import Image      from 'next/image'
import { Container } from '@/components/ui/Container'
import { FadeIn }    from '@/components/animations/FadeIn'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const FEATURES = [
  {
    color: '#00d4ff', title: 'Built to Endure',
    desc: 'Weatherproof airframe withstands harsh conditions — extreme temperatures, strong winds, and long operational hours.',
    icon: <svg viewBox="0 0 24 24" fill="none" width={18} height={18}><path d="M12 2 L20 7 L20 17 C20 20 16.4 22 12 23 C7.6 22 4 20 4 17 L4 7 Z" stroke="#00d4ff" strokeWidth={1.4} fill="rgba(0,212,255,0.08)" /><path d="M9 12.5 L11 14.5 L15.5 10" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    color: '#fbbf24', title: 'Thermal Imaging',
    desc: 'Precision infrared cameras identify overheating components, faulty insulators, and electrical anomalies instantly.',
    icon: <svg viewBox="0 0 24 24" fill="none" width={18} height={18}><circle cx="12" cy="12" r="5" stroke="#fbbf24" strokeWidth={1.3} /><circle cx="12" cy="12" r="2" fill="#fbbf24" opacity={0.8} /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#fbbf24" strokeWidth={1} strokeLinecap="round" opacity={0.4} /></svg>,
  },
  {
    color: '#34d399', title: 'Real-Time Monitoring',
    desc: 'Live encrypted video stream and sensor data delivered directly to maintenance teams for instant decision-making.',
    icon: <svg viewBox="0 0 24 24" fill="none" width={18} height={18}><rect x="2" y="4" width="20" height="14" rx="2" stroke="#34d399" strokeWidth={1.3} /><path d="M6 14 L9 9.5 L12 12 L15 7 L18 10" stroke="#34d399" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    color: '#a78bfa', title: 'Fully Customisable',
    desc: 'Adapt payload configurations, flight modes, and data outputs to fit any scale of power line inspection operation.',
    icon: <svg viewBox="0 0 24 24" fill="none" width={18} height={18}><circle cx="12" cy="12" r="3.5" stroke="#a78bfa" strokeWidth={1.3} /><path d="M12 2v3M12 19v3M3 12H2M22 12h-3M5 5l1.5 1.5M18.5 18.5 L17 17M5 19 l1.5-1.5M18.5 5.5 L17 7" stroke="#a78bfa" strokeWidth={1.2} strokeLinecap="round" opacity={0.5} /></svg>,
  },
]

const COUNTERS = [
  { end: 500,  suffix: '+',   label: 'Missions Completed',   color: '#00d4ff' },
  { end: 40,   suffix: '+',   label: 'Countries Deployed',   color: '#fbbf24' },
  { end: 99,   suffix: '.9%', label: 'Mission Success Rate', color: '#34d399' },
  { end: 10000, suffix: '+',  label: 'km Lines Inspected',   color: '#a78bfa' },
]

export function PLIWhyChoose() {
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

    iconRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, { boxShadow: `0 0 18px ${FEATURES[i].color}60`, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 + i * 0.2 })
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
    <section ref={sectionRef} id="why-choose" className="relative w-full bg-background py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)', boxShadow: '0 0 10px rgba(0,212,255,0.1)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(0,212,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 20%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 20%, transparent 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 28% 55%, rgba(0,212,255,0.04) 0%, transparent 65%)' }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'pliwcBlink 2s ease-in-out infinite' }} />
            <span className="font-mono font-bold uppercase tracking-[0.24em]" style={{ fontSize: '0.75rem', color: '#00d4ff' }}>Why ZenaDrone</span>
          </div>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.06 }}>
            Choose ZenaDrone 1000 For<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, #fbbf24 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Power Line Inspections</span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.05rem', maxWidth: 540, lineHeight: 1.7 }}>
            ZenaDrone 1000 is a leader in drone technology, making drone power line inspection easy and reliable with advanced tools, custom plans, and trusted results companies count on.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 xl:gap-24 items-center mb-20">

          {/* Left: image */}
          <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '1' }}>
              <Image src="/images/ZenaDrone-1000.webp" alt="ZenaDrone powerline inspection" fill className="object-cover" />
            </div>
          </div>

          {/* Right: features */}
          <div>
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-5" style={{ opacity: 0 }}>
              <div className="h-px w-10 flex-shrink-0" style={{ background: 'linear-gradient(to right, #00d4ff, transparent)' }} />
              <span className="font-mono font-bold uppercase tracking-[0.24em]" style={{ fontSize: '0.74rem', color: '#00d4ff' }}>Key Features</span>
            </div>
            <h3 ref={titleRef} className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)', letterSpacing: '-0.025em', lineHeight: 1.1, opacity: 0 }}>
              Features That<br /><span style={{ color: '#00d4ff' }}>Matter in the Field</span>
            </h3>
            <p ref={subtitleRef} className="font-sans text-text-muted leading-relaxed mb-6" style={{ fontSize: '0.95rem', maxWidth: 450, opacity: 0 }}>
              Our innovation of reliable drone power line inspection is built for tough jobs and delivers results you can count on — from remote mountain ranges to dense urban corridors.
            </p>
            <div ref={dividerRef} className="mb-7 origin-left" style={{ height: 1, background: 'linear-gradient(to right, rgba(0,212,255,0.55), transparent)', maxWidth: 200, opacity: 0.65, transform: 'scaleX(0)' }} />

            <div className="flex flex-col gap-3">
              {FEATURES.map((f, i) => (
                <div key={f.title} ref={el => { cardRefs.current[i] = el }}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.03]"
                  style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + '35'; e.currentTarget.style.boxShadow = `0 0 28px ${f.color}0a` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div ref={el => { iconRefs.current[i] = el }}
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${f.color}0e`, border: `1px solid ${f.color}28`, opacity: 0 }}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white mb-0.5" style={{ fontSize: '0.9rem' }}>{f.title}</h4>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.815rem', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                  <div className="flex-shrink-0 self-center w-1.5 h-1.5 rounded-full ml-auto" style={{ background: f.color, boxShadow: `0 0 6px ${f.color}` }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Counter bar */}
        <div className="relative rounded-2xl overflow-hidden p-8 md:p-10" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(251,191,36,0.05) 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
          <div className="absolute top-0 left-1/4 w-96 h-24 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, rgba(0,212,255,0.07) 0%, transparent 70%)' }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COUNTERS.map((c, i) => (
              <div key={c.label} className="flex flex-col items-center text-center">
                <span ref={el => { counterRefs.current[i] = el }} className="font-display font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: c.color, letterSpacing: '-0.05em', lineHeight: 1 }}>
                  0{c.suffix}
                </span>
                <div className="w-8 h-px my-2 rounded-full" style={{ background: c.color, opacity: 0.4 }} />
                <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.7rem' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes pliwcBlink { 0%,100% { opacity:.35; } 50% { opacity:1; } }
      `}</style>
    </section>
  )
}
