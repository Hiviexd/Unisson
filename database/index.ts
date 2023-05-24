import mongoose from "mongoose";
import User from "./schemas/User";
import Review from "./schemas/Review";
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

interface UserDocument extends mongoose.Document<IUser> {}

User.plugin(paginate);
//export const users = mongoose.model("User", User);
export const reviews = mongoose.model("reviews", Review);
//export const notifications = mongoose.model("Notification", Notification);
//export const followers = mongoose.model("Follower", Follower);
export const users = mongoose.model<
	IUser,
	mongoose.PaginateModel<IUser, UserDocument>
>("User", User);
