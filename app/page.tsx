"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TravelModeSelector } from "@/components/travel-mode-selector"
import { BudgetCalculatorDomestic } from "@/components/budget-calculator-domestic"
import { BudgetCalculatorInternational } from "@/components/budget-calculator-international"
import { Dashboard } from "@/components/dashboard"
import { RecommendationsSection } from "@/components/recommendations-section"
import { DestinationComparison } from "@/components/destination-comparison"
import { Footer } from "@/components/footer"

export default function Home() {
  const [travelMode, setTravelMode] = useState<"domestic" | "international">("domestic")

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TravelModeSelector onModeChange={setTravelMode} />

      {travelMode === "domestic" ? <BudgetCalculatorDomestic /> : <BudgetCalculatorInternational />}

      <Dashboard />
      <RecommendationsSection />
      <DestinationComparison />
      <Footer />
    </main>
  )
}
