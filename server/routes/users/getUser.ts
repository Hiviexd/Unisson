import { Request, Response } from "express";
import { users } from "../../../database";
import { User } from "../../../types/User";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("getUser", req);

    logger.printInfo(`Getting user ${req.params.id}`);

    const user = await users.findOne({ _id: req.params.id });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    logger.printSuccess(`User ${user.username} (${req.params.id}) found!`);

    return res.status(200).send({
        status: 200,
        message: "User found!",
        data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            permissions: user.permissions,
            bio: user.bio,
            phone: user.phone,
            createdAt: user.createdAt,
            serviceType: user.serviceType,
            rating: user.rating,
            collaborators: user.collaborators,
            hidden: user.hidden,
        },
    });
};
