import { NextRequest, NextResponse } from "next/server"

interface NearbyPlace {
  id: string
  name: string
  type: string
  distance: string
  rating: number
  description: string
  image: string
  visitTime: string
  entryFee: string
  tags: string[]
}

// City coordinates for accurate geolocation matching
const CITY_COORDINATES: Record<string, { lat: number; lng: number; radius: number }> = {
  delhi: { lat: 28.7041, lng: 77.1025, radius: 50 },
  goa: { lat: 15.2993, lng: 73.8243, radius: 80 },
  mumbai: { lat: 19.076, lng: 72.8777, radius: 50 },
  bangalore: { lat: 12.9716, lng: 77.5946, radius: 50 },
  bengaluru: { lat: 12.9716, lng: 77.5946, radius: 50 },
  hyderabad: { lat: 17.385, lng: 78.4867, radius: 50 },
  jaipur: { lat: 26.9124, lng: 75.7873, radius: 50 },
  kolkata: { lat: 22.5726, lng: 88.3639, radius: 50 },
  agra: { lat: 27.1767, lng: 78.0081, radius: 40 },
  chennai: { lat: 13.0827, lng: 80.2707, radius: 50 },
  pune: { lat: 18.5204, lng: 73.8567, radius: 40 },
}

const NEARBY_PLACES_DATA: Record<string, NearbyPlace[]> = {
  delhi: [
    {
      id: "1",
      name: "India Gate",
      type: "monument",
      distance: "2.5 km",
      rating: 4.8,
      description: "Iconic war memorial and popular gathering spot with beautiful architecture.",
      image: "/india-gate-delhi-monument.jpg",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["historical", "photography", "landmark"],
    },
    {
      id: "2",
      name: "Humayun's Tomb",
      type: "monument",
      distance: "4.2 km",
      rating: 4.6,
      description: "UNESCO World Heritage site and stunning example of Mughal architecture.",
      image: "/humayun-tomb-delhi.jpg",
      visitTime: "1.5-2 hours",
      entryFee: "₹30",
      tags: ["historical", "architecture", "unesco"],
    },
    {
      id: "3",
      name: "Khan Market",
      type: "shopping",
      distance: "3.1 km",
      rating: 4.4,
      description: "Upscale shopping destination with international and local brands.",
      image: "/khan-market-delhi-shopping.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["shopping", "dining", "lifestyle"],
    },
    {
      id: "4",
      name: "Parathe Wali Gali",
      type: "restaurants",
      distance: "1.8 km",
      rating: 4.5,
      description: "Famous alley known for delicious traditional Indian parathas and street food.",
      image: "/parathe-wali-gali-delhi-street-food.jpg",
      visitTime: "1-2 hours",
      entryFee: "₹100-300",
      tags: ["food", "street food", "vegetarian"],
    },
    {
      id: "5",
      name: "Rajpath & Central Park",
      type: "adventure",
      distance: "5.5 km",
      rating: 4.3,
      description: "Scenic walking and cycling path in central Delhi with jogging trails.",
      image: "/india-gate-delhi-monument.jpg",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["walking", "cycling", "park"],
    },
  ],
  goa: [
    {
      id: "1",
      name: "Baga Beach",
      type: "beaches",
      distance: "0.5 km",
      rating: 4.7,
      description: "Popular beach with water sports, cafes, and beautiful sunset views.",
      image: "/baga-beach-goa-sunset.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["beach", "water sports", "sunset"],
    },
    {
      id: "2",
      name: "Fort Aguada",
      type: "monument",
      distance: "3.2 km",
      rating: 4.5,
      description: "Historic Portuguese fort with lighthouse offering panoramic views of the Arabian Sea.",
      image: "/fort-aguada-goa-lighthouse.jpg",
      visitTime: "1-2 hours",
      entryFee: "₹20",
      tags: ["historical", "photography", "views"],
    },
    {
      id: "3",
      name: "Dudhsagar Waterfall",
      type: "adventure",
      distance: "12 km",
      rating: 4.8,
      description: "Breathtaking four-tiered waterfall, perfect for trekking and adventure activities.",
      image: "/dudhsagar-waterfall-goa-jungle.jpg",
      visitTime: "3-4 hours",
      entryFee: "₹50",
      tags: ["waterfall", "trekking", "adventure"],
    },
    {
      id: "4",
      name: "Anjuna Flea Market",
      type: "shopping",
      distance: "5.1 km",
      rating: 4.3,
      description: "Weekly market with handicrafts, souvenirs, and local artisan products.",
      image: "/anjuna-flea-market-goa.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["shopping", "handicrafts", "local"],
    },
    {
      id: "5",
      name: "Palolem Beach",
      type: "beaches",
      distance: "8.3 km",
      rating: 4.6,
      description: "Peaceful crescent-shaped beach with backwaters and dolphin spotting opportunities.",
      image: "/baga-beach-goa-sunset.jpg",
      visitTime: "3-4 hours",
      entryFee: "Free",
      tags: ["beach", "dolphins", "peaceful"],
    },
    {
      id: "6",
      name: "Spice Plantation Tour",
      type: "adventure",
      distance: "15 km",
      rating: 4.4,
      description: "Guided tour through authentic spice plantations learning about Goa's agricultural heritage.",
      image: "/dudhsagar-waterfall-goa-jungle.jpg",
      visitTime: "2-3 hours",
      entryFee: "₹200-400",
      tags: ["agriculture", "cultural", "tours"],
    },
  ],
  mumbai: [
    {
      id: "1",
      name: "Gateway of India",
      type: "monument",
      distance: "2.1 km",
      rating: 4.6,
      description: "Iconic monument overlooking the Arabian Sea, must-visit landmark in Mumbai.",
      image: "/gateway-of-india-mumbai.png",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["historical", "landmark", "views"],
    },
    {
      id: "2",
      name: "Marine Drive",
      type: "beaches",
      distance: "3.5 km",
      rating: 4.7,
      description: "Scenic coastal promenade perfect for evening walks and street food.",
      image: "/marine-drive-mumbai-coast.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["beach", "walk", "sunset"],
    },
    {
      id: "3",
      name: "Chowpatty Beach",
      type: "beaches",
      distance: "1.9 km",
      rating: 4.4,
      description: "Popular beach with vibrant street food scene and local culture.",
      image: "/chowpatty-beach-mumbai-street-food.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["beach", "food", "culture"],
    },
    {
      id: "4",
      name: "Taj Mahal Palace Hotel",
      type: "restaurants",
      distance: "2.3 km",
      rating: 4.8,
      description: "Iconic luxury hotel with fine dining restaurants and heritage architecture.",
      image: "/taj-mahal-palace-hotel-mumbai.jpg",
      visitTime: "1-2 hours",
      entryFee: "₹500+",
      tags: ["dining", "luxury", "historic"],
    },
    {
      id: "5",
      name: "Elephant Caves",
      type: "monument",
      distance: "8.2 km",
      rating: 4.5,
      description: "Ancient rock-cut Hindu and Buddhist caves with intricate sculptures.",
      image: "/gateway-of-india-mumbai.png",
      visitTime: "2-3 hours",
      entryFee: "₹100",
      tags: ["historical", "caves", "cultural"],
    },
  ],
  bangalore: [
    {
      id: "1",
      name: "Vidhana Soudha",
      type: "monument",
      distance: "1.2 km",
      rating: 4.5,
      description: "Impressive neo-Dravidian architecture housing the state legislature.",
      image: "/vidhana-soudha-bangalore-architecture.jpg",
      visitTime: "1-2 hours",
      entryFee: "₹15",
      tags: ["architecture", "photography", "historical"],
    },
    {
      id: "2",
      name: "Nandi Hills",
      type: "adventure",
      distance: "8.5 km",
      rating: 4.6,
      description: "Popular hill station with trekking, sunrise views, and adventure activities.",
      image: "/nandi-hills-bangalore-sunrise.jpg",
      visitTime: "3-4 hours",
      entryFee: "₹30",
      tags: ["trekking", "views", "adventure"],
    },
    {
      id: "3",
      name: "Cubbon Park",
      type: "shopping",
      distance: "1.5 km",
      rating: 4.4,
      description: "Lush green space with gardens, museum, and casual dining options.",
      image: "/cubbon-park-bangalore-gardens.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["parks", "nature", "walking"],
    },
    {
      id: "4",
      name: "Wonderla Amusement Park",
      type: "adventure",
      distance: "12.3 km",
      rating: 4.3,
      description: "Theme park with thrilling rides, water attractions, and family entertainment.",
      image: "/nandi-hills-bangalore-sunrise.jpg",
      visitTime: "4-5 hours",
      entryFee: "₹600-800",
      tags: ["amusement", "family", "entertainment"],
    },
  ],
  bengaluru: [
    {
      id: "1",
      name: "Vidhana Soudha",
      type: "monument",
      distance: "1.2 km",
      rating: 4.5,
      description: "Impressive neo-Dravidian architecture housing the state legislature.",
      image: "/vidhana-soudha-bangalore-architecture.jpg",
      visitTime: "1-2 hours",
      entryFee: "₹15",
      tags: ["architecture", "photography", "historical"],
    },
    {
      id: "2",
      name: "Nandi Hills",
      type: "adventure",
      distance: "8.5 km",
      rating: 4.6,
      description: "Popular hill station with trekking, sunrise views, and adventure activities.",
      image: "/nandi-hills-bangalore-sunrise.jpg",
      visitTime: "3-4 hours",
      entryFee: "₹30",
      tags: ["trekking", "views", "adventure"],
    },
    {
      id: "3",
      name: "Cubbon Park",
      type: "shopping",
      distance: "1.5 km",
      rating: 4.4,
      description: "Lush green space with gardens, museum, and casual dining options.",
      image: "/cubbon-park-bangalore-gardens.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["parks", "nature", "walking"],
    },
    {
      id: "4",
      name: "Wonderla Amusement Park",
      type: "adventure",
      distance: "12.3 km",
      rating: 4.3,
      description: "Theme park with thrilling rides, water attractions, and family entertainment.",
      image: "/nandi-hills-bangalore-sunrise.jpg",
      visitTime: "4-5 hours",
      entryFee: "₹600-800",
      tags: ["amusement", "family", "entertainment"],
    },
    {
      id: "5",
      name: "Lalbagh Botanical Garden",
      type: "shopping",
      distance: "3.2 km",
      rating: 4.7,
      description: "Historic botanical garden with rare plant species and glass house.",
      image: "/cubbon-park-bangalore-gardens.jpg",
      visitTime: "2-3 hours",
      entryFee: "₹20",
      tags: ["garden", "nature", "photography"],
    },
    {
      id: "6",
      name: "UB City Mall",
      type: "shopping",
      distance: "2.1 km",
      rating: 4.5,
      description: "Luxury shopping mall with international brands and fine dining.",
      image: "/vidhana-soudha-bangalore-architecture.jpg",
      visitTime: "2-4 hours",
      entryFee: "Free",
      tags: ["shopping", "dining", "luxury"],
    },
  ],
  hyderabad: [
    {
      id: "1",
      name: "Charminar",
      type: "monument",
      distance: "0.2 km",
      rating: 4.9,
      description: "Iconic monument with beautiful architecture and bustling market.",
      image: "/charminar-hyderabad.jpg",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["historical", "photography", "landmark"],
    },
    {
      id: "2",
      name: "Golconda Fort",
      type: "monument",
      distance: "10 km",
      rating: 4.7,
      description: "Historic fort with stunning views and rich cultural heritage.",
      image: "/golconda-fort-hyderabad.jpg",
      visitTime: "2-3 hours",
      entryFee: "₹20",
      tags: ["historical", "fort", "views"],
    },
    {
      id: "3",
      name: "Birla Mandir",
      type: "temple",
      distance: "5 km",
      rating: 4.6,
      description: "Beautiful white marble temple dedicated to Lord Venkateswara.",
      image: "/birla-mandir-hyderabad.jpg",
      visitTime: "1-2 hours",
      entryFee: "₹50",
      tags: ["religious", "architecture", "photography"],
    },
    {
      id: "4",
      name: "Lakshmi Narasimha Temple",
      type: "temple",
      distance: "8 km",
      rating: 4.5,
      description: "Ancient temple with intricate carvings and spiritual significance.",
      image: "/lakshmi-narasimha-temple-hyderabad.jpg",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["religious", "history", "cultural"],
    },
  ],
  jaipur: [
    {
      id: "1",
      name: "Amber Fort",
      type: "monument",
      distance: "11 km",
      rating: 4.8,
      description: "Historic fort with stunning architecture and scenic views.",
      image: "/amber-fort-jaipur.jpg",
      visitTime: "2-3 hours",
      entryFee: "₹500",
      tags: ["historical", "fort", "views"],
    },
    {
      id: "2",
      name: "Jantar Mantar",
      type: "monument",
      distance: "0.8 km",
      rating: 4.7,
      description: "Astronomical observatory with intricate stone structures.",
      image: "/jantar-mantar-jaipur.jpg",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["historical", "architecture", "science"],
    },
    {
      id: "3",
      name: "City Palace",
      type: "monument",
      distance: "1.2 km",
      rating: 4.6,
      description: "Royal palace complex with beautiful gardens and intricate designs.",
      image: "/city-palace-jaipur.jpg",
      visitTime: "2-3 hours",
      entryFee: "₹500",
      tags: ["historical", "palace", "architecture"],
    },
    {
      id: "4",
      name: "Hawa Mahal",
      type: "monument",
      distance: "1.5 km",
      rating: 4.5,
      description: "Famous pink palace known for its unique architecture and stunning views.",
      image: "/hawa-mahal-jaipur.jpg",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["historical", "architecture", "views"],
    },
  ],
  kolkata: [
    {
      id: "1",
      name: "Victoria Memorial",
      type: "monument",
      distance: "1 km",
      rating: 4.8,
      description: "Majestic monument celebrating Queen Victoria's birthday.",
      image: "/victoria-memorial-kolkata.jpg",
      visitTime: "2-3 hours",
      entryFee: "₹20",
      tags: ["historical", "photography", "landmark"],
    },
    {
      id: "2",
      name: "Howrah Bridge",
      type: "bridge",
      distance: "2 km",
      rating: 4.7,
      description: "Iconic suspension bridge connecting Kolkata and Howrah.",
      image: "/howrah-bridge-kolkata.jpg",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["landmark", "bridge", "views"],
    },
    {
      id: "3",
      name: "Esplanade",
      type: "shopping",
      distance: "3 km",
      rating: 4.6,
      description: "Upscale shopping destination with international and local brands.",
      image: "/esplanade-kolkata.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["shopping", "dining", "lifestyle"],
    },
    {
      id: "4",
      name: "Calcutta Club",
      type: "restaurants",
      distance: "4 km",
      rating: 4.5,
      description: "Luxury club with fine dining restaurants and scenic views.",
      image: "/calcutta-club-kolkata.jpg",
      visitTime: "1-2 hours",
      entryFee: "₹1000+",
      tags: ["dining", "luxury", "views"],
    },
  ],
  agra: [
    {
      id: "1",
      name: "Taj Mahal",
      type: "monument",
      distance: "0.1 km",
      rating: 5.0,
      description: "UNESCO World Heritage site and one of the Seven Wonders of the World.",
      image: "/taj-mahal-agra.jpg",
      visitTime: "2-3 hours",
      entryFee: "₹1000",
      tags: ["historical", "photography", "landmark"],
    },
    {
      id: "2",
      name: "Agra Fort",
      type: "monument",
      distance: "2 km",
      rating: 4.8,
      description: "Historic fort with beautiful architecture and rich history.",
      image: "/agra-fort-agra.jpg",
      visitTime: "2-3 hours",
      entryFee: "₹200",
      tags: ["historical", "fort", "architecture"],
    },
    {
      id: "3",
      name: "Itimad-ud-Daulah",
      type: "monument",
      distance: "3 km",
      rating: 4.7,
      description: "Mausoleum known for its intricate carvings and beautiful gardens.",
      image: "/itimad-ud-daulah-agra.jpg",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["historical", "mausoleum", "architecture"],
    },
    {
      id: "4",
      name: "Mehtab Bagh",
      type: "park",
      distance: "4 km",
      rating: 4.6,
      description: "Beautiful garden offering panoramic views of the Taj Mahal.",
      image: "/mehtab-bagh-agra.jpg",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["views", "park", "nature"],
    },
  ],
  chennai: [
    {
      id: "1",
      name: "VGP Beach",
      type: "beaches",
      distance: "0.3 km",
      rating: 4.7,
      description: "Popular beach with water sports, cafes, and beautiful sunset views.",
      image: "/vgp-beach-chennai.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["beach", "water sports", "sunset"],
    },
    {
      id: "2",
      name: "Marina Beach",
      type: "beaches",
      distance: "5 km",
      rating: 4.8,
      description: "Longest beach in India with vibrant street life and entertainment options.",
      image: "/marina-beach-chennai.jpg",
      visitTime: "3-4 hours",
      entryFee: "Free",
      tags: ["beach", "street life", "entertainment"],
    },
    {
      id: "3",
      name: "Spencer Plaza",
      type: "shopping",
      distance: "2 km",
      rating: 4.6,
      description: "Upscale shopping destination with international and local brands.",
      image: "/spencer-plaza-chennai.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["shopping", "dining", "lifestyle"],
    },
    {
      id: "4",
      name: "Anna Salai",
      type: "shopping",
      distance: "1 km",
      rating: 4.5,
      description: "Popular street known for shopping and dining.",
      image: "/anna-salai-chennai.jpg",
      visitTime: "2-3 hours",
      entryFee: "Free",
      tags: ["shopping", "food", "street"],
    },
  ],
  pune: [
    {
      id: "1",
      name: "Shaniwar Wada",
      type: "monument",
      distance: "0.5 km",
      rating: 4.8,
      description: "Historic fort with beautiful architecture and rich history.",
      image: "/shaniwar-wada-pune.jpg",
      visitTime: "1-2 hours",
      entryFee: "₹100",
      tags: ["historical", "fort", "architecture"],
    },
    {
      id: "2",
      name: "Panchgani",
      type: "adventure",
      distance: "50 km",
      rating: 4.7,
      description: "Popular hill station with scenic views and adventure activities.",
      image: "/panchgani-pune.jpg",
      visitTime: "3-4 hours",
      entryFee: "₹300-500",
      tags: ["trekking", "views", "adventure"],
    },
    {
      id: "3",
      name: "Dagdusheth Halwai",
      type: "shopping",
      distance: "1 km",
      rating: 4.6,
      description: "Traditional sweet shop famous for its unique sweets and cultural significance.",
      image: "/dagdusheth-halwai-pune.jpg",
      visitTime: "1-2 hours",
      entryFee: "Free",
      tags: ["shopping", "food", "cultural"],
    },
    {
      id: "4",
      name: "Raja Dinkar Kelkar Museum",
      type: "museum",
      distance: "2 km",
      rating: 4.5,
      description: "Museum showcasing the rich cultural heritage of Maharashtra.",
      image: "/raja-dinkar-kelkar-museum-pune.jpg",
      visitTime: "2-3 hours",
      entryFee: "₹50",
      tags: ["museum", "history", "culture"],
    },
  ],
}

