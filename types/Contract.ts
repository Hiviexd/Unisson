export interface Contract {
    _id: string;
    senderId: string;
    senderUsername: string;
    recipientId: string;
    recipientUsername: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    status: "pending" | "accepted" | "rejected";
    response?: string;
}
