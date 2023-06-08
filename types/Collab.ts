export interface Collab {
    _id: string;
    name: string;
    description?: string;
    users: CollabUser[];
    hidden: boolean;
    createdAt: Date;
}

export interface CollabUser {
    userId: string;
    username: string;
    rating?: number;
    serviceType?: "photographe" | "salle" | "traiteur" | "band";
    status: "pending" | "accepted" | "rejected";
}
