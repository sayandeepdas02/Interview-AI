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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <DialogTitle className="text-xl">{candidate.name}</DialogTitle>
                            <DialogDescription>{candidate.email}</DialogDescription>
                        </div>
                        {candidate.job.testEnabled && candidate.testScore !== null && (
                            <Badge variant={candidate.testPassed ? "default" : "destructive"} className="text-base">
                                {candidate.testPassed ? "PASS" : "FAIL"} ({candidate.testScore.toFixed(0)}%)
                            </Badge>
                        )}
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Current CTC</h4>
                            <p className="font-semibold">{candidate.currentCTC || "N/A"} LPA</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Expected CTC</h4>
                            <p className="font-semibold">{candidate.expectedCTC || "N/A"} LPA</p>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="font-semibold mb-3">Resume</h3>
                        <Button variant="outline" className="w-full" onClick={() => window.open(candidate.resumeUrl, '_blank')}>
                            <Download className="mr-2 h-4 w-4" /> Download Resume PDF
                        </Button>

                        {/* Parsed resume mock display */}
                        {candidate.parsedResume && (
                            <div className="mt-4 p-4 border rounded-md">
                                <h4 className="text-sm font-medium mb-2">Parsed Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.parsedResume.skills?.map((skill: string) => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Separator />

                    <div>
                        <h3 className="font-semibold mb-3">Custom Fields</h3>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            {Object.entries(candidate.customFields || {}).map(([key, value]) => (
                                <div key={key} className="border-b pb-2">
                                    <dt className="text-sm font-medium text-gray-500">{key.replace('custom_', '')}</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{String(value)}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
