import { Request, Response } from "express";
import { posts, users, postReviews } from "../../../database";
import { Post, PostType, PostUser } from "../../../types/Post";
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

	if (!req.body.type)
        return res.status(400).send({
            status: 400,
            message: "Provide a type",
        });

    const allowedTypes: PostType[] = ["photographeur", "salle", "traiteur", "band"];

    if (!allowedTypes.includes(req.body.type))
        return res.status(400).send({
            status: 400,
            message: "Invalid type!",
        });

    if (!req.body.title || typeof req.body.title != "string" || req.body.title.trim() == "")
        return res.status(400).send({
            status: 400,
            message: "Invalid title!",
        });

    if (!req.files)
		return res.status(400).send({
			status: 400,
			message: "Missing image!",
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

    let collaborators: PostUser[] = [];

    if (req.body.collaborators) {
        if (!Array.isArray(req.body.collaborators))
            return res.status(400).send({
                status: 400,
                message: "Invalid collaborators!",
            });

        for (let collaborator of req.body.collaborators) {
            if (!collaborator.userId || typeof collaborator.userId != "string")
                return res.status(400).send({
                    status: 400,
                    message: "Invalid collaborator!",
                });

            collaborators.push({
                userId: collaborator.userId,
                confirmed: false,
            });
        }
    }

	const postInfo: Post = {
		_id: postId,
		title: req.body.title.trim(),
        description: req.body.description || "",
		type: req.body.type,
        rating: 0,
		createdAt: new Date(),
		posterId: user._id,
		posterUsername: user.username,
        buyers: [],
        collaborators: collaborators,
        archived: false,
	};

	const post = new posts(postInfo);

	await post.save();

    const postReview = new postReviews({
        _id: postId,
        reviews: [],
    });

    await postReview.save();

    let fileId = 0;
    mkdirSync(path.resolve(`./uploads/`).concat(`/posts/${postInfo._id}`), { recursive: true });

	for (let file of req.files) {
        let fileFormat = file.mimetype.split("/")[1];
        createWriteStream(
            path.resolve(`./uploads/`).concat(`/posts/${postInfo._id}/${fileId++}.${fileFormat}`)
        ).write(new Uint8Array(file.buffer));
    }

    logger.printSuccess("Post created!");

	res.status(200).send({
		status: 200,
		message: "Post created",
		data: postInfo,
	});
};
