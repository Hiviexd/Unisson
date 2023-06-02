import { Request, Response } from "express";
import { users, adminMessages } from "../../../../database";
import { AdminMessage } from "../../../../types/AdminMessage";
import { LoggerConsumer } from "../../../helpers/LoggerConsumer";
import crypto from "crypto";

const logger = new LoggerConsumer("adminMessages");

export default async (req: Request, res: Response) => {
    logger.printInfo("Creating admin message...");

    const { type, userId, username, content } = req.body;

    if (!type || !userId || !username || !content) {
        logger.printError("Missing parameters");
        return res.status(400).send({
            status: 400,
            message: "Missing parameters",
        });
    }

    const user = await users.findOne({ _id: req.params.id });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    const message: AdminMessage = {
        _id: crypto.randomBytes(16).toString("hex"),
        type,
        userId,
        username,
        content,
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
