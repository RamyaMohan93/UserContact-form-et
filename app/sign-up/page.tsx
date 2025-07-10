import SignUpForm from "@/components/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-gray-400 to-gray-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Sign-Up</h1>
            <p className="text-xl text-gray-200">Join the Future of Learning</p>
          </div>
        </div>
        {/* Futuristic overlay effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
      </div>

      <SignUpForm />
    </div>
  )
}
