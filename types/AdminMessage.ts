export interface AdminMessage {
    _id: string;
    type: "report" | "request";
    userId: string;
    username: string;
    content: string;
    createdAt: Date;
    status: "pending" | "accepted" | "rejected";
    response?: string;
}
