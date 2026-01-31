import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 })

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })
    if (!user) return new NextResponse("User not found", { status: 404 })

    const { searchParams } = new URL(req.url)
    const jobId = searchParams.get("jobId")

    const candidates = await prisma.candidate.findMany({
        where: {
            job: {
                userId: user.id, // Ensure user owns the job
                ...(jobId ? { id: jobId } : {})
            }
        },
        include: {
            job: {
                select: { title: true, testEnabled: true, passingScore: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(candidates)
}
