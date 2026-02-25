import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import { ApplicationService } from "@/services/applicationService";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!(session?.user as any)?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;
        const json = await req.json();
        const { status } = json;

        if (!status) {
            return new NextResponse("Status is required", { status: 400 });
        }

        await connectDB();

        const updatedApplication = await ApplicationService.updateStatus(
            id,
            status,
            (session?.user as any).id
        );

        return NextResponse.json(updatedApplication);
    } catch (error: any) {
        console.error("[APPLICATION_STATUS_PATCH]", error);

        if (error.message === "Invalid status transition" || error.message === "Status is required") {
            return new NextResponse(error.message, { status: 400 });
        }
        if (error.message === "Candidate application not found") {
            return new NextResponse(error.message, { status: 404 });
        }
        if (error.message === "Unauthorized to update this application") {
            return new NextResponse(error.message, { status: 403 });
        }

        return new NextResponse("Internal server error", { status: 500 });
    }
}
