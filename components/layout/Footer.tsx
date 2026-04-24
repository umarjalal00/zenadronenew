// Server Component — static content, fully SEO-visible.

import Link from 'next/link'
import { Container } from '@/components/ui/Container'

const HELPFUL_LINKS = [
  { label: 'Features',          href: '/features' },
  { label: 'News Room',         href: '/newsroom' },
  { label: 'Events',            href: '/events' },
  { label: 'Videos',            href: '/videos' },
  { label: 'Contact Us',        href: '/contact' },
  { label: 'Blog',              href: '/blog' },
]

const DRONES = [
  { label: 'ZenaDrone 1000',        href: '/zenadrone-1000' },
  { label: 'ZenaDrone IQ Square',   href: '/iq-square' },
  { label: 'ZenaDrone IQ Nano',     href: '/iq-nano' },
  { label: 'ZenaDrone IQ Quad',     href: '/iq-quad' },
  { label: 'ZenaDrone 2000',        href: '/zenadrone-2000' },
  { label: 'Interceptor P-1',       href: '/interceptor-p1' },
]


const CONTACTS = [
  { flag: '🇺🇸', region: 'USA',     number: '+1 (332) 330-3244',  href: 'tel:+13323303244' },
  { flag: '🇮🇪', region: 'Ireland', number: '+353 983 3244',       href: 'tel:+3539833244' },
  { flag: '🇦🇪', region: 'UAE',     number: '+971 58 1628704',     href: 'tel:+971581628704' },
  { flag: '🇨🇦', region: 'Canada',  number: '+1 (647) 598-3227',  href: 'tel:+16475983227' },
  { flag: '🇩🇪', region: 'Germany', number: '+49 30 221840881',    href: 'tel:+4930221840881' },
]

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden" role="contentinfo"
      style={{ background: 'rgb(7,7,15)', borderTop: '1px solid rgba(0,212,255,0.1)' }}
    >
      {/* Top glow line */}
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.45) 30%, rgba(167,139,250,0.3) 70%, transparent)',
      }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.04) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 100% 80% at 50% 0%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 0%, black 0%, transparent 100%)',
      }} />

      {/* Ambient glow orb */}
      <div className="absolute top-0 left-1/3 w-[700px] h-[280px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top, rgba(0,212,255,0.04) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      <Container>
        {/* ── Main grid ─────────────────────────────────────────────────────── */}
        <div className="pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.6fr] gap-10 lg:gap-8">

          {/* ── Brand ──────────────────────────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5 lg:pr-6">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
                border: '1px solid rgba(0,212,255,0.28)',
              }}>
                <svg viewBox="0 0 24 24" fill="none" width={15} height={15}>
                  <path d="M12 2L20 7V12L12 17L4 12V7L12 2Z" stroke="#00d4ff" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="2.5" fill="#00d4ff" opacity="0.9" />
                </svg>
              </div>
              <span className="font-display font-bold text-white group-hover:text-primary transition-colors duration-200"
                style={{ fontSize: '1.25rem', letterSpacing: '-0.025em' }}>
                Zena<span style={{ color: '#00d4ff' }}>Drone</span>
              </span>
            </Link>

            {/* Description */}
            <p className="font-sans leading-relaxed" style={{
              fontSize: '0.9rem',
              color: 'rgb(136,153,180)',
              maxWidth: '300px',
              lineHeight: 1.7,
            }}>
              ZenaDrone, Inc. designs and manufactures drones dedicated to improving intelligent UAV solutions through machine learning, artificial intelligence, and other innovations.
            </p>

            {/* ZenaTech badge */}
            <div className="inline-flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl w-fit" style={{
              background: 'rgba(0,212,255,0.05)',
              border: '1px solid rgba(0,212,255,0.14)',
            }}>
              <div className="w-1.5 h-1.5 rounded-full mt-[3px] flex-shrink-0" style={{
                background: '#00d4ff',
                boxShadow: '0 0 6px rgba(0,212,255,0.8)',
              }} />
              <p className="font-mono" style={{ fontSize: '0.8125rem', color: 'rgb(136,153,180)', lineHeight: 1.5 }}>
                A subsidiary of{' '}
                <a href="https://zenatech.com" target="_blank" rel="noopener noreferrer"
                  className="font-semibold hover:opacity-80 transition-opacity duration-200"
                  style={{ color: '#00d4ff' }}>
                  ZenaTech, Inc.
                </a>
                <br />
                <span style={{ color: 'rgb(74,85,104)' }}>Nasdaq: ZENA</span>
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                  className="footer-social flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Helpful Links ──────────────────────────────────────────────── */}
          <div>
            <h3 className="font-mono font-bold uppercase tracking-[0.22em] mb-6" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
              Helpful Links
            </h3>
            <ul className="flex flex-col gap-3.5" role="list">
              {HELPFUL_LINKS.map(link => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="group inline-flex items-center gap-2.5 font-sans transition-colors duration-200 hover:text-white"
                    style={{ fontSize: '0.9rem', color: 'rgb(136,153,180)' }}
                  >
                    <span className="block w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-2.5 group-hover:h-px"
                      style={{ background: 'rgba(0,212,255,0.5)' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Drones ─────────────────────────────────────────────────────── */}
          <div>
            <h3 className="font-mono font-bold uppercase tracking-[0.22em] mb-6" style={{ fontSize: '0.8125rem', color: '#34d399' }}>
              Drones
            </h3>
            <ul className="flex flex-col gap-3.5" role="list">
              {DRONES.map(item => (
                <li key={item.label}>
                  <Link href={item.href}
                    className="group inline-flex items-center gap-2.5 font-sans transition-colors duration-200 hover:text-white"
                    style={{ fontSize: '0.9rem', color: 'rgb(136,153,180)' }}
                  >
                    <span className="block w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-2.5 group-hover:h-px"
                      style={{ background: 'rgba(52,211,153,0.5)' }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ────────────────────────────────────────────────────── */}
          <div>
            <h3 className="font-mono font-bold uppercase tracking-[0.22em] mb-6" style={{ fontSize: '0.8125rem', color: '#34d399' }}>
              Contact Us
            </h3>

            {/* Phone numbers */}
            <div className="flex flex-col gap-3 mb-5">
              {CONTACTS.map(c => (
                <a key={c.region} href={c.href}
                  className="group flex items-center gap-3 transition-colors duration-200 hover:text-white"
                  style={{ color: 'rgb(136,153,180)' }}
                >
                  <span className="text-sm flex-shrink-0 select-none">{c.flag}</span>
                  <div>
                    <div className="font-mono font-semibold transition-colors duration-200"
                      style={{ fontSize: '0.75rem', color: 'rgb(74,85,104)', letterSpacing: '0.06em', lineHeight: 1.2 }}>
                      {c.region}
                    </div>
                    <div className="font-sans transition-colors duration-200 group-hover:text-white"
                      style={{ fontSize: '0.875rem', lineHeight: 1.3 }}>
                      {c.number}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Email */}
            <a href="mailto:sales@zenadrone.com"
              className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] group"
              style={{
                background: 'rgba(52,211,153,0.05)',
                border: '1px solid rgba(52,211,153,0.18)',
              }}
            >
              <svg viewBox="0 0 20 20" fill="none" width={15} height={15} className="flex-shrink-0">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="#34d399" strokeWidth="1.4" />
                <path d="M2 7l8 5 8-5" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span className="font-mono font-medium transition-colors duration-200 group-hover:text-white"
                style={{ fontSize: '0.8125rem', color: '#34d399' }}>
                sales@zenadrone.com
              </span>
            </a>
          </div>
        </div>

        {/* ── Divider with gradient ────────────────────────────────────────────── */}
        <div className="h-px" style={{
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)',
        }} />

        {/* ── Bottom bar ──────────────────────────────────────────────────────── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-center sm:text-left" style={{ fontSize: '0.8125rem', color: 'rgb(74,85,104)' }}>
            © Copyright 2026 by{' '}
            <span style={{ color: 'rgb(136,153,180)' }}>ZenaDrone Inc.</span>
            {' '}All Rights Reserved.
          </p>

          <div className="flex items-center gap-1">
            {['Privacy Policy', 'Terms of Service'].map((label, i) => (
              <span key={label} className="flex items-center gap-1">
                {i > 0 && <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.8125rem' }}>·</span>}
                <Link href="#"
                  className="font-sans px-2 transition-colors duration-200 hover:text-white"
                  style={{ fontSize: '0.8125rem', color: 'rgb(74,85,104)' }}
                >
                  {label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </Container>

      {/* Social icon hover styles */}
      <style>{`
        .footer-social {
          color: rgb(74,85,104);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .footer-social:hover {
          color: #00d4ff;
          background: rgba(0,212,255,0.08);
          border-color: rgba(0,212,255,0.28);
        }
      `}</style>
    </footer>
  )
}
