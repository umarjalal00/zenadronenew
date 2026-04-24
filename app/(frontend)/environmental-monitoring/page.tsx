import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { EnvHero }       from '@/components/sections/EnvHero'
import { EnvSections }   from '@/components/sections/EnvSections'
import { EnvFaq }        from '@/components/sections/EnvFaq'
import { EnvBookDemo }   from '@/components/sections/EnvBookDemo'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/environmental-monitoring', {
    title: 'Environmental Monitoring Photogrammetry — Conservation Drone Solutions | ZenaDrone',
    description:
      'ZenaDrone delivers precision environmental monitoring, photogrammetry, and conservation drone services — from reforestation seeding to wildlife tracking and disaster assessment.',
  })
}

export default function EnvironmentalMonitoringPage() {
  return (
    <>
      <Header />
      <main>
        <EnvHero />
        <SectionReveal>
          <EnvSections />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <EnvFaq />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <EnvBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
