
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
    const json = await req.json()
    const { candidateId, questionId, answer } = json

    // Check correctness
    const question = await prisma.question.findUnique({
        where: { id: questionId }
    })

    // In real app, we might not want to expose correctness immediately if we want to prevent client-side leaks,
    // but for scoring we record it.
    const isCorrect = question?.correctAnswer === answer

    await prisma.answer.create({
        data: {
            candidateId,
            questionId,
            selectedAnswer: answer,
            isCorrect,
            timeTaken: 0 // We could track per-question time if sent from client
        }
    })

    return NextResponse.json({ success: true })
}
