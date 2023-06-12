import { Request, Response } from "express";
import { galleries, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("deleteGallery", req);

    const user = await users.findOne({
        accountToken: req.headers.authorization,
    });

    if (!user)
        return res.status(404).send({
            status: 404,
            message: "User not found!",
        });

    const gallery = await galleries.findOne({ userId: user._id });

    if (!gallery) {
        logger.printError("Gallery not found");
        return res.status(404).send({
            status: 404,
            message: "Gallery not found",
        });
    }

    logger.printSuccess(`Deleting gallery ${gallery._id}`);

    gallery.deleteOne();

    logger.printSuccess(`Gallery ${gallery._id} deleted!`);

    return res.status(200).send({
        status: 200,
        message: "Galerie supprimé!",
    });
};
