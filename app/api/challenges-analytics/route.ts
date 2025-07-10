import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Database connection not configured" }, { status: 500 })
    }

    // Fetch all signups with challenge data
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
      console.error("Error fetching challenge data:", error)
      return NextResponse.json({ error: "Failed to fetch challenge data" }, { status: 500 })
    }

    // Count challenges
    const challengeCounts = {
      "Information Overload": 0,
      "Difficulty Finding Content": 0,
      "Personalized Learning": 0,
      "Slow Knowledge Absorption": 0,
      "Inconsistent Skill Development": 0,
      "Lack of Real-Time Feedback": 0,
      "Gaps in Knowledge": 0,
      "Limited Time": 0,
      "Complex Topics": 0,
      "Fragmented Resources": 0,
      Other: 0,
    }

    signups?.forEach((signup) => {
      if (signup.challenge_information_overload) challengeCounts["Information Overload"]++
      if (signup.challenge_difficulty_finding_content) challengeCounts["Difficulty Finding Content"]++
      if (signup.challenge_personalized_learning) challengeCounts["Personalized Learning"]++
      if (signup.challenge_slow_knowledge_absorption) challengeCounts["Slow Knowledge Absorption"]++
      if (signup.challenge_inconsistent_skill_development) challengeCounts["Inconsistent Skill Development"]++
      if (signup.challenge_lack_realtime_feedback) challengeCounts["Lack of Real-Time Feedback"]++
      if (signup.challenge_gaps_existing_knowledge) challengeCounts["Gaps in Knowledge"]++
      if (signup.challenge_limited_time_learning) challengeCounts["Limited Time"]++
      if (signup.challenge_overwhelmed_complex_topics) challengeCounts["Complex Topics"]++
      if (signup.challenge_fragmented_resources) challengeCounts["Fragmented Resources"]++
      if (signup.challenge_other) challengeCounts["Other"]++
    })

    // Convert to array format for the chart
    const chartData = Object.entries(challengeCounts)
      .filter(([_, count]) => count > 0) // Only include challenges that have been selected
      .map(([challenge, count]) => ({
        challenge,
        count,
        percentage: signups?.length ? Math.round((count / signups.length) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count) // Sort by count descending

    return NextResponse.json({
      data: chartData,
      totalSignups: signups?.length || 0,
      totalChallengeSelections: Object.values(challengeCounts).reduce((sum, count) => sum + count, 0),
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
