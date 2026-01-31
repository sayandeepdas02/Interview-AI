"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { JobData } from "../job-wizard"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Sparkles, Trash2, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface StepProps {
    data: JobData
    updateData: (data: Partial<JobData>) => void
}

const QUESTION_TEMPLATES: Record<string, any[]> = {
    "Frontend": [
        { text: "What is the virtual DOM in React?", options: ["A direct copy of the HTML DOM", "A lightweight copy of the DOM", "A new browser engine", "A state management library"], correctAnswer: "A lightweight copy of the DOM" },
        { text: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useContext", "useReducer"], correctAnswer: "useEffect" },
        { text: "What does CSS 'flex: 1' represent?", options: ["flex-grow: 1", "flex-shrink: 1", "flex-basis: 0", "All of the above"], correctAnswer: "All of the above" },
    ],
    "Backend": [
        { text: "What is Node.js?", options: ["A framework", "A library", "A JavaScript runtime environment", "A programming language"], correctAnswer: "A JavaScript runtime environment" },
        { text: "Which status code indicates 'Not Found'?", options: ["200", "404", "500", "403"], correctAnswer: "404" },
    ],
    "Full Stack": [
        { text: "What is REST?", options: ["Representational State Transfer", "React State Transfer", "Recursive State Transfer", "None of the above"], correctAnswer: "Representational State Transfer" },
    ]
}

export function Step3MCQ({ data, updateData }: StepProps) {

    const generateQuestions = () => {
        const role = data.roleType || "Frontend" // Default fallback
        // Use templates, or mix them if full stack
        let newQuestions = [...QUESTION_TEMPLATES[role] || QUESTION_TEMPLATES["Frontend"]]

        // Add more dummy questions to reach 5 usually, but here we just sample
        updateData({ questions: [...data.questions, ...newQuestions] })
    }

    const addQuestion = () => {
        updateData({
            questions: [...data.questions, { text: "", options: ["", "", "", ""], correctAnswer: "0" }] // 0 index for A
        })
    }

    const removeQuestion = (index: number) => {
        const q = [...data.questions]
        q.splice(index, 1)
        updateData({ questions: q })
    }

    const updateQuestion = (index: number, field: string, value: any) => {
        const q = [...data.questions]
        // @ts-ignore
        q[index][field] = value
        updateData({ questions: q })
    }

    const updateOption = (qIndex: number, optIndex: number, value: string) => {
        const q = [...data.questions]
        q[qIndex].options[optIndex] = value
        updateData({ questions: q })
    }

    if (!data.testEnabled) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 border border-dashed rounded-md">
                <div className="p-4 bg-muted rounded-full">
                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-center">
                    <h3 className="font-semibold text-lg">Enable Skill Assessment</h3>
                    <p className="text-muted-foreground max-w-sm mb-4">
                        Add an automated Multiple Choice Question test to screen candidates effectively.
                    </p>
                    <Button onClick={() => updateData({ testEnabled: true })}>
                        Enable Test
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-2">
                    <Switch checked={data.testEnabled} onCheckedChange={(c) => updateData({ testEnabled: c })} />
                    <Label>Enable Test</Label>
                </div>
                {data.testEnabled && (
                    <Button variant="secondary" size="sm" onClick={generateQuestions}>
                        <Sparkles className="h-4 w-4 mr-2" /> Auto-Generate Questions
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Test Duration (Minutes)</Label>
                    <Input
                        type="number"
                        value={data.testDuration}
                        onChange={(e) => updateData({ testDuration: parseInt(e.target.value) })}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Passing Score (%)</Label>
                    <Input
                        type="number"
                        value={data.passingScore}
                        onChange={(e) => updateData({ passingScore: parseInt(e.target.value) })}
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Questions ({data.questions.length})</h3>
                    <Button size="sm" variant="outline" onClick={addQuestion}>
                        <Plus className="h-4 w-4 mr-2" /> Add Manually
                    </Button>
                </div>

                <div className="space-y-6">
                    {data.questions.map((q, i) => (
                        <Card key={i}>
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex justify-between items-start gap-2">
                                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">Q{i + 1}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeQuestion(i)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                                <Textarea
                                    placeholder="Enter question text..."
                                    value={q.text}
                                    onChange={(e) => updateQuestion(i, "text", e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    {q.options.map((opt, optIndex) => (
                                        <div key={optIndex} className="flex items-center space-x-2">
                                            <div className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs ${q.correctAnswer === ["A", "B", "C", "D"][optIndex] || q.correctAnswer === q.options[optIndex] ? "bg-primary text-primary-foreground font-bold" : "bg-muted"}`}>
                                                {["A", "B", "C", "D"][optIndex]}
                                            </div>
                                            <Input
                                                placeholder={`Option ${optIndex + 1}`}
                                                value={opt}
                                                onChange={(e) => updateOption(i, optIndex, e.target.value)}
                                                className="h-8"
                                            />
                                            <input
                                                type="radio"
                                                name={`correct-${i}`}
                                                checked={q.correctAnswer === opt}
                                                onChange={() => updateQuestion(i, "correctAnswer", opt)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
