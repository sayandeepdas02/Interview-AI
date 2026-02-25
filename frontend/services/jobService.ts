import Job from "@/models/Job";
import Candidate from "@/models/Candidate";

export class JobService {
    /**
     * Get analytics for a specific job
     */
    static async getJobAnalytics(jobId: string, recruiterUserId: string) {
        // Validate job owner
        const job = await Job.findById(jobId);
        if (!job) {
            throw new Error("Job not found");
        }

        if (job.userId.toString() !== recruiterUserId) {
            throw new Error("Unauthorized access to job analytics");
        }

        // Aggregate analytics
        const aggregationResult = await Candidate.aggregate([
            { $match: { jobId: job._id } },
            {
                $group: {
                    _id: "$jobId",
                    totalApplicants: { $sum: 1 },
                    averageScore: { $avg: "$testScore" },
                    highestScore: { $max: "$testScore" },
                    passedCount: {
                        $sum: {
                            $cond: [{ $gte: ["$testScore", job.passingScore || 60] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        const stats = aggregationResult[0] || {
            totalApplicants: 0,
            averageScore: 0,
            highestScore: 0,
            passedCount: 0
        };

        const passRatePercentage = stats.totalApplicants > 0
            ? Math.round((stats.passedCount / stats.totalApplicants) * 100)
            : 0;

        return {
            totalApplicants: stats.totalApplicants,
            averageScore: Math.round(stats.averageScore || 0),
            highestScore: Math.round(stats.highestScore || 0),
            passRatePercentage
        };
    }

    /**
     * Export candidates as CSV string
     */
    static async exportCandidatesCsv(jobId: string, recruiterUserId: string): Promise<string> {
        // Validate job owner
        const job = await Job.findById(jobId);
        if (!job) {
            throw new Error("Job not found");
        }

        if (job.userId.toString() !== recruiterUserId) {
            throw new Error("Unauthorized to export candidates");
        }

        const candidates = await Candidate.find({ jobId: job._id as any }).sort({ createdAt: -1 });

        // Build CSV Header
        const headers = ["Name", "Email", "Status", "Score", "Tab Switches", "Anti-Cheat Flag", "Date Applied"];

        let customFieldKeys = new Set<string>();
        candidates.forEach(c => {
            if (c.customFields) {
                Object.keys(c.customFields).forEach(k => customFieldKeys.add(k));
            }
        });

        const customFieldsArray = Array.from(customFieldKeys);
        headers.push(...customFieldsArray);

        let csvString = headers.join(",") + "\n";

        // Build Rows
        candidates.forEach(candidate => {
            const row = [
                `"${candidate.name.replace(/"/g, '""')}"`,
                `"${candidate.email}"`,
                candidate.status,
                candidate.testScore !== undefined ? candidate.testScore : 'N/A',
                candidate.tabSwitchCount || 0,
                candidate.flagged ? 'Yes' : 'No',
                candidate.createdAt.toISOString().split('T')[0]
            ];

            customFieldsArray.forEach(field => {
                const val = candidate.customFields ? candidate.customFields[field] : '';
                row.push(`"${String(val || '').replace(/"/g, '""')}"`);
            });

            csvString += row.join(",") + "\n";
        });

        return csvString;
    }
}
