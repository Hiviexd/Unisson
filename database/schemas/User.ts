import { Schema } from "mongoose";

export default new Schema({
	_id: String,
    email: String,
	username: String,
	safeUsername: String,
	passwordHash: String,
	accountToken: String,
    avatar: String,
	bio: String,
    phone: Number,
	permissions: {
		type: Array,
		default: ["user"],
		//? Available permissions: user, provider, admin
	},
	createdAt: Date,
});
