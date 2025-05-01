"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { NGOCard } from "@/components/ngo-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, PlusCircle, TrendingUp, Users, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"

interface NGO {
  id: string
  name: string
  description: string
  goal: number
  location: string
  createdAt: string
  _count: {
    donations: number
  }
}

export default function NGOsPage() {
  const router = useRouter()
  const [ngos, setNgos] = useState<NGO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Generate statistics
  const totalNGOs = ngos.length
  const totalDonations = Math.floor(Math.random() * 900000) + 100000 // Random for demo
  const totalDonors = Math.floor(Math.random() * 500) + 50 // Random for demo

  useEffect(() => {
    // Check if user is logged in
    const userString = sessionStorage.getItem("user")
    if (!userString) {
      router.push("/signin")
      return
    }

    // Fetch NGOs from the database
    const fetchNGOs = async () => {
      try {
        const response = await fetch("/api/ngos")
        if (response.ok) {
          const data = await response.json()
          setNgos(data)
        }
      } catch (error) {
        console.error("Error fetching NGOs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNGOs()
  }, [router])

  // Filter NGOs based on search term
  const filteredNGOs = ngos.filter(
    (ngo) =>
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading NGOs...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Donations</p>
            <p className="text-2xl font-bold text-gray-800">₹{totalDonations.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Donors</p>
            <p className="text-2xl font-bold text-gray-800">{totalDonors}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <Heart className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Registered NGOs</p>
            <p className="text-2xl font-bold text-gray-800">{totalNGOs}</p>
          </div>
        </div>
      </div>

      {/* Search and Add NGO */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Browse NGOs</h1>
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search NGOs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/ngos/add">
            <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add NGO
            </Button>
          </Link>
        </div>
      </div>

      {filteredNGOs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">No NGOs found</h2>
          <p className="mb-6 text-gray-600">
            {searchTerm ? "No NGOs match your search criteria." : "Be the first to add your NGO to our platform!"}
          </p>
          <Link href="/ngos/add">
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Your NGO
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNGOs.map((ngo) => (
            <NGOCard key={ngo.id} ngo={{ ...ngo, createdAt: new Date(ngo.createdAt) }} />
          ))}
        </div>
      )}
    </div>
  )
}
