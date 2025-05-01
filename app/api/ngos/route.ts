import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const ngos = await db.nGO.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(ngos)
  } catch (error) {
    console.error("Error fetching NGOs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, goal, location, userId } = body

    const ngo = await db.nGO.create({
      data: {
        name,
        description,
        goal: Number.parseFloat(goal),
        location,
        userId,
      },
    })

    return NextResponse.json(ngo)
  } catch (error) {
    console.error("Error creating NGO:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
