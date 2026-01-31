
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
    const { jobId } = await params

    // Return questions without answers
    const questions = await prisma.question.findMany({
        where: { jobId },
        select: {
            id: true,
            questionText: true,
            optionA: true,
            optionB: true,
            optionC: true,
            optionD: true,
            timeLimit: true,
            // Exclude correctAnswer
        },
        orderBy: { order: 'asc' }
    })

    return NextResponse.json({ questions })
}
