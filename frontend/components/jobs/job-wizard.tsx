"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Step1Details } from "./steps/step-1-details"
import { Step2FormBuilder } from "./steps/step-2-form-builder"
import { Step3MCQ } from "./steps/step-3-mcq"
import { Step4Review } from "./steps/step-4-review"
// import { useToast } from "@/components/ui/use-toast"

export type JobData = {
    title: string
    description: string
    roleType: string
    experienceLevel: string
    location: string
    customFields: { name: string; type: string; required: boolean }[]
    testEnabled: boolean
    testDuration: number
    passingScore: number
    questions: {
        text: string
        options: string[]
        correctAnswer: string
    }[]
}

const initialData: JobData = {
    title: "",
    description: "",
    roleType: "",
    experienceLevel: "",
    location: "",
    customFields: [],
    testEnabled: false,
    testDuration: 30,
    passingScore: 70,
    questions: [],
}

export function JobWizard() {
    const [step, setStep] = useState(1)
    const [data, setData] = useState<JobData>(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const updateData = (newData: Partial<JobData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

    const submitJob = async (status: "draft" | "published") => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                body: JSON.stringify({ ...data, status }),
            })

            if (!res.ok) throw new Error("Failed to create job")

            const job = await res.json()
            router.push(`/dashboard/jobs`)
        } catch (error) {
            console.error(error)
            alert("Something went wrong.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto w-full">
            <div className="mb-8 flex justify-between items-center">
                {[1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step >= s
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground text-muted-foreground"
                            }`}
                    >
                        {s}
                    </div>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {step === 1 && "Job Details"}
                        {step === 2 && "Application Form"}
                        {step === 3 && "MCQ Test Configuration"}
                        {step === 4 && "Review & Publish"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {step === 1 && <Step1Details data={data} updateData={updateData} />}
                    {step === 2 && <Step2FormBuilder data={data} updateData={updateData} />}
                    {step === 3 && <Step3MCQ data={data} updateData={updateData} />}
                    {step === 4 && <Step4Review data={data} submitJob={submitJob} isLoading={isLoading} />}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep} disabled={step === 1 || isLoading}>
                        Back
                    </Button>
                    {step < 4 ? (
                        <Button onClick={nextStep}>Next</Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="secondary" onClick={() => submitJob("draft")} disabled={isLoading}>
                                Save Draft
                            </Button>
                            <Button onClick={() => submitJob("published")} disabled={isLoading}>
                                Publish
                            </Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
