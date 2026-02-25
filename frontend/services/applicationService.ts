import Candidate, { ICandidate } from "@/models/Candidate";
import Job from "@/models/Job";
import mongoose from "mongoose";

export class ApplicationService {
    /**
     * Create a new application for a candidate.
     */
    static async createApplication(
        jobId: string,
        data: Partial<ICandidate>,
        customFields?: Record<string, any>
    ) {
        const job = await Job.findById(jobId);
        if (!job) {
            throw new Error("Job not found");
        }

        const candidate = await Candidate.create({
            ...data,
            jobId: new mongoose.Types.ObjectId(jobId) as any,
            customFields,
            status: "APPLIED",
        });

        return candidate;
    }

    /**
     * Update the status of an existing application.
     * Ensures the recruiter requesting the change actually owns the job.
     */
    static async updateStatus(
        applicationId: string,
        newStatus: string,
        recruiterUserId: string
    ) {
        const validStatuses = ["APPLIED", "SHORTLISTED", "REJECTED", "INTERVIEWED"];

        if (!validStatuses.includes(newStatus)) {
            throw new Error("Invalid status transition");
        }

        const candidate = await Candidate.findById(applicationId).populate('jobId');

        if (!candidate) {
            throw new Error("Candidate application not found");
        }

        // Validate recruiter ownership
        // @ts-ignore - Assuming populated jobId has userId
        const jobOwnerId = candidate.jobId.userId.toString();

        if (jobOwnerId !== recruiterUserId) {
            throw new Error("Unauthorized to update this application");
        }

        candidate.status = newStatus as any;
        await candidate.save();

        return candidate;
    }
}
