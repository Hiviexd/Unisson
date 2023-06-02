import { Schema } from "mongoose";

export default new Schema({
    _id: String,
    type: String,
    userId: String,
    username: String,
    content: String,
    createdAt: Date,
    status: String,
    response: String,
});
