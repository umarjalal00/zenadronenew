import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { ZD1000Hero }        from '@/components/sections/ZD1000Hero'
import { ZD1000Overview }    from '@/components/sections/ZD1000Overview'
import { ZD1000Hardware }    from '@/components/sections/ZD1000Hardware'
import { ZD1000Mission }     from '@/components/sections/ZD1000Mission'
import { ZD1000Industries }  from '@/components/sections/ZD1000Industries'
import { ZD1000DaaS }        from '@/components/sections/ZD1000DaaS'
import { ZD1000Features }    from '@/components/sections/ZD1000Features'
import { ZD1000CTA }         from '@/components/sections/ZD1000CTA'
import { getPageMeta }       from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/zenadrone-1000', {
    title: 'ZenaDrone 1000 — Advanced Multi-Mission UAV | Zenadrone',
    description:
      'ZenaDrone 1000 is an advanced UAV built with AI and machine learning for military, industrial, agricultural, and humanitarian missions. Long flight time, heavy lift, autonomous navigation.',
  })
}

export default function ZenaDrone1000Page() {
  return (
    <>
      <Header />
      <main>
        <ZD1000Hero />

        <SectionReveal>
          <ZD1000Overview />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ZD1000Hardware />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ZD1000Mission />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ZD1000Industries />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ZD1000DaaS />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ZD1000Features />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ZD1000CTA />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
