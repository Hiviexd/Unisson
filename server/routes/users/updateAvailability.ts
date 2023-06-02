import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("updateAvailability", req);
    console.log(req.body);
    const availability = req.body.availability;
    console.log(availability);

    const user = await users.findOne({
        accountToken: req.headers.authorization,
    });

    if (!user) {
        logger.printError(`User not found!`);

        return res.status(404).send({
            status: 404,
            message: "User not found!",
        });
    }

    logger.printInfo(
        `Updating availability of user ${user.username} (${user._id})`
    );

    user.availability = availability;

    await user.save();

    logger.printSuccess(
        `Availability of user ${user.username} (${user._id}) updated!`
    );

    return res.status(200).json({
        status: 200,
        message: "Availability updated!",
        data: {
            _id: user._id,
            username: user.username,
            availability: user.availability,
        },
    });
};
