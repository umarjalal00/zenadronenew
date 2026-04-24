'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Header }    from '@/components/layout/Header'
import { Footer }    from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const CONTACT_INFO = [
  {
    label: 'Email Us',
    value: 'info@zenadrone.com',
    sub: 'We respond within 24 hours',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
        <rect x="2" y="4" width="20" height="16" rx="2.5" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.06)" />
        <path d="M2 7 L12 13.5 L22 7" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Call Us',
    value: '+1 (630) 242-9971',
    sub: 'Mon – Fri, 9 AM – 6 PM CST',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
        <path d="M6.5 4 C6.5 4 5 4 4 5.5 C3 7 3 9.5 6.5 13 C10 16.5 12.5 17 14 16 C15.5 15 15.5 13.5 15.5 13.5 L12.5 11 L11 12.5 C11 12.5 9.5 11.5 8.5 10.5 C7.5 9.5 6.5 8 6.5 8 L8 6.5 Z" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.06)" strokeLinejoin="round" />
        <path d="M15 4 C16.7 4 18.3 4.7 19.4 5.9 M15 7 C16 7 16.9 7.4 17.5 8.1" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    label: 'Headquarters',
    value: 'Naperville, Illinois',
    sub: 'United States of America',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
        <circle cx="12" cy="10" r="4" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.06)" />
        <circle cx="12" cy="10" r="1.5" fill="#00d4ff" />
        <path d="M12 2 C7.6 2 4 5.6 4 10 C4 15.4 12 22 12 22 C12 22 20 15.4 20 10 C20 5.6 16.4 2 12 2Z" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.04)" />
      </svg>
    ),
  },
  {
    label: 'Business Hours',
    value: 'Mon – Fri: 9 AM – 6 PM',
    sub: 'Central Standard Time (CST)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
        <circle cx="12" cy="12" r="9" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.04)" />
        <path d="M12 7 L12 12 L16 15" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const SUBJECTS = [
  'General Inquiry',
  'ZenaDrone 1000 Demo Request',
  'DaaS Subscription',
  'Industry Partnership',
  'Defense & Government',
  'Media & Press',
  'Technical Support',
  'Other',
]

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [phone,   setPhone]   = useState('')
  const [company, setCompany] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent,    setSent]    = useState(false)

  useGSAP(() => {
    gsap.fromTo('.ct-hero-badge', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.05 })
    gsap.fromTo('.ct-hero-title', { y: 40, opacity: 0 },  { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15 })
    gsap.fromTo('.ct-hero-sub',   { y: 20, opacity: 0 },  { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', delay: 0.3 })
    gsap.fromTo('.ct-info-card',  { x: -24, opacity: 0, filter: 'blur(6px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.45 })
    gsap.fromTo('.ct-form-wrap',  { x: 30, opacity: 0 },  { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.35 })
  }, { scope: pageRef })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '0.78rem 1rem',
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  }
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(0,212,255,0.45)'
    e.target.style.background  = 'rgba(0,212,255,0.03)'
  }
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
    e.target.style.background  = 'rgba(255,255,255,0.03)'
  }

  return (
    <>
      <Header />
      <div ref={pageRef} className="bg-background">

        {/* ── Hero ──────────────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)',
          }} />
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <div className="ct-hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)', opacity: 0 }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'ctBlink 2s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Contact Us</span>
              </div>
              <h1 className="ct-hero-title font-display font-bold text-white mb-5"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05, opacity: 0 }}>
                Let&apos;s Start a<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Conversation
                </span>
              </h1>
              <p className="ct-hero-sub font-sans text-text-muted mx-auto"
                style={{ fontSize: '1.05rem', maxWidth: 480, lineHeight: 1.75, opacity: 0 }}>
                Whether you&apos;re exploring drone solutions, requesting a demo, or looking to partner with us — our team is ready to help.
              </p>
            </div>
          </Container>
        </section>

        {/* ── Main content ──────────────────────────────────────────────────────── */}
        <section className="pb-28">
          <Container>
            <div className="grid lg:grid-cols-[1fr_1.55fr] gap-10 items-start max-w-6xl mx-auto">

              {/* Left — info cards */}
              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map((info, i) => (
                  <div key={i} className="ct-info-card flex items-start gap-4 p-5 rounded-2xl"
                    style={{ opacity: 0, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(0,212,255,0.1)' }}>
                    <div className="flex-shrink-0 flex items-center justify-center rounded-xl"
                      style={{ width: 48, height: 48, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.18)' }}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-mono font-bold uppercase tracking-[0.14em] mb-1" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>{info.label}</p>
                      <p className="font-sans font-semibold text-white mb-0.5" style={{ fontSize: '0.92rem' }}>{info.value}</p>
                      <p className="font-sans text-text-muted" style={{ fontSize: '0.78rem' }}>{info.sub}</p>
                    </div>
                  </div>
                ))}

                {/* Social links */}
                <div className="ct-info-card p-5 rounded-2xl"
                  style={{ opacity: 0, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.1)' }}>
                  <p className="font-mono font-bold uppercase tracking-[0.14em] mb-3" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>Follow Us</p>
                  <div className="flex items-center gap-3">
                    {[
                      { name: 'LinkedIn', path: 'M16 8 C16 5.8 14.2 4 12 4 C9.8 4 8 5.8 8 8 C8 10.2 9.8 12 12 12 C14.2 12 16 10.2 16 8Z M3 20 C3 16.7 7.1 14 12 14 C16.9 14 21 16.7 21 20' },
                      { name: 'Twitter / X', path: 'M4 4 L20 20 M20 4 L4 20' },
                      { name: 'YouTube', path: 'M2 6 C2 4.9 2.9 4 4 4 L20 4 C21.1 4 22 4.9 22 6 L22 18 C22 19.1 21.1 20 20 20 L4 20 C2.9 20 2 19.1 2 18 Z M10 9 L16 12 L10 15 Z' },
                    ].map((s, i) => (
                      <button key={i}
                        className="flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110"
                        style={{ width: 38, height: 38, background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)' }}
                        title={s.name}
                      >
                        <svg viewBox="0 0 24 24" fill="none" width={15} height={15}>
                          <path d={s.path} stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — form */}
              <div className="ct-form-wrap rounded-2xl p-8" style={{ opacity: 0, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center text-center py-14 gap-6"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(0,212,255,0.15)', filter: 'blur(16px)' }} />
                      <div className="relative flex items-center justify-center rounded-full"
                        style={{ width: 72, height: 72, background: 'rgba(0,212,255,0.1)', border: '2px solid rgba(0,212,255,0.35)' }}>
                        <svg viewBox="0 0 24 24" fill="none" width={30} height={30}>
                          <path d="M5 12 L10 17 L19 7" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-display font-bold text-white mb-2" style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>Message Sent!</p>
                      <p className="font-sans text-text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.68, maxWidth: 360 }}>
                        Thank you for reaching out. A member of the ZenaDrone team will be in touch within 24 hours.
                      </p>
                    </div>
                    <button onClick={() => setSent(false)}
                      className="font-sans text-text-muted hover:text-white transition-colors duration-200"
                      style={{ fontSize: '0.82rem', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.2)' }}>
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: '1px solid rgba(0,212,255,0.1)' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                        <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.65rem', color: '#00d4ff' }}>Send Us a Message</span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.77rem' }}>Full Name *</label>
                        <input required type="text" value={name} onChange={e => setName(e.target.value)}
                          placeholder="John Smith" style={inputStyle} onFocus={focus} onBlur={blur} />
                      </div>
                      <div>
                        <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.77rem' }}>Email Address *</label>
                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="john@company.com" style={inputStyle} onFocus={focus} onBlur={blur} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.77rem' }}>Phone Number</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000" style={inputStyle} onFocus={focus} onBlur={blur} />
                      </div>
                      <div>
                        <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.77rem' }}>Company / Organization</label>
                        <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                          placeholder="Your Company" style={inputStyle} onFocus={focus} onBlur={blur} />
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.77rem' }}>Subject *</label>
                      <select required value={subject} onChange={e => setSubject(e.target.value)}
                        style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: subject ? '#fff' : 'rgba(255,255,255,0.28)' }}
                        onFocus={focus} onBlur={blur}>
                        <option value="" disabled style={{ background: '#07070f' }}>Select a subject...</option>
                        {SUBJECTS.map(s => <option key={s} value={s} style={{ background: '#07070f', color: '#fff' }}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.77rem' }}>Message *</label>
                      <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)}
                        placeholder="Tell us about your project, requirements, or questions..."
                        style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                        onFocus={focus} onBlur={blur} />
                    </div>

                    <button type="submit"
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.95rem', boxShadow: '0 0 28px rgba(0,212,255,0.32), 0 4px 18px rgba(0,212,255,0.16)' }}>
                      Send Message
                      <svg viewBox="0 0 16 16" fill="none" width={15} height={15}>
                        <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <p className="font-sans text-text-muted text-center" style={{ fontSize: '0.73rem' }}>
                      We respect your privacy. Your information is never shared with third parties.
                    </p>
                  </form>
                )}
              </div>

            </div>
          </Container>
        </section>

      </div>
      <Footer />
      <style>{`
        @keyframes ctBlink { 0%,100%{opacity:.28;}50%{opacity:1;} }
      `}</style>
    </>
  )
}
