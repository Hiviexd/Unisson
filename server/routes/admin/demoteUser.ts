import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("demoteUser", req);

    logger.printInfo(`Demoting user ${req.params.id}`);

    const user = await users.findOne({ _id: req.params.id });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    user.permissions = ["user"];

    const updatedUser = await users.findOneAndUpdate(
        { _id: req.params.id },
        { permissions: user.permissions, hidden: true },
        { new: true }
    );

    logger.printSuccess(`User ${user.username} (${req.params._id}) demoted!`);

    return res.status(200).send({
        status: 200,
        message: "User demoted!",
        data: updatedUser,
    });
};
