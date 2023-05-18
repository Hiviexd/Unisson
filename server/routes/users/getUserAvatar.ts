import { Request, Response } from "express";
// import { users } from "../../../database";
import { existsSync } from "fs";
import path from "path";

export default async (req: Request, res: Response) => {
	/**
     * ? user request
    const user = await users.findOne({ _id: req.params.id });

	if (!user)
		return res.status(404).send({
            status: 404,
            message: "User not found!",
        });
    */

	if (!existsSync(path.resolve(`./uploads/avatars/${req.params.id}.jpg`)))
		return res.status(200).sendFile(path.resolve("./public/default.jpg"));

	return res
		.status(200)
		.sendFile(path.resolve(`./uploads/avatars/${req.params.id}.jpg`));
};
