export interface IWorkflowRule {
    _id?: string;
    name: string;
    description?: string;
    trigger: string;
    conditions?: Record<string, any>[];
    actions?: Record<string, any>[];
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
