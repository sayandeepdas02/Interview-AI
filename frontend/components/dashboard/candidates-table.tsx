"use client"

import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CandidateDrawer } from "./candidate-drawer"

export function CandidatesTable() {
    const [candidates, setCandidates] = useState<any[]>([])
    const [filtered, setFiltered] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null)

    useEffect(() => {
        fetch("/api/dashboard/candidates")
            .then(res => res.json())
            .then(data => {
                setCandidates(data)
                setFiltered(data)
            })
    }, [])

    useEffect(() => {
        if (!search) {
            setFiltered(candidates)
        } else {
            setFiltered(candidates.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.email.toLowerCase().includes(search.toLowerCase()) ||
                c.job.title.toLowerCase().includes(search.toLowerCase())
            ))
        }
    }, [search, candidates])

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Search candidates..."
                    className="max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Applied Job</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Test Score</TableHead>
                            <TableHead>Applied Date</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((c) => (
                            <TableRow key={c.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{c.name}</span>
                                        <span className="text-xs text-muted-foreground">{c.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{c.job.title}</TableCell>
                                <TableCell>
                                    {c.job.testEnabled ? (
                                        c.testScore !== null ? (
                                            <Badge variant={c.testPassed ? "default" : "destructive"}>
                                                {c.testPassed ? "Passed" : "Failed"}
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline">Pending Test</Badge>
                                        )
                                    ) : (
                                        <Badge variant="secondary">Applied</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {c.testScore !== null ? `${c.testScore.toFixed(0)}%` : "-"}
                                </TableCell>
                                <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm" onClick={() => setSelectedCandidate(c)}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    No candidates found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <CandidateDrawer
                candidate={selectedCandidate}
                open={!!selectedCandidate}
                onClose={() => setSelectedCandidate(null)}
            />
        </div>
    )
}
