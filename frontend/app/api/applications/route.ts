import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const json = await req.json()
        const { jobId, customFields, ...data } = json

        // Add validation here in real app

        const candidate = await prisma.candidate.create({
            data: {
                ...data,
                jobId,
                customFields
            }
        })

        return NextResponse.json(candidate)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