function findCityFromCoordinates(lat: number, lng: number): string {
  if (!lat || !lng) return "delhi"

  let closestCity = "delhi"
  let closestDistance = Infinity

  for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
    // Calculate distance using Haversine formula for better accuracy
    const R = 6371 // Earth's radius in km
    const dLat = ((coords.lat - lat) * Math.PI) / 180
    const dLng = ((coords.lng - lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((coords.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    if (distance <= coords.radius && distance < closestDistance) {
      closestDistance = distance
      closestCity = city
    }
  }

  console.log("[v0] Matched coordinates to city:", closestCity, "Distance:", closestDistance.toFixed(2), "km")
  return closestCity
}

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city")?.toLowerCase().trim() || ""
  const lat = request.nextUrl.searchParams.get("lat")
  const lng = request.nextUrl.searchParams.get("lng")

  let selectedCity = "delhi"

  if (lat && lng) {
    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)
    if (!isNaN(latitude) && !isNaN(longitude)) {
      selectedCity = findCityFromCoordinates(latitude, longitude)
    }
  } else if (city) {
    // Normalize and match city name
    const normalizedCity = city.replace(/\s+/g, "").toLowerCase()

    selectedCity =
      Object.keys(NEARBY_PLACES_DATA).find((key) => {
        const normalizedKey = key.replace(/\s+/g, "").toLowerCase()
        return normalizedKey === normalizedCity || normalizedCity.includes(normalizedKey) || normalizedKey.includes(normalizedCity)
      }) || "delhi"
  }

  const places = NEARBY_PLACES_DATA[selectedCity] || NEARBY_PLACES_DATA["delhi"]

  console.log("[v0] Nearby places API - Input City:", city, "Coords:", { lat, lng }, "Selected City:", selectedCity, "Places Count:", places.length)

  return NextResponse.json({
    city: selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1),
    places,
    total: places.length,
    accuracy: lat && lng ? "coordinate-based" : "name-based",
  })
}
