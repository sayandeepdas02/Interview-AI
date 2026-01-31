import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="h-full flex-1 flex-col space-y-8 md:flex">
                {/* Empty State */}
                <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <PlusCircle className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No jobs created</h3>
                        <p className="mb-4 mt-2 text-sm text-muted-foreground">
                            You haven't created any jobs yet. Start by creating a job description.
                        </p>
                        <Link href="/dashboard/jobs/new">
                            <Button>
                                Create Your First Job
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
