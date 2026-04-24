'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Video {
  id:    string
  title: string
  label: string
  thumb: string
  desc:  string
}

function thumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}

const VIDEOS: Video[] = [
  { id: 'Vj35jAOWX_4', title: 'ZenaDrone 1000 — Field Operations',   label: 'Industrial',   thumb: thumb('Vj35jAOWX_4'), desc: 'Heavy-lift industrial operations in real-world construction and inspection workflows.' },
  { id: 'SyHqsujhNwA', title: 'IQ Square — Surveillance Mission',    label: 'Surveillance', thumb: thumb('SyHqsujhNwA'), desc: 'Autonomous perimeter patrol with smart multispectral sensors and real-time tracking.' },
  { id: 'x3blN3VN_gw', title: 'IQ Quad — Performance Test',          label: 'Industrial',   thumb: thumb('x3blN3VN_gw'), desc: 'High-speed stability and precision flight envelope testing in extreme conditions.' },
  { id: 'Qb_XO9xxhgY', title: 'IQ Nano — Tactical Deployment',       label: 'Tactical',     thumb: thumb('Qb_XO9xxhgY'), desc: 'Ultra-compact tactical drone deployed in rapid-response reconnaissance scenarios.' },
  { id: 'kYCIeYty02g', title: 'ZenaDrone 2000 — Extended Range',     label: 'Long-Range',   thumb: thumb('kYCIeYty02g'), desc: 'Long-endurance maritime defense platform with extended range and payload capacity.' },
]

// ─── Play icon ────────────────────────────────────────────────────────────────

function PlayIcon({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 56 56"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="28" cy="28" r="27" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" />
      <circle cx="28" cy="28" r="27" fill="rgba(0,0,0,0.35)" />
      <path d="M23 19.5l16 8.5-16 8.5V19.5z" fill="white" />
    </svg>
  )
}

// ─── Main featured player ─────────────────────────────────────────────────────

function FeaturedPlayer({
  video,
  playing,
  onPlay,
}: {
  video: Video
  playing: boolean
  onPlay: () => void
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: '16/9', background: 'rgb(var(--color-surface))' }}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.iframe
            key={`iframe-${video.id}-${video.title}`}
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
            key={`thumb-${video.title}`}
            className="absolute inset-0 group cursor-pointer"
            onClick={onPlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumb}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Dark overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-50"
              style={{ background: 'rgb(var(--color-background) / 0.42)' }}
            />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  filter: 'drop-shadow(0 0 24px rgba(0,212,255,0.5))',
                }}
              >
                <PlayIcon size={64} />
              </motion.div>
            </div>

            {/* Video title overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6"
                 style={{
                   background: 'linear-gradient(to top, rgb(var(--color-background) / 0.9) 0%, transparent 100%)',
                 }}>
              <p
                className="font-sans uppercase tracking-[0.2em] mb-1"
                style={{ fontSize: '0.8125rem', color: '#00d4ff' }}
              >
                {video.label}
              </p>
              <p
                className="font-display font-semibold text-white"
                style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)', letterSpacing: '-0.015em' }}
              >
                {video.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accent glow border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(0,212,255,0.12)' }}
      />
    </div>
  )
}

// ─── Playlist row ─────────────────────────────────────────────────────────────

function PlaylistRow({
  video,
  active,
  onClick,
}: {
  video: Video
  active: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative flex items-center gap-3 w-full flex-1 min-h-0 overflow-hidden rounded-xl text-left focus-visible:outline-none p-2.5"
      style={{
        border: active
          ? '1px solid rgba(0,212,255,0.45)'
          : '1px solid rgba(255,255,255,0.06)',
        background: active
          ? 'rgba(0,212,255,0.05)'
          : 'rgba(255,255,255,0.02)',
        boxShadow: active ? '0 0 22px rgba(0,212,255,0.12)' : 'none',
        transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
      }}
      whileHover={{ x: 3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Thumbnail */}
      <div
        className="relative flex-shrink-0 overflow-hidden rounded-lg"
        style={{ width: 140, aspectRatio: '16/9' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumb}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 transition-opacity"
          style={{
            background: active
              ? 'rgb(var(--color-background) / 0.25)'
              : 'rgb(var(--color-background) / 0.5)',
          }}
        />
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
            <PlayIcon size={22} />
          </div>
        )}
        {active && (
          <div
            className="absolute bottom-0 inset-x-0 h-[2px]"
            style={{
              background: 'linear-gradient(to right, transparent, #00d4ff, transparent)',
              boxShadow: '0 0 8px rgba(0,212,255,0.6)',
            }}
          />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 py-0.5">
        <p
          className="font-sans uppercase tracking-[0.18em] mb-1"
          style={{ fontSize: '0.6875rem', color: active ? '#00d4ff' : 'rgb(136,153,180)' }}
        >
          {video.label}
        </p>
        <p
          className="font-sans font-semibold text-white truncate"
          style={{ fontSize: '0.95rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}
        >
          {video.title}
        </p>
        <p
          className="font-sans text-text-muted mt-1 line-clamp-2"
          style={{ fontSize: '0.8125rem', lineHeight: 1.45 }}
        >
          {video.desc}
        </p>
      </div>
    </motion.button>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function VideoShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [playing,   setPlaying]   = useState(false)

  function selectVideo(idx: number) {
    if (idx === activeIdx) return
    setActiveIdx(idx)
    setPlaying(false)
  }

  return (
    <section
      className="relative w-full bg-background py-24 md:py-32"
      aria-label="ZenaDrone video showcase"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
        }}
      />

      {/* Radial bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 30%, rgba(0,212,255,0.05) 0%, transparent 65%)',
        }}
      />

      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <p
            className="font-sans font-medium tracking-[0.32em] uppercase mb-3"
            style={{ fontSize: '0.8125rem', color: '#00d4ff' }}
          >
            In Action
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.06,
            }}
          >
            See It Fly
          </h2>
          <p
            className="font-sans text-text-muted mt-3 mx-auto"
            style={{ fontSize: '1.125rem', maxWidth: '420px' }}
          >
            Real-world footage from field operations, performance tests, and tactical deployments.
          </p>
        </FadeIn>

        {/* Side-by-side: player + playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 lg:gap-8 items-stretch">

          {/* Featured player */}
          <FadeIn delay={0.1} className="h-full flex items-center">
            <FeaturedPlayer
              video={VIDEOS[activeIdx]}
              playing={playing}
              onPlay={() => setPlaying(true)}
            />
          </FadeIn>

          {/* Playlist */}
          <FadeIn delay={0.2} className="h-full">
            <div className="flex flex-col gap-2.5 h-full">
              {VIDEOS.map((v, i) => (
                <PlaylistRow
                  key={v.title}
                  video={v}
                  active={activeIdx === i}
                  onClick={() => selectVideo(i)}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
