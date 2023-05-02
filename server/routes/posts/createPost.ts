import { Request, Response } from "express";
import { posts, users } from "../../../database";
import crypto from "crypto";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { createWriteStream, mkdirSync } from "fs";
import path from "path";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("createPost", req);

	const user = await users.findOne({
		accountToken: req.headers.authorization,
	});

	if (!user)
		return res.status(404).send({
			status: 404,
			message: "User not found!",
		});

	if (!user.permissions.length)
		return res.status(403).send({
			status: 403,
			message: "No permissions.",
		});

	logger.printInfo("Creating a new post...");

	/*if (!req.body.type)
        return res.status(400).send({
            status: 400,
            message: "Provide a type",
        });*/

    if (!req.body.title || typeof req.body.title != "string" || req.body.title.trim() == "")
        return res.status(400).send({
            status: 400,
            message: "Invalid title!",
        });

    if (!req.files)
		return res.status(400).send({
			status: 400,
			message: "Invalid image!",
		});

	const allowedMimeTypes = ["image/png", "image/jpeg", "image/gif"];

    for (let file of req.files) {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return res.status(400).send({
                status: 400,
                message: "Invalid image!",
            });
        }
    }

	const postId = crypto.randomBytes(20).toString("hex").slice(20);

	const postInfo = {
		_id: postId,
		title: req.body.title.trim(),
        description: req.body.description || "",
		type: "salle",
		createdAt: new Date(),
		posterId: user._id,
		posterUsername: user.username,
        buyers: [],
        collaborators: [],
        archived: false,
	};

	const post = new posts(postInfo);

	await post.save();

    let fileId = 0;
    mkdirSync(path.resolve(`./uploads/`).concat(`/images/${postInfo._id}`), { recursive: true });

	for (let file of req.files) {
        let fileFormat = file.mimetype.split("/")[1];
        createWriteStream(
            path.resolve(`./uploads/`).concat(`/images/${postInfo._id}/${fileId++}.${fileFormat}`)
        ).write(new Uint8Array(file.buffer));
    }

    logger.printSuccess("Post created!");

	res.status(200).send({
		status: 200,
		message: "Post created",
		data: postInfo,
	});
};
