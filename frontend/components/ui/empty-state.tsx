import { Sparkles } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel: string;
    onAction: () => void;
    icon?: React.ReactNode;
}

export function PremiumEmptyState({
    title,
    description,
    actionLabel,
    onAction,
    icon
}: EmptyStateProps) {
    return (
        <div className="w-full rounded-[16px] border border-dashed border-edge bg-muted/20 flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-brand-orange/20 to-brand-red/10 flex items-center justify-center mb-6 shadow-sm">
                {icon ? icon : <Sparkles className="w-8 h-8 text-brand-orange" />}
            </div>
            
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                {title}
            </h3>
            
            <p className="text-[14px] text-muted-foreground max-w-[400px] mb-8 leading-relaxed">
                {description}
            </p>

            <button 
                onClick={onAction}
                className="group relative overflow-hidden bg-foreground text-background font-medium text-[13px] px-6 py-2.5 rounded-[10px] shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
                {/* Subtle gradient glow inside button */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">{actionLabel}</span>
            </button>
        </div>
    );
}
