export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const continent = searchParams.get("continent")

  // Mock real-time destination data with currency and live pricing
  const destinations = [
    {
      id: "tokyo",
      name: "Tokyo, Japan",
      continent: "Asia",
      estimatedCost: 8500,
      currency: "JPY",
      exchangeRate: 149.5,
      attractions: 15,
      avgMealCost: 25,
      hotelCost: 180,
      popularityScore: 98,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "bali",
      name: "Bali, Indonesia",
      continent: "Asia",
      estimatedCost: 2800,
      currency: "IDR",
      exchangeRate: 15850,
      attractions: 25,
      avgMealCost: 5,
      hotelCost: 35,
      popularityScore: 94,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "paris",
      name: "Paris, France",
      continent: "Europe",
      estimatedCost: 7200,
      currency: "EUR",
      exchangeRate: 0.92,
      attractions: 20,
      avgMealCost: 30,
      hotelCost: 150,
      popularityScore: 99,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "bangkok",
      name: "Bangkok, Thailand",
      continent: "Asia",
      estimatedCost: 1950,
      currency: "THB",
      exchangeRate: 35.2,
      attractions: 30,
      avgMealCost: 3,
      hotelCost: 20,
      popularityScore: 92,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "newyork",
      name: "New York, USA",
      continent: "North America",
      estimatedCost: 6500,
      currency: "USD",
      exchangeRate: 1,
      attractions: 40,
      avgMealCost: 28,
      hotelCost: 200,
      popularityScore: 97,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "buenosaires",
      name: "Buenos Aires, Argentina",
      continent: "South America",
      estimatedCost: 3200,
      currency: "ARS",
      exchangeRate: 1020,
      attractions: 22,
      avgMealCost: 12,
      hotelCost: 60,
      popularityScore: 88,
      updatedAt: new Date().toISOString(),
    },
  ]

  const filtered = continent ? destinations.filter((d) => d.continent === continent) : destinations

  return Response.json({
    status: "success",
    data: filtered,
    timestamp: new Date().toISOString(),
  })
}
