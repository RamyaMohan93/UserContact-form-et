import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CortexCatalyst Sign-Up</h1>
        <p className="text-xl text-gray-600 mb-8">Revolutionize your learning experience</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-pink-600">Get Started</CardTitle>
              <CardDescription>Join the future of personalized learning</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/sign-up">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 rounded-full">
                  Sign Up Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-600">View Analytics</CardTitle>
              <CardDescription>Metabase dashboard with insights</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-full bg-transparent"
                >
                  Open Metabase
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 Analytics Dashboard</h3>
          <p className="text-sm text-gray-600">
            Professional analytics powered by Metabase. View learning challenge distributions, signup trends, and user
            insights.
          </p>
        </div>
      </div>
    </div>
  )
}
