import { Request, Response } from "express";
import { users, contracts } from "../../../database";
import { Contract } from "../../../types/Contract";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { NotificationsManager } from "../../helpers/NotificationsManager";
import crypto from "crypto";

const logger = new LoggerConsumer("contracts");
const notif = new NotificationsManager();

export default async (req: Request, res: Response) => {
    logger.printInfo("Creating contract message...");

    const { recipientId, content } = req.body;

    if (!recipientId || !content) {
        logger.printError("Missing parameters");
        return res.status(400).send({
            status: 400,
            message: "Missing parameters",
        });
    }

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

    const recipient = await users.findOne({
        _id: recipientId,
    });

    if (!recipient) {
        logger.printError("Recipient not found");
        return res.status(404).send({
            status: 404,
            message: "Recipient not found",
        });
    }

    // check if user is provider
    if (!recipient.permissions.includes("provider")) {
        logger.printError("Recipient is not a provider");
        return res.status(403).send({
            status: 403,
            message: "Recipient is not a provider",
        });
    }

    const contractId = crypto.randomBytes(10).toString("hex");

    const contract: Contract = {
        _id: contractId,
        senderId: user._id,
        senderUsername: user.username,
        recipientId: recipient._id,
        recipientUsername: recipient.username,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "pending",
    };

    const createdContract = await contracts.create(contract);

    if (!createdContract) {
        logger.printError("Failed to create contract");
        return res.status(500).send({
            status: 500,
            message: "Failed to create contract",
        });
    }

    logger.printSuccess("Contract created successfully");

    notif.createNotification(
        recipientId,
        `Vous avez reçu un nouveau contrat de ${user.username}.`,
        {
            icon: "email",
            redirect: `/contract/${contractId}`,
        }
    );

    return res.status(200).send({
        status: 200,
        message: "Contract created successfully",
        data: createdContract,
    });
};
