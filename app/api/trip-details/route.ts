import { estimateBusPrice, estimateFlightPrice, estimateTrainPrice } from "@/lib/pricing-utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const source = searchParams.get("source") || "Delhi"
  const destination = searchParams.get("destination") || "Mumbai"
  const budget = Number(searchParams.get("budget")) || 25000
  const days = Number(searchParams.get("days")) || 3
  const travelMode = searchParams.get("travelMode") || "domestic"
  const groupSize = Number(searchParams.get("groupSize")) || 1
  const transportPreference = searchParams.get("transportPreference") || "mixed"
  const spendingPriority = searchParams.get("spendingPriority") || "balanced"
  const departDate = new Date().toISOString().split("T")[0]

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

  const transport: any = { flights: [], trains: [], buses: [], localTransport: [] }

  // Only show flights for international trips
  if (
    travelMode === "international" ||
    transportPreference === "flight" ||
    transportPreference === "flightOnly" ||
    transportPreference === "flightWithLocal" ||
    transportPreference === "mixed"
  ) {
    const estimatedPrice = estimateFlightPrice(source, destination, departDate)
    transport.flights = [
      {
        name: "IndiGo",
        duration: "2h 15m",
        price: estimatedPrice,
        seats: "Available",
        rating: 4.5,
        bookingUrl: `https://www.goibibo.com/flights/?from=${source}&to=${destination}&date=${departDate}`,
      },
      {
        name: "Air India",
        duration: "2h 30m",
        price: Math.round(estimatedPrice * 1.1),
        seats: "Available",
        rating: 4.2,
        bookingUrl: `https://www.makemytrip.com/flights/?from=${source}&to=${destination}&date=${departDate}`,
      },
      {
        name: "SpiceJet",
        duration: "2h 20m",
        price: Math.round(estimatedPrice * 0.9),
        seats: "Limited",
        rating: 4.0,
        bookingUrl: `https://www.skyscanner.co.in/transport/flights/${source}/${destination}/${departDate}`,
      },
    ]
  }

  if (travelMode === "domestic") {
    if (transportPreference === "train" || transportPreference === "mixed") {
      const estimatedTrainPrice = estimateTrainPrice(source, destination, departDate, "AC 3 Tier")
      transport.trains = [
        {
          name: "Rajdhani Express",
          duration: "16h",
          price: Math.round(estimatedTrainPrice * 1.5),
          class: "AC 1st Class",
          rating: 4.6,
          bookingUrl: `https://www.irctc.co.in/nget/train-search`,
        },
        {
          name: "Shatabdi / Express",
          duration: "18h",
          price: estimatedTrainPrice,
          class: "AC 3 Tier",
          rating: 4.2,
          bookingUrl: `https://www.confirmtkt.com/trains/${source}-to-${destination}`,
        },
      ]
    }

    if (transportPreference === "bus" || transportPreference === "mixed") {
      const estimatedBusPrice = estimateBusPrice(source, destination, departDate, "Volvo AC")
      transport.buses = [
        {
          name: "Volvo Multi-Axle",
          duration: "20h",
          price: estimatedBusPrice,
          type: "AC Sleeper",
          rating: 4.3,
          bookingUrl: `https://www.redbus.in/bus-tickets/${source}-to-${destination}`,
        },
        {
          name: "State Transport",
          duration: "22h",
          price: Math.round(estimatedBusPrice * 0.6),
          type: "Non-AC Seater",
          rating: 3.8,
          bookingUrl: `https://www.redbus.in/bus-tickets/${source}-to-${destination}`,
        },
      ]
    }
  }

  const getLocalTransportOptions = (city: string, days: number, perPersonBudget: number) => {
    const normalizedCity = city.toLowerCase()
    const localOptions: any[] = []

    // Hyderabad RTC (HRTCT)
    if (normalizedCity.includes("hyderabad")) {
      localOptions.push(
        {
          name: "Hyderabad Metro Rail",
          type: "Metro",
          operator: "Hyderabad Metro",
          price: Math.round(days * 100),
          pricePerDay: 100,
          description: `${days}-day unlimited metro pass covering all 3 lines`,
          rating: 4.7,
          routes: "Red, Blue, Green Lines",
          coverage: "Airport, Hi-Tech City, Secunderabad",
          bookingUrl: "https://www.ltmetro.com/",
        },
        {
          name: "TSRTC City Bus Pass",
          type: "City Bus",
          operator: "HRTCT (Hyderabad RTC)",
          price: Math.round(days * 60),
          pricePerDay: 60,
          description: `${days}-day unlimited bus pass on all city routes`,
          rating: 4.2,
          routes: "All city routes",
          coverage: "Full city coverage including suburbs",
          bookingUrl: "https://www.tsrtconline.telangana.gov.in/",
        },
        {
          name: "Auto Rickshaw Budget",
          type: "Local Transport",
          operator: "Private",
          price: Math.round(days * 200),
          pricePerDay: 200,
          description: "Daily auto rickshaw budget for local commute",
          rating: 4.0,
          routes: "Point-to-point",
          coverage: "Entire city",
          bookingUrl: null,
        },
      )
    }

    // Bangalore Metropolitan Transport Corporation (BMTCT)
    if (normalizedCity.includes("bangalore") || normalizedCity.includes("bengaluru")) {
      localOptions.push(
        {
          name: "Namma Metro Pass",
          type: "Metro",
          operator: "Bangalore Metro",
          price: Math.round(days * 120),
          pricePerDay: 120,
          description: `${days}-day unlimited metro pass on Purple & Green lines`,
          rating: 4.8,
          routes: "Purple, Green Lines",
          coverage: "MG Road, Indiranagar, Whitefield, Airport",
          bookingUrl: "https://english.bmrc.co.in/",
        },
        {
          name: "BMTC Vayu Vajra Airport Bus",
          type: "Airport Shuttle",
          operator: "BMTC",
          price: 250,
          pricePerDay: null,
          description: "Premium airport shuttle service",
          rating: 4.5,
          routes: "Airport to major city hubs",
          coverage: "Airport connectivity",
          bookingUrl: "https://mybmtc.karnataka.gov.in/",
        },
        {
          name: "BMTC City Bus Pass",
          type: "City Bus",
          operator: "BMTCT (Bangalore Metropolitan Transport)",
          price: Math.round(days * 70),
          pricePerDay: 70,
          description: `${days}-day unlimited bus pass on 6,000+ buses`,
          rating: 4.3,
          routes: "All city & suburban routes",
          coverage: "Entire Bangalore Metropolitan Area",
          bookingUrl: "https://mybmtc.karnataka.gov.in/",
        },
        {
          name: "Ola/Uber Daily Budget",
          type: "Cab Service",
          operator: "Private",
          price: Math.round(days * 300),
          pricePerDay: 300,
          description: "Daily cab budget for flexible travel",
          rating: 4.4,
          routes: "On-demand",
          coverage: "Full city coverage",
          bookingUrl: null,
        },
      )
    }

    // Kerala RTC (KRTCT)
    if (
      normalizedCity.includes("kerala") ||
      normalizedCity.includes("kochi") ||
      normalizedCity.includes("trivandrum")
    ) {
      localOptions.push(
        {
          name: "Kochi Metro Pass",
          type: "Metro",
          operator: "Kochi Metro",
          price: Math.round(days * 90),
          pricePerDay: 90,
          description: `${days}-day unlimited metro pass`,
          rating: 4.6,
          routes: "Aluva to Pettah line",
          coverage: "Major Kochi areas",
          bookingUrl: "https://kochimetro.org/",
        },
        {
          name: "KSRTC Ordinary Bus Pass",
          type: "State Bus",
          operator: "KRTCT (Kerala RTC)",
          price: Math.round(days * 50),
          pricePerDay: 50,
          description: `${days}-day pass for intra-city travel`,
          rating: 4.1,
          routes: "All Kerala city routes",
          coverage: "Kochi, Trivandrum, Kozhikode",
          bookingUrl: "https://www.keralartc.com/",
        },
        {
          name: "KSRTC Fast Passenger",
          type: "Express Bus",
          operator: "KRTCT",
          price: Math.round(days * 120),
          pricePerDay: 120,
          description: "Fast AC buses for inter-city travel within Kerala",
          rating: 4.4,
          routes: "Major cities and tourist spots",
          coverage: "Entire Kerala",
          bookingUrl: "https://www.keralartc.com/",
        },
        {
          name: "Auto/Taxi Daily Budget",
          type: "Local Transport",
          operator: "Private",
          price: Math.round(days * 250),
          pricePerDay: 250,
          description: "Daily budget for auto rickshaws and taxis",
          rating: 4.2,
          routes: "Point-to-point",
          coverage: "All Kerala cities",
          bookingUrl: null,
        },
      )
    }

    // Delhi Metro & DTC
    if (normalizedCity.includes("delhi")) {
      localOptions.push(
        {
          name: "Delhi Metro Smart Card",
          type: "Metro",
          operator: "Delhi Metro",
          price: Math.round(days * 150),
          pricePerDay: 150,
          description: `${days}-day unlimited metro travel on all lines`,
          rating: 4.9,
          routes: "Red, Yellow, Blue, Green, Pink, Magenta, Violet, Airport Express",
          coverage: "Entire NCR region",
          bookingUrl: "https://www.delhimetrorail.com/",
        },
        {
          name: "DTC Bus Pass",
          type: "City Bus",
          operator: "Delhi Transport Corporation",
          price: Math.round(days * 80),
          pricePerDay: 80,
          description: `${days}-day unlimited DTC & cluster bus pass`,
          rating: 4.0,
          routes: "All DTC routes",
          coverage: "Entire Delhi",
          bookingUrl: "https://dtc.delhi.gov.in/",
        },
        {
          name: "Cab/Auto Daily Budget",
          type: "On-demand Transport",
          operator: "Private",
          price: Math.round(days * 350),
          pricePerDay: 350,
          description: "Daily budget for cabs and auto rickshaws",
          rating: 4.3,
          routes: "Point-to-point",
          coverage: "Full NCR",
          bookingUrl: null,
        },
      )
    }

    // Mumbai Local & BEST
    if (normalizedCity.includes("mumbai")) {
      localOptions.push(
        {
          name: "Mumbai Metro Pass",
          type: "Metro",
          operator: "Mumbai Metro",
          price: Math.round(days * 130),
          pricePerDay: 130,
          description: `${days}-day unlimited metro pass (Line 1, 2, 7)`,
          rating: 4.7,
          routes: "Ghatkopar-Versova, Andheri-Dahisar, more",
          coverage: "Western & Central suburbs",
          bookingUrl: "https://www.metrorailwaymumbai.com/",
        },
        {
          name: "Mumbai Local Train Pass",
          type: "Suburban Rail",
          operator: "Indian Railways",
          price: Math.round(days * 100),
          pricePerDay: 100,
          description: `${days}-day 2nd class pass on Mumbai local trains`,
          rating: 4.5,
          routes: "Western, Central, Harbour lines",
          coverage: "Entire Mumbai Metropolitan Region",
          bookingUrl: "https://www.indianrail.gov.in/",
        },
        {
          name: "BEST Bus Pass",
          type: "City Bus",
          operator: "BEST (Brihanmumbai Electric)",
          price: Math.round(days * 90),
          pricePerDay: 90,
          description: `${days}-day unlimited BEST bus pass`,
          rating: 4.2,
          routes: "All BEST routes",
          coverage: "Mumbai city & suburbs",
          bookingUrl: "https://www.bestundertaking.com/",
        },
        {
          name: "Taxi/Rickshaw Budget",
          type: "On-demand",
          operator: "Private",
          price: Math.round(days * 400),
          pricePerDay: 400,
          description: "Daily budget for taxis and auto rickshaws",
          rating: 4.1,
          routes: "Point-to-point",
          coverage: "Entire Mumbai",
          bookingUrl: null,
        },
      )
    }

    // Generic options for other cities
    if (localOptions.length === 0) {
      localOptions.push(
        {
          name: "City Metro/Bus Pass",
          type: "Public Transport",
          operator: "Local Transport Authority",
          price: Math.round(days * 100),
          pricePerDay: 100,
          description: `${days}-day unlimited local transport pass`,
          rating: 4.3,
          routes: "All city routes",
          coverage: "Entire city",
          bookingUrl: null,
        },
        {
          name: "Daily Commute Budget",
          type: "Mixed Transport",
          operator: "Various",
          price: Math.round(days * 250),
          pricePerDay: 250,
          description: "Daily budget for local buses, autos, taxis",
          rating: 4.0,
          routes: "On-demand",
          coverage: "Full city",
          bookingUrl: null,
        },
      )
    }

    return localOptions
  }

  // Add local transport for destination city (both domestic and international)
  transport.localTransport = getLocalTransportOptions(destination, days, perPersonBudget)

  // For international trips, also add airport transfer options
  if (travelMode === "international") {
    transport.localTransport.unshift({
      name: "Airport Transfer Service",
      type: "Private Transfer",
      operator: "Local Provider",
      price: Math.round(perPersonBudget * 0.03),
      pricePerDay: null,
      description: "Round-trip airport pickup and drop-off",
      rating: 4.6,
      routes: "Airport to/from hotel",
      coverage: "Airport connectivity",
      bookingUrl: null,
    })
  }

  const accommodation = [
    {
      name: "Budget Stay",
      price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 0.6),
      rating: 4.0,
      amenities: "WiFi, Breakfast",
    },
    {
      name: "Comfort Hotel",
      price: Math.round((perPersonBudget * budgetAllocation.stay) / days),
      rating: 4.3,
      amenities: "WiFi, AC, Breakfast, Gym",
    },
    {
      name: "Premium Resort",
      price: Math.round(((perPersonBudget * budgetAllocation.stay) / days) * 1.5),
      rating: 4.8,
      amenities: "Pool, Spa, All Meals",
    },
  ]

  const restaurants = [
    {
      name: "Local Street Food",
      price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 0.4),
      cuisine: "Local Delicacies",
      rating: 4.5,
    },
    {
      name: "Casual Dining",
      price: Math.round((perPersonBudget * budgetAllocation.food) / days),
      cuisine: "Multi-Cuisine",
      rating: 4.2,
    },
    {
      name: "Fine Dining Experience",
      price: Math.round(((perPersonBudget * budgetAllocation.food) / days) * 2.5),
      cuisine: "Gourmet",
      rating: 4.7,
    },
  ]

  return Response.json({
    status: "success",
    source,
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
      accommodation,
      restaurants,
    },
    timestamp: new Date().toISOString(),
  })
}
