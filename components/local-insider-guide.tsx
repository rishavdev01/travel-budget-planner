"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  UtensilsCrossed,
  PartyPopper,
  Compass,
  MapPin,
  Star,
  Clock,
  IndianRupee,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface LocalFood {
  id: number
  name: string
  type: string
  description: string
  priceRange: string
  address: string
  knownFor: string
  localSecret: string
  rating: number
  tags: string[]
}

interface Festival {
  id: number
  name: string
  when: string
  description: string
  where: string
  localExperience: string
  cost: string
  insiderTip: string
  tags: string[]
}

interface HiddenSpot {
  id: number
  name: string
  type: string
  description: string
  howToReach: string
  whyHidden: string
  bestTime: string
  cost: string
  localSecret: string
  tags: string[]
}

const CITIES = [
  { id: "bangalore", label: "Bangalore" },
  { id: "delhi", label: "Delhi" },
  { id: "mumbai", label: "Mumbai" },
  { id: "goa", label: "Goa" },
]

const CATEGORIES = [
  { id: "all", label: "Everything", icon: Compass },
  { id: "food", label: "Local Food", icon: UtensilsCrossed },
  { id: "festivals", label: "Festivals", icon: PartyPopper },
  { id: "hidden", label: "Hidden Spots", icon: MapPin },
]

