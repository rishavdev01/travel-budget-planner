// Real-time API client with SWR integration ready
export async function fetchDestinations(continent?: string) {
  const params = new URLSearchParams()
  if (continent) params.append("continent", continent)

  const res = await fetch(`/api/destinations?${params}`)
  if (!res.ok) throw new Error("Failed to fetch destinations")
  return res.json()
}

export async function fetchBudgetBreakdown(totalBudget: number, tripDays: number, preferences?: any) {
  const res = await fetch("/api/budget-breakdown", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ totalBudget, tripDays, preferences }),
  })
  if (!res.ok) throw new Error("Failed to fetch budget breakdown")
  return res.json()
}

export async function fetchRecommendations(budget?: string) {
  const params = new URLSearchParams()
  if (budget) params.append("budget", budget)

  const res = await fetch(`/api/recommendations?${params}`)
  if (!res.ok) throw new Error("Failed to fetch recommendations")
  return res.json()
}
