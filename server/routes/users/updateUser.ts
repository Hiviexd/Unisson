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

    console.log(req.body);

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
            message: "Invalid password.",
        });

    const passwordManager = new PasswordManager(password, user.passwordHash);

    if (!(await passwordManager.isValid()))
        return res.status(400).send({
            status: 400,
            message: "Wrong password.",
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
    } else {
        return res.status(403).send({
            status: 403,
            message: "You are not a service provider!",
        });
    }

    //? email + password updates
    if (email) {
        const sanitizedEmail = email.trim().toLowerCase();

        if (!EmailValidator.validate(sanitizedEmail)) {
            logger.printError("Process failed with code 400: Invalid email");

            return res.status(400).send({
                status: 400,
                message: "Invalid email",
            });
        }

        user.email = sanitizedEmail;
    }

    if (newPassword) {
        const passwordSchema = new PasswordValidator()
            .is()
            .min(8, "Password must be at least 8 characters long")
            .is()
            .max(100, "Password must be at most 100 characters long")
            .has()
            .digits(1, "Password must contain at least 1 digit")
            .has()
            .not()
            .spaces(0, "Password cannot contain spaces");

        if (!passwordSchema.validate(newPassword)) {
            logger.printError("Process failed with code 400: Invalid password format");

            return res.status(400).send({
                status: 400,
                message:
                    "Invalid password format:\n" +
                    passwordSchema.validate(newPassword, { details: true })[0].message,
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

    if (!req.body.image) console.log("No file provided!");

    if (req.body.image) {
        console.log(req.file);
        //const fileExtension = path.extname(req.file.originalname);
        //create buffer from base64 string
        const buffer = Buffer.from(req.body.image, "base64");
        const fileName = `${user._id}.jpg`;
        const filePath = path.resolve(`./uploads/avatars/${fileName}`);
        createWriteStream(filePath).write(new Uint8Array(buffer));
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
