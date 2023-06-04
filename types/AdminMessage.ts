export interface AdminMessage {
    _id: string;
    type: "report" | "request";
    reportType?: "user" | "review";
    userId: string;
    username: string;
    culpritId?: string;
    culpritUsername?: string;
    reviewId?: string;
    reviewContent?: string;
    content: string;
    createdAt: Date;
    status: "pending" | "accepted" | "rejected";
    response?: string;
}
