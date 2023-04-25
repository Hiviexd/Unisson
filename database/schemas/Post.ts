import { Schema } from "mongoose";

export interface IPost {
	_id: string;
	title: string;
    description: string;
	tags: string[];
	posterId: string;
	posterUsername: string;
    buyers: string[];
    reviews: [
        {
            buyerId: string;
            buyerUsername: string;
            rating: number;
            review: string;
        }
    ];
	createdAt: Date;
	archived: Boolean;
}

export default new Schema({
	_id: String,
	title: String,
    description: String,
	tags: [String],
	posterId: String,
	posterUsername: String,
    buyers: [String],
    reviews: [
        {
            buyerId: String,
            buyerUsername: String,
            rating: Number,
            review: String,
        }
    ],
	createdAt: Date,
	archived: {
		type: Boolean,
		default: false,
	},
});
