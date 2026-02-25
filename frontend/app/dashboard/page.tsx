import { Button } from "@/components/ui/button"
import { PlusCircle, Briefcase } from "lucide-react"
import Link from "next/link"
import { PageContainer } from "@/components/ui/page-container"
import { SectionHeader } from "@/components/ui/section-header"
import { EmptyState } from "@/components/ui/empty-state"

export default function DashboardPage() {
    return (
        <PageContainer>
            <SectionHeader
                title="Dashboard Overview"
                description="Monitor your active roles and interview candidates."
            />

            <EmptyState
                icon={<Briefcase className="h-8 w-8 text-primary" />}
                title="No jobs created"
                description="You haven't created any roles yet. Start building your automated pipelines by launching a new job description."
                action={
                    <Link href="/dashboard/jobs/new">
                        <Button>
                            Create Your First Job
                        </Button>
                    </Link>
                }
            />
        </PageContainer>
    )
}
