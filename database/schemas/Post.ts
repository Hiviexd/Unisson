import { Schema } from "mongoose";

export default new Schema({
    _id: String,
    title: String,
    description: String,
    type: {
        type: String,
        enum: ["photographeur", "salle", "traiteur", "band"],
    },
    rating: Number,
    posterId: String,
    posterUsername: String,
    buyers: [
        {
            userId: String,
            confirmed: {
                type: Boolean,
                default: false,
            }
        }
    ],
    collaborators: [
        {
            userId: String,
            confirmed: {
                type: Boolean,
                default: false,
            }
        }
    ],
    createdAt: Date,
    archived: {
        type: Boolean,
        default: false,
    },
});
