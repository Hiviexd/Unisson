import { Request, Response } from "express";
import { users, adminMessages } from "../../../../database";
import { AdminMessage } from "../../../../types/AdminMessage";
import { LoggerConsumer } from "../../../helpers/LoggerConsumer";
import { NotificationsManager } from "../../../helpers/NotificationsManager";
import crypto from "crypto";

const logger = new LoggerConsumer("adminMessages");
const notif = new NotificationsManager();

export default async (req: Request, res: Response) => {
    logger.printInfo("Creating admin message...");

    const { type, reportType, culpritId, culpritUsername, content, reviewId, reviewContent } =
        req.body;

    if (!type || !content) {
        logger.printError("Missing parameters");
        return res.status(400).send({
            status: 400,
            message: "Missing parameters",
        });
    }

    if (type === "report" && (!culpritId || !culpritUsername || !reportType)) {
        logger.printError("Missing culprit");
        return res.status(400).send({
            status: 400,
            message: "Missing culprit/report type",
        });
    }

    if (reportType === "review" && !reviewId) {
        logger.printError("Missing review id");
        return res.status(400).send({
            status: 400,
            message: "Missing review id",
        });
    }

    const user = await users.findOne({
        accountToken: req.headers.authorization,
    });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    if (!user.permissions.length)
        return res.status(403).send({
            status: 403,
            message: "No permissions.",
        });

    if (type === "provider" && user.permissions.includes("provider"))
        return res.status(403).send({
            status: 403,
            message: "You're already a provider!",
        });

    const message: AdminMessage = {
        _id: crypto.randomBytes(16).toString("hex"),
        type,
        reportType,
        userId: user._id,
        username: user.username,
        culpritId,
        culpritUsername,
        content,
        reviewId,
        reviewContent,
        createdAt: new Date(),
        status: "pending",
        response: "",
    };

    const createdMessage = await adminMessages.create(message);

    logger.printSuccess("Admin message created!");

    // send notification to admins
    const admins = await users.find({ permissions: "admin" });
    if (admins)
        admins.forEach((admin) => {
            notif.createNotification(
                admin._id,
                type === "report"
                    ? `${user.username} a envoyé un signalement!`
                    : `${user.username} a envoyé une requête!`,
                {
                    icon: type === "report" ? "warning" : "announcement",
                    redirect: type === "report" ? "/admin/reports" : "/admin/requests",
                }
            );
        });

    logger.printSuccess("Notification sent to admins!");

    return res.status(200).send({
        status: 200,
        message: "Admin message created!",
        data: createdMessage,
    });
};
