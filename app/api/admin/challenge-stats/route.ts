import { supabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 })
  }

  try {
    // Get all signups with challenge data
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

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }

    // Count challenges
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

    // Count each challenge
    signups?.forEach((signup) => {
      Object.entries(challengeMapping).forEach(([dbColumn, displayName]) => {
        if (signup[dbColumn as keyof typeof signup]) {
          challengeStats[displayName as keyof typeof challengeStats]++
        }
      })
    })

    // Get other challenge descriptions
    const otherDescriptions =
      signups
        ?.filter((signup) => signup.challenge_other && signup.challenge_other_description)
        .map((signup) => signup.challenge_other_description)
        .filter(Boolean) || []

    const totalUsers = signups?.length || 0

    return NextResponse.json({
      challengeStats,
      otherDescriptions,
      totalUsers,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
