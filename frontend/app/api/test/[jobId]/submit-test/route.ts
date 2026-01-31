import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
    const json = await req.json()
    const { candidateId } = json
    const { jobId } = await params

    // Calculate score
    const answers = await prisma.answer.findMany({
        where: { candidateId }
    })

    const questions = await prisma.question.findMany({
        where: { jobId }
    })

    let correctCount = 0
    answers.forEach(ans => {
        // This is a simplified check. Real check should compare answers properly
        // Assuming we stored isCorrect on submission (see next file)
        if (ans.isCorrect) correctCount++
    })

    const score = (correctCount / questions.length) * 100

    // Update candidate
    await prisma.candidate.update({
        where: { id: candidateId },
        data: {
            testScore: score,
            testPassed: score >= 70 // Fetch actual passing score from Job
        }
    })

    return NextResponse.json({ score, passed: score >= 70 })
}
