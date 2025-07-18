import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to <span className="text-pink-600">CortexCatalyst</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The future of personalized learning is here. Join our community and be the first to experience revolutionary
          learning technology.
        </p>
        <Link href="/sign-up">
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
            Join the Waitlist
          </Button>
        </Link>
      </div>
    </div>
  )
}
