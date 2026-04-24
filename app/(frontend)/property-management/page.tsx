import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { PropHero }      from '@/components/sections/PropHero'
import { PropSections }  from '@/components/sections/PropSections'
import { PropFaq }       from '@/components/sections/PropFaq'
import { PropBookDemo }  from '@/components/sections/PropBookDemo'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/property-management', {
    title: 'Property Management Drone Technology — Aerial Surveys & Inspections | ZenaDrone',
    description:
      'ZenaDrone 1000 delivers precision drone property surveys — from rooftop inspections and facade assessments to thermal imaging and grounds monitoring, safer and faster than traditional methods.',
  })
}

export default function PropertyManagementPage() {
  return (
    <>
      <Header />
      <main>
        <PropHero />
        <SectionReveal>
          <PropSections />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <PropFaq />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <PropBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
