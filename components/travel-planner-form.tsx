"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TravelPlan {
  destination: string
  budget: number
  days: number
  travelMode: "domestic" | "international"
  groupSize: number
  transportPreference: "flight" | "train" | "bus" | "mixed"
  spendingPriority: "accommodation" | "food" | "activities" | "balanced"
}

const DOMESTIC_DESTINATIONS = [
  "Delhi",
  "Mumbai",
  "Goa",
  "Kerala",
  "Rajasthan",
  "Jaipur",
  "Agra",
  "Bangalore",
  "Hyderabad",
  "Kolkata",
]

const INTERNATIONAL_DESTINATIONS = [
  "Bangkok",
  "Bali",
  "Dubai",
  "Singapore",
  "Tokyo",
  "Paris",
  "London",
  "New York",
  "Barcelona",
  "Amsterdam",
]

export interface TravelPlannerFormProps {
  onSubmit: (plan: TravelPlan) => void
}

export function TravelPlannerForm({ onSubmit }: TravelPlannerFormProps) {
  const [destination, setDestination] = useState("")
  const [budget, setBudget] = useState(25000)
  const [days, setDays] = useState(3)
  const [travelMode, setTravelMode] = useState<"domestic" | "international">("domestic")
  const [groupSize, setGroupSize] = useState(1)
  const [transportPreference, setTransportPreference] = useState<"flight" | "train" | "bus" | "mixed">("mixed")
  const [spendingPriority, setSpendingPriority] = useState<"accommodation" | "food" | "activities" | "balanced">(
    "balanced",
  )
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = travelMode === "domestic" ? DOMESTIC_DESTINATIONS : INTERNATIONAL_DESTINATIONS
  const filteredSuggestions = suggestions.filter((s) => s.toLowerCase().includes(destination.toLowerCase()))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (destination.trim()) {
      onSubmit({
        destination: destination.trim(),
        budget: Number(budget),
        days: Number(days),
        travelMode,
        groupSize: Number(groupSize),
        transportPreference,
        spendingPriority,
      })
    }
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="border-2 border-primary/30 shadow-2xl hover:shadow-3xl transition-all card-hover">
          <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-primary/30">
            <CardTitle className="text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Plan Your Trip
            </CardTitle>
            <CardDescription className="text-base mt-3">
              Enter your destination, budget, preferences, and group details to get personalized travel recommendations
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Travel Mode Selection */}
              <div className="animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                <label className="block text-sm font-semibold text-foreground mb-3">Travel Type</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setTravelMode("domestic")
                      setDestination("")
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      travelMode === "domestic"
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    🇮🇳 Within India
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTravelMode("international")
                      setDestination("")
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      travelMode === "international"
                        ? "bg-secondary text-secondary-foreground shadow-lg scale-105"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    🌍 International
                  </button>
                </div>
              </div>

              {/* Destination Input */}
              <div className="animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                <label htmlFor="destination" className="block text-sm font-semibold text-foreground mb-2">
                  Destination
                </label>
                <div className="relative">
                  <Input
                    id="destination"
                    type="text"
                    placeholder={`Enter a ${travelMode === "domestic" ? "destination in India" : "destination"}`}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="py-3 px-4 text-base border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border-2 border-primary/30 rounded-lg shadow-2xl z-10 animate-scale-in">
                      {filteredSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => {
                            setDestination(suggestion)
                            setShowSuggestions(false)
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-primary/15 transition-all text-foreground font-medium border-b border-border last:border-b-0"
                        >
                          📍 {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Budget Slider */}
              <div className="animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                <label htmlFor="budget" className="block text-sm font-semibold text-foreground mb-3">
                  Budget: <span className="text-primary font-bold">₹{budget.toLocaleString("en-IN")}</span>
                </label>
                <input
                  id="budget"
                  type="range"
                  min={travelMode === "domestic" ? 2000 : 50000}
                  max={travelMode === "domestic" ? 200000 : 1250000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-secondary transition-all"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
                  <span>₹{(travelMode === "domestic" ? 2000 : 50000).toLocaleString("en-IN")}</span>
                  <span>₹{(travelMode === "domestic" ? 200000 : 1250000).toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Days Input */}
              <div className="animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
                <label htmlFor="days" className="block text-sm font-semibold text-foreground mb-2">
                  Number of Days 📅
                </label>
                <Input
                  id="days"
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(Math.max(1, Math.min(30, Number(e.target.value))))}
                  className="py-3 px-4 text-base border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Group Size */}
              <div className="animate-slide-in-left" style={{ animationDelay: "0.5s" }}>
                <label htmlFor="groupSize" className="block text-sm font-semibold text-foreground mb-2">
                  Group Size (Number of People) 👥
                </label>
                <Input
                  id="groupSize"
                  type="number"
                  min="1"
                  max="20"
                  value={groupSize}
                  onChange={(e) => setGroupSize(Math.max(1, Math.min(20, Number(e.target.value))))}
                  className="py-3 px-4 text-base border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  💡 Per person budget: ₹{Math.round(budget / groupSize).toLocaleString("en-IN")}
                </p>
              </div>

              {/* Transport Preference */}
              <div className="animate-slide-in-right" style={{ animationDelay: "0.6s" }}>
                <label className="block text-sm font-semibold text-foreground mb-3">Transport Preference 🚗</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["flight", "train", "bus", "mixed"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTransportPreference(option as any)}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all text-sm transform hover:scale-105 ${
                        transportPreference === option
                          ? "bg-primary text-primary-foreground shadow-lg scale-105"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {option === "flight" && "✈️ Flight"}
                      {option === "train" && "🚂 Train"}
                      {option === "bus" && "🚌 Bus"}
                      {option === "mixed" && "🔀 Mixed"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spending Priority */}
              <div className="animate-slide-in-left" style={{ animationDelay: "0.7s" }}>
                <label className="block text-sm font-semibold text-foreground mb-3">Where to Spend More 💸</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: "accommodation", label: "🏨 Stay", emoji: "🏨" },
                    { key: "food", label: "🍽️ Food", emoji: "🍽️" },
                    { key: "activities", label: "🎭 Activities", emoji: "🎭" },
                    { key: "balanced", label: "⚖️ Balanced", emoji: "⚖️" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setSpendingPriority(option.key as any)}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all text-sm transform hover:scale-105 ${
                        spendingPriority === option.key
                          ? "bg-secondary text-secondary-foreground shadow-lg scale-105"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl text-primary-foreground font-bold py-6 text-lg rounded-lg transition-all transform hover:scale-105 card-hover animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                ✨ Generate Travel Plan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
