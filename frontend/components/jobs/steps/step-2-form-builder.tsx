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
        <div className="space-y-8">
            <div className="space-y-4 border p-6 rounded-[12px] bg-slate-50 dark:bg-slate-900 shadow-sm">
                <h3 className="font-semibold text-[14px] uppercase tracking-wider text-muted-foreground">Standard Fields</h3>

                <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 bg-card rounded-[8px] border shadow-sm">
                        <Label className="font-medium text-slate-700">Full Name</Label>
                        <span className="text-[12px] text-muted-foreground uppercase font-medium tracking-wider bg-slate-100 px-2 py-1 rounded">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-[8px] border shadow-sm">
                        <Label className="font-medium text-slate-700">Email Address</Label>
                        <span className="text-[12px] text-muted-foreground uppercase font-medium tracking-wider bg-slate-100 px-2 py-1 rounded">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-[8px] border shadow-sm">
                        <Label className="font-medium text-slate-700">Resume Upload (PDF)</Label>
                        <span className="text-[12px] text-muted-foreground uppercase font-medium tracking-wider bg-slate-100 px-2 py-1 rounded">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-[8px] border shadow-sm">
                        <Label className="font-medium text-slate-700">Current CTC</Label>
                        <span className="text-[12px] text-muted-foreground uppercase font-medium tracking-wider bg-slate-100 px-2 py-1 rounded">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-[8px] border shadow-sm">
                        <Label className="font-medium text-slate-700">Expected CTC</Label>
                        <span className="text-[12px] text-muted-foreground uppercase font-medium tracking-wider bg-slate-100 px-2 py-1 rounded">Required</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-semibold text-[14px] uppercase tracking-wider text-muted-foreground">Custom Fields</h3>
                    <Button size="sm" variant="outline" onClick={addCustomField}>
                        <Plus className="h-4 w-4 mr-2" /> Add Field
                    </Button>
                </div>

                {data.customFields.length === 0 && (
                    <div className="text-[14px] text-center py-12 text-muted-foreground border border-dashed rounded-[12px] bg-slate-50/50">
                        No custom fields added. Click 'Add Field' to create one.
                    </div>
                )}

                <div className="space-y-4">
                    {data.customFields.map((field, index) => (
                        <div key={index} className="flex gap-4 items-start border p-4 rounded-[12px] bg-card shadow-sm">
                            <div className="flex-1 space-y-4">
                                <Input
                                    placeholder="Field Name (e.g. Portfolio URL)"
                                    value={field.name}
                                    onChange={(e) => updateField(index, { name: e.target.value })}
                                />
                                <div className="flex gap-4 items-center">
                                    <select
                                        className="flex h-[40px] w-full max-w-[200px] rounded-[8px] border border-input bg-background px-3 py-1 text-[14px] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:border-ring"
                                        value={field.type}
                                        onChange={(e) => updateField(index, { type: e.target.value })}
                                    >
                                        <option value="text">Text Input</option>
                                        <option value="number">Number</option>
                                        <option value="textarea">Long Text</option>
                                    </select>
                                    <div className="flex items-center space-x-2 border rounded-[8px] px-3 h-[40px] bg-background">
                                        <Switch
                                            id={`req-${index}`}
                                            checked={field.required}
                                            onCheckedChange={(c) => updateField(index, { required: c })}
                                        />
                                        <Label htmlFor={`req-${index}`} className="text-[14px]">Required</Label>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => removeCustomField(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
