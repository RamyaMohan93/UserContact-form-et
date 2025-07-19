"use client"

import { useFormStatus } from "react-dom"
import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitSignUp } from "@/app/actions/sign-up"
import { CheckCircle, AlertCircle, Users } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const initialState = null

const learningChallenges = [
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
  { code: "+91", country: "IN" },
  { code: "+86", country: "CN" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+81", country: "JP" },
  { code: "+61", country: "AU" },
]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  )
}

function SuccessStats({ stats }: { stats: any }) {
  if (!stats) return null

  return (
    <div className="mt-8 space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Community!</h3>
        <p className="text-gray-600">You're now part of a growing community of learners</p>
      </div>

      {/* Total Users Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-4">
            <Users className="h-12 w-12 text-blue-600" />
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700">{stats.totalUsers}</div>
              <div className="text-blue-600 font-medium">Total Community Members</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      {stats.chartData && stats.chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg">Most Common Learning Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 80,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="challenge" angle={-45} textAnchor="end" height={80} fontSize={12} interval={0} />
                  <YAxis fontSize={12} />
                  <Tooltip
                    formatter={(value, name, props) => [`${value} users (${props.payload.percentage}%)`, "Count"]}
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
  const [state, formAction] = useActionState(submitSignUp, initialState)
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([])
  const [otherChallengeText, setOtherChallengeText] = useState("")

  const handleChallengeChange = (challenge: string, checked: boolean) => {
    if (checked) {
      setSelectedChallenges([...selectedChallenges, challenge])
    } else {
      setSelectedChallenges(selectedChallenges.filter((c) => c !== challenge))
      if (challenge === "Other: Please Specify") {
        setOtherChallengeText("")
      }
    }
  }

  const isOtherSelected = selectedChallenges.includes("Other: Please Specify")

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Be the first to experience <span className="text-pink-600">CortexCatalyst</span>
        </h2>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-8">
          <form action={formAction} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number
              </Label>
              <div className="flex gap-2">
                <Select name="countryCode" defaultValue="+1">
                  <SelectTrigger className="w-32 border-gray-300 focus:border-pink-500">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.code} {item.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="flex-1 border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            {/* Learning Challenges */}
            <div className="space-y-4">
              <Label className="text-gray-700 font-medium">
                Why do you believe CortexCatalyst can address your knowledge and learning challenges?{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {learningChallenges.map((challenge, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`challenge-${index}`}
                      name="challenges"
                      value={challenge}
                      checked={selectedChallenges.includes(challenge)}
                      onCheckedChange={(checked) => handleChallengeChange(challenge, checked as boolean)}
                      className="border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                    />
                    <Label htmlFor={`challenge-${index}`} className="text-sm text-gray-600 cursor-pointer">
                      {challenge}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Other Challenge Input Box */}
              {isOtherSelected && (
                <div className="mt-4 p-4 bg-pink-50 border border-pink-200 rounded-lg">
                  <Label htmlFor="otherChallenge" className="text-gray-700 font-medium mb-2 block">
                    Please specify your other learning challenge:
                  </Label>
                  <Input
                    id="otherChallenge"
                    name="otherChallenge"
                    type="text"
                    placeholder="Describe your specific learning challenge..."
                    value={otherChallengeText}
                    onChange={(e) => setOtherChallengeText(e.target.value)}
                    className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                    required={isOtherSelected}
                  />
                </div>
              )}
            </div>

            {/* Stay in Loop */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="stayInLoop"
                name="stayInLoop"
                value="yes"
                className="border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
              />
              <Label htmlFor="stayInLoop" className="text-sm text-gray-600 cursor-pointer">
                <span className="text-pink-600 font-medium">Stay in Loop</span>
                <br />
                <span className="text-red-500">Yes, keep me updated on new features and platform updates!</span>
              </Label>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-700 font-medium">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Enter subject"
                required
                className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            {/* Result */}
            {state && (
              <Alert className={state.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                {state.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={state.success ? "text-green-800" : "text-red-800"}>
                  {state.success ? (
                    state.message
                  ) : (
                    <>
                      <strong>{state.error}</strong>
                      {state.details && <div className="mt-1 text-sm">{state.details}</div>}
                    </>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {/* Show stats after successful signup */}
      {state?.success && state.stats && <SuccessStats stats={state.stats} />}
    </div>
  )
}
