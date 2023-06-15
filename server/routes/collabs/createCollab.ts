import { Request, Response } from "express";
import { users, collabs } from "../../../database";
import { Collab, CollabUser } from "../../../types/Collab";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { NotificationsManager } from "../../helpers/NotificationsManager";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("createCollab", req);
    const { name, description, users, loggedInUser } = req.body;

    logger.printInfo("Creating a new collab...");

    if (
        !users ||
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

    let collabUsers: CollabUser[] = users.map((user) => ({
        userId: user._id,
        username: user.username,
        rating: user.rating,
        serviceType: user.serviceType,
        status: "pending",
    }));

    collabUsers.unshift({
        userId: loggedInUser._id,
        username: loggedInUser.username,
        rating: loggedInUser.rating,
        serviceType: loggedInUser.serviceType,
        status: "accepted",
    });

    // ? Create a new collab
    const newCollab: Collab = {
        _id: crypto.randomBytes(10).toString("hex"),
        name,
        description,
        users: collabUsers,
        hidden: true,
        createdAt: new Date(),
    };

    await collabs.create(newCollab);

    // ? Send notifications to users
    const notif = new NotificationsManager();

    users.forEach((user) => {
        notif.createNotification(
            user._id,
            user._id !== loggedInUser
                ? "Vous avez été invité à une collaboration! Consultez l'invitation en cliquant ici."
                : "Vous avez créé une collaboration! Consultez la collaboration en cliquant ici.",
            {
                icon: "groups",
                redirect: `/collab/${newCollab._id}`,
            }
        );
    });

    logger.printSuccess("Collab created");

    return res.status(200).send({
        status: 200,
        message: "Collab created",
        data: newCollab,
    });
};
