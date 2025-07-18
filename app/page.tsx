import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CortexCatalyst</h1>
        <p className="text-xl text-gray-600 mb-8">Revolutionize your learning experience</p>

        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/sign-up">
              <Button className="w-full bg-pink-600 hover:bg-pink-700">Sign Up Now</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
