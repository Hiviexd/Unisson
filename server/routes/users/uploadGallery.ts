import { Request, Response } from "express";
import { users } from "../../../database";
import fs from "fs";
import path from "path";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("updateUser", req);

	const user = await users.findOne({
		accountToken: req.headers.authorization,
	});

	if (!user) {
		logger.printError("User not found");
		return res.status(404).send({
			status: 404,
			message: "User not found",
		});
	}

	logger.printInfo(`uploading gallery for ${user.username}`);

    if (!req.files)
        return res.status(400).send({
            status: 400,
            message: "No files were uploaded!",
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

    //delete all files in the gallery
    let galleryPath = path.resolve(`./uploads/`).concat(`/gallery/${user._id}`);
    if (fs.existsSync(galleryPath)) {
        for (let file of fs.readdirSync(galleryPath)) {
            fs.unlinkSync(path.resolve(galleryPath).concat(`/${file}`));
        }
    }

    let fileId = 0;
    fs.mkdirSync(path.resolve(`./uploads/`).concat(`/gallery/${user._id}`), { recursive: true });

	for (let file of req.files) {
        let fileFormat = file.mimetype.split("/")[1];
        fs.createWriteStream(
            path.resolve(`./uploads/`).concat(`/gallery/${user._id}/${fileId++}.${fileFormat}`)
        ).write(new Uint8Array(file.buffer));
    }

    logger.printSuccess("Gallery uploaded");

    return res.status(200).send({
        status: 200,
        message: "Gallery uploaded",
        count: req.files.length,
    });
}