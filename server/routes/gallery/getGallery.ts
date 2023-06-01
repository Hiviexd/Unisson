import { Request, Response } from "express";
import { galleries, users } from "../../../database";
import { Gallery } from "../../../types/Gallery";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("getGallery", req);

    const user = await users.findOne({
        _id: req.params.userId,
    });

    if (!user)
        return res.status(404).send({
            status: 404,
            message: "User not found!",
        });

    logger.printInfo(`Getting gallery ${req.params.userId}`);

    const gallery = await galleries.findOne({ userId: req.params.userId });

    if (!gallery) {
        logger.printError("Gallery not found");
        return res.status(404).send({
            status: 404,
            message: "Gallery not found",
        });
    }

    logger.printSuccess(`Gallery ${req.params.userId} found!`);

    return res.status(200).send({
        status: 200,
        message: "Gallery found!",
        data: gallery,
    });
};
