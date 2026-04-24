import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { MDHero }        from '@/components/sections/MDHero'
import { MDWhy }         from '@/components/sections/MDWhy'
import { MDApplications }from '@/components/sections/MDApplications'
import { MDWhyChoose }   from '@/components/sections/MDWhyChoose'
import { MDFaq }         from '@/components/sections/MDFaq'
import { MDBookDemo }    from '@/components/sections/MDBookDemo'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/military-drone', {
    title: 'Military Drones Industry — ZenaDrone 1000 Defense UAV | Zenadrone',
    description:
      'ZenaDrone 1000 is an advanced autonomous military drone built for ISR, border patrol, counter-drone operations, search & rescue, and post-conflict assessment. VTOL, 1-hour flight, AI-driven situational awareness.',
  })
}

export default function MilitaryDronePage() {
  return (
    <>
      <Header />
      <main>
        <MDHero />

        <SectionReveal>
          <MDWhy />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <MDApplications />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <MDWhyChoose />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <MDFaq />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <MDBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
