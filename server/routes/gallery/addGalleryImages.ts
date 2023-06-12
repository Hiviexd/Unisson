import { Request, Response } from "express";
import { galleries, users } from "../../../database";
import { Gallery, Image, Video } from "../../../types/Gallery";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import * as fs from "fs";
import crypto from "crypto";
import path from "path";
import ffmpeg from "fluent-ffmpeg";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("addGalleryImages", req);

    const user = await users.findOne({
        accountToken: req.headers.authorization,
    });

    if (!user)
        return res.status(404).send({
            status: 404,
            message: "User not found!",
        });

    const gallery = await galleries.findOne({ userId: user._id });

    if (!gallery) {
        logger.printError("Gallery not found");
        return res.status(404).send({
            status: 404,
            message: "Gallery not found",
        });
    }

    logger.printInfo(`Editing gallery ${req.params.userId}`);

    const allowedMimeTypes = ["image/png", "image/jpeg", "image/gif", "video/mp4"];

    for (let file of req.files) {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return res.status(400).send({
                status: 400,
                message: "Invalid file!",
            });
        }

        let fileFormat = file.mimetype.split("/")[1];
        let fileId = crypto.randomBytes(20).toString("hex").slice(20);

        if (file.mimetype.includes("image")) {
            const image: Image = {
                _id: fileId,
                src: `/api/assets/galleries/${gallery._id}/images/${fileId}.${fileFormat}`,
            };

            gallery.images.push(image);

            logger.printInfo(`Saving image ${fileId} to storage`);

            if (!fs.existsSync(`./uploads/galleries/${gallery._id}/images`))
                fs.mkdirSync(`./uploads/galleries/${gallery._id}/images`);

            fs.createWriteStream(
                path
                    .resolve(`./uploads/`)
                    .concat(`/galleries/${gallery._id}/images/${fileId}.${fileFormat}`)
            ).write(new Uint8Array(file.buffer));

            logger.printSuccess(`Image ${fileId} saved to storage`);
        } else if (file.mimetype.includes("video")) {
            const video: Video = {
                _id: fileId,
                type: "video",
                poster: `/api/assets/galleries/${gallery._id}/videos/thumb/${fileId}.jpg`,
                sources: [
                    {
                        src: `/api/assets/galleries/${gallery._id}/videos/${fileId}.${fileFormat}`,
                        type: file.mimetype,
                    },
                ],
            };

            gallery.videos.push(video);

            fs.createWriteStream(
                path
                    .resolve(`./uploads/`)
                    .concat(`/galleries/${gallery._id}/videos/${fileId}.${fileFormat}`)
            ).write(new Uint8Array(file.buffer));

            //create thumbnail
            ffmpeg(
                path
                    .resolve(`./uploads/`)
                    .concat(`/galleries/${gallery._id}/videos/${fileId}.${fileFormat}`)
            ).screenshots({
                timestamps: ["50%"],
                filename: `${fileId}.jpg`,
                folder: path.resolve(`./uploads/`).concat(`/galleries/${gallery._id}/videos/thumb`),
                size: "320x240",
            });
        }
    }

    await gallery.save();

    logger.printSuccess(`Gallery ${req.params.userId} edited!`);

    return res.status(200).send({
        status: 200,
        message: "Galerie modifié!",
        data: gallery,
    });
};
