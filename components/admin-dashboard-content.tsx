"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, TrendingUp, BarChart3, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface ChallengeStats {
  challengeStats: Record<string, number>
  otherDescriptions: string[]
  totalUsers: number
}

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

export default function AdminDashboardContent() {
  const [data, setData] = useState<ChallengeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/admin/challenge-stats")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-16" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">Error loading dashboard: {error}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>No data available</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  // Prepare chart data
  const chartData = Object.entries(data.challengeStats)
    .map(([challenge, count]) => ({
      challenge: challenge.length > 20 ? challenge.substring(0, 20) + "..." : challenge,
      fullChallenge: challenge,
      count,
      percentage: data.totalUsers > 0 ? ((count / data.totalUsers) * 100).toFixed(1) : "0",
    }))
    .sort((a, b) => b.count - a.count)

  const pieData = chartData
    .filter((item) => item.count > 0)
    .map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length],
    }))

  const totalChallengeSelections = Object.values(data.challengeStats).reduce((sum, count) => sum + count, 0)
  const avgChallengesPerUser = data.totalUsers > 0 ? (totalChallengeSelections / data.totalUsers).toFixed(1) : "0"

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CortexCatalyst Analytics Dashboard</h1>
          <p className="text-gray-600">Overview of user signups and learning challenges</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Challenge Selections</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalChallengeSelections}</div>
              <p className="text-xs text-muted-foreground">Total selections made</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Challenges/User</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgChallengesPerUser}</div>
              <p className="text-xs text-muted-foreground">Average per user</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Challenges Distribution</CardTitle>
              <CardDescription>Number of users facing each challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 80,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="challenge" angle={-45} textAnchor="end" height={80} fontSize={12} interval={0} />
                    <YAxis />
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

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Challenge Proportions</CardTitle>
              <CardDescription>Percentage breakdown of learning challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percentage }) => `${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [
                        `${value} users (${props.payload.percentage}%)`,
                        props.payload.fullChallenge,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challenge Details */}
        <Card>
          <CardHeader>
            <CardTitle>Challenge Breakdown</CardTitle>
            <CardDescription>Detailed view of all learning challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chartData.map((item, index) => (
                <div key={item.fullChallenge} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.fullChallenge}</div>
                    <div className="text-xs text-gray-500">{item.percentage}% of users</div>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Other Descriptions */}
        {data.otherDescriptions.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Custom Challenge Descriptions</CardTitle>
              <CardDescription>User-provided descriptions for "Other" challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.otherDescriptions.map((description, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">"{description}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}