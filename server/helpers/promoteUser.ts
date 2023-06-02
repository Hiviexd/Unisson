import { Response } from "express";
import { users } from "../../database";
import { LoggerConsumer } from "./LoggerConsumer";

export default async (userId: string, res: Response) => {
    const logger = new LoggerConsumer("promoteUser");

    logger.printInfo(`Promoting user ${userId} to provider`);

    const user = await users.findOne({ _id: userId });

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
        { _id: userId },
        { permissions: newPerms, hidden: false },
        { new: true }
    );

    logger.printSuccess(`User ${user.username} (${userId}) promoted!`);

    return res.status(200).send({
        status: 200,
        message: "User promoted to provider!",
        data: updatedUser,
    });
};
