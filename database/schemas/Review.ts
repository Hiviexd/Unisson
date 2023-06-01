import { Schema } from "mongoose";

export default new Schema({
    _id: String,
    profileId: String,
    posterId: String,
    posterName: String,
    rating: Number,
    comment: String,
    createdAt: Date,
    updatedAt: Date,
});
