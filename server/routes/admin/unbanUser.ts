import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("unbanUser", req);

    logger.printInfo(`Unbanning user ${req.params.id}`);

    const user = await users.findOne({ _id: req.params.id });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    //? exclude already unbanned users
    if (user.permissions.includes("user")) {
        logger.printError("User is not banned");
        return res.status(400).send({
            status: 400,
            message: "User is not banned",
        });
    }

    user.permissions = [...user.permissions, "user"];

    const updatedUser = await users.findOneAndUpdate(
        { _id: req.params.id },
        { permissions: user.permissions },
        { new: true }
    );

    logger.printSuccess(`User ${user.username} (${req.params._id}) unbanned!`);

    return res.status(200).send({
        status: 200,
        message: "Utilisateur débloqué!",
        data: updatedUser,
    });
};
