"use client"

import { JobData } from "../job-wizard"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StepProps {
    data: JobData
    submitJob: (status: "draft" | "published") => void
    isLoading: boolean
}

export function Step4Review({ data }: StepProps) {
    return (
        <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-lg">{data.title || "Untitled Job"}</h3>
                <div className="flex gap-2">
                    <Badge variant="outline">{data.roleType}</Badge>
                    <Badge variant="outline">{data.experienceLevel}</Badge>
                    <Badge variant="outline">{data.location}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {data.description}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2">Application Form</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Full Name (Required)</li>
                            <li>• Email (Required)</li>
                            <li>• Resume (Required)</li>
                            <li>• CTC Details (Required)</li>
                            {data.customFields.map((f, i) => (
                                <li key={i}>• {f.name} ({f.required ? "Required" : "Optional"})</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2">Skill Assessment</h4>
                        {data.testEnabled ? (
                            <ul className="text-sm space-y-1 text-muted-foreground">
                                <li>• Test Duration: {data.testDuration} mins</li>
                                <li>• Passing Score: {data.passingScore}%</li>
                                <li className="text-primary font-medium">• {data.questions.length} Questions Configured</li>
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground">Skill assessment is disabled.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
