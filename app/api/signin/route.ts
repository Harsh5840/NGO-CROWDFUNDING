import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Check if user exists
    let user = await db.user.findUnique({
      where: {
        email,
      },
    })

    // If user doesn't exist, create a new one
    if (!user) {
      user = await db.user.create({
        data: {
          name,
          email,
          password, // Note: In a real app, you would hash this password
        },
      })
    }

    return NextResponse.json({
      message: "Sign in successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Error in sign in:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
