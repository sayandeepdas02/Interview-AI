import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { ApplicationService } from "@/services/applicationService"

export async function POST(req: Request) {
    try {
        const json = await req.json()
        const { jobId, customFields, ...data } = json

        await connectDB();

        const candidate = await ApplicationService.createApplication(jobId, data, customFields);

        return NextResponse.json(candidate)
    } catch (error: any) {
        console.error(error)
        if (error.message === "Job not found") {
            return new NextResponse("Job not found", { status: 404 })
        }
        return new NextResponse("Internal Error", { status: 500 })
    }
}

