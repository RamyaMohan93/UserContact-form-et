"use server"

import { supabaseAdmin } from "@/lib/supabase-admin"
import { revalidatePath } from "next/cache"

type ActionResult = { success: true; message: string } | { success: false; error: string; details?: string }

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
  // Check if Supabase client is configured
  if (!supabaseAdmin) {
    const missingVars = []
    if (!process.env.SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      missingVars.push("SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL")
    }
    if (
      !process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      missingVars.push("SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, or NEXT_PUBLIC_SUPABASE_ANON_KEY")
    }

    return {
      success: false,
      error: "Database connection not configured.",
      details: `Missing environment variables: ${missingVars.join(", ")}`,
    }
  }

  const f = (k: string) => {
    const v = formData.get(k)
    return typeof v === "string" ? v.trim() : ""
  }

  // Get all selected challenges
  const challenges = formData.getAll("challenges").filter((c) => typeof c === "string") as string[]
  const otherChallenge = f("otherChallenge")

  // Build the signup object with basic info
  const signUp: any = {
    name: f("name"),
    country_code: f("countryCode") || null,
    phone: f("phone") || null,
    email: f("email").toLowerCase(),
    stay_in_loop: formData.get("stayInLoop") === "yes",
    subject: f("subject"),
  }

  // Add challenge columns - set all to false first
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

  // Add other challenge description if "Other" is selected
  if (challenges.includes("Other: Please Specify")) {
    signUp.challenge_other_description = otherChallenge || null
  }

  console.log("Form data processed:", {
    name: signUp.name,
    email: signUp.email,
    subject: signUp.subject,
    selectedChallenges: challenges,
    otherDescription: signUp.challenge_other_description,
  })

  /* ---------- Validation ---------- */
  if (!signUp.name || !signUp.email || !signUp.subject) {
    return { success: false, error: "Please fill in all required fields (Name, Email, Subject)." }
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

  /* ---------- Store in Database ---------- */
  try {
    // Test database connection first
    console.log("Testing database connection...")
    const { error: testError } = await supabaseAdmin.from("signups").select("id").limit(1)

    if (testError) {
      console.error("Database test error:", testError)
      return {
        success: false,
        error: "Database table not found.",
        details: `Please run the database setup script first. Error: ${testError.message}`,
      }
    }

    console.log("Database connection successful, inserting signup...")

    // Insert signup with all data in one go
    const { data: signupData, error: signupError } = await supabaseAdmin
      .from("signups")
      .insert(signUp)
      .select()
      .single()

    if (signupError) {
      console.error("Supabase signup insert error:", {
        error: signupError,
        message: signupError.message,
        details: signupError.details,
        hint: signupError.hint,
        code: signupError.code,
      })

      // Handle specific error cases
      if (signupError.code === "23505") {
        return {
          success: false,
          error: "This email address is already registered.",
          details: "Please use a different email address or contact support if this is an error.",
        }
      }

      if (signupError.code === "42P01") {
        return {
          success: false,
          error: "Database table not found.",
          details: "Please run the database setup script: scripts/create-single-signups-table.sql",
        }
      }

      return {
        success: false,
        error: "Failed to save signup.",
        details: signupError.message || "Unknown database error occurred.",
      }
    }

    if (!signupData) {
      return {
        success: false,
        error: "Signup was not saved properly.",
        details: "No data returned from database insert.",
      }
    }

    console.log("Signup inserted successfully:", signupData.id)
  } catch (e: any) {
    console.error("Unexpected error during signup:", e)
    return {
      success: false,
      error: "An unexpected error occurred.",
      details: e.message || "Please try again later.",
    }
  }

  revalidatePath("/sign-up")
  return {
    success: true,
    message: "🎉 Thank you for signing up! We'll be in touch soon with updates about CortexCatalyst.",
  }
}
