"use client"

import { useState } from "react"
import { MapPin } from 'lucide-react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationMap } from "@/components/location-map"
import { NearbyPlacesSection } from "@/components/nearby-places-section"
import { Card, CardContent } from "@/components/ui/card"

interface LocationData {
  lat: number
  lng: number
  city: string
  country: string
}

export default function NearbyPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Explore Nearby Places
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find amazing attractions, restaurants, and activities near you. Let WanderWallet guide your exploration!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <LocationMap onLocationSelect={setSelectedLocation} />
            </div>

            <div className="lg:col-span-2">
              {selectedLocation ? (
                <NearbyPlacesSection 
                  city={selectedLocation.city}
                  latitude={selectedLocation.lat}
                  longitude={selectedLocation.lng}
                />
              ) : (
                <Card className="border-2 border-primary/30 shadow-lg animate-fade-in-up">
                  <CardContent className="pt-12 pb-12 text-center">
                    <MapPin className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground font-medium">
                      Click "Get My Current Location" to see nearby places to explore
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
