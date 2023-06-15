import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("getUserByEmail", req);

    logger.printInfo(`Getting user by email ${req.params.email}`);

    const user = await users.findOne({ email: req.params.email });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "Fournisseur pas trouvé",
        });
    }

    if (user.hidden) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "Fournisseur pas trouvé",
        });
    }

    logger.printSuccess(`User ${user.username} (${req.params.email}) found!`);

    return res.status(200).send({
        status: 200,
        message: "Fournisseur trouvé!",
        data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            permissions: user.permissions,
            bio: user.bio,
            description: user.description,
            phone: user.phone,
            createdAt: user.createdAt,
            serviceType: user.serviceType,
            rating: user.rating,
            availability: user.availability,
            hidden: user.hidden,
            location: user.location,
            socials: user.socials,
        },
    });
};
