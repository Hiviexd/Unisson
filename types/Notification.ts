export interface Notification {
    _id: string;
    target: string;
    content: string;
    createdAt: Date;
    extra?: {
        icon?: string;
        redirect?: string;
    };
}
