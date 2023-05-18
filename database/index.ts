import mongoose from "mongoose";
import User from "./schemas/User";
import Post from "./schemas/Post";
import PostReviews from "./schemas/PostReviews";
import { User as IUser } from "../types/User";
import { LoggerConsumer } from "../server/helpers/LoggerConsumer";
import dotenv from "dotenv";
import paginate from "mongoose-paginate-v2";
//import Follower from "./schemas/Follower";
//import { UpdateOwner } from "../server/functions/UpdateOwner";
//import Notification from "./schemas/Notification";

dotenv.config();

const logger = new LoggerConsumer("database");

logger.printInfo("Starting database connection...");
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
    .then(() => {
        logger.printSuccess("Database connected!");
    })
    .catch((err) => {
        return logger.printError(
            "An error has occurred:\n".concat(err.message)
        );
    });

interface PostDocument extends mongoose.Document<IPost> {}

Post.plugin(paginate);
//export const users = mongoose.model("User", User);
export const postReviews = mongoose.model("PostReviews", PostReviews);
//export const notifications = mongoose.model("Notification", Notification);
//export const followers = mongoose.model("Follower", Follower);
export const users = mongoose.model<
	IUser,
	mongoose.PaginateModel<IUser, PostDocument>
>("User", User);
