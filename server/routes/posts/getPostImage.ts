import { Request, Response } from "express";
import { posts } from "../../../database";
import path from "path";
import fs from "fs";

export default async (req: Request, res: Response) => {
	const id = req.params.id;

	const post = await posts.findById(id);

	if (!post)
		return res.status(404).send({
			status: 404,
			message: "Post not found!",
		});

    const files = fs.readdirSync(`./uploads/posts/${id}`);

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
		.sendFile(path.resolve(`./uploads/posts/${id}/${image}`));
}
