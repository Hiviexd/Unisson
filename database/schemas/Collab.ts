import { Schema } from "mongoose";

export default new Schema({
    _id: String,
    name: String,
    description: String,
    users: [
        {
            userId: String,
            username: String,
            serviceType: {
                type: String,
                enum: ["photographe", "salle", "traiteur", "band"],
            },
            status: String,
        },
    ],
    hidden: {
        type: Boolean,
        default: true,
    },
    createdAt: Date,
});
