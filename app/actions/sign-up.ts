"use server"

import { createClient } from "@/lib/supabase-admin"

type ActionResult =
  | { success: true; message: string; stats?: any }
  | { success: false; error: string; details?: string }

async function getChallengeStats() {
  const supabase = createClient()

  try {
    const { data: signups, error } = await supabase.from("signups").select("challenges")

    if (error) return null

    const challengeStats: { [key: string]: number } = {}

    signups?.forEach((signup) => {
      if (signup.challenges && Array.isArray(signup.challenges)) {
        signup.challenges.forEach((challenge: string) => {
          const normalizedChallenge = challenge.startsWith("Other:") ? "Other" : challenge
          challengeStats[normalizedChallenge] = (challengeStats[normalizedChallenge] || 0) + 1
        })
      }
    })

    const totalUsers = signups?.length || 0

    // Prepare chart data
    const chartData = Object.entries(challengeStats)
      .map(([challenge, count]) => ({
        challenge: challenge.length > 15 ? challenge.substring(0, 15) + "..." : challenge,
        fullChallenge: challenge,
        count,
        percentage: totalUsers > 0 ? ((count / totalUsers) * 100).toFixed(1) : "0",
      }))
      .sort((a, b) => b.count - a.count)

    return {
      totalUsers,
      chartData: chartData.filter((item) => item.count > 0),
    }
  } catch (error) {
    return null
  }
}

export async function submitSignUp(prevState: any, formData: FormData): Promise<ActionResult> {
  try {
    const supabase = createClient()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const countryCode = formData.get("countryCode") as string
    const subject = formData.get("subject") as string
    const stayInLoop = formData.get("stayInLoop") as string
    const otherChallenge = formData.get("otherChallenge") as string

    // Get all selected challenges
    const challenges = formData.getAll("challenges") as string[]

    if (!name || !email || !subject) {
      return {
        success: false,
        error: "Missing required fields",
        details: "Please fill in all required fields (Name, Email, Subject)",
      }
    }

    if (challenges.length === 0) {
      return {
        success: false,
        error: "No challenges selected",
        details: "Please select at least one learning challenge",
      }
    }

    // Combine phone with country code if both exist
    const fullPhone = phone && countryCode ? `${countryCode} ${phone}` : phone || null

    // Process challenges - if "Other" is selected, include the custom text
    const processedChallenges = challenges.map((challenge) => {
      if (challenge === "Other: Please Specify" && otherChallenge) {
        return `Other: ${otherChallenge}`
      }
      return challenge
    })

    // Insert into database
    const { error } = await supabase.from("signups").insert({
      name,
      email,
      phone: fullPhone,
      subject,
      challenges: processedChallenges,
      stay_in_loop: stayInLoop === "yes",
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        error: "Failed to save signup",
        details: error.message,
      }
    }

    // Fetch stats for the success display
    const stats = await getChallengeStats()

    return {
      success: true,
      message: "Thank you for signing up! We'll be in touch soon.",
      stats,
    }
  } catch (error) {
    console.error("Signup error:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
      details: "Please try again later",
    }
  }
}
