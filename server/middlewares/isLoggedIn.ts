import { NextFunction, Request, Response } from "express";
import { users } from "../../database";

export default async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization)
        return res.status(400).send({
            status: 400,
            message: "Missing authorization",
        });

    const loggedInUser = await users.findOne({ accountToken: authorization });

    if (!loggedInUser)
        return res.status(404).send({
            status: 404,
            message: "User not found!",
        });

    req.body.loggedInUser = loggedInUser;

    return next();
};
