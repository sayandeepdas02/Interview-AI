import * as React from "react"
import { cn } from "@/lib/utils"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description: string;
    action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center p-8 md:p-12 border bg-card rounded-2xl shadow-sm mx-auto max-w-[500px]",
                className
            )}
            {...props}
        >
            {icon && (
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-500 mb-6 border border-slate-100">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                {description}
            </p>
            {action && <div>{action}</div>}
        </div>
    )
}
