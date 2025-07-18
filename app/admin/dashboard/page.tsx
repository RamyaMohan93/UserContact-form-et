"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Users, TrendingUp, BarChart3 } from "lucide-react"

interface StatsData {
  totalUsers: number
  totalChallengeSelections: number
  avgChallengesPerUser: string
  challengeStats: { [key: string]: number }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/challenge-stats")
        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">No data available</div>
      </div>
    )
  }

  const chartData = Object.entries(stats.challengeStats)
    .map(([challenge, count]) => ({
      challenge: challenge.length > 15 ? challenge.substring(0, 15) + "..." : challenge,
      fullChallenge: challenge,
      count,
      percentage: stats.totalUsers > 0 ? (((count as number) / stats.totalUsers) * 100).toFixed(1) : "0",
    }))
    .sort((a, b) => (b.count as number) - (a.count as number))
    .filter((item) => item.count > 0)

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CortexCatalyst Analytics</h1>
        <p className="text-gray-600">Community insights and learning challenge statistics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-700">{stats.totalUsers}</p>
            <p className="text-sm text-blue-600">Total Users</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-700">{stats.totalChallengeSelections}</p>
            <p className="text-sm text-green-600">Challenge Selections</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-700">{stats.avgChallengesPerUser}</p>
            <p className="text-sm text-purple-600">Avg per User</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Challenge Distribution</CardTitle>
          <CardDescription>Most common challenges faced by our community</CardDescription>
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
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
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

      {/* Challenge Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Challenge Breakdown</CardTitle>
          <CardDescription>Complete list of learning challenges with user counts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chartData.map((item, index) => (
              <div key={item.fullChallenge} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{item.fullChallenge}</p>
                  <p className="text-xs text-gray-500">{item.percentage}% of users</p>
                </div>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
