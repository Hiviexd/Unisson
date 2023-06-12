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
            type: {
                type: String,
                required: true,
            },
            poster: String,
            sources: [
                {
                    src: String,
                    type: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    ],
    createdAt: Date,
});
