"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JobData } from "../job-wizard"

interface StepProps {
    data: JobData
    updateData: (data: Partial<JobData>) => void
}

export function Step1Details({ data, updateData }: StepProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col w-full gap-2">
                <Label htmlFor="title" className="text-slate-700 font-medium">Job Title</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => updateData({ title: e.target.value })}
                    placeholder="e.g. Senior Frontend Engineer"
                />
            </div>

            <div className="flex flex-col w-full gap-2">
                <Label htmlFor="description" className="text-slate-700 font-medium">Job Description</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => updateData({ description: e.target.value })}
                    placeholder="Describe the role responsibilities and requirements..."
                    rows={6}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <Label className="text-slate-700 font-medium">Role Type</Label>
                    <Select value={data.roleType} onValueChange={(val) => updateData({ roleType: val })}>
                        <SelectTrigger className="h-[40px] rounded-[8px]">
                            <SelectValue placeholder="Select Role Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Frontend">Frontend Developer</SelectItem>
                            <SelectItem value="Backend">Backend Developer</SelectItem>
                            <SelectItem value="Full Stack">Full Stack Developer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-slate-700 font-medium">Experience Level</Label>
                    <Select value={data.experienceLevel} onValueChange={(val) => updateData({ experienceLevel: val })}>
                        <SelectTrigger className="h-[40px] rounded-[8px]">
                            <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Junior">Junior (0-2 years)</SelectItem>
                            <SelectItem value="Mid-Level">Mid-Level (3-5 years)</SelectItem>
                            <SelectItem value="Senior">Senior (5+ years)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col w-full gap-2">
                <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                <Input
                    id="location"
                    value={data.location}
                    onChange={(e) => updateData({ location: e.target.value })}
                    placeholder="e.g. Remote, San Francisco, London"
                />
            </div>
        </div>
    )
}
