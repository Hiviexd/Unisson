import { NextFunction, Request, Response, Router } from "express";
import { LoggerConsumer } from "../helpers/LoggerConsumer";

export default async (req: Request, res: Response, next: NextFunction) => {
    const logger = new LoggerConsumer("isProvider", req);

    if (!req.body.loggedInUser.permissions.includes("provider")) {
        logger.printError("Unauthorized");
        return res.status(401).send({
            status: 401,
            message: "Unauthorized",
        });
    }

    return next();
};
