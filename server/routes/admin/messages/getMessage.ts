import { Request, Response } from "express";
import { adminMessages } from "../../../../database";
import { LoggerConsumer } from "../../../helpers/LoggerConsumer";

const logger = new LoggerConsumer("adminMessages");

export default async (req: Request, res: Response) => {
    logger.printInfo("Getting admin message...");

    const message = await adminMessages.findOne({ _id: req.params.id });

    if (!message) {
        logger.printError("Message not found");
        return res.status(404).send({
            status: 404,
            message: "Message not found",
        });
    }

    logger.printSuccess("Admin message found!");

    return res.status(200).send({
        status: 200,
        message: "Admin message found!",
        data: message,
    });
};
