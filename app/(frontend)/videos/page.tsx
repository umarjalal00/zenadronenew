'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Header }    from '@/components/layout/Header'
import { Footer }    from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { useGSAP }  from '@/hooks/useGSAP'
import { gsap }     from '@/lib/gsap'

// ─── Data (same videos as home page VideoShowcase) ────────────────────────────

interface Video {
  id:       string
  title:    string
  label:    string
  desc:     string
}

function thumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}

const VIDEOS: Video[] = [
  {
    id:    'Vj35jAOWX_4',
    title: 'ZenaDrone 1000 — Field Operations',
    label: 'Industrial',
    desc:  'See the ZenaDrone 1000 perform in demanding field environments — multi-sensor payload integration, long-endurance flight, and real-time telemetry across complex terrain.',
  },
  {
    id:    'SyHqsujhNwA',
    title: 'IQ Square — Surveillance Mission',
    label: 'Surveillance',
    desc:  'The IQ Square executes a persistent surveillance mission with stabilized EO/IR sensor suite, automated patrol paths, and encrypted real-time video downlink.',
  },
  {
    id:    'x3blN3VN_gw',
    title: 'IQ Quad — Performance Test',
    label: 'Industrial',
    desc:  'High-performance agility evaluation of the IQ Quad platform — demonstrating rapid maneuverability, payload capacity, and precision station-keeping under varying wind conditions.',
  },
  {
    id:    'Qb_XO9xxhgY',
    title: 'IQ Nano — Tactical Deployment',
    label: 'Tactical',
    desc:  'Compact and portable, the IQ Nano demonstrates individual-operator deployment in confined urban environments, providing real-time reconnaissance with minimal acoustic signature.',
  },
  {
    id:    'kYCIeYty02g',
    title: 'ZenaDrone 2000 — Extended Range',
    label: 'Long-Range',
    desc:  'Extended-range endurance flight test for the ZenaDrone 2000, covering vast distances with fuel-efficient hybrid propulsion and satellite-linked command-and-control.',
  },
]

// ─── Play icon ────────────────────────────────────────────────────────────────

function PlayIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="28" cy="28" r="27" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" />
      <circle cx="28" cy="28" r="27" fill="rgba(0,0,0,0.35)" />
      <path d="M23 19.5l16 8.5-16 8.5V19.5z" fill="white" />
    </svg>
  )
}

// ─── Featured player ──────────────────────────────────────────────────────────

