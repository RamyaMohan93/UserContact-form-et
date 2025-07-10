"use server"

import { supabaseAdmin } from "@/lib/supabase-admin"
import { revalidatePath } from "next/cache"

type ActionResult = { success: true; message: string } | { success: false; error: string; details?: string }

export async function submitSignUp(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  // Check if Supabase client is configured
  if (!supabaseAdmin) {
    return {
      success: false,
      error: "Database connection not configured. Please add Supabase environment variables.",
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
    country_code: f("countryCode"),
    phone: f("phone"),
    email: f("email").toLowerCase(),
    stay_in_loop: formData.get("stayInLoop") === "yes",
    subject: f("subject"),
  }

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
  // Validate that if "Other" is selected, the text field is filled
  if (challenges.includes("Other: Please Specify") && !otherChallenge) {
    return { success: false, error: "Please specify your other learning challenge." }
  }

  /* ---------- Store in Database ---------- */
  try {
    // Insert signup first
    const { data: signupData, error: signupError } = await supabaseAdmin
      .from("signups")
      .insert(signUp)
      .select()
      .single()

    if (signupError) {
      console.error("Supabase signup insert error:", signupError)
      return {
        success: false,
        error: `Database error: ${signupError.message}`,
        details: signupError.details || signupError.hint,
      }
    }

    // ─────────── Challenge lookup ────────────
    const { data: challengeData, error: challengeError } = await supabaseAdmin
      .from("challenges")
      .select("id, name")
      .in(
        "name",
        challenges.filter((c) => c !== "Other: Please Specify"),
      )

    if (challengeError) {
      // Table probably missing (error 42P01) or some other problem
      const missingTable = challengeError.code === "42P01" || challengeError.message?.includes("does not exist")

      const helpText = missingTable
        ? "The challenges table hasn’t been created yet. Run scripts/create-challenges-table.sql in Supabase → SQL Editor first."
        : challengeError.message

      console.error("Challenge lookup error:", challengeError)
      return {
        success: false,
        error: "Challenge lookup failed.",
        details: helpText,
      }
    }

    // Prepare signup_challenges records
    const signupChallenges = []

    // Add regular challenges
    if (challengeData) {
      for (const challenge of challengeData) {
        signupChallenges.push({
          signup_id: signupData.id,
          challenge_id: challenge.id,
          custom_description: null,
        })
      }
    }

    // Add custom "Other" challenge if selected
    if (challenges.includes("Other: Please Specify") && otherChallenge) {
      // Ensure an "Other" record exists in challenges table (idempotent)
      const { data: otherRow, error: otherErr } = await supabaseAdmin
        .from("challenges")
        .upsert({ name: "Other", description: "User-specified learning challenge" }, { onConflict: "name" })
        .select("id")
        .single()

      if (otherErr) {
        console.error("Failed to upsert 'Other' challenge:", otherErr)
      } else {
        signupChallenges.push({
          signup_id: signupData.id,
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
        // Don't fail the whole signup for this, just log it
        console.warn("Signup succeeded but challenge relationships failed to save")
      }
    }

    console.log("Successfully inserted sign-up:", signupData)
  } catch (e: any) {
    console.error("Unexpected error:", e)
    return {
      success: false,
      error: "An unexpected error occurred while saving your sign-up.",
      details: e.message,
    }
  }

  revalidatePath("/sign-up")
  return {
    success: true,
    message: "🎉 Thank you for signing up! We'll be in touch soon with updates about CortexCatalyst.",
  }
}
