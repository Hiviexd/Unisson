import { Request, Response } from "express";
import { collabs, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("deleteCollab", req);
    const collabId = req.params.id;

    logger.printInfo("Deleting collab...");

    // ? Check if the provided data is valid
    if (!collabId) {
        logger.printError("Process failed with code 400: Invalid credentials");

        return res.status(400).send({
            status: 400,
            message: "Invalid collab ID",
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
    if (user._id !== collab.users[0].userId) {
        logger.printError("Process failed with code 403: Forbidden");

        return res.status(403).send({
            status: 403,
            message: "Forbidden",
        });
    }

    // ? Delete the collab
    await collabs.deleteOne({ _id: collabId });

    logger.printSuccess("Process complete: Collab deleted");

    return res.status(200).send({
        status: 200,
        message: "Collab deleted",
    });
};
