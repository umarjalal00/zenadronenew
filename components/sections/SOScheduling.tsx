'use client'

import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { FadeIn }    from '@/components/animations/FadeIn'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const STEPS = [
  {
    num: '01',
    title: 'Submit Your Request',
    desc: 'A quick request to our technical team sets the process in motion. Share your project details — location, scope, frequency, and objectives — and leave the rest to us.',
    tags: ['Online Portal', 'API Access', 'Direct Contact', '24/7 Intake'],
    anim: 'submit' as const,
  },
  {
    num: '02',
    title: 'Tailored Service Planning',
    desc: 'Our dedicated team reviews your requirements and selects the ideal drone service tailored to your needs. We recognise the significance of aerial data for your business and plan accordingly.',
    tags: ['Needs Assessment', 'Route Planning', 'Payload Selection', 'Schedule Setup'],
    anim: 'planning' as const,
  },
  {
    num: '03',
    title: 'Drone Deployment',
    desc: 'ZenaDrone deploys for your field scans or project. Live updates are streamed to your dashboard and all captured data is securely uploaded to your cloud storage immediately after each mission.',
    tags: ['Live Streaming', 'Instant Upload', 'Secure Cloud', 'Team Alerts'],
    anim: 'deploy' as const,
  },
]

function StepAnim({ variant }: { variant: 'submit' | 'planning' | 'deploy' }) {
  if (variant === 'submit') {
    return (
      <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="soFormGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(0,212,255,0.12)" />
            <stop offset="100%" stopColor="rgba(0,212,255,0.02)" />
          </linearGradient>
        </defs>
        <rect x="60" y="35" width="280" height="180" rx="12" fill="url(#soFormGrad)" stroke="rgba(0,212,255,0.35)" strokeWidth="1.2" />
        <rect x="80" y="55" width="120" height="9" rx="2" fill="rgba(0,212,255,0.35)" />
        <rect x="80" y="80" width="240" height="22" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(0,212,255,0.18)" strokeWidth="1" />
        <line x1="90" y1="91" x2="160" y2="91" stroke="rgba(0,212,255,0.5)" strokeWidth="1.2">
          <animate attributeName="x2" values="90;220;90" dur="3.2s" repeatCount="indefinite" />
        </line>
        <rect x="80" y="112" width="240" height="22" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(0,212,255,0.18)" strokeWidth="1" />
        <line x1="90" y1="123" x2="140" y2="123" stroke="rgba(0,212,255,0.4)" strokeWidth="1.2">
          <animate attributeName="x2" values="90;200;90" dur="3.6s" begin="0.4s" repeatCount="indefinite" />
        </line>
        <rect x="80" y="144" width="110" height="22" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(0,212,255,0.18)" strokeWidth="1" />
        <rect x="200" y="144" width="120" height="22" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(0,212,255,0.18)" strokeWidth="1" />
        <rect x="220" y="180" width="100" height="28" rx="6" fill="#00d4ff">
          <animate attributeName="opacity" values="0.75;1;0.75" dur="1.6s" repeatCount="indefinite" />
        </rect>
        <text x="270" y="199" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill="#07070f">SUBMIT</text>
        <g>
          <circle r="3.5" fill="#00d4ff">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 150 195 Q 200 160 270 194" />
            <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    )
  }

  if (variant === 'planning') {
    return (
      <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="soMapGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect x="40" y="25" width="320" height="200" rx="12" fill="rgba(0,212,255,0.02)" stroke="rgba(0,212,255,0.22)" strokeWidth="1.2" />
        <rect x="40" y="25" width="320" height="200" rx="12" fill="url(#soMapGrid)" />
        <path d="M 70 180 Q 130 80 200 140 T 330 70" fill="none" stroke="rgba(0,212,255,0.6)" strokeWidth="2.2" strokeDasharray="6 4" strokeLinecap="round">
          <animate attributeName="stroke-dashoffset" values="0;-40" dur="2.5s" repeatCount="indefinite" />
        </path>
        <circle cx="70" cy="180" r="6" fill="#00d4ff">
          <animate attributeName="r" values="6;9;6" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="140" r="5" fill="#fbbf24">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="330" cy="70" r="6" fill="#34d399">
          <animate attributeName="r" values="6;10;6" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
        <g transform="translate(70, 180)">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 0 0 Q 60 -100 130 -40 T 260 -110" rotate="auto" />
          <g transform="rotate(0)">
            <circle r="10" fill="rgba(0,212,255,0.12)" stroke="#00d4ff" strokeWidth="1.3" />
            <path d="M -4 0 L 4 0 M 0 -4 L 0 4" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
        <rect x="270" y="40" width="80" height="28" rx="5" fill="rgba(7,7,15,0.75)" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
        <circle cx="283" cy="54" r="3" fill="#34d399">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <text x="292" y="58" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="#00d4ff">PLANNING</text>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="soRadarGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.18)" />
          <stop offset="100%" stopColor="rgba(0,212,255,0)" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="135" r="95" fill="url(#soRadarGrad)" />
      <circle cx="200" cy="135" r="95" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
      <circle cx="200" cy="135" r="65" fill="none" stroke="rgba(0,212,255,0.18)" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="200" cy="135" r="35" fill="none" stroke="rgba(0,212,255,0.16)" strokeWidth="1" />
      <g transform="translate(200, 135)">
        <path d="M 0 0 L 95 0 A 95 95 0 0 0 67 -67 Z" fill="rgba(0,212,255,0.15)">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3.5s" repeatCount="indefinite" />
        </path>
      </g>
      <g>
        <g>
          <circle r="4" cx="240" cy="95" fill="#00d4ff">
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </g>
        <g>
          <circle r="3" cx="155" cy="175" fill="#34d399">
            <animate attributeName="opacity" values="0;1;0" dur="2.8s" begin="0.6s" repeatCount="indefinite" />
          </circle>
        </g>
        <g>
          <circle r="3" cx="260" cy="165" fill="#fbbf24">
            <animate attributeName="opacity" values="0;1;0" dur="2.2s" begin="1.1s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
      <g transform="translate(200, 135)" style={{ transformOrigin: 'center' }}>
        <animateTransform attributeName="transform" type="translate" values="200,130; 200,140; 200,130" dur="3s" repeatCount="indefinite" />
        <line x1="-26" y1="0" x2="26" y2="0" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="-26" x2="0" y2="26" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="-26" cy="0" r="8" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1.2" />
        <circle cx="26"  cy="0" r="8" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1.2" />
        <circle cx="0" cy="-26" r="8" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1.2" />
        <circle cx="0" cy="26"  r="8" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="6" fill="#00d4ff" />
        <circle cx="-26" cy="0" r="3" fill="rgba(0,212,255,0.9)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="26" cy="0" r="3" fill="rgba(0,212,255,0.9)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" begin="0.12s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="-26" r="3" fill="rgba(0,212,255,0.9)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" begin="0.24s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="26" r="3" fill="rgba(0,212,255,0.9)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" begin="0.36s" repeatCount="indefinite" />
        </circle>
      </g>
      <rect x="295" y="35" width="75" height="26" rx="5" fill="rgba(7,7,15,0.78)" stroke="rgba(52,211,153,0.35)" strokeWidth="1" />
      <circle cx="307" cy="48" r="3" fill="#34d399">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <text x="316" y="52" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="#34d399">LIVE FEED</text>
    </svg>
  )
}

export function SOScheduling() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    STEPS.forEach((_, i) => {
      const row = sectionRef.current?.querySelectorAll('.sosched-row')[i]
      if (!row) return
      gsap.fromTo(row,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 78%', once: true } }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="scheduling" className="relative w-full bg-background py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)' }} />

      <div className="absolute right-0 top-1/4 pointer-events-none" style={{ width: 500, height: 500, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.04) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%' }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Easy Scheduling</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Experience the Utmost{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Convenience
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>
            Scheduling ZenaDrone surveillance services is seamless. Share your project details and enjoy a smooth, stress-free experience — courtesy of ZenaDrone.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-12">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`sosched-row grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
              style={{ opacity: 0 }}
            >
              {/* Animated scene */}
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <div className="relative rounded-2xl overflow-hidden flex items-center justify-center" style={{
                  aspectRatio: '16/10',
                  background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, rgba(7,7,15,0.6) 70%)',
                  border: '1px solid rgba(0,212,255,0.15)',
                }}>
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: 'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                  }} />
                  <div className="relative z-10 w-full h-full">
                    <StepAnim variant={step.anim} />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-2 rounded-xl z-20" style={{ background: 'rgba(7,7,15,0.85)', border: '1px solid rgba(0,212,255,0.3)', backdropFilter: 'blur(12px)' }}>
                    <span className="font-mono font-bold" style={{ fontSize: '0.7rem', color: '#00d4ff' }}>STEP {step.num}</span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono font-bold" style={{ fontSize: '2.5rem', color: 'rgba(0,212,255,0.15)', letterSpacing: '-0.06em', lineHeight: 1 }}>{step.num}</span>
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.5), transparent)', maxWidth: 60 }} />
                  <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.68rem', color: '#00d4ff' }}>How It Works</span>
                </div>
                <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{step.title}</h3>
                <p className="font-sans text-text-muted leading-relaxed mb-5" style={{ fontSize: '0.93rem' }}>{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg font-mono" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)', fontSize: '0.68rem', color: '#00d4ff' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
