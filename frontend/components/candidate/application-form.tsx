"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

const API_BASE_URL = "http://localhost:5001/api"

export function ApplicationForm({ job, onSuccess }: { job: any, onSuccess: (id: string) => void }) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [resumeFile, setResumeFile] = useState<File | null>(null)

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        try {
            let parsedResume = null;
            if (resumeFile) {
                // Call parse-resume API
                const fd = new FormData();
                fd.append("file", resumeFile);
                const parseRes = await fetch("/api/parse-resume", {
                    method: "POST",
                    body: fd
                });
                if (parseRes.ok) {
                    const parsedData = await parseRes.json();
                    parsedResume = parsedData.details;
                }
            }

            const candidateData = {
                name: data.name,
                email: data.email,
                resumeUrl: resumeFile ? URL.createObjectURL(resumeFile) : "https://example.com/resume.pdf", 
                customFields: {} as Record<string, any>
            }

            // Extract custom fields mapping
            Object.keys(data).forEach(key => {
                if (key.startsWith("custom_")) {
                    candidateData.customFields[key.replace("custom_", "")] = data[key];
                }
            })

            const payload = {
                jobId: job.id,
                candidateData
            }

            const res = await fetch(`${API_BASE_URL}/applications`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error("Submission failed")

            const result = await res.json()
            if (result.success && result.data && result.data._id) {
                onSuccess(result.data._id)
            } else {
                throw new Error("Invalid response format")
            }
        } catch (error) {
            console.error(error)
            alert("Failed to submit application")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold">Application Form</h3>
                <p className="text-sm text-muted-foreground">Please fill out your details below.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" {...register("name", { required: true })} />
                        {errors.name && <span className="text-xs text-red-500">Required</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" {...register("email", { required: true })} />
                        {errors.email && <span className="text-xs text-red-500">Required</span>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="resume">Resume (PDF) *</Label>
                    <Input id="resume" type="file" accept=".pdf" required onChange={(e) => setResumeFile(e.target.files?.[0] || null)} />
                    <p className="text-xs text-muted-foreground">Max 5MB (Simulated Upload)</p>
                </div>

                {job.customFields.map((field: any, i: number) => (
                    <div key={i} className="space-y-2">
                        <Label>{field.fieldName} {field.required && "*"}</Label>
                        <Input {...register(`custom_${field.fieldName}`, { required: field.required })} />
                    </div>
                ))}

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : job.testEnabled ? "Submit & Start Test" : "Submit Application"}
                </Button>
            </form>
        </div>
    )
}
