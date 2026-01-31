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
        <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="title">Job Title</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => updateData({ title: e.target.value })}
                    placeholder="e.g. Senior Frontend Engineer"
                />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => updateData({ description: e.target.value })}
                    placeholder="Describe the role responsibilities and requirements..."
                    rows={6}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Role Type</Label>
                    <Select value={data.roleType} onValueChange={(val) => updateData({ roleType: val })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Role Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Frontend">Frontend Developer</SelectItem>
                            <SelectItem value="Backend">Backend Developer</SelectItem>
                            <SelectItem value="Full Stack">Full Stack Developer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select value={data.experienceLevel} onValueChange={(val) => updateData({ experienceLevel: val })}>
                        <SelectTrigger>
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

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="location">Location</Label>
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
