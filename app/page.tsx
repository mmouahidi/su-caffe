import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { OriginsJourney } from "@/components/origins-journey"
import { Boutique } from "@/components/boutique"
import { Mastery } from "@/components/mastery"
import { VIPFooter } from "@/components/vip-footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <OriginsJourney />
      <Boutique />
      <Mastery />
      <VIPFooter />
    </main>
  )
}
