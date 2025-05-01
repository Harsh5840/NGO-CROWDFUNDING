import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NGO Funding Portal",
  description: "A platform for NGO funding and donations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-[calc(100vh-80px)]">{children}</main>
        <footer className="bg-gray-100 py-6 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} NGO Funding Portal. All rights reserved.</p>
            <p className="mt-2 text-sm">Making a difference, one donation at a time.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}


import './globals.css'