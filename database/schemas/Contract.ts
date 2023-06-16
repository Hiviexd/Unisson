import { Schema } from "mongoose";

export default new Schema({
    _id: String,
    senderId: String,
    senderUsername: String,
    recipientId: String,
    recipientUsername: String,
    content: String,
    createdAt: Date,
    updatedAt: Date,
    status: String,
    response: String,
});
