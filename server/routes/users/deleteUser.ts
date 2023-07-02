import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("deleteUser", req);

    const user = await users.findOne({ accountToken: req.headers.authorization });

    if (!user)
        return res.status(404).send({
            status: 404,
            message: "User not found!",
        });

    logger.printInfo("Deleting user...");

    await users.deleteOne({ accountToken: req.headers.authorization });

    // TODO: delete avatar, gallery, reviews

    logger.printSuccess("User deleted!");

    return res.status(200).send({
        status: 200,
        message: "User deleted!",
    });
};
