"use client"

import { useActionState, useState } from "react"
import { submitSignUp } from "@/app/actions/sign-up"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Users, CheckCircle, AlertCircle } from "lucide-react"

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

const countries = [
  { code: "+1", name: "United States/Canada" },
  { code: "+44", name: "United Kingdom" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+39", name: "Italy" },
  { code: "+34", name: "Spain" },
  { code: "+31", name: "Netherlands" },
  { code: "+46", name: "Sweden" },
  { code: "+47", name: "Norway" },
  { code: "+45", name: "Denmark" },
  { code: "+41", name: "Switzerland" },
  { code: "+43", name: "Austria" },
  { code: "+32", name: "Belgium" },
  { code: "+351", name: "Portugal" },
  { code: "+353", name: "Ireland" },
  { code: "+358", name: "Finland" },
  { code: "+91", name: "India" },
  { code: "+86", name: "China" },
  { code: "+81", name: "Japan" },
  { code: "+82", name: "South Korea" },
  { code: "+61", name: "Australia" },
  { code: "+64", name: "New Zealand" },
  { code: "+55", name: "Brazil" },
  { code: "+52", name: "Mexico" },
  { code: "+54", name: "Argentina" },
  { code: "+56", name: "Chile" },
  { code: "+57", name: "Colombia" },
  { code: "+51", name: "Peru" },
  { code: "+27", name: "South Africa" },
  { code: "+20", name: "Egypt" },
  { code: "+234", name: "Nigeria" },
  { code: "+254", name: "Kenya" },
  { code: "+971", name: "UAE" },
  { code: "+966", name: "Saudi Arabia" },
  { code: "+972", name: "Israel" },
  { code: "+90", name: "Turkey" },
  { code: "+7", name: "Russia" },
  { code: "+380", name: "Ukraine" },
  { code: "+48", name: "Poland" },
  { code: "+420", name: "Czech Republic" },
  { code: "+36", name: "Hungary" },
  { code: "+40", name: "Romania" },
  { code: "+359", name: "Bulgaria" },
  { code: "+385", name: "Croatia" },
  { code: "+386", name: "Slovenia" },
  { code: "+421", name: "Slovakia" },
  { code: "+370", name: "Lithuania" },
  { code: "+371", name: "Latvia" },
  { code: "+372", name: "Estonia" },
]

interface SuccessStatsProps {
  stats: {
    totalUsers: number
    chartData: Array<{
      challenge: string
      fullChallenge: string
      count: number
      percentage: string
    }>
  }
}

function SuccessStats({ stats }: SuccessStatsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Community!</h3>
        <p className="text-gray-600">You're now part of a growing community of learners</p>
      </div>

      {/* Total Users Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Community Members</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Most Common Learning Challenges</CardTitle>
          <CardDescription>See what challenges others in the community are facing</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Users",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="challenge" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-medium">{data.fullChallenge}</p>
                          <p className="text-blue-600">Users: {data.count}</p>
                          <p className="text-gray-600">Percentage: {data.percentage}%</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(submitSignUp, null)
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([])
  const [showOtherInput, setShowOtherInput] = useState(false)

  const handleChallengeChange = (challenge: string, checked: boolean) => {
    if (checked) {
      setSelectedChallenges([...selectedChallenges, challenge])
      if (challenge === "Other: Please Specify") {
        setShowOtherInput(true)
      }
    } else {
      setSelectedChallenges(selectedChallenges.filter((c) => c !== challenge))
      if (challenge === "Other: Please Specify") {
        setShowOtherInput(false)
      }
    }
  }

  if (state?.success && state.stats) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <Alert className="border-green-200 bg-green-50 mb-6">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{state.message}</AlertDescription>
          </Alert>
        </div>
        <SuccessStats stats={state.stats} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Join CortexCatalyst</CardTitle>
          <CardDescription>
            Help us understand your learning challenges so we can build the perfect solution for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input id="name" name="name" placeholder="Enter your full name" required />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email address" required />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label>Phone Number (Optional)</Label>
              <div className="flex space-x-2">
                <select name="countryCode" className="px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="">Country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} {country.name}
                    </option>
                  ))}
                </select>
                <Input name="phone" placeholder="Phone number" className="flex-1" />
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <Label htmlFor="subject">
                What subject or field are you most interested in learning? <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="e.g., Programming, Data Science, Marketing, etc."
                required
              />
            </div>

            {/* Learning Challenges */}
            <div className="space-y-4">
              <Label>
                What are your biggest learning challenges? <span className="text-red-500">*</span>
                <span className="text-sm text-gray-500 block font-normal">Select all that apply</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenges.map((challenge) => (
                  <div key={challenge} className="flex items-center space-x-2">
                    <Checkbox
                      id={challenge}
                      name="challenges"
                      value={challenge}
                      checked={selectedChallenges.includes(challenge)}
                      onCheckedChange={(checked) => handleChallengeChange(challenge, checked as boolean)}
                    />
                    <Label htmlFor={challenge} className="text-sm font-normal cursor-pointer">
                      {challenge}
                    </Label>
                  </div>
                ))}
              </div>
              {showOtherInput && (
                <div className="mt-3">
                  <Label htmlFor="otherChallenge">Please specify your other learning challenge:</Label>
                  <Textarea
                    id="otherChallenge"
                    name="otherChallenge"
                    placeholder="Describe your specific learning challenge..."
                    className="mt-1"
                  />
                </div>
              )}
            </div>

            {/* Stay in Loop */}
            <div className="space-y-3">
              <Label>Would you like to stay in the loop about CortexCatalyst's development?</Label>
              <RadioGroup name="stayInLoop" defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes, keep me updated!</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No, thanks</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Error Display */}
            {state && !state.success && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{state.error}</AlertDescription>
                {state.details && (
                  <AlertDescription className="text-red-600 text-sm mt-1">{state.details}</AlertDescription>
                )}
              </Alert>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing Up..." : "Sign Up for CortexCatalyst"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
