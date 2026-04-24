import { Header }              from '@/components/layout/Header'
import { Footer }              from '@/components/layout/Footer'
import { SectionReveal }       from '@/components/animations/SectionReveal'
import { ZD2000Hero }          from '@/components/sections/ZD2000Hero'
import { ZD2000Overview }      from '@/components/sections/ZD2000Overview'
import { ZD2000Capabilities }  from '@/components/sections/ZD2000Capabilities'
import { ZD2000Glider }        from '@/components/sections/ZD2000Glider'
import { ZD2000CTA }           from '@/components/sections/ZD2000CTA'
import { getPageMeta }         from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/zenadrone-2000', {
    title: 'ZenaDrone 2000 + IQ Glider — Autonomous Maritime Defense Platform | Zenadrone',
    description:
      'ZenaDrone 2000 is an autonomous maritime drone launch and recovery platform for naval defense. 4+ hour gas-powered endurance, AI-driven threat intercept, IQ Glider deployment, and swarm-ready architecture for coast guards and navies.',
  })
}

export default function ZenaDrone2000Page() {
  return (
    <>
      <Header />
      <main>
        <ZD2000Hero />

        <SectionReveal>
          <ZD2000Overview />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ZD2000Capabilities />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ZD2000Glider />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ZD2000CTA />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
