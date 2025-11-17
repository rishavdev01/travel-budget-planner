export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const destination = searchParams.get("destination")
  const budget = Number(searchParams.get("budget")) || 25000
  const days = Number(searchParams.get("days")) || 3
  const travelMode = searchParams.get("travelMode") || "domestic"
  const groupSize = Number(searchParams.get("groupSize")) || 1
  const transportPreference = searchParams.get("transportPreference") || "mixed"
  const spendingPriority = searchParams.get("spendingPriority") || "balanced"

  // Calculate per-person budget
  const perPersonBudget = Math.round(budget / groupSize)

  let budgetAllocation: any = {
    transport: 0.25,
    stay: 0.4,
    food: 0.2,
    activities: 0.1,
    misc: 0.05,
  }

  if (spendingPriority === "accommodation") {
    budgetAllocation = { transport: 0.2, stay: 0.5, food: 0.15, activities: 0.1, misc: 0.05 }
  } else if (spendingPriority === "food") {
    budgetAllocation = { transport: 0.2, stay: 0.3, food: 0.35, activities: 0.1, misc: 0.05 }
  } else if (spendingPriority === "activities") {
    budgetAllocation = { transport: 0.2, stay: 0.3, food: 0.2, activities: 0.25, misc: 0.05 }
  }

  const destinationData: Record<string, any> = {
    Delhi: {
      flights: [
        { name: "Air India", duration: "2h", price: Math.round(perPersonBudget * 0.15), seats: "5+", rating: 4.2 },
        { name: "IndiGo", duration: "2h", price: Math.round(perPersonBudget * 0.12), seats: "8+", rating: 4.5 },
        { name: "Spice Jet", duration: "2h", price: Math.round(perPersonBudget * 0.1), seats: "10+", rating: 4.0 },
      ],
      trains: [
        {
          name: "Rajdhani Express",
          duration: "4h",
          price: Math.round(perPersonBudget * 0.08),
          class: "AC 1st",
          rating: 4.3,
        },
        {
          name: "Shatabdi Express",
          duration: "5h",
          price: Math.round(perPersonBudget * 0.06),
          class: "AC 2nd",
          rating: 4.1,
        },
        {
          name: "Premium AC",
          duration: "6h",
          price: Math.round(perPersonBudget * 0.05),
          class: "AC Chair",
          rating: 3.9,
        },
      ],
      buses: [
        {
          name: "Volvo Sleeper",
          duration: "8h",
          price: Math.round(perPersonBudget * 0.04),
          type: "Luxury",
          rating: 4.2,
        },
        {
          name: "Regular Bus",
          duration: "10h",
          price: Math.round(perPersonBudget * 0.02),
          type: "Semi-Sleeper",
          rating: 3.8,
        },
      ],
      hotels: [
        {
          name: "Budget Inn",
          price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 0.6),
          rating: 3.8,
          amenities: "Basic",
        },
        {
          name: "Mid Range Hotel",
          price: Math.round((perPersonBudget * budgetAllocation.stay) / days),
          rating: 4.2,
          amenities: "WiFi, AC, Restaurant",
        },
        {
          name: "5-Star Resort",
          price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 1.5),
          rating: 4.8,
          amenities: "Pool, Gym, Spa",
        },
      ],
      restaurants: [
        {
          name: "Street Food Stalls",
          price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 0.4),
          cuisine: "Indian",
          rating: 4.1,
        },
        {
          name: "Local Restaurants",
          price: Math.round((perPersonBudget * budgetAllocation.food) / days),
          cuisine: "Multi-cuisine",
          rating: 4.0,
        },
        {
          name: "Fine Dining",
          price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 2),
          cuisine: "Premium",
          rating: 4.7,
        },
      ],
    },
    Mumbai: {
      flights: [
        { name: "Air India", duration: "2.5h", price: Math.round(perPersonBudget * 0.16), seats: "5+", rating: 4.2 },
        { name: "IndiGo", duration: "2.5h", price: Math.round(perPersonBudget * 0.13), seats: "8+", rating: 4.5 },
        { name: "Jet Airways", duration: "2.5h", price: Math.round(perPersonBudget * 0.11), seats: "10+", rating: 4.1 },
      ],
      trains: [
        {
          name: "Central Railways",
          duration: "3h",
          price: Math.round(perPersonBudget * 0.09),
          class: "AC 1st",
          rating: 4.0,
        },
        {
          name: "Express Train",
          duration: "4h",
          price: Math.round(perPersonBudget * 0.07),
          class: "AC 2nd",
          rating: 3.9,
        },
      ],
      buses: [
        { name: "Deluxe AC", duration: "6h", price: Math.round(perPersonBudget * 0.05), type: "Sleeper", rating: 4.1 },
      ],
      hotels: [
        {
          name: "Budget Hotel",
          price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 0.6),
          rating: 3.9,
          amenities: "Basic",
        },
        {
          name: "Business Hotel",
          price: Math.round((perPersonBudget * budgetAllocation.stay) / days),
          rating: 4.3,
          amenities: "WiFi, Restaurant",
        },
        {
          name: "Luxury Hotel",
          price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 1.5),
          rating: 4.9,
          amenities: "All amenities",
        },
      ],
      restaurants: [
        {
          name: "Street Chaat",
          price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 0.5),
          cuisine: "Street Food",
          rating: 4.2,
        },
        {
          name: "Casual Dining",
          price: Math.round((perPersonBudget * budgetAllocation.food) / days),
          cuisine: "Indian",
          rating: 4.1,
        },
        {
          name: "5-Star Restaurant",
          price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 2.5),
          cuisine: "International",
          rating: 4.8,
        },
      ],
    },
    Bangkok: {
      flights: [
        { name: "Thai Airways", duration: "3h", price: Math.round(perPersonBudget * 0.25), seats: "5+", rating: 4.3 },
        { name: "Air Asia", duration: "3h", price: Math.round(perPersonBudget * 0.15), seats: "8+", rating: 4.0 },
      ],
      trains: [
        { name: "Express Train", duration: "8h", price: Math.round(perPersonBudget * 0.08), class: "AC", rating: 3.8 },
      ],
      buses: [
        { name: "Sleeper Bus", duration: "12h", price: Math.round(perPersonBudget * 0.06), type: "VIP", rating: 3.9 },
      ],
      hotels: [
        {
          name: "Budget Hostel",
          price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 0.5),
          rating: 4.0,
          amenities: "Basic",
        },
        {
          name: "Mid-range Hotel",
          price: Math.round((perPersonBudget * budgetAllocation.stay) / days),
          rating: 4.4,
          amenities: "Pool, Restaurant",
        },
        {
          name: "Luxury Resort",
          price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 2),
          rating: 4.9,
          amenities: "Spa, Pool, Restaurant",
        },
      ],
      restaurants: [
        {
          name: "Street Food",
          price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 0.3),
          cuisine: "Thai Street Food",
          rating: 4.3,
        },
        {
          name: "Local Restaurant",
          price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 0.8),
          cuisine: "Thai",
          rating: 4.2,
        },
        {
          name: "Premium Restaurant",
          price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 2),
          cuisine: "International",
          rating: 4.7,
        },
      ],
    },
    Paris: {
      flights: [
        { name: "Air France", duration: "10h", price: Math.round(perPersonBudget * 0.4), seats: "5+", rating: 4.4 },
        {
          name: "European Airlines",
          duration: "10h",
          price: Math.round(perPersonBudget * 0.35),
          seats: "8+",
          rating: 4.2,
        },
      ],
      trains: [
        { name: "Eurostar", duration: "15h", price: Math.round(perPersonBudget * 0.2), class: "Business", rating: 4.5 },
      ],
      buses: [
        { name: "Coach", duration: "24h", price: Math.round(perPersonBudget * 0.1), type: "Sleeper", rating: 3.7 },
      ],
      hotels: [
        {
          name: "Budget Hotel",
          price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 0.6),
          rating: 3.8,
          amenities: "Basic",
        },
        {
          name: "3-Star Hotel",
          price: Math.round((perPersonBudget * budgetAllocation.stay) / days),
          rating: 4.3,
          amenities: "WiFi, Restaurant",
        },
        {
          name: "5-Star Palace",
          price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 2.5),
          rating: 4.9,
          amenities: "Luxury",
        },
      ],
      restaurants: [
        {
          name: "Cafe",
          price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 0.7),
          cuisine: "Casual",
          rating: 4.1,
        },
        {
          name: "Bistro",
          price: Math.round((perPersonBudget * budgetAllocation.food) / days),
          cuisine: "French",
          rating: 4.4,
        },
        {
          name: "Michelin Star",
          price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 3),
          cuisine: "Fine Dining",
          rating: 4.9,
        },
      ],
    },
  }

  // Get default data for unknown destinations
  const defaultData = {
    flights: [
      {
        name: "Primary Airline",
        duration: "Varies",
        price: Math.round(perPersonBudget * 0.25),
        seats: "Available",
        rating: 4.2,
      },
      {
        name: "Secondary Airline",
        duration: "Varies",
        price: Math.round(perPersonBudget * 0.2),
        seats: "Available",
        rating: 4.0,
      },
    ],
    trains: [
      { name: "Express Train", duration: "Varies", price: Math.round(perPersonBudget * 0.1), class: "AC", rating: 4.1 },
    ],
    buses: [
      {
        name: "Luxury Bus",
        duration: "Varies",
        price: Math.round(perPersonBudget * 0.08),
        type: "Sleeper",
        rating: 4.0,
      },
    ],
    hotels: [
      {
        name: "Budget Hotel",
        price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 0.6),
        rating: 4.0,
        amenities: "Basic",
      },
      {
        name: "Mid-range Hotel",
        price: Math.round((perPersonBudget * budgetAllocation.stay) / days),
        rating: 4.3,
        amenities: "Standard",
      },
      {
        name: "Premium Hotel",
        price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 1.5),
        rating: 4.7,
        amenities: "Luxury",
      },
    ],
    restaurants: [
      {
        name: "Budget Eatery",
        price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 0.5),
        cuisine: "Local",
        rating: 4.0,
      },
      {
        name: "Mid-range Restaurant",
        price: Math.round((perPersonBudget * budgetAllocation.food) / days),
        cuisine: "Multi-cuisine",
        rating: 4.2,
      },
      {
        name: "Fine Dining",
        price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 2),
        cuisine: "Premium",
        rating: 4.6,
      },
    ],
  }

  const data = destinationData[destination] || defaultData

  const transport: any = { flights: [], trains: [], buses: [] }

  if (transportPreference === "flight" || transportPreference === "mixed") {
    transport.flights = data.flights || []
  }
  if (transportPreference === "train" || transportPreference === "mixed") {
    transport.trains = data.trains || []
  }
  if (transportPreference === "bus" || transportPreference === "mixed") {
    transport.buses = data.buses || []
  }

  return Response.json({
    status: "success",
    destination,
    budget: perPersonBudget,
    totalBudget: budget,
    groupSize,
    days,
    travelMode,
    transportPreference,
    spendingPriority,
    budgetAllocation,
    data: {
      transport,
      accommodation: data.hotels || [],
      restaurants: data.restaurants || [],
    },
    timestamp: new Date().toISOString(),
  })
}
