import { Schema } from "mongoose";

export default new Schema({
    _id: String,
    userId: String,
    images: [
        {
            _id: String,
            src: String,
        },
    ],
    videos: [
        {
            _id: String,
            type: String,
            poster: String,
            sources: [
                {
                    src: String,
                    type: String,
                },
            ],
        },
    ],
    createdAt: Date,
});
