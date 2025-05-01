import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-160px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Make a Difference Today</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Support NGOs working on causes you care about and help create positive change in communities across India.
          </p>
          <Link href="/signin">
            <Button className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-6 h-auto rounded-full">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 inline-flex mb-4">
                <TrendingUp className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-4xl font-bold mb-2">₹10M+</h3>
              <p className="text-gray-600">Funds Raised</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 inline-flex mb-4">
                <Heart className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold mb-2">100+</h3>
              <p className="text-gray-600">NGOs Supported</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 inline-flex mb-4">
                <Users className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-4xl font-bold mb-2">5,000+</h3>
              <p className="text-gray-600">Donors</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create an account to get started with our platform.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Browse NGOs</h3>
              <p className="text-gray-600">Explore various NGOs working on causes you care about.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Make a Donation</h3>
              <p className="text-gray-600">Contribute to NGOs and help them achieve their goals.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/signin">
              <Button className="bg-green-600 hover:bg-green-700">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
