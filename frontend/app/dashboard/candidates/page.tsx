import { CandidatesTable } from "@/components/dashboard/candidates-table"
import { PageContainer } from "@/components/ui/page-container"
import { SectionHeader } from "@/components/ui/section-header"

export default function CandidatesPage() {
    return (
        <PageContainer>
            <SectionHeader
                title="Candidates"
                description="Review applications, filter by status, and export candidate data."
            />
            <div className="w-full">
                <CandidatesTable />
            </div>
        </PageContainer>
    )
}
