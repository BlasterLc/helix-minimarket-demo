import Nav        from '@/components/Nav'
import Hero       from '@/components/Hero'
import Problem    from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import ChatDemo   from '@/components/ChatDemo'
import Dashboard  from '@/components/Dashboard'
import Features   from '@/components/Features'
import Team       from '@/components/Team'
import CTA        from '@/components/CTA'

export default function Home() {
  return (
    <main className="bg-helix-bg min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <ChatDemo />
      <Dashboard />
      <Features />
      <Team />
      <CTA />
    </main>
  )
}
