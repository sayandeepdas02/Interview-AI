import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import { JobService } from "@/services/jobService";

export async function GET(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!(session?.user as any)?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { jobId } = await params;

        if (!jobId) {
            return new NextResponse("Job ID is required", { status: 400 });
        }

        await connectDB();

        const analytics = await JobService.getJobAnalytics(jobId, (session?.user as any).id);

        return NextResponse.json(analytics);
    } catch (error: any) {
        console.error("[JOB_ANALYTICS_GET]", error);

        if (error.message === "Job not found") {
            return new NextResponse(error.message, { status: 404 });
        }
        if (error.message === "Unauthorized access to job analytics") {
            return new NextResponse(error.message, { status: 403 });
        }

        return new NextResponse("Internal server error", { status: 500 });
    }
}
