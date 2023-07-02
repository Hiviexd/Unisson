import { NextFunction, Request, Response } from "express";
import { LoggerConsumer } from "../helpers/LoggerConsumer";

export default async (req: Request, res: Response, next: NextFunction) => {
    const logger = new LoggerConsumer("isBanned", req);

    if (!req.body.loggedInUser.permissions.includes("user")) {
        logger.printError("Unauthorized");
        return res.status(401).send({
            status: 401,
            message: "Vous n'êtes pas autorisé à effectuer cette action",
        });
    }

    return next();
};
