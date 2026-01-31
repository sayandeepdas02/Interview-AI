import { getServerSession } from "next-auth"
import { authOptions } from "../[...nextauth]/route"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            company: true,
            createdAt: true,
        },
    })

    if (!user) {
        return new NextResponse("User not found", { status: 404 })
    }

    return NextResponse.json(user)
}
