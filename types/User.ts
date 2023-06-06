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
    permissions: string[];
    serviceType?: ServiceType;
    availability?: Date[];
    rating?: number;
    hidden: boolean;
    socials?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        youtube?: string;
    };
}

export type UserPermissions = "admin" | "provider" | "user";

export type ServiceType = "photographe" | "salle" | "traiteur" | "band";
