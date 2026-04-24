import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { DaaSHero }      from '@/components/sections/DaaSHero'
import { DaaSSections }  from '@/components/sections/DaaSSections'
import { DaaSFaq }       from '@/components/sections/DaaSFaq'
import { DaaSBookDemo }  from '@/components/sections/DaaSBookDemo'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/drone-as-a-service', {
    title: 'Drone as a Service (DaaS) — Subscription Drone Solutions | ZenaDrone',
    description:
      'ZenaDrone DaaS delivers versatile drone surveillance and scanning services through a flexible subscription model. Field scanning, multispectral imaging, building inspection, and more — your vision, your terms.',
  })
}

export default function DroneAsAServicePage() {
  return (
    <>
      <Header />
      <main>
        <DaaSHero />
        <SectionReveal>
          <DaaSSections />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <DaaSFaq />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <DaaSBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
