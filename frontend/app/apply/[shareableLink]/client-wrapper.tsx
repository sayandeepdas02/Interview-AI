"use client"

import { useState } from "react"
import { ApplicationForm } from "@/components/candidate/application-form"
import { TestInterface } from "@/components/candidate/test-interface"

export default function ClientWrapper({ job }: { job: any }) {
    const [candidateId, setCandidateId] = useState<string | null>(null)
    const [step, setStep] = useState<"form" | "test" | "complete">("form")

    const onApplicationSubmit = (cId: string) => {
        setCandidateId(cId)
        if (job.testEnabled) {
            setStep("test")
        } else {
            setStep("complete")
        }
    }

    const onTestComplete = () => {
        setStep("complete")
    }

    if (step === "complete") {
        return (
            <div className="text-center py-12 space-y-4">
                <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold">Application Submitted!</h2>
                <p className="text-gray-500">Thank you for applying. We will review your application and get back to you shortly.</p>
            </div>
        )
    }

    if (step === "test" && candidateId) {
        return (
            <TestInterface
                jobId={job.id}
                candidateId={candidateId}
                duration={job.testDuration || 30}
                onComplete={onTestComplete}
            />
        )
    }

    return (
        <ApplicationForm
            job={job}
            onSuccess={onApplicationSubmit}
        />
    )
}
