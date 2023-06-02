import { Schema } from "mongoose";

export default new Schema({
    _id: String,
    target: String,
    content: String,
    createdAt: Date,
    extra: {
        type: Object,
        default: {},
    },
});
