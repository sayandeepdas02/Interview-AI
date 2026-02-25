import * as React from "react"
import { cn } from "@/lib/utils"

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> { }

export function PageContainer({ className, children, ...props }: PageContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-[1200px] px-4 md:px-6 pt-6 pb-6 md:pt-8 md:pb-12 space-y-6 md:space-y-8",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
