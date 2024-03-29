import { Schema } from "mongoose";

export default new Schema({
    _id: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    accountToken: String,
    bio: String,
    description: String,
    phone: Number,
    location: String,
    permissions: {
        type: Array,
        default: ["user"],
        //? Available permissions: user, provider, admin
    },
    serviceType: {
        type: String,
        enum: ["photographe", "salle", "traiteur", "band"],
    },
    hidden: {
        type: Boolean,
        default: true,
    },
    socials: {
        facebook: String,
        instagram: String,
        twitter: String,
        youtube: String,
    },
    rating: Number,
    availability: [Date],
    createdAt: Date,
});
