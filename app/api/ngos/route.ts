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
    
    const newNGO = await db.nGO.create({
      data: {
        user: {
          connect: {
            id: body.userId
          }
        },
        name: body.name,
        description: body.description,
        goal: Number(body.goal), // Convert string to number
        location: body.location,
        donations: {
          create: []
        }
      },
      include: {
        donations: true
      }
    })

    return NextResponse.json({ ngo: newNGO })
  } catch (error) {
    console.error("Error creating NGO:", error)
    return NextResponse.json(
      { error: "Failed to create NGO" },
      { status: 500 }
    )
  }
}
