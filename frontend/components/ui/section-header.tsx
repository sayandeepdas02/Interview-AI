import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}

export function SectionHeader({ title, description, actions, className, ...props }: SectionHeaderProps) {
    return (
        <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6", className)} {...props}>
            <div className="space-y-1">
                <h1 className="text-2xl tracking-tight font-semibold text-foreground">{title}</h1>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex items-center gap-2">
                    {actions}
                </div>
            )}
        </div>
    )
}
