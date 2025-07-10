"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingUp, Users, BarChart3 } from "lucide-react"

type ChallengeData = {
  challenge: string
  count: number
  percentage: number
}

type AnalyticsResponse = {
  data: ChallengeData[]
  totalSignups: number
  totalChallengeSelections: number
}

// Color palette for the pie chart
const COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEAA7", // Yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Mint
  "#F7DC6F", // Light Yellow
  "#BB8FCE", // Light Purple
  "#85C1E9", // Light Blue
  "#F8C471", // Orange
  "#82E0AA", // Light Green
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{data.challenge}</p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">{data.count}</span> users ({data.percentage}%)
        </p>
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {payload?.map((entry: any, index: number) => (
        <Badge
          key={index}
          variant="outline"
          className="flex items-center gap-1 text-xs"
          style={{ borderColor: entry.color }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.value}
        </Badge>
      ))}
    </div>
  )
}

export default function ChallengesPieChart() {
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchChallengeData()
  }, [])

  const fetchChallengeData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/challenges-analytics")

      if (!response.ok) {
        throw new Error("Failed to fetch challenge data")
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error("Error fetching challenge data:", err)
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading challenge analytics...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-500 mb-2">⚠️ Error loading data</div>
            <p className="text-sm text-gray-600">{error}</p>
            <button
              onClick={fetchChallengeData}
              className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-pink-500" />
            Learning Challenges Analytics
          </CardTitle>
          <CardDescription>Distribution of learning challenges among users</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No signup data available yet</p>
            <p className="text-sm">Challenge analytics will appear once users start signing up</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const topChallenge = data.data[0]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Signups</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalSignups}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Challenge Selections</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalChallengeSelections}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-pink-500" />
              <div>
                <p className="text-sm text-gray-600">Top Challenge</p>
                <p className="text-lg font-bold text-gray-900">{topChallenge.challenge}</p>
                <p className="text-sm text-gray-500">
                  {topChallenge.count} users ({topChallenge.percentage}%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-pink-500" />
            Learning Challenges Distribution
          </CardTitle>
          <CardDescription>How users are distributed across different learning challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ challenge, percentage }) => `${percentage}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="count"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {data.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Data Table */}
          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium mb-3 text-gray-900">Detailed Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.data.map((item, index) => (
                <div key={item.challenge} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm font-medium text-gray-700">{item.challenge}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{item.count}</div>
                    <div className="text-xs text-gray-500">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