export function LocalInsiderGuide() {
  const [selectedCity, setSelectedCity] = useState("bangalore")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [food, setFood] = useState<LocalFood[]>([])
  const [festivals, setFestivals] = useState<Festival[]>([])
  const [hiddenSpots, setHiddenSpots] = useState<HiddenSpot[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedSecrets, setExpandedSecrets] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/local-insider?city=${selectedCity}&category=${selectedCategory}`
        )
        const data = await res.json()
        setFood(data.food || [])
        setFestivals(data.festivals || [])
        setHiddenSpots(data.hiddenSpots || [])
      } catch {
        setFood([])
        setFestivals([])
        setHiddenSpots([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedCity, selectedCategory])

  function toggleSecret(key: string) {
    setExpandedSecrets((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const cityLabel = CITIES.find((c) => c.id === selectedCity)?.label || selectedCity

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass className="w-8 h-8 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Local Insider Guide
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what locals actually eat, celebrate, and cherish. No tourist traps, no Google
            top-10 lists -- just real recommendations from people who live there.
          </p>
        </div>

        {/* City Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {CITIES.map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                selectedCity === city.id
                  ? "bg-foreground text-background shadow-lg scale-105"
                  : "bg-card text-foreground border border-border hover:border-foreground/30 hover:shadow-md"
              }`}
            >
              {city.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-muted border-t-accent" />
            <p className="mt-4 text-muted-foreground">
              Loading local secrets for {cityLabel}...
            </p>
          </div>
        )}

        {!loading && (
          <div className="space-y-16">
            {/* LOCAL FOOD */}
            {food.length > 0 && (
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <UtensilsCrossed className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Local Food in {cityLabel}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Where locals actually eat, not where tourists go
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {food.map((item, idx) => (
                    <Card
                      key={item.id}
                      className="h-full border-2 border-border hover:border-amber-300 transition-all hover:shadow-lg bg-card"
                      style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.08}s both` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-base text-foreground">{item.name}</CardTitle>
                            <Badge className="mt-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs">
                              {item.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-semibold text-foreground">{item.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>

                        <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                          <p className="text-xs font-semibold text-amber-700 mb-1">Known for:</p>
                          <p className="text-xs text-foreground/80">{item.knownFor}</p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            <span>{item.priceRange}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate max-w-[140px]">{item.address}</span>
                          </div>
                        </div>

                        {/* Secret */}
                        <button
                          onClick={() => toggleSecret(`food-${item.id}`)}
                          className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/5 border border-amber-200/50 hover:bg-amber-500/10 transition-colors text-left"
                        >
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="text-xs font-semibold text-amber-700 flex-1">
                            Local Secret
                          </span>
                          {expandedSecrets.has(`food-${item.id}`) ? (
                            <ChevronUp className="w-3.5 h-3.5 text-amber-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
                          )}
                        </button>
                        {expandedSecrets.has(`food-${item.id}`) && (
                          <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 animate-fade-in-up">
                            <p className="text-xs text-foreground/80 leading-relaxed italic">
                              {item.localSecret}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium border border-amber-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* FESTIVALS */}
            {festivals.length > 0 && (
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-100 flex items-center justify-center">
                    <PartyPopper className="w-5 h-5 text-fuchsia-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Festivals in {cityLabel}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Celebrations that define the soul of the city
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {festivals.map((fest, idx) => (
                    <Card
                      key={fest.id}
                      className="h-full border-2 border-border hover:border-fuchsia-300 transition-all hover:shadow-lg bg-card"
                      style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-foreground">{fest.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {fest.when}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {fest.description}
                        </p>

                        <div className="p-3 rounded-lg bg-fuchsia-50 border border-fuchsia-100">
                          <p className="text-xs font-semibold text-fuchsia-700 mb-1">
                            The local experience:
                          </p>
                          <p className="text-xs text-foreground/80 leading-relaxed">
                            {fest.localExperience}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{fest.where}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            <span>{fest.cost}</span>
                          </div>
                        </div>

                        {/* Insider Tip */}
                        <button
                          onClick={() => toggleSecret(`fest-${fest.id}`)}
                          className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-fuchsia-500/5 border border-fuchsia-200/50 hover:bg-fuchsia-500/10 transition-colors text-left"
                        >
                          <Lightbulb className="w-4 h-4 text-fuchsia-600 shrink-0" />
                          <span className="text-xs font-semibold text-fuchsia-700 flex-1">
                            Insider Tip
                          </span>
                          {expandedSecrets.has(`fest-${fest.id}`) ? (
                            <ChevronUp className="w-3.5 h-3.5 text-fuchsia-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-fuchsia-600" />
                          )}
                        </button>
                        {expandedSecrets.has(`fest-${fest.id}`) && (
                          <div className="p-3 bg-fuchsia-50/50 rounded-lg border border-fuchsia-100 animate-fade-in-up">
                            <p className="text-xs text-foreground/80 leading-relaxed italic">
                              {fest.insiderTip}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                          {fest.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-50 text-fuchsia-700 font-medium border border-fuchsia-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* HIDDEN SPOTS */}
            {hiddenSpots.length > 0 && (
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Hidden Spots in {cityLabel}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Places most residents have never been to
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {hiddenSpots.map((spot, idx) => (
                    <Card
                      key={spot.id}
                      className="h-full border-2 border-border hover:border-emerald-300 transition-all hover:shadow-lg bg-card"
                      style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-foreground">{spot.name}</CardTitle>
                            <Badge className="mt-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">
                              {spot.type}
                            </Badge>
                          </div>
                          <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                            {spot.cost}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {spot.description}
                        </p>

                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                          <p className="text-xs font-semibold text-emerald-700 mb-1">
                            Why it stays hidden:
                          </p>
                          <p className="text-xs text-foreground/80 leading-relaxed">
                            {spot.whyHidden}
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-card border border-border">
                          <p className="text-xs font-semibold text-foreground mb-1">
                            How to reach:
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {spot.howToReach}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Best time: {spot.bestTime}</span>
                        </div>

                        {/* Local Secret */}
                        <button
                          onClick={() => toggleSecret(`spot-${spot.id}`)}
                          className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-200/50 hover:bg-emerald-500/10 transition-colors text-left"
                        >
                          <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-xs font-semibold text-emerald-700 flex-1">
                            Local Secret
                          </span>
                          {expandedSecrets.has(`spot-${spot.id}`) ? (
                            <ChevronUp className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </button>
                        {expandedSecrets.has(`spot-${spot.id}`) && (
                          <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 animate-fade-in-up">
                            <p className="text-xs text-foreground/80 leading-relaxed italic">
                              {spot.localSecret}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                          {spot.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {food.length === 0 && festivals.length === 0 && hiddenSpots.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No data available for this selection yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
