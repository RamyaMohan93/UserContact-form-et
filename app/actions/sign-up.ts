"use server"

import { supabaseAdmin } from "@/lib/supabase-admin"
import { revalidatePath } from "next/cache"

type ActionResult = { success: true; message: string } | { success: false; error: string; details?: string }

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

  const signUp = {
    name: f("name"),
    country_code: f("countryCode") || null,
    phone: f("phone") || null,
    email: f("email").toLowerCase(),
    stay_in_loop: formData.get("stayInLoop") === "yes",
    subject: f("subject"),
  }

  console.log("Form data received:", {
    name: signUp.name,
    email: signUp.email,
    subject: signUp.subject,
    challenges: challenges,
    otherChallenge: otherChallenge,
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
    // First, let's test if the signups table exists
    console.log("Testing database connection...")
    const { error: testError } = await supabaseAdmin.from("signups").select("id").limit(1)

    if (testError) {
      console.error("Database test error:", testError)
      return {
        success: false,
        error: "Database table not found.",
        details: `Please run the database setup scripts first. Error: ${testError.message}`,
      }
    }

    console.log("Database connection successful, inserting signup...")

    // Insert signup
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
          details: "Please run the database setup scripts first.",
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

    // Now handle challenges - but don't fail the whole signup if this fails
    try {
      await handleChallenges(signupData.id, challenges, otherChallenge)
    } catch (challengeError) {
      console.error("Challenge handling failed (non-critical):", challengeError)
      // Continue - the signup was successful even if challenges failed
    }

    console.log("Sign-up process completed successfully")
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

async function handleChallenges(signupId: string, challenges: string[], otherChallenge: string) {
  if (!supabaseAdmin) return

  // Check if challenges table exists
  const { error: challengeTableError } = await supabaseAdmin.from("challenges").select("id").limit(1)

  if (challengeTableError) {
    console.log("Challenges table not found, skipping challenge handling")
    return
  }

  // Get existing challenges
  const { data: challengeData, error: challengeError } = await supabaseAdmin
    .from("challenges")
    .select("id, name")
    .in(
      "name",
      challenges.filter((c) => c !== "Other: Please Specify"),
    )

  if (challengeError) {
    console.error("Challenge lookup error:", challengeError)
    return
  }

  const signupChallenges = []

  // Add regular challenges
  if (challengeData) {
    for (const challenge of challengeData) {
      signupChallenges.push({
        signup_id: signupId,
        challenge_id: challenge.id,
        custom_description: null,
      })
    }
  }

  // Handle "Other" challenge
  if (challenges.includes("Other: Please Specify") && otherChallenge) {
    const { data: otherRow, error: otherErr } = await supabaseAdmin
      .from("challenges")
      .upsert({ name: "Other", description: "User-specified learning challenge" }, { onConflict: "name" })
      .select("id")
      .single()

    if (!otherErr && otherRow) {
      signupChallenges.push({
        signup_id: signupId,
        challenge_id: otherRow.id,
        custom_description: otherChallenge,
      })
    }
  }

  // Insert challenge relationships
  if (signupChallenges.length > 0) {
    const { error: challengeInsertError } = await supabaseAdmin.from("signup_challenges").insert(signupChallenges)

    if (challengeInsertError) {
      console.error("Challenge relationship insert error:", challengeInsertError)
    }
  }
}
