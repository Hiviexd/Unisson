export interface Review {
    _id: string;
    profileId: string;
    posterId: string;
    posterName: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt?: Date;
}
