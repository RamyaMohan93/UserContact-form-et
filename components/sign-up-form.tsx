"use client"

import { useState } from "react"
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

const countryCodes = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+39", country: "IT" },
  { code: "+34", country: "ES" },
  { code: "+31", country: "NL" },
  { code: "+46", country: "SE" },
  { code: "+47", country: "NO" },
  { code: "+45", country: "DK" },
  { code: "+41", country: "CH" },
  { code: "+43", country: "AT" },
  { code: "+32", country: "BE" },
  { code: "+351", country: "PT" },
  { code: "+353", country: "IE" },
  { code: "+358", country: "FI" },
  { code: "+91", country: "IN" },
  { code: "+86", country: "CN" },
  { code: "+81", country: "JP" },
  { code: "+82", country: "KR" },
  { code: "+61", country: "AU" },
  { code: "+64", country: "NZ" },
  { code: "+55", country: "BR" },
  { code: "+52", country: "MX" },
  { code: "+54", country: "AR" },
  { code: "+56", country: "CL" },
  { code: "+57", country: "CO" },
  { code: "+51", country: "PE" },
  { code: "+58", country: "VE" },
  { code: "+27", country: "ZA" },
  { code: "+234", country: "NG" },
  { code: "+254", country: "KE" },
  { code: "+20", country: "EG" },
  { code: "+971", country: "AE" },
  { code: "+966", country: "SA" },
  { code: "+65", country: "SG" },
  { code: "+60", country: "MY" },
  { code: "+66", country: "TH" },
  { code: "+84", country: "VN" },
  { code: "+63", country: "PH" },
  { code: "+62", country: "ID" },
]

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
    >
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  )
}

function SuccessStats({ stats }: { stats: any }) {
  if (!stats) return null

  return (
    <div className="space-y-6 mt-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to the Community!</h3>
        <p className="text-gray-600">You've joined a growing community of learners tackling similar challenges.</p>
      </div>

      {/* Total Users Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900">{stats.totalUsers}</div>
              <div className="text-sm text-blue-700">Community Members</div>
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

  if (state?.success) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{state.message}</AlertDescription>
        </Alert>
        <SuccessStats stats={state.stats} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Join CortexCatalyst</h1>
        <p className="text-gray-600">
          Be among the first to experience personalized AI-powered learning that adapts to your unique style and pace.
        </p>
      </div>

      {state?.error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            {state.error}
            {state.details && <div className="text-sm mt-1 text-red-600">{state.details}</div>}
          </AlertDescription>
        </Alert>
      )}

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="countryCode" className="text-sm font-medium text-gray-700">
              Country Code
            </Label>
            <select
              id="countryCode"
              name="countryCode"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 bg-white"
            >
              <option value="">Select</option>
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code} ({country.country})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
            What subject or skill are you most interested in learning? *
          </Label>
          <Textarea
            id="subject"
            name="subject"
            required
            rows={3}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            placeholder="e.g., Data Science, Web Development, Language Learning, etc."
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            What are your biggest learning challenges? (Select all that apply) *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {challenges.map((challenge) => (
              <div key={challenge} className="flex items-start space-x-2">
                <Checkbox
                  id={challenge}
                  name="challenges"
                  value={challenge}
                  checked={selectedChallenges.includes(challenge)}
                  onCheckedChange={(checked) => handleChallengeChange(challenge, checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor={challenge} className="text-sm text-gray-700 leading-5">
                  {challenge}
                </Label>
              </div>
            ))}
          </div>

          {showOtherInput && (
            <div className="mt-3">
              <Label htmlFor="otherChallenge" className="text-sm font-medium text-gray-700">
                Please specify your other learning challenge:
              </Label>
              <Input
                id="otherChallenge"
                name="otherChallenge"
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                placeholder="Describe your specific challenge"
              />
            </div>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="stayInLoop" name="stayInLoop" value="yes" className="mt-1" />
          <Label htmlFor="stayInLoop" className="text-sm text-gray-700 leading-5">
            I'd like to stay in the loop about CortexCatalyst's development and be notified when new features become
            available.
          </Label>
        </div>

        <SubmitButton pending={pending} />

        <p className="text-xs text-gray-500 text-center">
          By signing up, you agree to our Terms of Service and Privacy Policy. We respect your privacy and will never
          spam you.
        </p>
      </form>
    </div>
  )
}
