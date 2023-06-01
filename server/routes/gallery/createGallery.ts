import { Request, Response } from "express";
import { galleries, users } from "../../../database";
import { Gallery, Image, Video } from "../../../types/Gallery";
import crypto from "crypto";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { createWriteStream, mkdirSync, existsSync } from "fs";
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

    const userGallery = await galleries.findOne({
        userId: user._id,
    });

    if (userGallery)
        return res.status(403).send({
            status: 403,
            message: "You already have a gallery!",
        });

    logger.printInfo("Creating a new Gallery...");

    if (!req.files)
        return res.status(400).send({
            status: 400,
            message: "Missing files!",
        });

    const allowedMimeTypes = [
        "image/png",
        "image/jpeg",
        "image/gif",
        "video/mp4",
    ];

    for (let file of req.files) {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return res.status(400).send({
                status: 400,
                message: "Invalid file!",
            });
        }
    }

    const galleryId = crypto.randomBytes(20).toString("hex").slice(20);

    const gallery: Gallery = {
        _id: galleryId,
        userId: user._id,
        images: [],
        videos: [],
        createdAt: new Date(),
    };

    // check if uploads/galleries folder exists
    if (!existsSync(path.resolve(`./uploads/`).concat(`/galleries`))) {
        mkdirSync(path.resolve(`./uploads/`).concat(`/galleries`), {
            recursive: true,
        });
    }

    mkdirSync(path.resolve(`./uploads/`).concat(`/galleries/${galleryId}`), {
        recursive: true,
    });

    mkdirSync(
        path.resolve(`./uploads/`).concat(`/galleries/${galleryId}/images`),
        {
            recursive: true,
        }
    );
    mkdirSync(
        path.resolve(`./uploads/`).concat(`/galleries/${galleryId}/videos`),
        {
            recursive: true,
        }
    );

    for (let file of req.files) {
        let fileFormat = file.mimetype.split("/")[1];
        let fileId = crypto.randomBytes(20).toString("hex").slice(20);

        if (file.mimetype.includes("image")) {
            gallery.images.push({
                _id: fileId,
                src: `/api/assets/galleries/${galleryId}/images/${fileId}.${fileFormat}`,
            });

            createWriteStream(
                path
                    .resolve(`./uploads/`)
                    .concat(
                        `/galleries/${galleryId}/images/${fileId}.${fileFormat}`
                    )
            ).write(new Uint8Array(file.buffer));
        } else if (file.mimetype.includes("video")) {
            gallery.videos.push({
                _id: fileId,
                type: "video",
                poster: `/api/assets/galleries/${galleryId}/videos/${fileId}.${fileFormat}`,
                sources: [
                    {
                        src: `/api/assets/galleries/${galleryId}/videos/${fileId}.${fileFormat}`,
                        type: file.mimetype,
                    },
                ],
            });

            createWriteStream(
                path
                    .resolve(`./uploads/`)
                    .concat(
                        `/galleries/${galleryId}/videos/${fileId}.${fileFormat}`
                    )
            ).write(new Uint8Array(file.buffer));
        }
    }

    const galleryCreated = await galleries.create(gallery);

    if (!galleryCreated)
        return res.status(500).send({
            status: 500,
            message: "Failed to create gallery!",
        });

    logger.printSuccess("Gallery created!");

    res.status(200).send({
        status: 200,
        message: "Gallery created",
        data: gallery,
    });
};
