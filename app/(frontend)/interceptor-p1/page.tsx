import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { P1Hero }        from '@/components/sections/P1Hero'
import { P1Capabilities }from '@/components/sections/P1Capabilities'
import { P1UseCases }    from '@/components/sections/P1UseCases'
import { P1CTA }         from '@/components/sections/P1CTA'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/interceptor-p1', {
    title: 'ZenaDrone Interceptor P-1 — Autonomous Counter-Drone Defense | Zenadrone',
    description:
      'ZenaDrone Interceptor P-1 is a disposable AI-guided VTOL drone for autonomous aerial threat intercept. Under $5,000 per unit, <3s response time. Ideal for military, border security, critical infrastructure, and sensitive area protection.',
  })
}

export default function InterceptorP1Page() {
  return (
    <>
      <Header />
      <main>
        <P1Hero />

        <SectionReveal>
          <P1Capabilities />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <P1UseCases />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <P1CTA />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
