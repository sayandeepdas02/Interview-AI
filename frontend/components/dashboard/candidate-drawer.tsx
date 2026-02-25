"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"

interface DrawerProps {
    candidate: any
    open: boolean
    onClose: () => void
}

export function CandidateDrawer({ candidate, open, onClose }: DrawerProps) {
    if (!candidate) return null

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:rounded-[12px] p-0 gap-0">
                <DialogHeader className="p-6 border-b bg-slate-50/50 sticky top-0 z-10 backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <DialogTitle className="text-[20px] font-semibold text-slate-800 leading-none tracking-tight">{candidate.name}</DialogTitle>
                            <DialogDescription className="text-[14px] text-muted-foreground">{candidate.email}</DialogDescription>
                        </div>
                        {candidate.job.testEnabled && candidate.testScore !== null && (
                            <Badge variant={candidate.testPassed ? "default" : "destructive"} className="text-[12px] font-semibold tracking-wide py-1 px-3">
                                {candidate.testPassed ? "PASSED TEST" : "FAILED TEST"} ({candidate.testScore.toFixed(0)}%)
                            </Badge>
                        )}
                    </div>
                </DialogHeader>

                <div className="p-6 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-card border shadow-sm rounded-[12px] flex flex-col gap-2">
                            <h4 className="text-[12px] uppercase font-bold tracking-wider text-muted-foreground">Current CTC</h4>
                            <p className="text-[18px] font-semibold text-slate-800">{candidate.currentCTC || "N/A"} LPA</p>
                        </div>
                        <div className="p-4 bg-card border shadow-sm rounded-[12px] flex flex-col gap-2">
                            <h4 className="text-[12px] uppercase font-bold tracking-wider text-muted-foreground">Expected CTC</h4>
                            <p className="text-[18px] font-semibold text-slate-800">{candidate.expectedCTC || "N/A"} LPA</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-[16px] text-slate-800">Resume & Documents</h3>
                        <Button variant="outline" className="w-full bg-slate-50 border-dashed" onClick={() => window.open(candidate.resumeUrl, '_blank')}>
                            <Download className="mr-2 h-4 w-4 text-muted-foreground" /> Download Resume PDF
                        </Button>

                        {/* Parsed resume mock display */}
                        {candidate.parsedResume && (
                            <div className="mt-4 p-5 border rounded-[12px] bg-card shadow-sm space-y-4">
                                <h4 className="text-[14px] font-semibold text-slate-800">Parsed Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.parsedResume.skills?.map((skill: string) => (
                                        <Badge key={skill} variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {Object.keys(candidate.customFields || {}).length > 0 && (
                        <div className="space-y-4 pt-2 border-t">
                            <h3 className="font-semibold text-[16px] text-slate-800">Custom Fields</h3>
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                {Object.entries(candidate.customFields || {}).map(([key, value]) => (
                                    <div key={key} className="flex flex-col gap-1 pb-3 border-b border-border/50">
                                        <dt className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
                                            {key.replace('custom_', '')}
                                        </dt>
                                        <dd className="text-[14px] font-medium text-slate-800 break-words">{String(value)}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
