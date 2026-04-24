import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { EDCHero }       from '@/components/sections/EDCHero'
import { EDCWhat }       from '@/components/sections/EDCWhat'
import { EDCChallenges } from '@/components/sections/EDCChallenges'
import { EDCSolutions }  from '@/components/sections/EDCSolutions'
import { EDCAerial }     from '@/components/sections/EDCAerial'
import { EDCBenefits }   from '@/components/sections/EDCBenefits'
import { EDCIndustries } from '@/components/sections/EDCIndustries'
import { EDCWhyChoose }  from '@/components/sections/EDCWhyChoose'
import { EDCFaq }        from '@/components/sections/EDCFaq'
import { EDCBookDemo }   from '@/components/sections/EDCBookDemo'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/electronic-data-collection', {
    title: 'Electronic Data Collection — Advanced Drone Data Solutions | ZenaDrone',
    description:
      'ZenaDrone electronic data collection solutions enable fast, accurate, and secure aerial data capture. Replace traditional methods with intelligent UAV-driven data collection for agriculture, construction, defense, and more.',
  })
}

export default function ElectronicDataCollectionPage() {
  return (
    <>
      <Header />
      <main>
        <EDCHero />

        <SectionReveal>
          <EDCWhat />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <EDCChallenges />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <EDCSolutions />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <EDCAerial />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <EDCBenefits />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <EDCIndustries />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <EDCWhyChoose />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <EDCFaq />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <EDCBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
