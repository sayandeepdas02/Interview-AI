import * as React from "react";
import { cn } from "@/lib/utils";

export function Panel({
    children,
    className,
    id,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <section
            id={id}
            className={cn("w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24", className)}
            {...props}
        >
            {children}
        </section>
    );
}

export function PanelHeader({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("mb-8", className)} {...props}>
            {children}
        </div>
    );
}

export function PanelTitle({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            className={cn(
                "text-3xl md:text-4xl font-semibold tracking-tight text-foreground",
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
}

export function PanelContent({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn(className)} {...props}>
            {children}
        </div>
    );
}
