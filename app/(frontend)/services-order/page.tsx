import { Header }       from '@/components/layout/Header'
import { Footer }       from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { SOHero }        from '@/components/sections/SOHero'
import { SOServices }    from '@/components/sections/SOServices'
import { SOPlans }       from '@/components/sections/SOPlans'
import { SOScheduling }  from '@/components/sections/SOScheduling'
import { SOGlobal }      from '@/components/sections/SOGlobal'
import { SOBookDemo }    from '@/components/sections/SOBookDemo'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/services-order', {
    title: 'Drone Services Order — Aerial Scanning, Photography & Video | ZenaDrone',
    description:
      'ZenaDrone offers affordable aerial drone services — scanning, photography, video capturing, and data collection. Choose Buy-A-Drone or Share-A-Drone plans with daily, weekly, or monthly scheduling worldwide.',
  })
}

export default function ServicesOrderPage() {
  return (
    <>
      <Header />
      <main>
        <SOHero />

        <SectionReveal>
          <SOServices />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <SOPlans />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <SOScheduling />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <SOGlobal />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <SOBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
