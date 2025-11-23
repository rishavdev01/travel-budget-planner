export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  Delhi: { lat: 28.6139, lng: 77.209 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Bengaluru: { lat: 12.9716, lng: 77.5946 },
  Goa: { lat: 15.2993, lng: 74.124 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Agra: { lat: 27.1767, lng: 78.0081 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
  Bangkok: { lat: 13.7563, lng: 100.5018 },
  Dubai: { lat: 25.2048, lng: 55.2708 },
  Singapore: { lat: 1.3521, lng: 103.8198 },
  London: { lat: 51.5074, lng: -0.1278 },
  Paris: { lat: 48.8566, lng: 2.3522 },
  "New York": { lat: 40.7128, lng: -74.006 },
}

export function estimateFlightPrice(source: string, destination: string, date: string): number {
  const srcCoords = CITY_COORDINATES[source] || CITY_COORDINATES["Delhi"]
  const destCoords = CITY_COORDINATES[destination] || CITY_COORDINATES["Mumbai"]

  const distance = calculateDistance(srcCoords.lat, srcCoords.lng, destCoords.lat, destCoords.lng)
  const baseRatePerKm = 4.5 // INR per km
  const dateMultiplier = getDateMultiplier(date)

  // Random fluctuation +/- 10%
  const fluctuation = 0.9 + Math.random() * 0.2

  return Math.round(distance * baseRatePerKm * dateMultiplier * fluctuation)
}

export function estimateTrainPrice(source: string, destination: string, date: string, trainClass: string): number {
  const srcCoords = CITY_COORDINATES[source] || CITY_COORDINATES["Delhi"]
  const destCoords = CITY_COORDINATES[destination] || CITY_COORDINATES["Mumbai"]

  const distance = calculateDistance(srcCoords.lat, srcCoords.lng, destCoords.lat, destCoords.lng)
  let ratePerKm = 1.5 // Sleeper

  if (trainClass.includes("AC")) ratePerKm = 2.8
  if (trainClass.includes("1st")) ratePerKm = 4.0

  return Math.round(distance * ratePerKm)
}

export function estimateBusPrice(source: string, destination: string, date: string, type: string): number {
  const srcCoords = CITY_COORDINATES[source] || CITY_COORDINATES["Delhi"]
  const destCoords = CITY_COORDINATES[destination] || CITY_COORDINATES["Mumbai"]

  const distance = calculateDistance(srcCoords.lat, srcCoords.lng, destCoords.lat, destCoords.lng)
  let ratePerKm = 2.0 // Regular

  if (type.includes("Volvo") || type.includes("AC")) ratePerKm = 3.5

  return Math.round(distance * ratePerKm)
}

function getDateMultiplier(dateString: string): number {
  const travelDate = new Date(dateString)
  const today = new Date()
  const daysUntilTravel = Math.ceil((travelDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (daysUntilTravel < 7) return 1.5 // Last minute
  if (daysUntilTravel < 30) return 1.2 // Standard
  return 0.8 // Advance booking
}
