export interface UserCompact {
    _id: string;
    username: string;
    email: string;
    passwordHash: string;
    accountToken: string;
    createdAt: Date;
}

export interface User extends UserCompact {
    bio?: string;
    description?: string;
    phone?: string;
    location?: string;
    permissions: UserPermissions[];
    serviceType?: ServiceType;
    rating?: number;
    collaborators?: PostUser[];
    hidden: boolean;
}

export type UserPermissions = "admin" | "provider" | "user";

export type ServiceType = "photographe" | "salle" | "traiteur" | "band";

export interface PostUser {
    userId: string;
    confirmed: boolean;
}
