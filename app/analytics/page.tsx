import ChallengesPieChart from "@/components/challenges-pie-chart"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CortexCatalyst <span className="text-pink-600">Analytics</span>
          </h1>
          <p className="text-xl text-gray-600">Insights into user learning challenges and signup trends</p>
        </div>

        <ChallengesPieChart />
      </div>
    </div>
  )
}
