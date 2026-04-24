import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'nextgen.zenatech.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nextgen.zenatech.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // NOTE: Do NOT add optimizePackageImports for 'gsap' or 'framer-motion'.
  // Both use plugin registration via side-effects that the optimizer strips out,
  // causing silent failures in dev mode (animations never mount → white screen).
}

export default nextConfig
