import { Request, Response } from "express";
import { galleries, users } from "../../../database";
import { Gallery, Image, Video } from "../../../types/Gallery";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import * as fs from "fs";
import path from "path";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("deleteGalleryImages", req);

    const { deletedImages, deletedVideos } = req.body;

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

    //check if user isn't deleting everything
    if (
        gallery.images.length === deletedImages.length &&
        gallery.videos.length === deletedVideos.length
    ) {
        logger.printError("You can't delete everything!");
        return res.status(400).send({
            status: 400,
            message: "Vous devez utiliser le bouton 'Supprimer tout'!",
        });
    }

    logger.printInfo(`deleting gallery images from ${req.params.userId}`);

    if (deletedImages) {
        for (let image of deletedImages) {
            gallery.images = gallery.images.filter((img) => img._id !== image._id.toString());

            logger.printInfo(`Deleting image ${image._id} from storage`);

            fs.unlinkSync(image.src.replace("/api/assets/", "./uploads/"));

            logger.printSuccess(`Image ${image._id} deleted from storage`);
        }
    }

    if (deletedVideos) {
        for (let video of deletedVideos) {
            gallery.videos = gallery.videos.filter((vid) => vid._id !== video._id.toString());

            logger.printInfo(`Deleting video ${video._id} from storage`);

            fs.unlinkSync(video.src.replace("/api/assets/", "./uploads/"));

            logger.printSuccess(`Video ${video._id} deleted from storage`);
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
