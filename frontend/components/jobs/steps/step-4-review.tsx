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
        <div className="space-y-8">
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-[12px] space-y-4">
                <h3 className="font-semibold text-[20px] text-slate-800">{data.title || "Untitled Job"}</h3>
                <div className="flex gap-2">
                    <Badge variant="outline" className="bg-white">{data.roleType}</Badge>
                    <Badge variant="outline" className="bg-white">{data.experienceLevel}</Badge>
                    <Badge variant="outline" className="bg-white">{data.location}</Badge>
                </div>
                <p className="text-[14px] leading-relaxed text-muted-foreground mt-4 line-clamp-3">
                    {data.description || "No description provided."}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-[12px] p-6 shadow-sm flex flex-col gap-4">
                    <h4 className="font-semibold text-[16px] text-slate-800">Application Form</h4>
                    <ul className="text-[14px] space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Full Name (Required)</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Email (Required)</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Resume (Required)</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> CTC Details (Required)</li>
                        {data.customFields.map((f, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                {f.name} ({f.required ? "Required" : "Optional"})
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-card border rounded-[12px] p-6 shadow-sm flex flex-col gap-4">
                    <h4 className="font-semibold text-[16px] text-slate-800">Skill Assessment</h4>
                    {data.testEnabled ? (
                        <ul className="text-[14px] space-y-2 text-muted-foreground">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Test Duration: {data.testDuration} mins</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Passing Score: {data.passingScore}%</li>
                            <li className="flex items-center gap-2 text-primary font-medium mt-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {data.questions.length} Questions Configured
                            </li>
                        </ul>
                    ) : (
                        <div className="flex-1 flex items-center justify-center border border-dashed rounded-[8px] bg-slate-50/50">
                            <p className="text-[14px] text-muted-foreground">Skill assessment is disabled.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
