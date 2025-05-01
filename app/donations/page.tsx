"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react"

interface Donation {
  id: string
  amount: number
  createdAt: string
  ngo: {
    id: string
    name: string
    location: string
  }
}

export default function DonationsPage() {
  const router = useRouter()
  const [donations, setDonations] = useState<Donation[]>([])
  const [totalDonated, setTotalDonated] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userString = sessionStorage.getItem("user")
    if (!userString) {
      router.push("/signin")
      return
    }

    const user = JSON.parse(userString)

    // Fetch donations for this user
    const fetchDonations = async () => {
      try {
        const response = await fetch(`/api/donations?userId=${user.id}`)
        if (response.ok) {
          const data = await response.json()
          setDonations(data)

          // Calculate total donated amount
          const total = data.reduce((sum: number, donation: Donation) => sum + donation.amount, 0)
          setTotalDonated(total)
        }
      } catch (error) {
        console.error("Error fetching donations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDonations()
  }, [router])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading your donations...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/ngos" className="inline-flex items-center text-green-600 hover:text-green-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to NGOs
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">My Donations</h1>
        <div className="bg-green-50 border border-green-200 rounded-lg px-6 py-3">
          <p className="text-sm text-green-700">Total Donated</p>
          <p className="text-2xl font-bold text-green-600">₹{totalDonated.toLocaleString()}</p>
        </div>
      </div>

      {donations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No donations yet</h2>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              You haven't made any donations yet. Start supporting NGOs to make a difference.
            </p>
            <Link href="/ngos">
              <Button className="bg-green-600 hover:bg-green-700">Browse NGOs</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {donations.map((donation) => (
            <Card key={donation.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{donation.ngo.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{donation.ngo.location}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(donation.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-2xl font-bold text-green-600">₹{donation.amount.toLocaleString()}</p>
                    <Link
                      href={`/ngos/${donation.ngo.id}`}
                      className="text-sm text-green-600 hover:text-green-700 inline-flex items-center mt-2"
                    >
                      View NGO <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
