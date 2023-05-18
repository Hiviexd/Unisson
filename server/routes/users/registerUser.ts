import { Request, Response } from "express";
import { users } from "../../../database";
import { User } from "../../../types/User";
import crypto from "crypto";
import { PasswordManager } from "../../helpers/PasswordManager";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import * as EmailValidator from "email-validator";
import PasswordValidator from "password-validator";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("registerUser", req);
    const { email, username, password, phone } = req.body;
    const sanitizedEmail = email.trim().toLowerCase();

    logger.printInfo("Registering a new user...");

    console.log(req.body);

    // ? Check if the provided data is valid
    if (
        !email ||
        !username ||
        !password ||
        !phone ||
        typeof email != "string" ||
        typeof username != "string" ||
        typeof password != "string"
    ) {
        logger.printError("Process failed with code 400: Invalid credentials");

        return res.status(400).send({
            status: 400,
            message: "Invalid credentials",
        });
    }

    if (!EmailValidator.validate(sanitizedEmail)) {
        logger.printError("Process failed with code 400: Invalid email");

        return res.status(400).send({
            status: 400,
            message: "Invalid email",
        });
    }

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

    if (!passwordSchema.validate(password)) {
        logger.printError(
            "Process failed with code 400: Invalid password format"
        );

        return res.status(400).send({
            status: 400,
            message:
                "Invalid password format:\n" +
                passwordSchema.validate(password, { details: true })[0].message,
        });
    }

    const user = await users.findOne({
        email: encodeURI(sanitizedEmail),
    });

    if (user) {
        logger.printError(
            "Process failed with code 403: account already exists!"
        );

        return res.status(403).send({
            status: 403,
            message: "account already exists!",
        });
    }

    const passwordManager = new PasswordManager(password);
    const passwordHash = await passwordManager.generateHash();
    const userId = crypto.randomBytes(10).toString("hex").slice(10);
    const accountToken = crypto.randomBytes(30).toString("hex").slice(30);

    const userInfo: User = {
        _id: userId,
        email: sanitizedEmail,
        username: username.trim(),
        accountToken: accountToken,
        passwordHash: passwordHash,
        createdAt: new Date(),
        permissions: ["user"],
        bio: "Hello, world!",
        phone: Number(phone),
        serviceType: undefined,
        rating: 0,
        collaborators: [],
        hidden: true
    };

    await users.create(userInfo);

    const createdUser = await users.findById(userId);

    if (!createdUser)
        return res.status(500).send({
            status: 500,
            message: "Unknown error",
        });

    logger.printSuccess(`New user created! ${username} (${userId})`);

    return res.status(200).send({
        status: 200,
        message: "Authorized!",
        data: {
            _id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
            bio: createdUser.bio,
            phone: createdUser.phone,
            accountToken: createdUser.accountToken,
            authenticated: true,
        },
    });
};
