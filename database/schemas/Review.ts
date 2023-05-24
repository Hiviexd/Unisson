import { Schema } from "mongoose";

export default new Schema({
    _id: String, //? user ID
    reviews: [
        {
            _id: String,
            postId: String,
            userId: String,
            rating: Number,
            comment: String,
            createdAt: Date,
        }
    ],
});
