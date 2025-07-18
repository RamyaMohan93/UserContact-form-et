import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Zap, Target, Users, BarChart3, Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-pink-600" />
              <h1 className="text-2xl font-bold text-gray-900">CortexCatalyst</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                  <BarChart3 className="h-4 w-4" />
                  <span>View Analytics</span>
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-pink-600 hover:bg-pink-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-pink-100 text-pink-800 hover:bg-pink-100">🚀 Coming Soon - Early Access</Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Revolutionize Your Learning with <span className="text-pink-600">AI-Powered Personalization</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            CortexCatalyst adapts to your unique learning style, pace, and goals to deliver a truly personalized
            educational experience that maximizes retention and accelerates mastery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-3">
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                <Settings className="mr-2 h-5 w-5" />
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CortexCatalyst?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-driven platform addresses the most common learning challenges with innovative solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-pink-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Adaptive Learning Paths</CardTitle>
                <CardDescription>
                  AI algorithms analyze your learning patterns and adjust content difficulty and pacing in real-time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-pink-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Instant Feedback</CardTitle>
                <CardDescription>
                  Get immediate, personalized feedback on your progress with actionable insights for improvement.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-pink-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Goal-Oriented Learning</CardTitle>
                <CardDescription>
                  Set specific learning objectives and let our AI create customized curricula to achieve them
                  efficiently.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Join Our Growing Community</h3>
            <p className="text-lg text-gray-600">
              Be part of the learning revolution that's already transforming education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">10,000+</div>
              <div className="text-gray-600">Early Access Signups</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">95%</div>
              <div className="text-gray-600">Learning Efficiency Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">50+</div>
              <div className="text-gray-600">Subject Areas Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Learning?</h3>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already experiencing the future of personalized education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-pink-600 bg-transparent"
              >
                <Users className="mr-2 h-5 w-5" />
                View Community Stats
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-pink-400" />
              <span className="text-xl font-bold">CortexCatalyst</span>
            </div>
            <div className="text-gray-400">© 2024 CortexCatalyst. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
