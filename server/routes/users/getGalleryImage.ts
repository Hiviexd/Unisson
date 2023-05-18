import { Request, Response } from "express";
import { users } from "../../../database";
import path from "path";
import fs from "fs";

export default async (req: Request, res: Response) => {
	const id = req.params.id;

	/*const user = await users.findById(id);

	if (!user)
		return res.status(404).send({
			status: 404,
			message: "User not found!",
		});*/

    //? check if user has gallery
    if (!fs.existsSync(`./uploads/gallery/${id}`)) {
        return res.status(404).send({
            status: 404,
            message: "User has no gallery!",
        });
    }

    const files = fs.readdirSync(`./uploads/gallery/${id}`);

    if (files.length === 0) {
        return res.status(404).send({
            status: 404,
            message: "No images found!",
        });
    }

    const imageid = req.params.imageid;

    const image = files.find((file) => file.split(".")[0] === imageid);

    if (!image) {
        return res.status(404).send({
            status: 404,
            message: "Image not found!",
        });
    }

    return res
		.status(200)
		.sendFile(path.resolve(`./uploads/gallery/${id}/${image}`));
}
