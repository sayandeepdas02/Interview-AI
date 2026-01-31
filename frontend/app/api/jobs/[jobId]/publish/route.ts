import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { nanoid } from 'nanoid'

export async function POST(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 })

    const { jobId } = await params

    const job = await prisma.job.findUnique({
        where: { id: jobId }
    })

    if (!job) return new NextResponse("Job not found", { status: 404 })

    // Generate link if not exists
    const shareableLink = job.shareableLink || nanoid(10)

    const updated = await prisma.job.update({
        where: { id: jobId },
        data: {
            status: "published",
            shareableLink
        }
    })

    return NextResponse.json(updated)
}
