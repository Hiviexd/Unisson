import { Request, Response } from "express";
import { users, collabs } from "../../../database";
import { Collab, CollabUser } from "../../../types/Collab";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { NotificationsManager } from "../../helpers/NotificationsManager";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("createCollab", req);
    const { name, description, emails } = req.body;

    logger.printInfo("Creating a new collab...");

    if (
        !name ||
        !description ||
        typeof name != "string" ||
        typeof description != "string"
    ) {
        logger.printError("Process failed with code 400: Invalid credentials");

        return res.status(400).send({
            status: 400,
            message: "Invalid credentials",
        });
    }

    // find users by email
    const usersByEmail = await users.find({
        email: { $in: emails },
    });

    // ? Check if the provided data is valid
    if (!usersByEmail.length) {
        logger.printError("Process failed with code 400: Invalid user emails");

        return res.status(400).send({
            status: 400,
            message: "Invalid user emails",
        });
    }

    let collabUsers: CollabUser[] = usersByEmail.map((user) => ({
        userId: user._id,
        username: user.username,
        serviceType: user.serviceType,
        status: "pending",
    }));

    collabUsers.unshift({
        userId: req.body.loggedInUser._id,
        username: req.body.loggedInUser.username,
        serviceType: req.body.loggedInUser.serviceType,
        status: "accepted",
    });

    // ? Create a new collab
    const newCollab: Collab = {
        _id: crypto.randomBytes(16).toString("hex"),
        name,
        description,
        users: collabUsers,
        hidden: true,
        createdAt: new Date(),
    };

    await collabs.create(newCollab);

    // ? Send notifications to users
    const notif = new NotificationsManager();

    usersByEmail.forEach((user) => {
        notif.createNotification(
            user._id,
            "You have been invited to a collaboration! Review the invitation by clicking here.",
            {
                icon: "collab",
                redirect: `/collabs/${newCollab._id}`,
            }
        );
    });

    logger.printSuccess("Collab created");

    return res.status(200).send({
        status: 200,
        message: "Collab created",
        newCollab,
    });
};
