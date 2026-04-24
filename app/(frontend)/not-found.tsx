import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm mb-4">
          Error 404
        </p>
        <h1 className="text-display-xl font-display font-bold text-gradient mb-4">
          Page Not Found
        </h1>
        <p className="text-text-muted text-lg mb-10 max-w-md mx-auto">
          The page you&#39;re looking for has drifted out of range.
        </p>
        <Link
          href="/"
          className="text-primary hover:text-primary-light underline underline-offset-4 transition-colors"
        >
          Return to home base
        </Link>
      </div>
    </main>
  )
}
