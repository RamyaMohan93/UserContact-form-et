import SignUpForm from "@/components/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 py-16">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
          <p className="text-xl">Join the Future of Learning</p>
        </div>
      </div>
      <SignUpForm />
    </div>
  )
}
