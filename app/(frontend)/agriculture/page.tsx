import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { AgriHero }      from '@/components/sections/AgriHero'
import { AgriSections }  from '@/components/sections/AgriSections'
import { AgriFaq }       from '@/components/sections/AgriFaq'
import { AgriBookDemo }  from '@/components/sections/AgriBookDemo'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/agriculture', {
    title: 'Agriculture Drone Technology — Smart UAV Farming Solutions | ZenaDrone',
    description:
      'ZenaDrone agricultural UAV solutions help farmers map fields, monitor crop health, spray with precision, and track livestock — delivering faster results, lower costs, and higher yields.',
  })
}

export default function AgriculturePage() {
  return (
    <>
      <Header />
      <main>
        <AgriHero />

        <SectionReveal>
          <AgriSections />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <AgriFaq />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <AgriBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
