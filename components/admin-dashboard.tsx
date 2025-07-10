"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type SignupWithChallenges = {
  id: string
  name: string
  email: string
  phone?: string
  country_code?: string
  subject: string
  stay_in_loop: boolean
  created_at: string
  challenges: Array<{
    name?: string
    custom_description?: string
  }>
}

export default function AdminDashboard() {
  const [signups, setSignups] = useState<SignupWithChallenges[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSignups()
  }, [])

  const fetchSignups = async () => {
    try {
      // This would need to be called from a server component or API route
      // since supabaseAdmin is server-side only
      console.log("Admin dashboard would fetch signups with challenges here")
      setLoading(false)
    } catch (error) {
      console.error("Error fetching signups:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8">Loading signups...</div>
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">CortexCatalyst Signups</h1>

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
                    {signup.challenges.map((challenge, index) => (
                      <Badge key={index} variant="outline">
                        {challenge.name || `Other: ${challenge.custom_description}`}
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
