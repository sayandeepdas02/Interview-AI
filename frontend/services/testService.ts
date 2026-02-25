import Job from "@/models/Job";
import Candidate from "@/models/Candidate";

export class TestService {
    /**
     * Submits a test attempt, calculates score, and tracks anti-cheat measures.
     */
    static async submitTest(
        candidateId: string,
        jobId: string,
        tabSwitchCount: number = 0
    ) {
        const candidate = await Candidate.findById(candidateId).populate('jobId');
        const job = await Job.findById(jobId);

        if (!candidate || !job) {
            throw new Error("Candidate or Job not found");
        }

        let correctCount = 0;
        candidate.answers.forEach((ans: any) => {
            if (ans.isCorrect) correctCount++;
        });

        const totalQuestions = job.questions.length || 1;
        const score = (correctCount / totalQuestions) * 100;
        const passingScore = job.passingScore || 60;

        // Update candidate with score and anti-cheat data
        candidate.testScore = score;
        candidate.testPassed = score >= passingScore;
        candidate.tabSwitchCount = tabSwitchCount;
        candidate.flagged = tabSwitchCount > 3;

        await candidate.save();

        return {
            score,
            passed: candidate.testPassed,
            flagged: candidate.flagged,
            tabSwitchCount: candidate.tabSwitchCount
        };
    }
}
