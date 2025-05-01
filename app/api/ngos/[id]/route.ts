import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const ngoId = params.id

    const ngo = await db.nGO.findUnique({
      where: {
        id: ngoId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        donations: {
          select: {
            amount: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            donations: true,
          },
        },
      },
    })

    if (!ngo) {
      return NextResponse.json({ error: "NGO not found" }, { status: 404 })
    }

    return NextResponse.json(ngo)
  } catch (error) {
    console.error("Error fetching NGO:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
