import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { ThemeProvider, themeScript } from '@/lib/theme-context'
import './globals.css'

// ─── Fonts ──────────────────────────────────────────────────────────────────
// next/font automatically self-hosts and optimizes — zero layout shift

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// ─── SEO Metadata ────────────────────────────────────────────────────────────
// All metadata is statically defined here for the root.
// Individual pages/sections override via their own `export const metadata`.

export const metadata: Metadata = {
  metadataBase: new URL('https://zenadrone.com'),

  title: {
    default:  'Zenadrone — Next-Generation Drone Technology',
    template: '%s | Zenadrone',
  },
  description:
    'Zenadrone delivers cutting-edge autonomous drone systems for enterprise, defense, and industrial applications. Intelligent. Precise. Unstoppable.',
  keywords: [
    'drone',
    'UAV',
    'autonomous systems',
    'drone technology',
    'enterprise drones',
    'industrial UAV',
    'Zenadrone',
  ],

  authors:  [{ name: 'Zenadrone', url: 'https://zenadrone.com' }],
  creator:  'Zenadrone',
  publisher:'Zenadrone',

  openGraph: {
    type:      'website',
    locale:    'en_US',
    url:       'https://zenadrone.com',
    siteName:  'Zenadrone',
    title:     'Zenadrone — Next-Generation Drone Technology',
    description:
      'Cutting-edge autonomous drone systems for enterprise, defense, and industrial applications.',
    images: [
      {
        url:    '/og-image.jpg', // 1200×630 — add to /public
        width:  1200,
        height: 630,
        alt:    'Zenadrone — Next-Generation Drone Technology',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Zenadrone — Next-Generation Drone Technology',
    description: 'Cutting-edge autonomous drone systems for enterprise, defense, and industrial applications.',
    images:      ['/og-image.jpg'],
    creator:     '@zenadrone',
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:              true,
      follow:             true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  // Prevents duplicate-content issues when accessed via www vs non-www
  alternates: {
    canonical: 'https://zenadrone.com',
  },
}

export const viewport: Viewport = {
  themeColor:   '#07070f',
  width:        'device-width',
  initialScale: 1,
}

// ─── Root Layout ─────────────────────────────────────────────────────────────
// Server Component — renders on the server, critical content is SEO-visible.
// Only the SmoothScrollProvider is a Client Component (needs window access).

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash: apply theme class before React hydrates — prevents FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased bg-background text-text overflow-x-hidden">
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
