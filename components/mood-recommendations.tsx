"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Battery, Users, Flame, Heart, MapPin, Clock, Star, Lightbulb } from "lucide-react"

interface MoodPlace {
  id: number
  name: string
  city: string
  type: string
  description: string
  whyThisMood: string
  estimatedCost: string
  bestTime: string
  duration: string
  rating: number
  tags: string[]
  localTip: string
}

const MOODS = [
  {
    id: "burnt-out",
    label: "Burnt Out",
    icon: Battery,
    description: "Calm places to recharge",
    color: "from-teal-500 to-cyan-400",
    bgLight: "bg-teal-50",
    textColor: "text-teal-700",
    borderColor: "border-teal-200",
    ringColor: "ring-teal-400",
  },
  {
    id: "lonely",
    label: "Feeling Lonely",
    icon: Users,
    description: "Social experiences to connect",
    color: "from-amber-500 to-orange-400",
    bgLight: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    ringColor: "ring-amber-400",
  },
  {
    id: "adventurous",
    label: "Adventurous",
    icon: Flame,
    description: "Thrill activities to push limits",
    color: "from-rose-500 to-red-400",
    bgLight: "bg-rose-50",
    textColor: "text-rose-700",
    borderColor: "border-rose-200",
    ringColor: "ring-rose-400",
  },
]

const CITIES = [
  { id: "all", label: "All Cities" },
  { id: "bangalore", label: "Bangalore" },
  { id: "delhi", label: "Delhi" },
  { id: "mumbai", label: "Mumbai" },
  { id: "goa", label: "Goa" },
]

export function MoodRecommendations() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState("all")
  const [places, setPlaces] = useState<MoodPlace[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedTip, setExpandedTip] = useState<number | null>(null)

  const activeMood = MOODS.find((m) => m.id === selectedMood)

  async function handleMoodSelect(moodId: string) {
    setSelectedMood(moodId)
    setLoading(true)
    setExpandedTip(null)
    try {
      const res = await fetch(
        `/api/mood-recommendations?mood=${moodId}&city=${selectedCity}`
      )
      const data = await res.json()
      setPlaces(data.recommendations || [])
    } catch {
      setPlaces([])
    } finally {
      setLoading(false)
    }
  }

  async function handleCityChange(cityId: string) {
    setSelectedCity(cityId)
    if (selectedMood) {
      setLoading(true)
      setExpandedTip(null)
      try {
        const res = await fetch(
          `/api/mood-recommendations?mood=${selectedMood}&city=${cityId}`
        )
        const data = await res.json()
        setPlaces(data.recommendations || [])
      } catch {
        setPlaces([])
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              How Are You Feeling?
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us your mood and we will recommend places that actually match what you need
            right now. Real suggestions from locals, not algorithm rankings.
          </p>
        </div>

        {/* Mood Picker */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {MOODS.map((mood) => {
            const Icon = mood.icon
            const isActive = selectedMood === mood.id
            return (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`relative p-6 rounded-2xl text-left transition-all duration-300 border-2 ${
                  isActive
                    ? `${mood.borderColor} ${mood.bgLight} ring-2 ${mood.ringColor} shadow-lg scale-[1.02]`
                    : "border-border bg-card hover:border-primary/30 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${mood.color} text-card`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold ${isActive ? mood.textColor : "text-foreground"}`}>
                      {mood.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {mood.description}
                    </p>
                  </div>
                </div>
                {isActive && (
                  <div className={`absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br ${mood.color}`} />
                )}
              </button>
            )
          })}
        </div>

        {/* City Filter */}
        {selectedMood && (
          <div className="flex flex-wrap items-center gap-2 mb-8 animate-fade-in-up">
            <span className="text-sm font-medium text-muted-foreground mr-2">Filter by city:</span>
            {CITIES.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCityChange(city.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCity === city.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {city.label}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-muted border-t-primary" />
            <p className="mt-4 text-muted-foreground">
              Finding the perfect spots for your mood...
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && places.length > 0 && activeMood && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${activeMood.color}`} />
              <h3 className="text-xl font-bold text-foreground">
                {places.length} places for when you are feeling {activeMood.label.toLowerCase()}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place, idx) => (
                <Card
                  key={place.id}
                  className="h-full border-2 border-border hover:border-primary/30 transition-all hover:shadow-lg bg-card overflow-hidden"
                  style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.08}s both` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-base leading-snug text-foreground">
                          {place.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {place.city}
                          </Badge>
                          <Badge
                            className={`text-xs ${activeMood.bgLight} ${activeMood.textColor} border ${activeMood.borderColor}`}
                          >
                            {place.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-semibold text-foreground">{place.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {place.description}
                    </p>

                    {/* Why this mood */}
                    <div className={`p-3 rounded-lg ${activeMood.bgLight} border ${activeMood.borderColor}`}>
                      <p className={`text-xs font-semibold ${activeMood.textColor} mb-1`}>
                        Why this helps:
                      </p>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        {place.whyThisMood}
                      </p>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{place.estimatedCost}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{place.duration}</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Best time:</span>{" "}
                      {place.bestTime}
                    </div>

                    {/* Local Tip (expandable) */}
                    <button
                      onClick={() => setExpandedTip(expandedTip === place.id ? null : place.id)}
                      className="w-full flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors text-left"
                    >
                      <Lightbulb className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-xs font-semibold text-primary flex-1">
                        Local Insider Tip
                      </span>
                      <span className="text-xs text-primary">
                        {expandedTip === place.id ? "Hide" : "Show"}
                      </span>
                    </button>
                    {expandedTip === place.id && (
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in-up">
                        <p className="text-xs text-foreground/80 leading-relaxed italic">
                          {place.localTip}
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                      {place.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium"
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
        {!loading && selectedMood && places.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No recommendations found for this mood in the selected city. Try selecting
              &quot;All Cities&quot;.
            </p>
          </div>
        )}

        {/* Initial state */}
        {!selectedMood && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">Select your current mood above to get personalized recommendations</p>
          </div>
        )}
      </div>
    </section>
  )
}
