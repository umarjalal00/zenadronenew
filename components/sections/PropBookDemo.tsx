'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'

const USE_CASES = [
  {
    label: 'Residential Inspection',
    desc: 'Roof, gutters, chimney & exterior walls',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M4 14 L14 5 L24 14 L24 24 L4 24 Z" stroke="#00d4ff" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(0,212,255,0.06)" />
        <rect x="10" y="17" width="8" height="7" rx="1" stroke="#00d4ff" strokeWidth="1.2" />
        <line x1="14" y1="17" x2="14" y2="24" stroke="#00d4ff" strokeWidth="1.1" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: 'Commercial Survey',
    desc: 'Office buildings, warehouses & retail complexes',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="3" y="8" width="22" height="17" rx="1.5" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.06)" />
        <rect x="7" y="3" width="14" height="5" rx="1" stroke="#00d4ff" strokeWidth="1.2" />
        <line x1="3" y1="14" x2="25" y2="14" stroke="#00d4ff" strokeWidth="1.1" opacity="0.5" />
        <rect x="7" y="17" width="4" height="4" rx="0.5" stroke="#00d4ff" strokeWidth="1" opacity="0.7" />
        <rect x="13" y="17" width="4" height="4" rx="0.5" stroke="#00d4ff" strokeWidth="1" opacity="0.7" />
        <rect x="18" y="17" width="4" height="4" rx="0.5" stroke="#00d4ff" strokeWidth="1" opacity="0.7" />
      </svg>
    ),
  },
  {
    label: 'Roof Assessment',
    desc: 'Damage detection, leak mapping & condition reports',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M3 15 L14 4 L25 15" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="rgba(0,212,255,0.06)" />
        <path d="M6 15 L6 25 L22 25 L22 15" stroke="#00d4ff" strokeWidth="1.3" strokeLinejoin="round" />
        <circle cx="14" cy="11" r="2.5" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.1)" />
        <path d="M13 11 L13.8 11.8 L15.5 10" stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Infrastructure Monitoring',
    desc: 'Structural health, drainage & utility tracking',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="4" y="4" width="20" height="20" rx="2" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.04)" />
        <polyline points="6,20 10,14 14,17 18,10 22,13" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="13" r="1.5" fill="#00d4ff" opacity="0.8" />
      </svg>
    ),
  },
  {
    label: 'Landscaping Survey',
    desc: 'Gardens, grounds, drainage & vegetation mapping',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <ellipse cx="14" cy="22" rx="11" ry="3" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.04)" />
        <path d="M14 22 L14 13" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M14 16 C11 13 8 13 8 10 C8 7.5 10 6 12 7 C12 5 13 4 14 4 C15 4 16 5 16 7 C18 6 20 7.5 20 10 C20 13 17 13 14 16Z" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.07)" />
      </svg>
    ),
  },
  {
    label: 'Facade Inspection',
    desc: 'Cladding, windows, seals & exterior condition',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="4" y="3" width="20" height="22" rx="1.5" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.05)" />
        <line x1="4" y1="10" x2="24" y2="10" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
        <line x1="4" y1="17" x2="24" y2="17" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
        <rect x="7" y="5" width="5" height="3" rx="0.5" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
        <rect x="16" y="5" width="5" height="3" rx="0.5" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
        <rect x="7" y="12" width="5" height="3" rx="0.5" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
        <rect x="16" y="12" width="5" height="3" rx="0.5" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
        <circle cx="20" cy="20" r="3" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.1)" />
        <line x1="22.1" y1="22.1" x2="24" y2="24" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function PropBookDemo() {
  const [selected, setSelected] = useState<string>('')
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [phone,    setPhone]    = useState('')
  const [message,  setMessage]  = useState('')
  const [sent,     setSent]     = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '0.75rem 1rem',
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="book-demo" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,212,255,0.05) 0%, transparent 65%)' }} />

      <Container>
        <div>

          {/* Heading */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.85rem', color: '#00d4ff' }}>Book A Survey</span>
            </div>
            <h2 className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.7rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Start Your Property Inspection
            </h2>
            <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', maxWidth: 540, margin: '0 auto' }}>
              Select your survey type and get in touch. Our team will schedule a ZenaDrone 1000 inspection tailored to your property.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">

            {/* Use-case cards */}
            <div>
              <p className="font-mono text-text-muted mb-4 tracking-[0.14em] uppercase" style={{ fontSize: '0.8rem' }}>Select Survey Type</p>
              <div className="grid grid-cols-2 gap-3">
                {USE_CASES.map(uc => {
                  const active = selected === uc.label
                  return (
                    <button key={uc.label}
                      onClick={() => setSelected(uc.label)}
                      className="text-left flex flex-col gap-2.5 p-4 rounded-xl transition-all duration-200"
                      style={{
                        background: active ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${active ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                        boxShadow: active ? '0 0 20px rgba(0,212,255,0.08)' : 'none',
                      }}
                    >
                      <div className="flex items-center justify-center rounded-xl"
                        style={{ width: 42, height: 42, background: active ? 'rgba(0,212,255,0.12)' : 'rgba(0,212,255,0.06)', border: `1px solid ${active ? 'rgba(0,212,255,0.3)' : 'rgba(0,212,255,0.12)'}` }}>
                        {uc.icon}
                      </div>
                      <div>
                        <p className="font-sans font-semibold" style={{ fontSize: '0.95rem', color: active ? '#00d4ff' : '#fff', lineHeight: 1.3 }}>{uc.label}</p>
                        <p className="font-sans text-text-muted mt-0.5" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{uc.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl p-7 relative"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>

              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-10 gap-5">
                  <div className="flex items-center justify-center rounded-full"
                    style={{ width: 64, height: 64, background: 'rgba(0,212,255,0.1)', border: '2px solid rgba(0,212,255,0.3)' }}>
                    <svg viewBox="0 0 24 24" fill="none" width={28} height={28}>
                      <path d="M5 12 L10 17 L19 7" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-bold text-white mb-2" style={{ fontSize: '1.4rem' }}>Request Sent!</p>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                      Thank you for reaching out. Our team will contact you within 24 hours to confirm your property survey.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                    <span className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.8rem', color: '#00d4ff' }}>
                      {selected || 'Contact Us'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.88rem' }}>Full Name *</label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="John Smith"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.88rem' }}>Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.88rem' }}>Email Address *</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.88rem' }}>Survey Type</label>
                    <select
                      value={selected}
                      onChange={e => setSelected(e.target.value)}
                      style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: selected ? '#fff' : 'rgba(255,255,255,0.3)' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    >
                      <option value="" disabled style={{ background: '#07070f' }}>Select a survey type...</option>
                      {USE_CASES.map(uc => (
                        <option key={uc.label} value={uc.label} style={{ background: '#07070f' }}>{uc.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.88rem' }}>Property Details / Message</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Describe your property (size, location, specific areas of concern)..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 96 }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.9rem', boxShadow: '0 0 26px rgba(0,212,255,0.3)' }}>
                    Request Property Survey
                    <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <p className="font-sans text-text-muted text-center" style={{ fontSize: '0.85rem' }}>
                    We respond within 24 hours. No obligation, no spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
