import Nav        from '@/components/Nav'
import Hero       from '@/components/Hero'
import Problem    from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import ChatDemo   from '@/components/ChatDemo'

export default function Home() {
  return (
    <main className="bg-helix-bg min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <ChatDemo />
    </main>
  )
}
