import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { nanoid } from 'nanoid'

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    if (!user) {
        return new NextResponse("User not found", { status: 404 })
    }

    try {
        const json = await req.json()
        const { questions, customFields, testEnabled, testDuration, passingScore, status, ...jobData } = json

        const shareableLink = status === "published" ? nanoid(10) : null

        const job = await prisma.job.create({
            data: {
                ...jobData,
                testEnabled,
                testDuration,
                passingScore,
                status,
                shareableLink,
                userId: user.id,
                questions: {
                    create: questions?.map((q: any, index: number) => ({
                        questionText: q.text,
                        optionA: q.options[0],
                        optionB: q.options[1],
                        optionC: q.options[2],
                        optionD: q.options[3],
                        correctAnswer: q.correctAnswer,
                        order: index
                    }))
                },
                customFields: {
                    create: customFields?.map((f: any) => ({
                        fieldName: f.name,
                        fieldType: f.type,
                        required: f.required
                    }))
                }
            }
        })

        return NextResponse.json(job)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    if (!user) return new NextResponse("User not found", { status: 404 })

    const jobs = await prisma.job.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: {
            _count: {
                select: { candidates: true }
            }
        }
    })

    return NextResponse.json(jobs)
}
