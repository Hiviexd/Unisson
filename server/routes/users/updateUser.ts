import { Request, Response } from "express";
import { users } from "../../../database";
import { createWriteStream } from "fs";
import path from "path";
import { PasswordManager } from "../../helpers/PasswordManager";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import * as EmailValidator from "email-validator";
import PasswordValidator from "password-validator";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("updateUser", req);
    const {
        username,
        email,
        password,
        newPassword,
        phone,
        bio,
        description,
        serviceType,
        location,
        facebook,
        instagram,
        youtube,
        twitter,
    } = req.body;

    /*console.log({
        username,
        email,
        password,
        newPassword,
        phone,
        bio,
        description,
        serviceType,
        location,
        facebook,
        instagram,
        youtube,
        twitter,
    });*/

    const user = await users.findOne({ accountToken: req.headers.authorization });

    if (!user)
        return res.status(404).send({
            status: 404,
            message: "User not found!",
        });

    //? check if the provided password is valid

    if (!password || typeof password != "string")
        return res.status(400).send({
            status: 400,
            message: "Mot de passe est requis!",
        });

    const passwordManager = new PasswordManager(password, user.passwordHash);

    if (!(await passwordManager.isValid()))
        return res.status(400).send({
            status: 400,
            message: "Mot de passe incorrect!",
        });

    logger.printInfo("Updating user...");

    //? regular user updates
    if (username) user.username = username;
    if (phone) user.phone = phone;

    //? service provider updates
    if (user.permissions.includes("provider")) {
        if (bio) user.bio = bio;
        if (description) user.description = description;
        if (serviceType) user.serviceType = serviceType;
        if (location) user.location = location;
        if (facebook || instagram || youtube || twitter)
            user.socials = {
                facebook,
                instagram,
                youtube,
                twitter,
            };
    }

    //? email + password updates
    if (email) {
        const sanitizedEmail = email.trim().toLowerCase();

        if (!EmailValidator.validate(sanitizedEmail)) {
            logger.printError("Process failed with code 400: Invalid email");

            return res.status(400).send({
                status: 400,
                message: "Email invalide",
            });
        }

        user.email = sanitizedEmail;
    }

    if (newPassword) {
        const passwordSchema = new PasswordValidator()
            .is()
            .min(8, "Mot de passe doit contenir au moins 8 caractères")
            .is()
            .max(100, "Mot de passe doit contenir au plus 100 caractères")
            .has()
            .digits(1, "Mot de passe doit contenir au moins 1 chiffre")
            .has()
            .not()
            .spaces(0, "Mot de passe ne doit pas contenir d'espaces");

        if (!passwordSchema.validate(newPassword)) {
            logger.printError("Process failed with code 400: Invalid password format");

            return res.status(400).send({
                status: 400,
                message: passwordSchema.validate(newPassword, { details: true })[0].message,
            });
        }

        const newPasswordManager = new PasswordManager(newPassword);
        const newPasswordHash = await newPasswordManager.generateHash();

        user.passwordHash = newPasswordHash;
    }

    //? avatar updates
    const allowedMimeTypes = ["image/png", "image/jpeg"];

    if (req.file && !allowedMimeTypes.includes(req.file.mimetype))
        return res.status(400).send({
            status: 400,
            message: "Invalid image!",
        });

    if (!req.file) console.log("No file provided!");

    if (req.file) {
        let fileExtension = req.file.mimetype.split("/")[1];
        if (fileExtension == "jpeg") fileExtension = "jpg";

        createWriteStream(path.resolve("./uploads/avatars/" + user._id + ".jpg")).write(
            new Uint8Array(req.file.buffer)
        );
    }

    await user.save();

    logger.printSuccess("User updated successfully!");

    return res.status(200).send({
        status: 200,
        message: "User updated successfully!",
        data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            permissions: user.permissions,
            bio: user.bio,
            description: user.description,
            phone: user.phone,
            createdAt: user.createdAt,
            serviceType: user.serviceType,
            rating: user.rating,
            availability: user.availability,
            hidden: user.hidden,
            location: user.location,
            socials: user.socials,
        },
    });
};
