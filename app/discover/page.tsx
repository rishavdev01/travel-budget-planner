"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MoodRecommendations } from "@/components/mood-recommendations"
import { LocalInsiderGuide } from "@/components/local-insider-guide"

export default function DiscoverPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Discover Like a Local
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Mood-based travel recommendations and insider knowledge sourced from locals --
            not algorithms. Find calm spots when burned out, social hubs when lonely,
            and real adventures when restless.
          </p>
        </div>
      </section>

      {/* Mood-Based Recommendations */}
      <MoodRecommendations />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-t border-border" />
      </div>

      {/* Local Insider Guide */}
      <LocalInsiderGuide />

      <Footer />
    </main>
  )
}
