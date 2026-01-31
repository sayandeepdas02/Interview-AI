"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { JobData } from "../job-wizard"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface StepProps {
    data: JobData
    updateData: (data: Partial<JobData>) => void
}

export function Step2FormBuilder({ data, updateData }: StepProps) {

    const addCustomField = () => {
        updateData({
            customFields: [...data.customFields, { name: "", type: "text", required: false }]
        })
    }

    const removeCustomField = (index: number) => {
        const newFields = [...data.customFields]
        newFields.splice(index, 1)
        updateData({ customFields: newFields })
    }

    const updateField = (index: number, field: Partial<{ name: string; type: string; required: boolean }>) => {
        const newFields = [...data.customFields]
        newFields[index] = { ...newFields[index], ...field }
        updateData({ customFields: newFields })
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4 border p-4 rounded-md bg-slate-50 dark:bg-slate-900">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Standard Fields</h3>

                <div className="grid gap-2">
                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                        <Label>Full Name</Label>
                        <span className="text-xs text-muted-foreground">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                        <Label>Email Address</Label>
                        <span className="text-xs text-muted-foreground">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                        <Label>Resume Upload (PDF)</Label>
                        <span className="text-xs text-muted-foreground">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                        <Label>Current CTC</Label>
                        <span className="text-xs text-muted-foreground">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                        <Label>Expected CTC</Label>
                        <span className="text-xs text-muted-foreground">Required</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Custom Fields</h3>
                    <Button size="sm" variant="outline" onClick={addCustomField}>
                        <Plus className="h-4 w-4 mr-2" /> Add Field
                    </Button>
                </div>

                {data.customFields.length === 0 && (
                    <div className="text-sm text-center py-8 text-muted-foreground border border-dashed rounded-md">
                        No custom fields added.
                    </div>
                )}

                <div className="space-y-3">
                    {data.customFields.map((field, index) => (
                        <div key={index} className="flex gap-2 items-start border p-3 rounded-md">
                            <div className="flex-1 space-y-2">
                                <Input
                                    placeholder="Field Name (e.g. Portfolio URL)"
                                    value={field.name}
                                    onChange={(e) => updateField(index, { name: e.target.value })}
                                />
                                <div className="flex gap-2">
                                    <select
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={field.type}
                                        onChange={(e) => updateField(index, { type: e.target.value })}
                                    >
                                        <option value="text">Text Input</option>
                                        <option value="number">Number</option>
                                        <option value="textarea">Long Text</option>
                                    </select>
                                    <div className="flex items-center space-x-2 border rounded-md px-3 bg-background">
                                        <Switch
                                            id={`req-${index}`}
                                            checked={field.required}
                                            onCheckedChange={(c) => updateField(index, { required: c })}
                                        />
                                        <Label htmlFor={`req-${index}`} className="text-xs">Required</Label>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeCustomField(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
