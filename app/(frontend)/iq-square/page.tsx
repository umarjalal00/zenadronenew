import { Header }              from '@/components/layout/Header'
import { Footer }              from '@/components/layout/Footer'
import { SectionReveal }       from '@/components/animations/SectionReveal'
import { IQSquareHero }        from '@/components/sections/IQSquareHero'
import { IQSquareOverview }    from '@/components/sections/IQSquareOverview'
import { IQSquareApplications } from '@/components/sections/IQSquareApplications'
import { IQSquareDefense }     from '@/components/sections/IQSquareDefense'
import { IQSquareInfrastructure } from '@/components/sections/IQSquareInfrastructure'
import { IQSquareCTA }         from '@/components/sections/IQSquareCTA'
import { getPageMeta }         from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/iq-square', {
    title: 'ZenaDrone IQ Square — Advanced Multifunction AI Drone | Zenadrone',
    description:
      'ZenaDrone IQ Square is an advanced multifunction AI drone for commercial inspections, land surveys, power washing, and government defense applications. Rotary VTOL design with autonomous recharging, interchangeable sensors, and advanced collision detection.',
  })
}

export default function IQSquarePage() {
  return (
    <>
      <Header />
      <main>
        <IQSquareHero />

        <SectionReveal>
          <IQSquareOverview />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQSquareApplications />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQSquareDefense />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQSquareInfrastructure />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQSquareCTA />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
