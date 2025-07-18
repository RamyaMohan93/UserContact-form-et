import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-admin"

export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("signups").select("challenges")

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }

    // Process the data
    const challengeStats: { [key: string]: number } = {}
    let totalChallengeSelections = 0

    data.forEach((row) => {
      if (row.challenges && Array.isArray(row.challenges)) {
        row.challenges.forEach((challenge: string) => {
          // Normalize "Other:" challenges to just "Other"
          const normalizedChallenge = challenge.startsWith("Other:") ? "Other" : challenge
          challengeStats[normalizedChallenge] = (challengeStats[normalizedChallenge] || 0) + 1
          totalChallengeSelections++
        })
      }
    })

    const totalUsers = data.length
    const avgChallengesPerUser = totalUsers > 0 ? (totalChallengeSelections / totalUsers).toFixed(1) : "0"

    return NextResponse.json({
      totalUsers,
      totalChallengeSelections,
      avgChallengesPerUser,
      challengeStats,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
