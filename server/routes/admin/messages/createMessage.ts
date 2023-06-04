import { Request, Response } from "express";
import { users, adminMessages } from "../../../../database";
import { AdminMessage } from "../../../../types/AdminMessage";
import { LoggerConsumer } from "../../../helpers/LoggerConsumer";
import crypto from "crypto";

const logger = new LoggerConsumer("adminMessages");

export default async (req: Request, res: Response) => {
    logger.printInfo("Creating admin message...");

    const {
        type,
        reportType,
        culpritId,
        culpritUsername,
        content,
        reviewId,
        reviewContent,
    } = req.body;

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

    return res.status(200).send({
        status: 200,
        message: "Admin message created!",
        data: createdMessage,
    });
};
