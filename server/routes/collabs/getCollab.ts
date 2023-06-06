import { Request, Response } from "express";
import { collabs } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("getCollab", req);
    const collabId = req.params.id;

    logger.printInfo("Getting collab...");

    // ? Check if the provided data is valid
    if (!collabId) {
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

    logger.printSuccess("Process complete: Collab found");

    return res.status(200).send({
        status: 200,
        message: "Collab found",
        data: collab,
    });
};
