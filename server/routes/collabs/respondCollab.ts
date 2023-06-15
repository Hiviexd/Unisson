import { Request, Response } from "express";
import { users, collabs } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { NotificationsManager } from "../../helpers/NotificationsManager";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("respondCollab", req);
    const collabId = req.params.id;
    const { status } = req.body;

    logger.printInfo("Responding to a collab...");

    console.log(collabId);
    console.log(status);

    // ? Check if the provided data is valid
    if (!collabId || !status || typeof status != "string") {
        logger.printError("Process failed with code 400: Invalid credentials");

        return res.status(400).send({
            status: 400,
            message: "Invalid credentials",
        });
    }

    // ? Check if the collab exists
    const collab = await collabs.findOne({ _id: collabId });

    if (!collab) {
        logger.printError("Process failed with code 404: Collab not found");

        return res.status(404).send({
            status: 404,
            message: "Collab not found",
        });
    }

    // ? Check if the user is in the collab
    const user = await users.findOne({
        accountToken: req.headers.authorization,
        _id: { $in: collab.users.map((user) => user.userId) },
    });

    if (!user) {
        logger.printError("Process failed with code 404: User not found");

        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    // ? Check if the user is the owner of the collab
    if (user._id === collab.users[0].userId) {
        logger.printError("Process failed with code 403: Forbidden");

        return res.status(403).send({
            status: 403,
            message: "Forbidden",
        });
    }

    // ? find the index of the user in the collab
    const userIndex = collab.users.findIndex((collabUser) => collabUser.userId === user._id);

    // ? Check if the collab is already accepted
    if (collab.users[userIndex].status !== "pending") {
        logger.printError("Process failed with code 400: Collab already responded");

        return res.status(400).send({
            status: 400,
            message: "Collab already responded",
        });
    }

    // ? Check if the status is valid
    if (status !== "accepted" && status !== "rejected") {
        logger.printError("Process failed with code 400: Invalid status");

        return res.status(400).send({
            status: 400,
            message: "Invalid status",
        });
    }

    // ? Update the user status
    collab.users[userIndex].status = status;

    await collab.save();

    // ? Send notifications to collab creator
    const notif = new NotificationsManager();

    notif.createNotification(
        collab.users[0].userId,
        `Votre requête à ${collab.users[userIndex].username} pour accepter votre collaboration ${
            collab.name
        } a été ${status === "accepted" ? "acceptée" : "refusée"}`,
        {
            icon: "groups",
            redirect: `/collab/${collab._id}`,
        }
    );

    logger.printSuccess("Responded to collab successfully");

    // ? make collab public if all users have accepted
    if (collab.users.every((user) => user.status === "accepted")) {
        collab.hidden = false;

        await collab.save();

        collab.users.forEach((user) => {
            notif.createNotification(user.userId, `Collaboration ${collab.name} is now public!`, {
                icon: "groups",
                redirect: `/collab/${collab._id}`,
            });
        });
    }

    return res.status(200).send({
        status: 200,
        message: "Responded to collab successfully",
        data: collab,
    });
};
