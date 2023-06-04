import { Request, Response } from "express";
import { adminMessages, reviews } from "../../../../database";
import { LoggerConsumer } from "../../../helpers/LoggerConsumer";
import promoteUser from "../../../helpers/promoteUser";

const logger = new LoggerConsumer("adminMessages");

export default async (req: Request, res: Response) => {
    logger.printInfo("Responding to admin message...");

    const { status, response } = req.body;

    if (!status || !response) {
        logger.printError("Missing parameters");
        return res.status(400).send({
            status: 400,
            message: "Missing parameters",
        });
    }

    const message = await adminMessages.findOne({ _id: req.params.id });

    if (!message) {
        logger.printError("Message not found");
        return res.status(404).send({
            status: 404,
            message: "Message not found",
        });
    }

    /*if (message.status !== "pending") {
        logger.printError("Message already responded");
        return res.status(400).send({
            status: 400,
            message: "Message already responded",
        });
    }*/

    message.status = status;
    message.response = response;
    await message.save();

    if (message.type === "request" && status === "accepted") {
        await promoteUser(message.userId);
    }

    // delete review if message is accepted
    if (message.reportType === "review" && status === "accepted") {
        const review = await reviews.findOne({ _id: message.reviewId });

        if (!review) {
            logger.printError("Review not found");
            return res.status(404).send({
                status: 404,
                message: "Review not found",
            });
        }

        await review.deleteOne();

        logger.printSuccess("Review deleted!");
    }

    logger.printSuccess("Admin message responded!");

    return res.status(200).send({
        status: 200,
        message: "Admin message responded!",
        data: message,
    });
};
