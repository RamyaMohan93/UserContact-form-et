import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Zap, Target, BarChart3, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-pink-600" />
            <span className="text-2xl font-bold text-gray-900">CortexCatalyst</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-up">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">Get Started</Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-pink-100 text-pink-800 border-pink-200">🚀 Early Access Available</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolutionize Your Learnings with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600">
              AI-Powered Intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            CortexCatalyst adapts to your unique learning style, accelerates knowledge absorption, and provides
            real-time feedback to help you master any subject faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 bg-transparent"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Community Stats
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CortexCatalyst?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of personalized learning with cutting-edge AI technology
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-pink-100 hover:border-pink-200 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-pink-600 mb-4" />
                <CardTitle className="text-xl">Accelerated Learning</CardTitle>
                <CardDescription>
                  Learn 3x faster with AI-optimized content delivery and personalized learning paths
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">Precision Targeting</CardTitle>
                <CardDescription>
                  Focus on your knowledge gaps with AI-powered assessment and targeted skill development
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Real-time Adaptation</CardTitle>
                <CardDescription>
                  Get instant feedback and adaptive content that evolves with your learning progress
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-600 to-blue-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Join a Growing Community</h2>
          <p className="text-xl mb-12 opacity-90">
            Thousands of learners are already transforming their education with CortexCatalyst
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-xl opacity-90">Active Learners</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-xl opacity-90">Success Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">3x</div>
              <div className="text-xl opacity-90">Faster Learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-4xl mx-auto border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-blue-50">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Learning?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Be among the first to experience the future of AI-powered education
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
                    Get Early Access
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/admin/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-pink-300 text-pink-700 hover:bg-pink-50 px-8 py-3 bg-transparent"
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-pink-400" />
            <span className="text-2xl font-bold">CortexCatalyst</span>
          </div>
          <p className="text-gray-400 mb-4">Revolutionizing education through AI-powered personalized learning</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>© 2024 CortexCatalyst. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
