import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const donations = await db.donation.findMany({
      where: {
        userId,
      },
      include: {
        ngo: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(donations)
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, ngoId, userId } = body

    if (!amount || !ngoId || !userId) {
      return NextResponse.json({ error: "Amount, NGO ID, and User ID are required" }, { status: 400 })
    }

    const donation = await db.donation.create({
      data: {
        amount: Number.parseFloat(amount),
        ngoId,
        userId,
      },
    })

    return NextResponse.json(donation)
  } catch (error) {
    console.error("Error creating donation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
