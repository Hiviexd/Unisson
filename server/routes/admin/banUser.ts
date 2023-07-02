import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("banUser", req);
    logger.printInfo(`Banning user ${req.params.id}`);

    const user = await users.findOne({ _id: req.params.id });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    //? disallow admins from banning other admins
    if (user.permissions.includes("admin")) {
        logger.printError("Cannot ban other admins");
        return res.status(400).send({
            status: 400,
            message: "Cannot ban other admins",
        });
    }

    user.permissions = [];

    const updatedUser = await users.findOneAndUpdate(
        { _id: req.params.id },
        { permissions: [], hidden: true },
        { new: true }
    );

    logger.printSuccess(`User ${user.username} (${req.params._id}) banned!`);

    return res.status(200).send({
        status: 200,
        message: "Utilisateur bloqué!",
        data: updatedUser,
    });
};
