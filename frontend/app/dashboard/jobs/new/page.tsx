import { JobWizard } from "@/components/jobs/job-wizard"

export default function NewJobPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Create New Job</h2>
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                <JobWizard />
            </div>
        </div>
    )
}
