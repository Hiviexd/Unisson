import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import * as middlewares from "../../middlewares";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("promoteUser", req);

    logger.printInfo(`Promoting user ${req.params.id} to provider`);

    const user = await users.findOne({ _id: req.params.id });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    if (user.permissions.includes("provider")) {
        logger.printError("User is already a provider");
        return res.status(400).send({
            status: 400,
            message: "User is already a provider",
        });
    }

    const newPerms = [...user.permissions, "provider"];

    const updatedUser = await users.findOneAndUpdate(
        { _id: req.params.id },
        { permissions: newPerms },
        { new: true }
    );

    logger.printSuccess(`User ${user.username} (${req.params._id}) promoted!`);

    return res.status(200).send({
        status: 200,
        message: "User promoted!",
        data: updatedUser,
    });
};
