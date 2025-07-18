"use client"

import { useActionState } from "react"
import { submitSignUp } from "@/app/actions/sign-up"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Users, BarChart3 } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const challenges = [
  "Information Overload",
  "Difficulty Finding Relevant Content",
  "Struggling with Personalized Learning",
  "Slow Knowledge Absorption",
  "Inconsistent Skill Development",
  "Lack of Real-Time Feedback",
  "Gaps in Existing Knowledge",
  "Limited Time for Learning",
  "Overwhelmed by Complex Topics",
  "Fragmented Learning Resources",
  "Other: Please Specify",
]

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  )
}

function SuccessStats({ stats }: { stats: any }) {
  if (!stats) return null

  return (
    <div className="space-y-6 mt-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to the Community!</h3>
        <p className="text-gray-600">You've joined a growing community of learners facing similar challenges.</p>
      </div>

      {/* Total Users Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-blue-900">{stats.totalUsers}</h4>
              <p className="text-blue-700">Community Members</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Chart */}
      {stats.chartData && stats.chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Most Common Learning Challenges</span>
            </CardTitle>
            <CardDescription>See what challenges others in the community are facing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="challenge" angle={-45} textAnchor="end" height={80} fontSize={12} interval={0} />
                  <YAxis fontSize={12} />
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value} users (${props.payload.percentage}%)`,
                      props.payload.fullChallenge,
                    ]}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return payload[0].payload.fullChallenge
                      }
                      return label
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function SignUpForm() {
  const [state, formAction, pending] = useActionState(submitSignUp, null)

  if (state?.success) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{state.message}</AlertDescription>
        </Alert>
        <SuccessStats stats={state.stats} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Join CortexCatalyst</CardTitle>
          <CardDescription className="text-center">
            Sign up to get early access to our AI-powered learning platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{state.error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" required className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" required className="border-gray-300" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="countryCode">Country Code</Label>
                <Input id="countryCode" name="countryCode" placeholder="+1" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" className="border-gray-300" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">What brings you to CortexCatalyst? *</Label>
              <Textarea
                id="subject"
                name="subject"
                required
                placeholder="Tell us about your learning goals..."
                className="border-gray-300"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">What learning challenges do you face? *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenges.map((challenge) => (
                  <div key={challenge} className="flex items-center space-x-2">
                    <Checkbox id={challenge} name="challenges" value={challenge} />
                    <Label htmlFor={challenge} className="text-sm font-normal cursor-pointer">
                      {challenge}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherChallenge">If you selected "Other", please specify:</Label>
              <Input id="otherChallenge" name="otherChallenge" className="border-gray-300" />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Would you like to stay in the loop?</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="stayInLoopYes" name="stayInLoop" value="yes" className="text-pink-600" />
                  <Label htmlFor="stayInLoopYes" className="cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="stayInLoopNo" name="stayInLoop" value="no" className="text-pink-600" />
                  <Label htmlFor="stayInLoopNo" className="cursor-pointer">
                    No
                  </Label>
                </div>
              </div>
            </div>

            <SubmitButton pending={pending} />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
