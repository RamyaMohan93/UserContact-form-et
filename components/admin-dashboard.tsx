"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type SignupData = {
  id: string
  name: string
  email: string
  phone?: string
  country_code?: string
  subject: string
  stay_in_loop: boolean
  created_at: string
  challenge_information_overload: boolean
  challenge_difficulty_finding_content: boolean
  challenge_personalized_learning: boolean
  challenge_slow_knowledge_absorption: boolean
  challenge_inconsistent_skill_development: boolean
  challenge_lack_realtime_feedback: boolean
  challenge_gaps_existing_knowledge: boolean
  challenge_limited_time_learning: boolean
  challenge_overwhelmed_complex_topics: boolean
  challenge_fragmented_resources: boolean
  challenge_other: boolean
  challenge_other_description?: string
}

const challengeLabels: Record<string, string> = {
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

export default function AdminDashboard() {
  const [signups, setSignups] = useState<SignupData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would need to be implemented as an API route or server component
    // since we can't use supabaseAdmin directly in client components
    console.log("Admin dashboard would fetch signups here")
    setLoading(false)
  }, [])

  const getSelectedChallenges = (signup: SignupData) => {
    const selected = []

    Object.entries(challengeLabels).forEach(([key, label]) => {
      if (signup[key as keyof SignupData]) {
        if (key === "challenge_other" && signup.challenge_other_description) {
          selected.push(`${label}: ${signup.challenge_other_description}`)
        } else {
          selected.push(label)
        }
      }
    })

    return selected
  }

  if (loading) {
    return <div className="p-8">Loading signups...</div>
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">CortexCatalyst Signups</h1>
      <p className="text-gray-600">
        All signup data is now stored in a single table with individual columns for each challenge.
      </p>

      <div className="grid gap-6">
        {signups.map((signup) => (
          <Card key={signup.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{signup.name}</span>
                <Badge variant={signup.stay_in_loop ? "default" : "secondary"}>
                  {signup.stay_in_loop ? "Subscribed" : "Not Subscribed"}
                </Badge>
              </CardTitle>
              <CardDescription>
                {signup.email} • {signup.phone && `${signup.country_code}${signup.phone} • `}
                {new Date(signup.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Subject:</h4>
                  <p className="text-sm text-gray-600">{signup.subject}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Learning Challenges:</h4>
                  <div className="flex flex-wrap gap-2">
                    {getSelectedChallenges(signup).map((challenge, index) => (
                      <Badge key={index} variant="outline">
                        {challenge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
