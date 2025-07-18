"use client"

import { useState } from "react"
import { useActionState } from "react"
import { signUpAction } from "@/app/actions/sign-up"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-50">
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  )
}

function SuccessStats({ stats }: { stats: any }) {
  if (!stats) return null

  const chartData = stats.challengeStats.map((stat: any) => ({
    name: stat.challenge.replace(/([A-Z])/g, " $1").replace(/^./, (str: string) => str.toUpperCase()),
    count: stat.count,
  }))

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-center space-x-2 text-green-600">
        <CheckCircle className="h-6 w-6" />
        <span className="text-lg font-semibold">Welcome to the CortexCatalyst community!</span>
      </div>

      <Card className="border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-600">Community Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-blue-600">{stats.totalUsers}</div>
            <div className="text-gray-600">Total Community Members</div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-center">Most Common Learning Challenges</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpAction, null)
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([])

  const handleChallengeChange = (challenge: string, checked: boolean) => {
    if (checked) {
      setSelectedChallenges([...selectedChallenges, challenge])
    } else {
      setSelectedChallenges(selectedChallenges.filter((c) => c !== challenge))
    }
  }

  if (state?.success) {
    return (
      <div className="max-w-2xl mx-auto">
        <SuccessStats stats={state.stats} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Join CortexCatalyst</h1>
        <p className="text-gray-600">Be the first to experience the future of personalized learning</p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" name="firstName" type="text" required className="border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input id="lastName" name="lastName" type="text" required className="border-gray-300" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" name="email" type="email" required className="border-gray-300" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Current Role *</Label>
          <Select name="role" required>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="educator">Educator</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="researcher">Researcher</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">Organization/Institution</Label>
          <Input id="organization" name="organization" type="text" className="border-gray-300" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Learning Experience Level *</Label>
          <Select name="experience" required>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Primary Learning Challenges (Select all that apply) *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "timeManagement",
              "motivation",
              "focusConcentration",
              "informationOverload",
              "retentionRecall",
              "practicalApplication",
              "feedbackGuidance",
              "learningStyle",
            ].map((challenge) => (
              <div key={challenge} className="flex items-center space-x-2">
                <Checkbox
                  id={challenge}
                  name="challenges"
                  value={challenge}
                  onCheckedChange={(checked) => handleChallengeChange(challenge, checked as boolean)}
                />
                <Label htmlFor={challenge} className="text-sm">
                  {challenge === "timeManagement" && "Time Management"}
                  {challenge === "motivation" && "Staying Motivated"}
                  {challenge === "focusConcentration" && "Focus & Concentration"}
                  {challenge === "informationOverload" && "Information Overload"}
                  {challenge === "retentionRecall" && "Retention & Recall"}
                  {challenge === "practicalApplication" && "Practical Application"}
                  {challenge === "feedbackGuidance" && "Feedback & Guidance"}
                  {challenge === "learningStyle" && "Finding Right Learning Style"}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests">Specific Learning Interests</Label>
          <Textarea
            id="interests"
            name="interests"
            placeholder="Tell us about your specific learning goals or subjects you're interested in..."
            className="border-gray-300"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectations">What do you hope to achieve with CortexCatalyst?</Label>
          <Textarea
            id="expectations"
            name="expectations"
            placeholder="Share your expectations and what you'd like to see in a personalized learning platform..."
            className="border-gray-300"
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="updates" name="updates" value="yes" />
          <Label htmlFor="updates" className="text-sm">
            I'd like to receive updates about CortexCatalyst's development and early access opportunities
          </Label>
        </div>

        {state?.error && <div className="text-red-600 text-sm">{state.error}</div>}

        <SubmitButton pending={pending} />
      </form>
    </div>
  )
}
