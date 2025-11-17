"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TravelPlannerForm } from "@/components/travel-planner-form"
import { TravelResults } from "@/components/travel-results"

interface TravelPlan {
  source: string
  destination: string
  budget: number
  days: number
  travelMode: "domestic" | "international"
  groupSize: number
  transportPreference: "flight" | "train" | "bus" | "mixed"
  spendingPriority: "accommodation" | "food" | "activities" | "balanced"
}

export default function PlannerPage() {
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null)

  return (
    <main className="min-h-screen">
      <Header />
      <TravelPlannerForm
        onSubmit={(plan) => {
          setTravelPlan(plan)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />
      {travelPlan && <TravelResults {...travelPlan} />}
      <Footer />
    </main>
  )
}
