import { Request, Response } from "express";
import { contracts, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { NotificationsManager } from "../../helpers/NotificationsManager";

const logger = new LoggerConsumer("contracts");
const notif = new NotificationsManager();

export default async (req: Request, res: Response) => {
    logger.printInfo("Responding to contract...");

    const { status, response } = req.body;

    if (!status || !response) {
        logger.printError("Missing parameters");
        return res.status(400).send({
            status: 400,
            message: "Missing parameters",
        });
    }

    const contract = await contracts.findOne({ _id: req.params.id });

    if (!contract) {
        logger.printError("Contract not found");
        return res.status(404).send({
            status: 404,
            message: "Contract not found",
        });
    }

    if (contract.status !== "pending") {
        logger.printError("Contract already responded");
        return res.status(400).send({
            status: 400,
            message: "Contract already responded",
        });
    }

    contract.status = status;
    contract.response = response;
    contract.updatedAt = new Date();

    await contract.save();

    const user = await users.findOne({ _id: contract.senderId });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    notif.createNotification(
        user._id,
        `Votre contrat avec ${contract.recipientUsername} a été ${
            status === "accepted" ? "accepté!" : "refusé."
        }`,
        `/contract/${contract._id}`
    );

    logger.printSuccess("Contract responded!");

    return res.status(200).send({
        status: 200,
        message: "Contract responded!",
        data: contract,
    });
};
