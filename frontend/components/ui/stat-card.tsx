import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    value: string | number;
    trend?: {
        value: string;
        isPositive?: boolean;
        label?: string;
    };
}

export function StatCard({ title, value, trend, className, ...props }: StatCardProps) {
    return (
        <div
            className={cn(
                "flex flex-col rounded-2xl border bg-card p-6 shadow-sm",
                className
            )}
            {...props}
        >
            <div className="text-sm font-medium text-muted-foreground mb-2">{title}</div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">{value}</div>

            {trend && (
                <div className="mt-2 flex items-center text-xs">
                    <span
                        className={cn(
                            "font-medium",
                            trend.isPositive === true ? "text-green-600" :
                                trend.isPositive === false ? "text-red-600" : "text-muted-foreground"
                        )}
                    >
                        {trend.value}
                    </span>
                    {trend.label && (
                        <span className="ml-1 text-muted-foreground">{trend.label}</span>
                    )}
                </div>
            )}
        </div>
    )
}
