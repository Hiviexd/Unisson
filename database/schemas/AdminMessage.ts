import { Schema } from "mongoose";

export default new Schema({
    _id: String,
    type: String,
    reportType: String,
    userId: String,
    username: String,
    culpritId: String,
    culpritUsername: String,
    content: String,
    reviewId: String,
    reviewContent: String,
    createdAt: Date,
    status: String,
    response: String,
});
