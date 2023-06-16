import mongoose from "mongoose";

import User from "./schemas/User";
import Review from "./schemas/Review";
import Gallery from "./schemas/Gallery";
import Notification from "./schemas/Notification";
import AdminMessage from "./schemas/AdminMessage";
import Collab from "./schemas/Collab";
import Contract from "./schemas/Contract";

import { User as IUser } from "../types/User";
import { Review as IReview } from "../types/Review";
import { AdminMessage as IAdminMessage } from "../types/AdminMessage";
import { Collab as ICollab } from "../types/Collab";
import { Gallery as IGallery } from "../types/Gallery";
import { Contract as IContract } from "../types/Contract";

import { LoggerConsumer } from "../server/helpers/LoggerConsumer";
import dotenv from "dotenv";
import paginate from "mongoose-paginate-v2";

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
        return logger.printError("An error has occurred:\n".concat(err.message));
    });

interface UserDocument extends mongoose.Document<IUser> {}

User.plugin(paginate);
Review.plugin(paginate);
AdminMessage.plugin(paginate);
Collab.plugin(paginate);
Contract.plugin(paginate);

export const users = mongoose.model<IUser, mongoose.PaginateModel<IUser, UserDocument>>(
    "User",
    User
);

export const reviews = mongoose.model<IReview, mongoose.PaginateModel<IReview, UserDocument>>(
    "Review",
    Review
);

export const adminMessages = mongoose.model<
    IAdminMessage,
    mongoose.PaginateModel<IAdminMessage, UserDocument>
>("AdminMessage", AdminMessage);

export const collabs = mongoose.model<ICollab, mongoose.PaginateModel<ICollab, UserDocument>>(
    "Collab",
    Collab
);

export const contracts = mongoose.model<IContract, mongoose.PaginateModel<IContract, UserDocument>>(
    "Contract",
    Contract
);

export const galleries = mongoose.model<IGallery>("Gallery", Gallery);

export const notifications = mongoose.model("Notification", Notification);
