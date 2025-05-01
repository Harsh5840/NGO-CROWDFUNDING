"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const userString = sessionStorage.getItem("user")
    if (userString) {
      setUser(JSON.parse(userString))
    } else if (pathname !== "/" && pathname !== "/signin") {
      router.push("/signin")
    }
  }, [pathname, router])

  const handleSignOut = () => {
    sessionStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={user ? "/ngos" : "/"} className="flex items-center space-x-2">
          <div className="bg-green-600 text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-800">NGO Funding Portal</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {user && (
            <>
              <Link
                href="/ngos"
                className={`text-gray-600 hover:text-green-600 ${pathname === "/ngos" ? "font-semibold text-green-600" : ""}`}
              >
                Browse NGOs
              </Link>
              <Link
                href="/ngos/add"
                className={`text-gray-600 hover:text-green-600 ${pathname === "/ngos/add" ? "font-semibold text-green-600" : ""}`}
              >
                Add NGO
              </Link>
              <Link
                href="/donations"
                className={`text-gray-600 hover:text-green-600 ${pathname === "/donations" ? "font-semibold text-green-600" : ""}`}
              >
                My Donations
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <p className="text-sm text-gray-600">Welcome,</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            pathname !== "/signin" && (
              <Link href="/signin">
                <Button className="bg-green-600 hover:bg-green-700">Sign In</Button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  )
}
