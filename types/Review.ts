export interface Review {
    _id: string;
    userId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
}

export interface PostReviews {
    _id: string;
    reviews: Review[];
}