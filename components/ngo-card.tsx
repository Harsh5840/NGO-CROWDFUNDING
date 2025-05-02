"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Users, Calendar } from "lucide-react"

interface NGOProps {
  ngo: {
    id: string
    name: string
    description: string
    goal: number
    location: string
    createdAt: Date
    donations?: {
      amount: number
    }[]
    _count?: {
      donations: number
    }
  }
}

const Images = [
  {
    src: "./images/ngo1.jpg",
    alt: "NGO 1",
  },
  {
    src: "./images/ngo2.jpg",
    alt: "NGO 2",
  },
  {
    src: "./images/ngo3.jpg",
    alt: "NGO 3",
  },
  {
    src: "./images/ngo4.jpg",
    alt: "NGO 4",
  },
  {
    src: "./images/ngo5.jpg",
    alt: "NGO 5",
  }
]

export function NGOCard({ ngo }: NGOProps) {
  const router = useRouter()
  const [donationAmount, setDonationAmount] = useState("500")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Store donations in sessionStorage for persistence
  const [localDonations, setLocalDonations] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(`donations-${ngo.id}`)
      return saved ? JSON.parse(saved) : ngo.donations || []
    }
    return ngo.donations || []
  })

  // Calculate total donations combining both sources
  const totalDonations = localDonations.reduce((sum: number, donation: { amount: number }) => sum + donation.amount, 0)

  const handleDonate = async () => {
    try {
      setIsLoading(true)
      const userString = sessionStorage.getItem("user")
      if (!userString) {
        alert("Please sign in first")
        router.push("/signin")
        return
      }

      const user = JSON.parse(userString)
      const amount = Number.parseInt(donationAmount)

      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          ngoId: ngo.id,
          userId: user.id,
        }),
      })

      if (response.ok) {
        setIsDialogOpen(false)
        alert(`Thank you for donating ₹${amount.toLocaleString()} to ${ngo.name}!`)
        const updatedDonations = [...localDonations, { amount }]
        setLocalDonations(updatedDonations)
        // Save to sessionStorage
        sessionStorage.setItem(`donations-${ngo.id}`, JSON.stringify(updatedDonations))
      } else {
        console.error("Failed to process donation")
      }
    } catch (error) {
      console.error("Error processing donation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        <Image
          src={"/images/ngo1.jpg"} // Use proper image source
          alt={ngo.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-1">{ngo.name}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          {ngo.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">{ngo.description}</p>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>
              Raised: <span className="font-semibold text-green-600">₹{totalDonations.toLocaleString()}</span>
            </span>
            <span>
              Goal: <span className="font-semibold">₹{ngo.goal.toLocaleString()}</span>
            </span>
          </div>
          <Progress value={(totalDonations / ngo.goal) * 100} className="h-2" />
          <p className="text-xs text-right text-gray-500">{((totalDonations / ngo.goal) * 100).toFixed(1)}% Complete</p>
        </div>

        <div className="flex justify-between text-xs text-gray-500 pt-2">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(ngo.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {ngo._count?.donations || Math.floor(Math.random() * 50) + 5} Donors
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-green-600 hover:bg-green-700">Donate Now</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Donate to {ngo.name}</DialogTitle>
              <DialogDescription>Your contribution will help support their mission.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="donation-amount">Donation Amount (₹)</Label>
                <Input
                  id="donation-amount"
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  min="100"
                />
              </div>
              <div className="flex justify-between gap-2">
                {[500, 1000, 5000, 10000].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant="outline"
                    className={donationAmount === amount.toString() ? "border-green-600 bg-green-50" : ""}
                    onClick={() => setDonationAmount(amount.toString())}
                  >
                    ₹{amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleDonate} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? "Processing..." : `Donate ₹${Number.parseInt(donationAmount).toLocaleString()}`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
