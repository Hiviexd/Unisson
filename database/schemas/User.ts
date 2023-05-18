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
    phone: Number,
	permissions: {
		type: Array,
		default: ["user"],
		//? Available permissions: user, provider, admin
	},
    serviceType: {
        type: String,
        enum: ["photographeur", "salle", "traiteur", "band"],
    },
    collaborators: [
        {
            userId: String,
            confirmed: {
                type: Boolean,
                default: false,
            }
        }
    ],
    hidden: {
        type: Boolean,
        default: true,
    },
    rating: Number,
	createdAt: Date,
});