function FeaturedPlayer({ video, playing, onPlay }: { video: Video; playing: boolean; onPlay: () => void }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: '16/9', background: 'rgba(0,0,0,0.4)' }}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.iframe
            key={`iframe-${video.id}`}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&color=white${video.id === 'Vj35jAOWX_4' ? '&start=315' : ''}`}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <motion.div
            key={`thumb-${video.id}`}
            className="absolute inset-0 group cursor-pointer"
            onClick={onPlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb(video.id)}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-50"
              style={{ background: 'rgba(7,7,15,0.42)' }}
            />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{ filter: 'drop-shadow(0 0 28px rgba(0,212,255,0.55))' }}
              >
                <PlayIcon size={72} />
              </motion.div>
            </div>
            {/* Title overlay */}
            <div
              className="absolute bottom-0 inset-x-0 p-6 md:p-8"
              style={{ background: 'linear-gradient(to top, rgba(7,7,15,0.92) 0%, transparent 100%)' }}
            >
              <p className="font-mono font-bold uppercase tracking-[0.22em] mb-1.5" style={{ fontSize: '0.75rem', color: '#00d4ff' }}>
                {video.label}
              </p>
              <p className="font-display font-bold text-white" style={{ fontSize: 'clamp(1rem, 2vw, 1.45rem)', letterSpacing: '-0.02em' }}>
                {video.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow border */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,212,255,0.15)' }} />
    </div>
  )
}

// ─── Strip card ───────────────────────────────────────────────────────────────

function StripCard({ video, active, onClick }: { video: Video; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex-shrink-0 overflow-hidden rounded-xl text-left focus-visible:outline-none"
      style={{
        width: 'clamp(160px, 20vw, 240px)',
        aspectRatio: '16/9',
        border: active ? '1px solid rgba(0,212,255,0.55)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: active ? '0 0 24px rgba(0,212,255,0.2)' : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.22 } }}
      whileTap={{ scale: 0.97 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumb(video.id)} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: active ? 'rgba(7,7,15,0.38)' : 'rgba(7,7,15,0.62)', transition: 'background 0.3s' }}
      />
      {active && (
        <motion.div
          layoutId="activeBar"
          className="absolute bottom-0 inset-x-0 h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent, #00d4ff, transparent)', boxShadow: '0 0 10px rgba(0,212,255,0.7)' }}
        />
      )}
      {!active && (
        <div className="absolute inset-0 flex items-center justify-center opacity-60">
          <PlayIcon size={26} />
        </div>
      )}
      <div className="absolute bottom-0 inset-x-0 px-3 pb-2.5">
        <p className="font-mono font-bold uppercase tracking-[0.18em] truncate" style={{ fontSize: '0.58rem', color: '#00d4ff', marginBottom: 2 }}>
          {video.label}
        </p>
        <p className="font-sans font-medium text-white truncate" style={{ fontSize: '0.78rem' }}>
          {video.title}
        </p>
      </div>
    </motion.button>
  )
}

// ─── Grid card (for the full video grid below) ────────────────────────────────

function GridCard({ video, index }: { video: Video; index: number }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="vd-card flex flex-col gap-3" style={{ opacity: 0 }}>
      {/* Player */}
      <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.iframe
              key={`grid-iframe-${video.id}`}
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&color=white${video.id === 'Vj35jAOWX_4' ? '&start=315' : ''}`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            />
          ) : (
            <motion.div
              key={`grid-thumb-${video.id}`}
              className="absolute inset-0 group cursor-pointer"
              onClick={() => setPlaying(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(video.id)} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-40" style={{ background: 'rgba(7,7,15,0.45)' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.14 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.18 }}
                  style={{ filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.5))' }}
                >
                  <PlayIcon size={48} />
                </motion.div>
              </div>
              <div className="absolute top-3 left-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.22)' }}>
                  <div className="w-1 h-1 rounded-full" style={{ background: '#00d4ff' }} />
                  <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.55rem', color: '#00d4ff' }}>{video.label}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,212,255,0.1)' }} />
      </div>

      {/* Info */}
      <div>
        <p className="font-display font-bold text-white mb-1" style={{ fontSize: '0.95rem', letterSpacing: '-0.015em', lineHeight: 1.3 }}>
          {video.title}
        </p>
        <p className="font-sans text-text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.65 }}>
          {video.desc}
        </p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VideosPage() {
  const pageRef  = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [playing,   setPlaying]   = useState(false)

  function selectVideo(idx: number) {
    if (idx === activeIdx) return
    setActiveIdx(idx)
    setPlaying(false)
  }

  useGSAP(() => {
    gsap.fromTo('.vd-badge',   { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 })
    gsap.fromTo('.vd-title',   { y: 44,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.8,  ease: 'power3.out', delay: 0.15 })
    gsap.fromTo('.vd-sub',     { y: 22,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', delay: 0.3  })
    gsap.fromTo('.vd-player',  { y: 48,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.45 })
    gsap.fromTo('.vd-strip',   { y: 22,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', delay: 0.6  })
    gsap.fromTo('.vd-card',    { y: 38,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out', delay: 0.75 })
  }, { scope: pageRef })

  const active = VIDEOS[activeIdx]

  return (
    <>
      <Header />
      <div ref={pageRef}>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-14 bg-background overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 72% 55% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%)',
          }} />

          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div
                className="vd-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-7"
                style={{ opacity: 0, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'vdBlink 2s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Videos</span>
              </div>

              <h1
                className="vd-title font-display font-bold text-white mb-5"
                style={{ opacity: 0, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.06 }}
              >
                Watch ZenaDrone<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.65) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  In Action
                </span>
              </h1>

              <p
                className="vd-sub font-sans text-text-muted mx-auto"
                style={{ opacity: 0, fontSize: '1.05rem', maxWidth: 520, lineHeight: 1.75 }}
              >
                Real-world footage from field operations, performance tests, and tactical deployments — see what ZenaDrone platforms can do in the real world.
              </p>
            </div>
          </Container>
        </section>

        {/* ── Featured player + strip ── */}
        <section className="pb-10 bg-background">
          <Container>
            <div className="max-w-5xl mx-auto">

              {/* Section label */}
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-full" style={{ width: 5, height: 5, background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>Now Playing</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(0,212,255,0.12)' }} />
              </div>

              {/* Featured player */}
              <div className="vd-player" style={{ opacity: 0 }}>
                <FeaturedPlayer video={active} playing={playing} onPlay={() => setPlaying(true)} />
              </div>

              {/* Video description */}
              <div className="mt-4 mb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
                      <span className="font-mono font-bold uppercase tracking-[0.14em]" style={{ fontSize: '0.58rem', color: '#00d4ff' }}>{active.label}</span>
                    </div>
                  </div>
                  <p className="font-sans text-text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 560 }}>
                    {active.desc}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                  style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.82rem', boxShadow: '0 0 18px rgba(0,212,255,0.25)', whiteSpace: 'nowrap' }}
                >
                  Book a Demo
                  <svg viewBox="0 0 14 14" fill="none" width={12} height={12}><path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>

              {/* Strip */}
              <div
                className="vd-strip flex gap-3 overflow-x-auto pb-2"
                style={{ opacity: 0, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {VIDEOS.map((v, i) => (
                  <StripCard
                    key={v.id}
                    video={v}
                    active={activeIdx === i}
                    onClick={() => selectVideo(i)}
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── All videos grid ── */}
        <section className="py-12 pb-24 bg-background">
          <Container>
            <div className="max-w-5xl mx-auto">

              {/* Section label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="rounded-full" style={{ width: 5, height: 5, background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>All Videos</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(0,212,255,0.12)' }} />
                <span className="font-mono" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)' }}>{VIDEOS.length - 1} videos</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {VIDEOS.filter((_, i) => i !== activeIdx).map((v, i) => (
                  <GridCard key={v.id} video={v} index={i} />
                ))}
              </div>

              {/* ── CTA ── */}
              <div
                className="mt-14 rounded-2xl p-8 md:p-10 text-center"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
                  style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'vdBlink 2s ease-in-out infinite' }} />
                  <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.68rem', color: '#00d4ff' }}>Live Demo</span>
                </div>

                <h3
                  className="font-display font-bold text-white mb-3"
                  style={{ fontSize: 'clamp(1.3rem, 2.6vw, 2rem)', letterSpacing: '-0.022em' }}
                >
                  See It Live — Not Just on Screen
                </h3>

                <p className="font-sans text-text-muted mb-7 mx-auto" style={{ fontSize: '0.95rem', maxWidth: 460, lineHeight: 1.75 }}>
                  Schedule a private ZenaDrone demonstration tailored to your operational requirements — from agricultural surveys to defense applications.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                  style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.9rem', boxShadow: '0 0 26px rgba(0,212,255,0.28)' }}
                >
                  Request a Private Demo
                  <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>

            </div>
          </Container>
        </section>

      </div>
      <Footer />

      <style>{`
        @keyframes vdBlink { 0%,100%{opacity:.28;}50%{opacity:1;} }
      `}</style>
    </>
  )
}
