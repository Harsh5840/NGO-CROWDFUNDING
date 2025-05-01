"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddNGO() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goal: "",
    location: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Get user from session storage
      const userString = sessionStorage.getItem("user")
      if (!userString) {
        setError("Please sign in first")
        router.push("/signin")
        return
      }

      const user = JSON.parse(userString)

      const response = await fetch("/api/ngos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id,
        }),
      })

      if (response.ok) {
        router.push("/ngos")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to add NGO")
      }
    } catch (error) {
      console.error("Error adding NGO:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/ngos" className="inline-flex items-center text-green-600 hover:text-green-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to NGOs
        </Link>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Register Your NGO</CardTitle>
          <CardDescription>Fill in the details to add your NGO to our platform</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-6">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">NGO Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter NGO name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your NGO's mission and work"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
              <p className="text-xs text-gray-500">
                Provide a clear description of your NGO's mission, goals, and the impact you aim to make.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal">Funding Goal (₹)</Label>
              <Input
                id="goal"
                name="goal"
                type="number"
                placeholder="Enter funding goal in rupees"
                value={formData.goal}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500">
                Set a realistic funding goal that will help you achieve your objectives.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Enter NGO location (City, State)"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register NGO"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
