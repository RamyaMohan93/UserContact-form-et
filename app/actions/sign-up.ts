"use server"

import { supabaseAdmin } from "@/lib/supabase-admin"
import { revalidatePath } from "next/cache"

type ActionResult =
  | { success: true; message: string; stats?: any }
  | { success: false; error: string; details?: string }

async function getChallengeStats() {
  if (!supabaseAdmin) return null

  try {
    const { data: signups, error } = await supabaseAdmin.from("signups").select(`
      challenge_information_overload,
      challenge_difficulty_finding_content,
      challenge_personalized_learning,
      challenge_slow_knowledge_absorption,
      challenge_inconsistent_skill_development,
      challenge_lack_realtime_feedback,
      challenge_gaps_existing_knowledge,
      challenge_limited_time_learning,
      challenge_overwhelmed_complex_topics,
      challenge_fragmented_resources,
      challenge_other,
      challenge_other_description
    `)

    if (error) return null

    const challengeStats = {
      "Information Overload": 0,
      "Difficulty Finding Relevant Content": 0,
      "Struggling with Personalized Learning": 0,
      "Slow Knowledge Absorption": 0,
      "Inconsistent Skill Development": 0,
      "Lack of Real-Time Feedback": 0,
      "Gaps in Existing Knowledge": 0,
      "Limited Time for Learning": 0,
      "Overwhelmed by Complex Topics": 0,
      "Fragmented Learning Resources": 0,
      Other: 0,
    }

    const challengeMapping = {
      challenge_information_overload: "Information Overload",
      challenge_difficulty_finding_content: "Difficulty Finding Relevant Content",
      challenge_personalized_learning: "Struggling with Personalized Learning",
      challenge_slow_knowledge_absorption: "Slow Knowledge Absorption",
      challenge_inconsistent_skill_development: "Inconsistent Skill Development",
      challenge_lack_realtime_feedback: "Lack of Real-Time Feedback",
      challenge_gaps_existing_knowledge: "Gaps in Existing Knowledge",
      challenge_limited_time_learning: "Limited Time for Learning",
      challenge_overwhelmed_complex_topics: "Overwhelmed by Complex Topics",
      challenge_fragmented_resources: "Fragmented Learning Resources",
      challenge_other: "Other",
    }

    signups?.forEach((signup) => {
      Object.entries(challengeMapping).forEach(([dbColumn, displayName]) => {
        if (signup[dbColumn as keyof typeof signup]) {
          challengeStats[displayName as keyof typeof challengeStats]++
        }
      })
    })

    const totalUsers = signups?.length || 0
    const totalChallengeSelections = Object.values(challengeStats).reduce((sum, count) => sum + count, 0)

    return {
      challengeStats,
      totalUsers,
      totalChallengeSelections,
      avgChallengesPerUser: totalUsers > 0 ? (totalChallengeSelections / totalUsers).toFixed(1) : "0",
    }
  } catch (error) {
    return null
  }
}

// Challenge mapping from form values to database columns
const challengeMapping: Record<string, string> = {
  "Information Overload": "challenge_information_overload",
  "Difficulty Finding Relevant Content": "challenge_difficulty_finding_content",
  "Struggling with Personalized Learning": "challenge_personalized_learning",
  "Slow Knowledge Absorption": "challenge_slow_knowledge_absorption",
  "Inconsistent Skill Development": "challenge_inconsistent_skill_development",
  "Lack of Real-Time Feedback": "challenge_lack_realtime_feedback",
  "Gaps in Existing Knowledge": "challenge_gaps_existing_knowledge",
  "Limited Time for Learning": "challenge_limited_time_learning",
  "Overwhelmed by Complex Topics": "challenge_overwhelmed_complex_topics",
  "Fragmented Learning Resources": "challenge_fragmented_resources",
  "Other: Please Specify": "challenge_other",
}

export async function submitSignUp(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  if (!supabaseAdmin) {
    return {
      success: false,
      error: "Database connection not configured.",
      details: "Please check environment variables.",
    }
  }

  const f = (k: string) => {
    const v = formData.get(k)
    return typeof v === "string" ? v.trim() : ""
  }

  const challenges = formData.getAll("challenges").filter((c) => typeof c === "string") as string[]
  const otherChallenge = f("otherChallenge")

  const signUp: any = {
    name: f("name"),
    country_code: f("countryCode") || null,
    phone: f("phone") || null,
    email: f("email").toLowerCase(),
    stay_in_loop: formData.get("stayInLoop") === "yes",
    subject: f("subject"),
  }

  // Set all challenge columns to false first
  Object.values(challengeMapping).forEach((column) => {
    signUp[column] = false
  })

  // Set selected challenges to true
  challenges.forEach((challenge) => {
    const columnName = challengeMapping[challenge]
    if (columnName) {
      signUp[columnName] = true
    }
  })

  if (challenges.includes("Other: Please Specify")) {
    signUp.challenge_other_description = otherChallenge || null
  }

  // Validation
  if (!signUp.name || !signUp.email || !signUp.subject) {
    return { success: false, error: "Please fill in all required fields." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUp.email)) {
    return { success: false, error: "Please enter a valid email address." }
  }
  if (challenges.length === 0) {
    return { success: false, error: "Please select at least one learning challenge." }
  }
  if (challenges.includes("Other: Please Specify") && !otherChallenge) {
    return { success: false, error: "Please specify your other learning challenge." }
  }

  try {
    const { error: signupError } = await supabaseAdmin.from("signups").insert(signUp).select().single()

    if (signupError) {
      if (signupError.code === "23505") {
        return { success: false, error: "This email address is already registered." }
      }
      if (signupError.code === "42P01") {
        return { success: false, error: "Database table not found. Please run setup script." }
      }
      return { success: false, error: "Failed to save signup.", details: signupError.message }
    }
  } catch (e: any) {
    return { success: false, error: "An unexpected error occurred.", details: e.message }
  }

  revalidatePath("/sign-up")
  const stats = await getChallengeStats()
  return {
    success: true,
    message: "🎉 Thank you for signing up! We'll be in touch soon with updates about CortexCatalyst.",
    stats,
  }
}
