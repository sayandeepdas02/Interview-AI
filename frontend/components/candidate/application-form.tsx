"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function ApplicationForm({ job, onSuccess }: { job: any, onSuccess: (id: string) => void }) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        try {
            // In a real app, upload file to S3/Cloudinary here and get URL
            // For now, we simulate file upload
            const formData = {
                ...data,
                jobId: job.id,
                resumeUrl: "https://example.com/resume.pdf", // Mock URL
                currentCTC: parseFloat(data.currentCTC),
                expectedCTC: parseFloat(data.expectedCTC)
            }

            const res = await fetch("/api/applications", {
                method: "POST",
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error("Submission failed")

            const result = await res.json()
            onSuccess(result.id)
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

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentCTC">Current CTC (LPA) *</Label>
                        <Input id="currentCTC" type="number" step="0.1" {...register("currentCTC", { required: true })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="expectedCTC">Expected CTC (LPA) *</Label>
                        <Input id="expectedCTC" type="number" step="0.1" {...register("expectedCTC", { required: true })} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="resume">Resume (PDF) *</Label>
                    <Input id="resume" type="file" accept=".pdf" required />
                    <p className="text-xs text-muted-foreground">Max 5MB</p>
                </div>

                {job.customFields.map((field: any, i: number) => (
                    <div key={i} className="space-y-2">
                        <Label>{field.fieldName} {field.required && "*"}</Label>
                        <Input {...register(`custom_${field.fieldName}`, { required: field.required })} />
                    </div>
                ))}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : job.testEnabled ? "Submit & Start Test" : "Submit Application"}
                </Button>
            </form>
        </div>
    )
}
