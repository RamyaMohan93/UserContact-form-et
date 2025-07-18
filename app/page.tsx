import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Target, Users, TrendingUp, Sparkles, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">CortexCatalyst</span>
          </div>
          <div className="flex space-x-3">
            <Link href="/sign-up">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100">🚀 Now in Early Access</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered Learning
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {" "}
              That Adapts
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience personalized education that evolves with your learning style, pace, and goals. Join thousands of
            learners already transforming their knowledge journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Learning Today
              </Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg bg-transparent"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Community Stats
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose CortexCatalyst?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-driven platform addresses the most common learning challenges with innovative solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Personalized Learning Paths</CardTitle>
                <CardDescription>
                  AI analyzes your learning style and creates customized curricula that adapt in real-time to your
                  progress.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-pink-600 mb-4" />
                <CardTitle className="text-xl">Instant Feedback</CardTitle>
                <CardDescription>
                  Get immediate, actionable insights on your performance with AI-powered assessments and
                  recommendations.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">Goal-Oriented Learning</CardTitle>
                <CardDescription>
                  Set specific objectives and let our AI guide you through the most efficient path to achieve them.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Thousands of learners are already experiencing the future of education.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg opacity-90">Active Learners</div>
            </div>
            <div>
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Completion Rate</div>
            </div>
            <div>
              <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-lg opacity-90">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the waitlist today and be among the first to experience the future of personalized education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Get Early Access
              </Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg bg-transparent"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Explore Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold">CortexCatalyst</span>
          </div>
          <p className="text-gray-400 mb-4">Revolutionizing education through AI-powered personalization.</p>
          <div className="text-sm text-gray-500">
            © 2024 CortexCatalyst. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </footer>
    </div>
  )
}
